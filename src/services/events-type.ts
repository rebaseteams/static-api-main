import { EventsTypeInterface } from '../models/interfaces/events-type';
import { EventsType } from '../models/types/events-type';

export default class EventsTypeService implements EventsTypeInterface {
  private eventsTypeRepo: EventsTypeInterface;

  constructor(
    eventsTypeRepo: EventsTypeInterface,
  ) {
    this.eventsTypeRepo = eventsTypeRepo;
  }

  async create(name : string, description: string, comments: string) : Promise<{eventsType: EventsType}> {
    return this.eventsTypeRepo.create(name, description, comments);
  }

  async update(id: string, name : string, description: string, comments: string): Promise<{success : boolean}> {
    return this.eventsTypeRepo.update(id, name, description, comments);
  }

  async getById(id: string): Promise<EventsType> {
    return this.eventsTypeRepo.getById(id);
  }

  async get(skip : number, limit : number): Promise<EventsType[]> {
    return this.eventsTypeRepo.get(skip, limit);
  }

  async getAll(): Promise<EventsType[]> {
    return this.eventsTypeRepo.getAll();
  }

  async detele(id: string): Promise<{success : boolean}> {
    return this.eventsTypeRepo.detele(id);
  }
}
