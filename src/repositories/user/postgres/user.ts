/* eslint-disable no-underscore-dangle */
import { Connection, Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { PgRoleEntity } from '../../../models/entities/pg-role';
import { PgUserEntity } from '../../../models/entities/pg-user';
import { UsersInterface } from '../../../models/interfaces/user';
import { UserRoleType } from '../../../models/types/userRole';
import { Auth0 } from '../../auth0/http/auth0';
import { User } from '../../../models/types/user';
import { mapUser } from '../../../utils/pg-to-type-mapper';
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
      const pgRole = await this.roleRepository.findOne({ id: role });
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
        approved: false,
      };

      const res = await this.userRepository.save(user);

      const userPromise = this.userRepository.findOne({ id: user.id });
      const resources = await pgRole.resources;
      for (let j = 0; j < resources.length; j += 1) {
        const resource = resources[j];
        const actions = await resource.actions;
        for (let k = 0; k < actions.length; k += 1) {
          const action = actions[k];
          const rolePermissionId = await this.rolePermissionsRepository
            .findOne({ role_id: role, action_id: action.id, resource_id: resource.id });
          const actionPermission: PgActionPermissionsEntity = {
            id: uuidv4(),
            user: userPromise,
            user_id: user.id,
            action_id: action.id,
            action: this.actionRepository.findOne({ id: action.id }),
            role_id: pgRole.id,
            resource_id: resource.id,
            resource: this.resourceRepository.findOne({ id: resource.id }),
            role: this.roleRepository.findOne({ id: role }),
            permission: rolePermissionId.permission,
            role_permission: this.rolePermissionsRepository
              .findOne({ role_id: role, action_id: action.id, resource_id: resource.id }),
            role_permission_id: rolePermissionId.id,
          };
          await this.actionPermissionsRepository.save(actionPermission);
        }
      }

      const pgActionPermissions = await this.actionPermissionsRepository
        .find({ user });

      const mapperUser: User = await mapUser(res, pgActionPermissions);

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

      const mappedUser = await mapUser(user, pgActionPermissions);
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
      const pgRoles = [];
      for (let i = 0; i < roles.length; i += 1) {
        const r = await this.roleRepository.findOne({ id: roles[i] });
        if (r) {
          pgRoles.push(r);
        }
      }

      if (user) {
        this.userRepository.save(user);
        return { success: true };
      }
      const err = { message: `User not found for id: ${id}`, statusCode: 404 };
      throw err;
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
        const mappedUser = await mapUser(user, pgActionPermissions);
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
        const pgActionPermissions = await this.actionPermissionsRepository
          .find({ user_id: user.id });
        const mappedUser = await mapUser(user, pgActionPermissions);
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
}
