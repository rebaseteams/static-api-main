/* eslint-disable no-unused-vars */
import { EventsType } from '../types/events-type';

export interface EventsTypeInterface{
  create(name : string, description: string, comments: string) : Promise<{eventsType: EventsType}>
  update(id: string, name : string, description: string, comments: string): Promise<{success : boolean}>
  getById(id: string): Promise<EventsType>
  get(skip : number, limit : number): Promise<EventsType[]>
  getAll(): Promise<EventsType[]>
  detele(id: string): Promise<{success : boolean}>
}
