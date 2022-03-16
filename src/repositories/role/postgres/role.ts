/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

import { Connection, Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { PgResourceEntity } from '../../../models/entities/pg-resource';
import { PgRoleEntity } from '../../../models/entities/pg-role';
import { PgRolePermissionsEntity } from '../../../models/entities/pg-role-permissions';
import { RolesInterface } from '../../../models/interfaces/role';
import { Resource, Role } from '../../../models/types/role';
import { getArrayOf, mapRole } from '../../../utils/pg-to-type-mapper';

export default class RoleRepo implements RolesInterface {
    private roleRepository : Repository<PgRoleEntity>;

    private resourceRepository : Repository<PgResourceEntity>;

    private rolePermissionRepo: Repository<PgRolePermissionsEntity>;

    constructor(connection: Connection) {
      this.roleRepository = connection.getRepository(PgRoleEntity);
      this.resourceRepository = connection.getRepository(PgResourceEntity);
      this.rolePermissionRepo = connection.getRepository(PgRolePermissionsEntity);
    }

    async createRole(name : string, resourceActions : Resource[]) : Promise<{role : Role}> {
      console.log('resource Actions', resourceActions);
      const resourceIds = getArrayOf('id', resourceActions);
      const resources = await this.resourceRepository.findByIds(resourceIds, { relations: ['actions'] });
      const role:PgRoleEntity = {
        id: uuidv4(),
        name,
        resources,
      };
      const roleRes = this.roleRepository.save(role);
      for (let i = 0; i < resourceActions.length; i += 1) {
        for (let j = 0; j < resourceActions[i].actions.length; j += 1) {
          const rolepermission: PgRolePermissionsEntity = {
            id: uuidv4(),
            role_id: role.id,
            resource_id: resourceActions[i].id,
            action_id: resourceActions[i].actions[j].id,
            permission: resourceActions[i].actions[j].permission,
            role: await roleRes,
            resource: resources[i],
            action: resourceActions[i].actions[j],
          };
          await this.rolePermissionRepo.save(rolepermission);
        }
      }
      return { role: await mapRole(role, await role.resources) };
    }

    async getRole(id : string) : Promise<Role> {
      const role: PgRoleEntity = await this.roleRepository.findOne({ id }, { relations: ['resources'] });
      if (!role) {
        const err = { message: `Role not found for id: ${id}`, statusCode: 404 };
        throw err;
      }
      const mappedRole: Role = await this.getRoleWithPermission(role);
      return mappedRole;
    }

    async deleteRole(id : string) : Promise<{success : boolean}> {
      await this.rolePermissionRepo.delete({ role_id: id });
      const resp = await this.roleRepository.delete({ id });
      if (resp.affected && resp.affected > 0) return { success: true };
      const err = { message: `Role not found for id: ${id}`, statusCode: 404 };
      throw err;
    }

    async editRole(id : string, name : string, resourceActions : Resource[]) : Promise<{success : boolean}> {
      const role = await this.roleRepository.findOne({ id });
      if (!role) {
        const err = { message: `Role not found for id: ${id}`, statusCode: 404 };
        throw err;
      }

      const resourceIds = getArrayOf('id', resourceActions);
      const resources = await this.resourceRepository.findByIds(resourceIds, { relations: ['actions'] });
      role.name = name;
      role.resources = resources;
      this.roleRepository.save(role);

      const allRolePermissions = await this.rolePermissionRepo.find({ role_id: role.id });
      if (allRolePermissions.length > 0) {
        for (let p = 0; p < allRolePermissions.length; p += 1) {
          let flag = false;
          for (let i = 0; i < resourceActions.length; i += 1) {
            for (let j = 0; j < resourceActions[i].actions.length; j += 1) {
              if (allRolePermissions[p].resource_id === resourceActions[i].id && allRolePermissions[p].action_id === resourceActions[i].actions[j].id) {
                flag = true;
              }
              const rolePermission = await this.rolePermissionRepo.findOne({
                role_id: role.id,
                resource_id: resourceActions[i].id,
                action_id: resourceActions[i].actions[j].id,
              });
              if (rolePermission) {
                await this.rolePermissionRepo.save({
                  id: rolePermission.id,
                  permission: resourceActions[i].actions[j].permission,
                });
              } else {
                const rolepermission: PgRolePermissionsEntity = {
                  id: uuidv4(),
                  role_id: role.id,
                  resource_id: resourceActions[i].id,
                  action_id: resourceActions[i].actions[j].id,
                  permission: resourceActions[i].actions[j].permission,
                  role,
                  resource: resources[i],
                  action: resourceActions[i].actions[j],
                };
                await this.rolePermissionRepo.save(rolepermission);
              }
            }
          }
          if (flag === false) {
            this.rolePermissionRepo.delete(allRolePermissions[p]);
          }
        }
      }

      return { success: true };
    }

    async getRoles(skip : number, limit : number) : Promise<Role[]> {
      const roles : PgRoleEntity[] = await this.roleRepository.find({
        take: limit,
        skip,
        relations: ['resources'],
      });

      const mappedRoles: Role[] = [];
      for (let i = 0; i < roles.length; i += 1) {
        mappedRoles.push(await this.getRoleWithPermission(roles[i]));
      }

      return mappedRoles;
    }

    async getRolesCount() : Promise<{count: number}> {
      const count = await this.roleRepository.count();
      if (count >= 0) return { count };
      const err = { message: 'Cannot get Roles count', statusCode: 404 };
      throw err;
    }

    async getRoleWithPermission(pgRole: PgRoleEntity) : Promise<Role> {
      const role: Role = {
        id: pgRole.id,
        name: pgRole.name,
        resources: [],
      };
      // eslint-disable-next-line no-use-before-define
      const resourceIds = getArrayOf('id', pgRole.resources); // roles[i].resources.map((r) => r.id);
      const resource = await this.resourceRepository.findByIds(resourceIds, { relations: ['actions'] });
      for (let r = 0; r < resource.length; r += 1) {
        role.resources.push({ id: resource[r].id, name: resource[r].name, actions: [] });
        for (let j = 0; j < resource[r].actions.length; j += 1) {
          const role_permission = await this.rolePermissionRepo.findOne({
            role_id: role.id,
            resource_id: resource[r].id,
            action_id: resource[r].actions[j].id,
          });
          if (role_permission) {
            role.resources[r].actions.push({ id: resource[r].actions[j].id, name: resource[r].actions[j].name, permission: role_permission.permission });
          }
        }
      }
      return role;
    }
}
