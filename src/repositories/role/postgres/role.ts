/* eslint-disable no-unused-vars */

import { Connection, Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { PgResourceEntity } from '../../../models/entities/pg-resource';
import { PgRoleEntity } from '../../../models/entities/pg-role';
import { RolesInterface } from '../../../models/interfaces/role';
import { ResourceActions } from '../../../models/types/resource-actions';
import { Role } from '../../../models/types/role';
import { getArrayOf, mapRole } from '../../../utils/pg-to-type-mapper';

export default class RoleRepo implements RolesInterface {
    private roleRepository : Repository<PgRoleEntity>;

    private resourceRepository : Repository<PgResourceEntity>;

    constructor(connection: Connection) {
      this.roleRepository = connection.getRepository(PgRoleEntity);
      this.resourceRepository = connection.getRepository(PgResourceEntity);
    }

    async createRole(name : string, resourceActions : PgResourceEntity[]) : Promise<{role : Role}> {
      const resourceIds = getArrayOf('id', resourceActions); // resourceActions.map((r) => r.id);
      const resources = await this.resourceRepository.findByIds(resourceIds, { relations: ['actions'] });
      const role:PgRoleEntity = {
        id: uuidv4(),
        name,
        resources, // TODO: figure out how to use resourceActions,
      };

      await this.roleRepository.save(role);
      return { role: await mapRole(role, role.resources) };
    }

    async getRole(id : string) : Promise<Role> {
      const role: PgRoleEntity = await this.roleRepository.findOne({ id }, { relations: ['resources'] });
      const resourceIds = getArrayOf('id', role.resources);
      const resources = await this.resourceRepository.findByIds(resourceIds, { relations: ['actions'] });
      if (role) {
        const roles = await mapRole(role, resources);
        return roles;
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
        relations: ['resources'],
      });

      const mappedRoles = [];
      for (let i = 0; i < roles.length; i += 1) {
        const resourceIds = getArrayOf('id', roles[i].resources); // roles[i].resources.map((r) => r.id);
        const resource = await this.resourceRepository.findByIds(resourceIds, { relations: ['actions'] });
        const mappedRole = await mapRole(roles[i], resource);
        mappedRoles.push(mappedRole);
      }

      return mappedRoles;
    }

    async getRolesCount() : Promise<{count: number}> {
      const count = await this.roleRepository.count();
      if (count >= 0) return { count };
      const err = { message: 'Cannot get Roles count', statusCode: 404 };
      throw err;
    }
}
