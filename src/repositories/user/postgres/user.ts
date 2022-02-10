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

export default class UserRepo implements UsersInterface {
    private userRepository : Repository<PgUserEntity>;

    private roleRepository: Repository<PgRoleEntity>;

    private actionPermissionsRepository: Repository<PgActionPermissionsEntity>;

    auth0: Auth0;

    constructor(connection: Connection, auth0: Auth0) {
      this.auth0 = auth0;

      this.userRepository = connection.getRepository(PgUserEntity);
      this.roleRepository = connection.getRepository(PgRoleEntity);
      this.actionPermissionsRepository = connection.getRepository(PgActionPermissionsEntity);
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
        id: data.id,
        name,
        email,
        roles: [pgRole],
        approved: false,
      };

      const res = await this.userRepository.save(user);

      for (let i = 0; i < user.roles.length; i += 1) {
        const userRole = user.roles[i];
        for (let j = 0; j < userRole.resources.length; j += 1) {
          const resource = userRole.resources[j];
          for (let k = 0; k < resource.actions.length; k += 1) {
            const action = resource.actions[k];
            const actionPermission: PgActionPermissionsEntity = {
              id: uuidv4(),
              user,
              user_id: user.id,
              action_id: action.id,
              action,
              role_id: userRole.id,
              resource_id: resource.id,
              resource,
              role: userRole,
              permission: false,
            };
            await this.actionPermissionsRepository.save(actionPermission);
          }
        }
      }

      const pgActionPermissions = await this.actionPermissionsRepository
        .find({ user });

      const mapperUser: User = mapUser(res, pgActionPermissions);

      return { user: mapperUser };
    }

    async getUser(id : string) : Promise<User> {
      const user = await this.userRepository.findOne({ id });
      const pgActionPermissions = await this.actionPermissionsRepository.find({ user_id: user.id });

      if (user) {
        return mapUser(user, pgActionPermissions);
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
        user.roles = pgRoles;
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
        pendingUsers.push(mapUser(user, pgActionPermissions));
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
          .find({ user });
        resUsers.push(mapUser(user, pgActionPermissions));
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
