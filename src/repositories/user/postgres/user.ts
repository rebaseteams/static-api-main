/* eslint-disable no-underscore-dangle */
import { Connection, Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { PgRoleEntity } from '../../../models/entities/pg-role';
import { PgUserEntity } from '../../../models/entities/pg-user';
import { UsersInterface } from '../../../models/interfaces/user';
import { UserRoleType } from '../../../models/types/userRole';
import { Auth0 } from '../../auth0/http/auth0';
import { User } from '../../../models/types/user';
import { mapUser, mapUserWithUniqueRole } from '../../../utils/pg-to-type-mapper';
import { PgActionPermissionsEntity } from '../../../models/entities/pg-action-permissions';
import { PgActionEntity } from '../../../models/entities/pg-actions';
import { PgResourceEntity } from '../../../models/entities/pg-resource';
import { PgRolePermissionsEntity } from '../../../models/entities/pg-role-permissions';

export default class UserRepo implements UsersInterface {
    private userRepository : Repository<PgUserEntity>;

    private roleRepository: Repository<PgRoleEntity>;

    private actionPermissionsRepository: Repository<PgActionPermissionsEntity>;

    private rolePermissionsRepository: Repository<PgRolePermissionsEntity>;

    private actionRepository: Repository<PgActionEntity>;

    private resourceRepository: Repository<PgResourceEntity>;

    auth0: Auth0;

    constructor(connection: Connection, auth0: Auth0) {
      this.auth0 = auth0;

      this.userRepository = connection.getRepository(PgUserEntity);
      this.roleRepository = connection.getRepository(PgRoleEntity);
      this.actionPermissionsRepository = connection.getRepository(PgActionPermissionsEntity);
      this.actionRepository = connection.getRepository(PgActionEntity);
      this.resourceRepository = connection.getRepository(PgResourceEntity);
      this.rolePermissionsRepository = connection.getRepository(PgRolePermissionsEntity);
    }

    async createUser(name : string, email : string, password : string, role : string) : Promise<{user : User}> {
      const pgRole = await this.roleRepository.findOne({ id: role }, { relations: ['resources'] });
      if (!pgRole) {
        const err = { message: `Role not found for id: ${role}`, statusCode: 404 };
        throw err;
      }

      const data : any = await this.auth0.signupUser({
        userName: name,
        email,
        password,
      });
      const user: PgUserEntity = {
        id: data._id,
        name,
        email,
        approved: null,
      };

      const res = await this.userRepository.save(user);

      const userPromise = this.userRepository.findOne({ id: user.id });
      const resources = await pgRole.resources;
      for (let j = 0; j < resources.length; j += 1) {
        const resource = await this.resourceRepository.findOne({ id: resources[j].id }, { relations: ['actions'] });
        const { actions } = resource;
        for (let k = 0; k < actions.length; k += 1) {
          const action = actions[k];
          const rolePermission = await this.rolePermissionsRepository
            .findOne({ role_id: role, action_id: action.id, resource_id: resource.id });
          if (rolePermission) {
            const actionPermission: PgActionPermissionsEntity = {
              id: uuidv4(),
              user: userPromise,
              user_id: user.id,
              role_permission_id: rolePermission.id,
              action: this.actionRepository.findOne({ id: action.id }),
              resource: this.resourceRepository.findOne({ id: resource.id }),
              role: this.roleRepository.findOne({ id: role }),
              role_permission: this.rolePermissionsRepository.findOne({ role_id: role, action_id: action.id, resource_id: resource.id }),
            };
            await this.actionPermissionsRepository.save(actionPermission);
          }
        }
      }

      const pgActionPermissions = await this.actionPermissionsRepository
        .find({ user });

      const pgRoleP = await this.getPgRolePermissions(pgActionPermissions);
      const mapperUser: User = await mapUser(res, pgActionPermissions, pgRoleP);

      return { user: mapperUser };
    }

    async getUser(id : string) : Promise<User> {
      const user = await this.userRepository.findOne({ id });
      const pgActionPermissions = await this.actionPermissionsRepository.find(
        {
          relations: ['role', 'resource', 'action'],
          where: {
            user_id: user.id,
          },
        },
      );
      const pgRoleP = await this.getPgRolePermissions(pgActionPermissions);

      const mappedUser = await mapUserWithUniqueRole(user, pgActionPermissions, pgRoleP);
      if (mappedUser) {
        return mappedUser;
      }
      const err = { message: `User not found for id: ${id}`, statusCode: 404 };
      throw err;
    }

    async deleteUser(id : string) : Promise<{success : boolean}> {
      const resp = await this.userRepository.delete({ id });
      if (resp.affected && resp.affected > 0) return { success: true };
      const err = { message: `User not found for id: ${id}`, statusCode: 404 };
      throw err;
    }

    async approveUser(id : string, approval : boolean) : Promise<{success : boolean}> {
      const user = await this.userRepository.findOne({ id });
      if (user) {
        user.approved = approval;
        this.userRepository.save(user);
        return { success: true };
      }
      const err = { message: `User not found for id: ${id}`, statusCode: 404 };
      throw err;
    }

    async updateUsersRole(id : string, roles : string[]) : Promise<{success : boolean}> {
      const user = await this.userRepository.findOne({ id });
      if (!user) {
        const err = { message: `User not found for id: ${id}`, statusCode: 404 };
        throw err;
      }
      for (let a = 0; a < roles.length; a += 1) {
        const pgRole = await this.roleRepository.findOne({ id: roles[a] }, { relations: ['resources'] });
        const userPromise = this.userRepository.findOne({ id });
        const resources = await pgRole.resources;
        for (let j = 0; j < resources.length; j += 1) {
          const resource = await this.resourceRepository.findOne({ id: resources[j].id }, { relations: ['actions'] });
          const { actions } = resource;
          for (let k = 0; k < actions.length; k += 1) {
            const action = actions[k];
            const rolePermission = await this.rolePermissionsRepository
              .findOne({ role_id: pgRole.id, action_id: action.id, resource_id: resource.id });
            if (rolePermission) {
              const actionPermission: PgActionPermissionsEntity = {
                id: uuidv4(),
                user: userPromise,
                user_id: user.id,
                role_permission_id: rolePermission.id,
                action: this.actionRepository.findOne({ id: action.id }),
                resource: this.resourceRepository.findOne({ id: resource.id }),
                role: this.roleRepository.findOne({ id: pgRole.id }),
                role_permission: this.rolePermissionsRepository.findOne({ role_id: pgRole.id, action_id: action.id, resource_id: resource.id }),
              };
              const actionsPresent = await this.actionPermissionsRepository.findOne({
                user_id: user.id, role_permission_id: rolePermission.id,
              });
              if (!actionsPresent) {
                await this.actionPermissionsRepository.save(actionPermission);
              }
            }
          }
        }
      }

      const myRoles = await this.actionPermissionsRepository.find({ where: { user_id: id } });
      const myRoleP = (await this.getPgRolePermissions(myRoles)).map((rp) => rp.id);

      for (let m = 0; m < myRoles.length; m += 1) {
        if (!myRoleP.includes(myRoles[m].role_permission_id)) {
          this.actionPermissionsRepository.delete({ id: myRoles[m].id });
        }
      }
      return { success: true };
    }

    async getPendingUsers(skip : number, limit : number) : Promise<User[]> {
      const pendingUsers: User[] = [];
      const users : PgUserEntity[] = await this.userRepository.find({
        where: { approved: null },
        take: limit,
        skip,
      });

      for (let i = 0; i < users.length; i += 1) {
        const user = users[i];
        const pgActionPermissions = await this.actionPermissionsRepository
          .find({ user });
        const pgRoleP = await this.getPgRolePermissions(pgActionPermissions);
        const mappedUser = await mapUser(user, pgActionPermissions, pgRoleP);
        pendingUsers.push(mappedUser);
      }
      return pendingUsers;
    }

    async getUsers(skip : number, limit : number) : Promise<User[]> {
      const resUsers: User[] = [];
      const users : PgUserEntity[] = await this.userRepository.find({
        take: limit,
        skip,
      });

      for (let i = 0; i < users.length; i += 1) {
        const user = users[i];
        const pgActionPermissions = await this.actionPermissionsRepository.find({
          where: { user_id: user.id },
          relations: ['role', 'action', 'resource', 'role_permission'],
        });
        const pgRoleP = await this.getPgRolePermissions(pgActionPermissions);
        const mappedUser = await mapUser(user, pgActionPermissions, pgRoleP);
        resUsers.push(mappedUser);
      }
      return resUsers;
    }

    // eslint-disable-next-line no-unused-vars
    getRoles(id: string): Promise<UserRoleType> {
      throw new Error('Method not implemented.');
    }

    async getUsersCount(getPending: boolean) : Promise<{count: number}> {
      if (getPending) {
        const count = await this.userRepository.count({ where: { approved: null } });
        return { count };
      }
      const count = await this.userRepository.count();
      return { count };
    }

    async getPgRolePermissions(pgActionPermissions: PgActionPermissionsEntity[]): Promise<PgRolePermissionsEntity[]> {
      const pgRoleP: PgRolePermissionsEntity[] = [];
      for (let a = 0; a < pgActionPermissions.length; a += 1) {
        const rolePer = await this.rolePermissionsRepository.findOne({ id: pgActionPermissions[a].role_permission_id });
        if (rolePer) pgRoleP.push(rolePer);
      }
      return pgRoleP;
    }
}
