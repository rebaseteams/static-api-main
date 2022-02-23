/* eslint-disable no-underscore-dangle */
import { auth } from 'express-oauth2-jwt-bearer';
import axios from 'axios';
import {
  Handler, NextFunction, Request, Response,
} from 'express';
import jwt from 'jsonwebtoken';
import * as fs from 'fs';
import { Connection, Repository } from 'typeorm';
import { SignUp } from '../../../models/types/auth';
import { ConfigConstants } from '../../../models/types/config';
import { Auth0Interface } from '../../../models/interfaces/auth0';
import tokenValidator from '../../../utils/tokenValidator';
import { PgUserEntity } from '../../../models/entities/pg-user';
import { PgRoleEntity } from '../../../models/entities/pg-role';
import { PgResourceEntity } from '../../../models/entities/pg-resource';
import { mapUserRole } from '../../../utils/pg-to-type-mapper';
import { PgActionPermissionsEntity } from '../../../models/entities/pg-action-permissions';
import { UserRole } from '../../../models/types/userRole';

// TODO: This needs to be looked upon
export class Auth0 implements Auth0Interface {
  tokenGenerated;

  static auth0;

  AUTH_DOMAIN;

  AUTH_TOKEN;

  AUTH_CLIENT_ID;

  AUTH_CONNECTION;

  userRepository : Repository<PgUserEntity>;

  roleRepository : Repository<PgRoleEntity>;

  resourceRepository : Repository<PgResourceEntity>;

  actionPermissionRepository: Repository<PgActionPermissionsEntity>;

  static initAuth(AUTH_DOMAIN, AUTH_AUDIENCE) {
    Auth0.auth0 = auth({
      issuerBaseURL: AUTH_DOMAIN,
      audience: AUTH_AUDIENCE,
    });
  }

  constructor(connection: Connection, config: ConfigConstants) {
    this.AUTH_DOMAIN = config.AUTH_DOMAIN;
    this.AUTH_CLIENT_ID = config.AUTH_CLIENT_ID;
    this.AUTH_CONNECTION = config.AUTH_CONNECTION;
    this.userRepository = connection.getRepository(PgUserEntity);
    this.roleRepository = connection.getRepository(PgRoleEntity);
    this.resourceRepository = connection.getRepository(PgResourceEntity);
    this.actionPermissionRepository = connection.getRepository(PgActionPermissionsEntity);
  }

  async setAuth(req: Request, res: Response, next: NextFunction) {
    try {
      if (req.headers.userid === process.env.DEFAULT_USERID) {
        req.body.auth = { userId: req.headers.userid };
        return next();
      }
      const token = req.headers.authorization.split(' ')[1];
      if (token) {
        const payload = await jwt.decode(token);
        if (payload) {
          req.body.auth = { userId: payload.sub.toString().split('|')[1] };
        }
        return next();
      }
      const err = { message: 'Authentication Failed', statusCode: 401 };
      throw err;
    } catch (err) {
      return next(err);
    }
  }

  async authenticate(req : Request, res : Response, next : NextFunction) {
    try {
      if (req.headers.userid === process.env.DEFAULT_USERID) {
        return next();
      }
      return Auth0.auth0(req, res, next);
    } catch (err) {
      return next(err);
    }
  }

  async generateToken() {
    // console.log('generate token');
    try {
      const options = {
        url: `${this.AUTH_DOMAIN}oauth/token`,
        headers: { 'content-type': 'application/json' },
        data: {
          grant_type: 'client_credentials',
          client_id: process.env.CLIENT_ID,
          client_secret: process.env.CLIENT_SECRET,
          audience: `${this.AUTH_DOMAIN}api/v2/`,
        },
      };
      fs.readFile('./secrets/auth0.txt', 'utf8', (error, payload) => {
        // if (error) {
        //   // eslint-disable-next-line no-console
        //   return
        // }
        this.AUTH_TOKEN = payload;
        const isValid : boolean = tokenValidator(payload);
        if (!isValid) {
          axios.post(options.url, options.data, { headers: options.headers }).then((response) => {
            const tokenData : string = response.data.access_token;
            // update to use file manager in some other token
            fs.writeFile('./secrets/auth0.txt', tokenData, () => {
              // if (err) {
              //   // eslint-disable-next-line no-console
              //   console.error(err);
              //   return;
              // }
              this.tokenGenerated = true;
            });
            this.AUTH_TOKEN = response.data.access_token;
          });
        }
      });
    } catch (error) {
      this.tokenGenerated = false;
    }
  }

