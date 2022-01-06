/* eslint-disable no-unused-vars */
import Role from '../entities/Role';
import { ResourceActions } from '../types/resource-actions';

export interface RolesInterface{
  createRole(name : string, resourceActions : ResourceActions) : Promise<{ role : Role }>;
  getRole(id : string) : Promise<Role>;
  deleteRole(id : string) : Promise<{ success : boolean }>;
  editRole(id : string, name : string, resourceActions : ResourceActions) : Promise<{ success : boolean }>;
  getRoles(skip : number, limit : number) : Promise<Role[]>;
}
