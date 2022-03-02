/* eslint-disable no-console */
import { Connection, Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { EventsTypeInterface } from '../../../models/interfaces/events-type';
import { EventsType } from '../../../models/types/events-type';
import PgEventsTypeEntity from '../../../models/entities/pg-events-type';

export default class EventsTypeRepo implements EventsTypeInterface {
    private eventsTypeRepository : Repository<PgEventsTypeEntity>;

    constructor(connection: Connection) {
      this.eventsTypeRepository = connection.getRepository(PgEventsTypeEntity);
    }

    async create(name : string, description: string, comments: string) : Promise<{eventsType: EventsType}> {
      const eventsType = {
        id: uuidv4(),
        name,
        description,
        comments,
      } as EventsType;
      await this.eventsTypeRepository.save(eventsType);
      return { eventsType };
    }

    async update(id: string, name : string, description: string, comments: string) : Promise<{success : boolean}> {
      const eventsType = await this.eventsTypeRepository.findOne({ id });
      if (eventsType) {
        eventsType.name = name;
        eventsType.description = description;
        eventsType.comments = comments;
        this.eventsTypeRepository.save(eventsType);
        return { success: true };
      }
      const err = { message: `Events Type not found for id: ${id}`, statusCode: 404 };
      throw err;
    }

    async getById(id : string) : Promise<EventsType> {
      const eventsType = await this.eventsTypeRepository.findOne({ id });
      if (eventsType) return eventsType;
      const err = { message: `Events Type not found for id: ${id}`, statusCode: 404 };
      throw err;
    }

    async get(skip : number, limit : number) : Promise<EventsType[]> {
      const eventsTypes : EventsType[] = await this.eventsTypeRepository.find({
        take: limit,
        skip,
      });
      return eventsTypes;
    }

    async getAll() : Promise<EventsType[]> {
      const eventsTypes : EventsType[] = await this.eventsTypeRepository.find();
      return eventsTypes;
    }

    async detele(id : string) : Promise<{success : boolean}> {
      const resp = await this.eventsTypeRepository.delete({ id });
      if (resp.affected && resp.affected > 0) return { success: true };
      const err = { message: `Events type not found for id: ${id}`, statusCode: 404 };
      throw err;
    }
}
