import { Connection, Repository } from 'typeorm';
import Role from '../../../models/entities/Role';
import User from '../../../models/entities/User';
import { UsersInterface } from '../../../models/interfaces/user';
import { UserRoleType } from '../../../models/types/userRole';
import { Auth0 } from '../../auth0/http/auth0';

export default class UserRepo implements UsersInterface {
    private userRepository : Repository<User>;

    private roleRepository: Repository<Role>;

    auth0: Auth0;

    constructor(connection: Connection, auth0: Auth0) {
      this.auth0 = auth0;

      this.userRepository = connection.getRepository(User);
      this.roleRepository = connection.getRepository(Role);
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
      const user = new User(
        // eslint-disable-next-line no-underscore-dangle
        data._id,
        name,
        email,
        [pgRole],
      );
      await this.userRepository.save(user);
      return { user };
    }

    async getUser(id : string) : Promise<User> {
      const user = await this.userRepository.findOne({ id });
      if (user) return user;
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
      const users : User[] = await this.userRepository.find({
        where: { approved: null },
        take: limit,
        skip,
      });
      return users;
    }

    async getUsers(skip : number, limit : number) : Promise<User[]> {
      const users : User[] = await this.userRepository.find({
        take: limit,
        skip,
      });
      return users;
    }

    async getRoles(id: string): Promise<UserRoleType> {
      return new Promise((resolve) => {
        resolve({
          roles: [
            {
              id,
              name: id,
              resource: [
                {
                  id: 'res',
                  name: 'resource1',
                  actions: [
                    {
                      name: 'action1',
                      permission: true,
                    },
                  ],
                },
              ],
            },
          ],
        });
      });
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
