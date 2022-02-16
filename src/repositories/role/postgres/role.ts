/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

import { Connection, Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { PgRoleEntity } from '../../../models/entities/pg-role';
import { RolesInterface } from '../../../models/interfaces/role';
import { ResourceActions } from '../../../models/types/resource-actions';
import { Role } from '../../../models/types/role';
import { mapRole } from '../../../utils/pg-to-type-mapper';

export default class RoleRepo implements RolesInterface {
    private roleRepository : Repository<PgRoleEntity>;

    constructor(connection: Connection) {
      this.roleRepository = connection.getRepository(PgRoleEntity);
    }

    async createRole(name : string, resourceActions : ResourceActions) : Promise<{role : Role}> {
      const role:PgRoleEntity = {
        id: uuidv4(),
        name,
        resources: [], // TODO: figure out how to use resourceActions,
      };

      await this.roleRepository.save(role);
      return { role: mapRole(role) };
    }

    async getRole(id : string) : Promise<Role> {
      const role: PgRoleEntity = await this.roleRepository.findOne({ id });
      if (role) {
        return mapRole(role);
      }
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
        this.roleRepository.save(role);
        return { success: true };
      }
      const err = { message: `Role not found for id: ${id}`, statusCode: 404 };
      throw err;
    }

    async getRoles(skip : number, limit : number) : Promise<Role[]> {
      const roles : PgRoleEntity[] = await this.roleRepository.find({
        take: limit,
        skip,
      });
      return roles.map((r) => mapRole(r));
    }

    async getRolesCount() : Promise<{count: number}> {
      const count = await this.roleRepository.count();
      if (count >= 0) return { count };
      const err = { message: 'Cannot get Roles count', statusCode: 404 };
      throw err;
    }
}
