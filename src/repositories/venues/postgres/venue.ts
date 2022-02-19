/* eslint-disable no-console */
import { Connection, Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Venue } from '../../../models/types/venue';
import { VenuesInterface } from '../../../models/interfaces/venue';
import { Address } from '../../../models/types/address';
import PgVenueEntity from '../../../models/entities/pg-venue';

export default class VenueRepo implements VenuesInterface {
    private venueRepository : Repository<PgVenueEntity>;

    constructor(connection: Connection) {
      this.venueRepository = connection.getRepository(PgVenueEntity);
    }

    async createVenue(name : string, address : Address, capacity : number) : Promise<{venue : Venue}> {
      const venue = {
        id: uuidv4(),
        name,
        address,
        capacity,
      };
      await this.venueRepository.save(venue);
      return { venue };
    }

    async getVenue(id : string) : Promise<Venue> {
      const venue = await this.venueRepository.findOne({ id });
      if (venue) return venue;
      const err = { message: `Venue not found for id: ${id}`, statusCode: 404 };
      throw err;
    }

    async deleteVenue(id : string) : Promise<{success : boolean}> {
      const resp = await this.venueRepository.delete({ id });
      if (resp.affected && resp.affected > 0) return { success: true };
      const err = { message: `Venue not found for id: ${id}`, statusCode: 404 };
      throw err;
    }

    async editVenue(id : string, name : string, address : Address, capacity : number) : Promise<{success : boolean}> {
      const venue = await this.venueRepository.findOne({ id });
      if (venue) {
        venue.name = name;
        venue.address = address;
        venue.capacity = capacity;
        this.venueRepository.save(venue);
        return { success: true };
      }
      const err = { message: `Venue not found for id: ${id}`, statusCode: 404 };
      throw err;
    }

    async getVenues(skip : number, limit : number) : Promise<Venue[]> {
      const venues : Venue[] = await this.venueRepository.find({
        take: limit,
        skip,
      });
      return venues;
    }
}
