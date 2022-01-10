import User from '../models/entities/User';
import { UsersInterface } from '../models/interfaces/user';

export default class UsersService implements UsersInterface {
  private userRepo: UsersInterface;

  constructor(
    userRepo: UsersInterface,
  ) {
    this.userRepo = userRepo;
  }

  async createUser(name : string, email : string, password : string, role : string) : Promise<{user : User}> {
    return this.userRepo.createUser(name, email, password, role);
  }

  async approveUser(id : string, approval : boolean) : Promise<{success : boolean}> {
    return this.userRepo.approveUser(id, approval);
  }

  async updateUsersRole(id : string, roles : string[]) : Promise<{success : boolean}> {
    return this.userRepo.updateUsersRole(id, roles);
  }

  async getUser(id : string) : Promise<User> {
    return this.userRepo.getUser(id);
  }

  async getUsers(skip : number, limit : number) : Promise<User[]> {
    return this.userRepo.getUsers(skip, limit);
  }

  async getPendingUsers(skip : number, limit : number) : Promise<User[]> {
    return this.userRepo.getPendingUsers(skip, limit);
  }

  async deleteUser(id : string) : Promise<{success : boolean}> {
    return this.userRepo.deleteUser(id);
  }
}
