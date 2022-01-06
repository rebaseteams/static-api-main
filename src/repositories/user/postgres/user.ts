/* eslint-disable no-console */
import { createConnection, Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import User from '../../../models/entities/User';
import { UsersInterface } from '../../../models/interfaces/user';

export default class UserRepo implements UsersInterface {
    private userRepository : Repository<User>;

    constructor() {
      createConnection().then((connection) => {
        this.userRepository = connection.getRepository(User);
      });
    }

    async createUser(name : string, email : string, password : string, roles : string[]) : Promise<{user : User}> {
      console.log(password);
      const user = new User(
        uuidv4(),
        name,
        email,
        roles,
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
}
