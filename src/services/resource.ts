import Resource from '../models/entities/Resource';
import { ResourcesInterface } from '../models/interfaces/resource';

export default class ResourcesService implements ResourcesInterface {
  private resourceRepo: ResourcesInterface;

  constructor(
    resourceRepo: ResourcesInterface,
  ) {
    this.resourceRepo = resourceRepo;
  }

  async createResource(name : string, actions : string[]) : Promise<{resource : Resource}> {
    return this.resourceRepo.createResource(name, actions);
  }

  async editResource(id : string, name : string, actions : string[]) : Promise<{success : boolean}> {
    return this.resourceRepo.editResource(id, name, actions);
  }

  async getResource(id : string) : Promise<Resource> {
    return this.resourceRepo.getResource(id);
  }

  async getResources(skip : number, limit : number) : Promise<Resource[]> {
    return this.resourceRepo.getResources(skip, limit);
  }

  async deleteResource(id : string) : Promise<{success : boolean}> {
    return this.resourceRepo.deleteResource(id);
  }
}
