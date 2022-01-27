import User from '../models/entities/User';
import { RolesInterface } from '../models/interfaces/role';
import { UsersInterface } from '../models/interfaces/user';
import { UserRoleType } from '../models/types/userRole';

export default class UsersService implements UsersInterface {
  private userRepo: UsersInterface;

  private rolesRepo: RolesInterface;

  constructor(
    userRepo: UsersInterface,
    rolesRepo: RolesInterface,
  ) {
    this.userRepo = userRepo;
    this.rolesRepo = rolesRepo;
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
    // Geting roles
    const { roles } = await this.userRepo.getUser(id); // TODO: Here fond that userRepo is storing role name but should store role id

    // Getting actions against roles
    for (let i = 0; i < roles.length; i += 1) {
      const role = await this.rolesRepo.getRole(roles[i]);
      // eslint-disable-next-line no-console
      console.log(role);
    }
    const data = await this.userRepo.getRoles(id);

    // Temprarylly Returning expected dummy data
    return data;
  }
}
