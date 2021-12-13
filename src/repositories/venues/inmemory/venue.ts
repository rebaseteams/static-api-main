/* eslint-disable no-console */
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import Venue from '../../../models/entities/Venue';
import { VenuesInterface } from '../../../models/interfaces/venue';
import fileCheck from '../../../utils/fileCheck';
import { Address } from '../../../models/types/address';

export default class VenueRepo implements VenuesInterface {
  async createVenue(name : string, address : Address, capacity : number) : Promise<{venue : Venue}> {
    const venue = new Venue(
      uuidv4(),
      name,
      address,
      capacity,
    );
    fileCheck(`${__dirname}/data`, false);
    fs.writeFileSync(`${__dirname}/data/${venue.id}.json`, JSON.stringify(venue));
    return { venue };
  }

  async getVenue(id : string) : Promise<Venue> {
    if (fs.existsSync(`${__dirname}/data/${id}.json`)) {
      const readData = fs.readFileSync(`${__dirname}/data/${id}.json`).toString();
      const data = JSON.parse(readData) as Venue;
      return data;
    }
    const err = { message: `Venue not found for id: ${id}`, statusCode: 404 };
    throw err;
  }

  async deleteVenue(id : string) : Promise<{success : boolean}> {
    if (fs.existsSync(`${__dirname}/data/${id}.json`)) {
      fs.unlinkSync(`${__dirname}/data/${id}.json`);
      return { success: true };
    }
    const err = { message: `Venue not found for id: ${id}`, statusCode: 404 };
    throw err;
  }

  async editVenue(id : string, name : string, address : Address, capacity : number) : Promise<{success : boolean}> {
    if (fs.existsSync(`${__dirname}/data/${id}.json`)) {
      const readData = fs.readFileSync(`${__dirname}/data/${id}.json`).toString();
      const data = JSON.parse(readData) as Venue;
      data.name = name;
      data.address = address;
      data.capacity = capacity;
      fs.writeFileSync(`${__dirname}/data/${id}.json`, JSON.stringify(data));
      return { success: true };
    }
    const err = { message: `Venue not found for id: ${id}`, statusCode: 404 };
    throw err;
  }

  async getVenues(skip : number, limit : number) : Promise<Venue[]> {
    let tracker = 0;
    fileCheck(`${__dirname}/data`, false);
    const allVenues : Venue[] = [];
    fs.readdirSync(`${__dirname}/data`).forEach((file, ind) => {
      if (skip - 1 < ind && tracker < limit) {
        tracker += 1;
        const toread = fs.readFileSync(`${__dirname}/data/${file}`).toString();
        const venue = JSON.parse(toread) as Venue;
        allVenues.push(venue);
      }
    });
    return allVenues;
  }
}