  async checkRoles(roles : Array<string>, userId : string | (() => string)) : Promise<boolean> {
    const resp = await axios.get(`${this.AUTH_DOMAIN}api/v2/users/${userId}/roles`, { headers: { Authorization: `Bearer ${this.AUTH_TOKEN}` } });
    const user_roles : Array<{id : string, name : string, description : string}> = resp.data;
    return roles.some((role) => user_roles.map((val) => val.name).includes(role));
  }

  checkAuthorization(resource?: string, action?: string) : Array<Handler> {
    return [this.authenticate, this.setAuth, async (req : Request, res : Response, next : NextFunction) => {
      try {
        if (req.headers.userid === process.env.DEFAULT_USERID) return next();
        const token = req.headers.authorization.split(' ')[1];
        const payload = jwt.decode(token);
        let id : any = payload.sub;
        // eslint-disable-next-line prefer-destructuring
        id = id.split('|')[1];

        const user = await this.userRepository.findOne({ id });
        if (!user) {
          const err = { message: 'User does not exist', statusCode: 404 };
          throw err;
        }
        if (!user.approved) {
          const err = { message: 'Your approval is pending', statusCode: 401 };
          throw err;
        }

        // TODO: Action and Resource Should not optional
        if (!action && !resource) {
          return next();
        }

        const actionPermissions = await this.actionPermissionRepository.find({
          relations: ['role'],
          where: {
            user_id: user.id,
            action_id: action,
          },
        });

        if (actionPermissions.find((a) => a.permission === true)) {
          return next();
        }

        const err = { message: 'Unauthorized', statusCode: 401 };
        return next(err);
      } catch (err) {
        return next(err);
      }
    }];
  }

  getRoles = async (id : string) : Promise<UserRole[]> => {
    const user: PgUserEntity = await this.userRepository.findOne({ id });
    if (!user.approved) {
      const err = { message: 'Your approval is pending', statusCode: 401 };
      throw err;
    }

    const pgActionPermissions = await this.actionPermissionRepository.find({ user_id: user.id });

    const mappedUserRoles: UserRole[] = [];
    for (let i = 0; i < pgActionPermissions.length; i += 1) {
      const role = await pgActionPermissions[i].role;
      const mappedUser = await mapUserRole(role, pgActionPermissions, role.id);
      mappedUserRoles.push(mappedUser);
    }

    return mappedUserRoles;
  }

  // eslint-disable-next-line consistent-return
  requireRole(roles : Array<string>) {
    return async (req : Request, res : Response, next : NextFunction): Promise<any> => {
      try {
        if (req.headers.userid === process.env.DEFAULT_USERID) return next();
        const token = req.headers.authorization.split(' ')[1];
        const payload = await jwt.decode(token);
        const roleCheck = await this.checkRoles(roles, payload.sub);
        if (roleCheck) return next();
        const err = { message: 'Unauthorized', statusCode: 401 };
        throw err;
      } catch (err) {
        next(err);
      }
      return 0;
    };
  }

  async signupUser(data : SignUp) {
    return new Promise((resolve, reject) => {
      axios.post(`${this.AUTH_DOMAIN}dbconnections/signup`, {
        client_id: this.AUTH_CLIENT_ID,
        email: data.email,
        password: data.password,
        connection: this.AUTH_CONNECTION,
        username: data.userName,
        name: data.userName,
        nickname: data.userName,
      }).then((value) => {
        resolve(value.data);
      }).catch((err) => {
        const error = { statusCode: err.response.data.statusCode, message: err.response.data.message || err.response.data.description };
        reject(error);
      });
    });
  }
}
