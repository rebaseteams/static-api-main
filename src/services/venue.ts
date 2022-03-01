import { Venue } from '../models/types/venue';
import { VenuesInterface } from '../models/interfaces/venue';
import { Address } from '../models/types/address';

export default class VenuesService implements VenuesInterface {
  private venueRepo: VenuesInterface;

  constructor(
    venueRepo: VenuesInterface,
  ) {
    this.venueRepo = venueRepo;
  }

  async createVenue(name : string, address : Address, capacity : number) : Promise<{venue : Venue}> {
    return this.venueRepo.createVenue(name, address, capacity);
  }

  async editVenue(id : string, name : string, address : Address, capacity : number) : Promise<{success : boolean}> {
    return this.venueRepo.editVenue(id, name, address, capacity);
  }

  async getVenue(id : string) : Promise<Venue> {
    return this.venueRepo.getVenue(id);
  }

  async getVenues(skip : number, limit : number) : Promise<Venue[]> {
    return this.venueRepo.getVenues(skip, limit);
  }

  async getAllVenues() : Promise<Venue[]> {
    return this.venueRepo.getAllVenues();
  }

  async deleteVenue(id : string) : Promise<{success : boolean}> {
    return this.venueRepo.deleteVenue(id);
  }
}
