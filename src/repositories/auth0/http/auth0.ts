import { auth } from 'express-oauth2-jwt-bearer';
import axios from 'axios';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { SignUp } from '../../../models/types/auth';
import { ConfigConstants } from '../../../models/types/config';

// eslint-disable-next-line no-unused-vars

export class Auth0 {
  tokenGenerated;
  auth0;
  AUTH_DOMAIN;
  AUTH_TOKEN;
  AUTH_CLIENT_ID;
  AUTH_CONNECTION;

  constructor(config: ConfigConstants) {
    this.auth0 = auth({
      issuerBaseURL: config.AUTH_DOMAIN,
      audience: config.AUTH_AUDIENCE,
    });

    this.AUTH_DOMAIN = config.AUTH_DOMAIN;
    this.AUTH_CLIENT_ID = config.AUTH_CLIENT_ID;
    this.AUTH_CONNECTION = config.AUTH_CONNECTION;
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
          req.body.auth = { userId: payload.sub };
        }
        return next();
      }
      const err = { message: 'Authentication Failed', statusCode: 401 };
      throw err;
    } catch (err) {
      return next(err);
    }
  };

  async authenticate(req : Request, res : Response, next : NextFunction) {
    if (req.headers.userid === process.env.DEFAULT_USERID) return next();
    return this.auth0(req, res, next);
  };

  async generateToken() {
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
  
      await axios.post(options.url, options.data, { headers: options.headers }).then((response) => {
        this.AUTH_TOKEN = response.data.access_token;
      });
      this.tokenGenerated = true;
    } catch (error) {
      this.tokenGenerated = false;
    }
  };

  async checkRoles(roles : Array<string>, userId : string | (() => string)) : Promise<boolean> {
    const resp = await axios.get(`${this.AUTH_DOMAIN}api/v2/users/${userId}/roles`, { headers: { Authorization: `Bearer ${this.AUTH_TOKEN}` } });
    const user_roles : Array<{id : string, name : string, description : string}> = resp.data;
    return roles.some((role) => user_roles.map((val) => val.name).includes(role));
  };


  // eslint-disable-next-line consistent-return
  requireRole(roles : Array<string>) {
    return async (req : Request, res : Response, next : NextFunction) => {
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