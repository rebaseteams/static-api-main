/* eslint-disable no-console */
import { v4 as uuidv4 } from 'uuid';
import { Venue } from '../../../models/types/venue';
import { VenuesInterface } from '../../../models/interfaces/venue';
import { Address } from '../../../models/types/address';
import { FileManagerInterface } from '../../../models/interfaces/file-manager';

export default class VenueRepo implements VenuesInterface {
  fileManager: FileManagerInterface;

  constructor(fileManager: FileManagerInterface) {
    this.fileManager = fileManager;
  }

  async createVenue(name : string, address : Address, capacity : number) : Promise<{venue : Venue}> {
    const venue: Venue = {
      id: uuidv4(),
      name,
      address,
      capacity,
    };
    await this.fileManager.set(`venues/${venue.id}.json`, Buffer.from(JSON.stringify(venue)));
    return { venue };
  }

  async getVenue(id : string) : Promise<Venue> {
    const exists = await this.fileManager.exists(`venues/${id}.json`);

    if (exists) {
      const readData = await this.fileManager.get(`venues/${id}.json`);
      const data = JSON.parse(readData.data.toString()) as Venue;
      return data;
    }
    const err = { message: `Venue not found for id: ${id}`, statusCode: 404 };
    throw err;
  }

  async deleteVenue(id : string) : Promise<{success : boolean}> {
    const exists = await this.fileManager.exists(`venues/${id}.json`);

    if (exists) {
      const delRes = await this.fileManager.delete(`$venues/${id}.json`);
      return { success: delRes.success };
    }
    const err = { message: `Venue not found for id: ${id}`, statusCode: 404 };
    throw err;
  }

  async editVenue(id : string, name : string, address : Address, capacity : number) : Promise<{success : boolean}> {
    const exists = await this.fileManager.exists(`venues/${id}.json`);

    if (exists) {
      const readData = await this.fileManager.get(`venues/${id}.json`);
      const data = JSON.parse(readData.data.toString()) as Venue;
      data.name = name;
      data.address = address;
      data.capacity = capacity;
      const writeRes = await this.fileManager.set(`venues/${id}.json`, Buffer.from(JSON.stringify(data)));
      return { success: writeRes.success };
    }
    const err = { message: `Venue not found for id: ${id}`, statusCode: 404 };
    throw err;
  }

  async getVenues(skip : number, limit : number) : Promise<Venue[]> {
    let tracker = 0;
    const allVenues : Venue[] = [];

    const files = await this.fileManager.list('venues');

    for (let ind = 0; ind < files.data.length; ind += 1) {
      if (skip - 1 < ind && tracker < limit) {
        const file = files[ind];
        tracker += 1;
        const toread = await this.fileManager.get(`venues/${file}`);
        const venue = JSON.parse(toread.data.toString()) as Venue;
        allVenues.push(venue);
      }
    }

    return allVenues;
  }
}
