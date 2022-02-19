/* eslint-disable no-unused-vars */
import { Venue } from '../types/venue';
import { Address } from '../types/address';
/* The repositories are supposed to implement this interface */
export interface VenuesInterface{
  createVenue(name : string, address : Address, capacity : number) : Promise<{ venue : Venue }>;
  getVenue(id : string) : Promise<Venue>;
  deleteVenue(id : string) : Promise<{ success : boolean }>;
  editVenue(id : string, name : string, address : Address, capacity : number) : Promise<{ success : boolean }>;
  getVenues(skip : number, limit : number) : Promise<Venue[]>;
}
