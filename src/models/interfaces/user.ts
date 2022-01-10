/* eslint-disable no-unused-vars */
import User from '../entities/User';

export interface UsersInterface{
  createUser(name : string, email : string, password : string, role : string) : Promise<{ user : User }>;
  getUser(id : string) : Promise<User>;
  deleteUser(id : string) : Promise<{ success : boolean }>;
  approveUser(id : string, approval : boolean) : Promise<{ success : boolean }>;
  updateUsersRole(id : string, roles : string[]) : Promise<{ success : boolean }>;
  getUsers(skip : number, limit : number) : Promise<User[]>;
  getPendingUsers(skip : number, limit : number) : Promise<User[]>
}
