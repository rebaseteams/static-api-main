import Role from '../models/entities/Role';
import { RolesInterface } from '../models/interfaces/role';
import { ResourceActions } from '../models/types/resource-actions';

export default class RolesService implements RolesInterface {
  private roleRepo: RolesInterface;

  constructor(
    roleRepo: RolesInterface,
  ) {
    this.roleRepo = roleRepo;
  }

  async createRole(name : string, resourceActions : ResourceActions) : Promise<{role : Role}> {
    return this.roleRepo.createRole(name, resourceActions);
  }

  async editRole(id : string, name : string, resourceActions : ResourceActions) : Promise<{success : boolean}> {
    return this.roleRepo.editRole(id, name, resourceActions);
  }

  async getRole(id : string) : Promise<Role> {
    return this.roleRepo.getRole(id);
  }

  async getRoles(skip : number, limit : number) : Promise<Role[]> {
    return this.roleRepo.getRoles(skip, limit);
  }

  async deleteRole(id : string) : Promise<{success : boolean}> {
    return this.roleRepo.deleteRole(id);
  }

  async getRolesCount() : Promise<{count: number}> {
    return this.roleRepo.getRolesCount();
  }
}
