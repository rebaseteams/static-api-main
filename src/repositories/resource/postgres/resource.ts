/* eslint-disable no-console */
import { Connection, Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { PgActionEntity } from '../../../models/entities/pg-actions';
import Resource from '../../../models/entities/Resource';
import { ResourcesInterface } from '../../../models/interfaces/resource';

export default class ResourceRepo implements ResourcesInterface {
    private resourceRepository : Repository<Resource>;

    private actionRepository: Repository<PgActionEntity>;

    constructor(connection: Connection) {
      this.resourceRepository = connection.getRepository(Resource);
    }

    async createResource(name : string, actions : string[]) : Promise<{resource : Resource}> {
      const pgActions: PgActionEntity[] = [];
      for (let i = 0; i < actions.length; i += 1) {
        const a = await this.actionRepository.findOne(actions[i]);
        if (a) {
          pgActions.push(a);
        }
      }
      const resource = new Resource(
        uuidv4(),
        name,
        pgActions,
      );
      await this.resourceRepository.save(resource);
      return { resource };
    }

    async getResource(id : string) : Promise<Resource> {
      const resource = await this.resourceRepository.findOne({ id });
      if (resource) return resource;
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

      const pgActions: PgActionEntity[] = [];

      for (let i = 0; i < actions.length; i += 1) {
        const ac = await this.actionRepository.findOne(actions[i]);
        if (ac) {
          pgActions.push(ac);
        }
      }
      resource.name = name;
      resource.actions = pgActions;
      this.resourceRepository.save(resource);

      return { success: true };
    }

    async getResources(skip : number, limit : number) : Promise<Resource[]> {
      const resources : Resource[] = await this.resourceRepository.find({
        take: limit,
        skip,
      });
      return resources;
    }

    async getResourcesCount() : Promise<{count: number}> {
      const count = await this.resourceRepository.count();
      if (count) return { count };
      const err = { message: 'Cannot get Resources count', statusCode: 404 };
      throw err;
    }
}
