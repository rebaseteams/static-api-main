/* eslint-disable no-unused-vars */
import { Resource } from '../types/role';

export interface ResourcesInterface{
  createResource(name : string, actions: string[]) : Promise<{ resource : Resource }>;
  getResource(id : string) : Promise<Resource>;
  deleteResource(id : string) : Promise<{ success : boolean }>;
  editResource(id : string, name : string, actions : string[]) : Promise<{resource : Resource}>;
  getResources(skip : number, limit : number) : Promise<Resource[]>;
  getResourcesCount() : Promise<{count: number}>;
}
