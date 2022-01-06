/* eslint-disable no-console */
import { createConnection, Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import Resource from '../../../models/entities/Resource';
import { ResourcesInterface } from '../../../models/interfaces/resource';

export default class ResourceRepo implements ResourcesInterface {
    private resourceRepository : Repository<Resource>;

    constructor() {
      createConnection().then((connection) => {
        this.resourceRepository = connection.getRepository(Resource);
      });
    }

    async createResource(name : string, actions : string[]) : Promise<{resource : Resource}> {
      const resource = new Resource(
        uuidv4(),
        name,
        actions,
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
      if (resource) {
        resource.name = name;
        resource.actions = actions;
        this.resourceRepository.save(resource);
        return { success: true };
      }
      const err = { message: `Resource not found for id: ${id}`, statusCode: 404 };
      throw err;
    }

    async getResources(skip : number, limit : number) : Promise<Resource[]> {
      const resources : Resource[] = await this.resourceRepository.find({
        take: limit,
        skip,
      });
      return resources;
    }
}
