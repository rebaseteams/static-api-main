/* eslint-disable no-unused-vars */
import Resource from '../entities/Resource';

export interface ResourcesInterface{
  createResource(name : string, actions: string[]) : Promise<{ resource : Resource }>;
  getResource(id : string) : Promise<Resource>;
  deleteResource(id : string) : Promise<{ success : boolean }>;
  editResource(id : string, name : string, actions : string[]) : Promise<{ success : boolean }>;
  getResources(skip : number, limit : number) : Promise<Resource[]>;
  getResourcesCount() : Promise<{count: number}>;
}
