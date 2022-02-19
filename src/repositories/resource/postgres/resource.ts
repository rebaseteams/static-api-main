/* eslint-disable no-console */
import { Connection, Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { PgActionPermissionsEntity } from '../../../models/entities/pg-action-permissions';
import { PgActionEntity } from '../../../models/entities/pg-actions';
import { PgResourceEntity } from '../../../models/entities/pg-resource';
import { ResourcesInterface } from '../../../models/interfaces/resource';
import { Resource } from '../../../models/types/role';
import { mapResource } from '../../../utils/pg-to-type-mapper';

export default class ResourceRepo implements ResourcesInterface {
    private resourceRepository : Repository<PgResourceEntity>;

    private actionRepository: Repository<PgActionEntity>;

    private actionPermissionRepository: Repository<PgActionPermissionsEntity>;

    constructor(connection: Connection) {
      this.resourceRepository = connection.getRepository(PgResourceEntity);
      this.actionRepository = connection.getRepository(PgActionEntity);
    }

    async createResource(name : string, actions : string[]) : Promise<{resource : Resource}> {
      const resourceId = uuidv4();

      const pgActions = this.actionRepository.findByIds(actions);

      const resource: PgResourceEntity = {
        id: resourceId,
        name,
        actions: pgActions,
      };

      let pgResource = await this.resourceRepository.save(resource);

      pgResource = await this.resourceRepository.findOne(resourceId);
      return { resource: await mapResource(pgResource) };
    }

    async getResource(id : string) : Promise<Resource> {
      const resource = await this.resourceRepository.findOne({ id });
      if (resource) {
        return mapResource(resource);
      }
      const err = { message: `Resource not found for id: ${id}`, statusCode: 404 };
      throw err;
    }

    async deleteResource(id : string) : Promise<{success : boolean}> {
      const resp = await this.resourceRepository.delete({ id });
      if (resp.affected && resp.affected > 0) return { success: true };
      const err = { message: `Resource not found for id: ${id}`, statusCode: 404 };
      throw err;
    }

    async editResource(id : string, name : string, actions : string[]) : Promise<{success : boolean}> {
      const resource = await this.resourceRepository.findOne({ id });

      if (!resource) {
        const err = { message: `Resource not found for id: ${id}`, statusCode: 404 };
        throw err;
      }

      const pgActionPermissions: PgActionPermissionsEntity[] = [];

      for (let i = 0; i < actions.length; i += 1) {
        const ac = await this.actionRepository.findOne(actions[i]);
        if (ac) {
          const ap = await this.actionPermissionRepository.findOne({ action: ac, resource_id: id });
          pgActionPermissions.push(ap);
        }
      }
      resource.name = name;

      this.resourceRepository.save(resource);

      return { success: true };
    }

    async getResources(skip : number, limit : number) : Promise<Resource[]> {
      const resources : PgResourceEntity[] = await this.resourceRepository.find({
        take: limit,
        skip,
        relations: ['actions'],
      });

      const mappedResources:Resource[] = [];
      for (let i = 0; i < resources.length; i += 1) {
        const resource = await mapResource(resources[i]);
        mappedResources.push(resource);
      }
      return mappedResources;
    }

    async getResourcesCount() : Promise<{count: number}> {
      const count = await this.resourceRepository.count();
      if (count >= 0) return { count };
      const err = { message: 'Cannot get Resources count', statusCode: 404 };
      throw err;
    }
}
