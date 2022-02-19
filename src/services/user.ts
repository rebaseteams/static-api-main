import { User } from '../models/types/user';
import { ResourcesInterface } from '../models/interfaces/resource';
import { RolesInterface } from '../models/interfaces/role';
import { UsersInterface } from '../models/interfaces/user';
import { UserRoleType } from '../models/types/userRole';

export default class UsersService implements UsersInterface {
  private userRepo: UsersInterface;

  private rolesRepo: RolesInterface;

  private resourceRepo: ResourcesInterface;

  constructor(
    userRepo: UsersInterface,
    rolesRepo: RolesInterface,
    resourceRepo: ResourcesInterface,
  ) {
    this.userRepo = userRepo;
    this.rolesRepo = rolesRepo;
    this.resourceRepo = resourceRepo;
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

  async getRoles(id: string): Promise<UserRoleType> {
    const result: UserRoleType = { roles: [] };
    // Geting roles
    const user = await this.userRepo.getUser(id);
    result.roles = user.roles;
    return result;
  }

  async getUsersCount(getPending: boolean) : Promise<{count: number}> {
    return this.userRepo.getUsersCount(getPending);
  }
}
