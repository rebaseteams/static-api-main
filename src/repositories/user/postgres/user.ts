/* eslint-disable no-console */
import { createConnection, Repository } from 'typeorm';
import User from '../../../models/entities/User';
import { UsersInterface } from '../../../models/interfaces/user';
import { UserRoleType } from '../../../models/types/userRole';
import { Auth0 } from '../../auth0/http/auth0';

export default class UserRepo implements UsersInterface {
    private userRepository : Repository<User>;

    auth0: Auth0;

    constructor(auth0: Auth0) {
      this.auth0 = auth0;

      createConnection().then((connection) => {
        this.userRepository = connection.getRepository(User);
      });
    }

    async createUser(name : string, email : string, password : string, role : string) : Promise<{user : User}> {
      console.log(password);
      const data : any = await this.auth0.signupUser({
        userName: name,
        email,
        password,
      });
      console.log(data);
      const user = new User(
        // eslint-disable-next-line no-underscore-dangle
        data._id,
        name,
        email,
        [role],
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
      if (user) {
        user.roles = roles;
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
              name: id,
              resource: [
                {
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
}
