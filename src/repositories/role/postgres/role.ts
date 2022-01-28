/* eslint-disable no-console */
import { createConnection, Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import Role from '../../../models/entities/Role';
import { RolesInterface } from '../../../models/interfaces/role';
import { ResourceActions } from '../../../models/types/resource-actions';

export default class RoleRepo implements RolesInterface {
    private roleRepository : Repository<Role>;

    constructor() {
      createConnection().then((connection) => {
        this.roleRepository = connection.getRepository(Role);
      });
    }

    async createRole(name : string, resourceActions : ResourceActions) : Promise<{role : Role}> {
      const role = new Role(
        uuidv4(),
        name,
        resourceActions,
      );
      await this.roleRepository.save(role);
      return { role };
    }

    async getRole(id : string) : Promise<Role> {
      const role = await this.roleRepository.findOne({ id });
      if (role) return role;
      const err = { message: `Role not found for id: ${id}`, statusCode: 404 };
      throw err;
    }

    async deleteRole(id : string) : Promise<{success : boolean}> {
      const resp = await this.roleRepository.delete({ id });
      if (resp.affected && resp.affected > 0) return { success: true };
      const err = { message: `Role not found for id: ${id}`, statusCode: 404 };
      throw err;
    }

    async editRole(id : string, name : string, resourceActions : ResourceActions) : Promise<{success : boolean}> {
      const role = await this.roleRepository.findOne({ id });
      if (role) {
        role.name = name;
        role.resource_actions = resourceActions;
        this.roleRepository.save(role);
        return { success: true };
      }
      const err = { message: `Role not found for id: ${id}`, statusCode: 404 };
      throw err;
    }

    async getRoles(skip : number, limit : number) : Promise<Role[]> {
      const roles : Role[] = await this.roleRepository.find({
        take: limit,
        skip,
      });
      return roles;
    }

    async getRolesCount() : Promise<{count: number}> {
      const count = await this.roleRepository.count();
      if (count) return { count };
      const err = { message: 'Cannot get Roles count', statusCode: 404 };
      throw err;
    }
}
