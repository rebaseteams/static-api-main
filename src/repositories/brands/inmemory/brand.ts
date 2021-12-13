/* eslint-disable no-console */
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import Brand from '../../../models/entities/Brand';
import { BrandsInterface } from '../../../models/interfaces/brand';
import fileCheck from '../../../utils/fileCheck';

export default class BrandRepo implements BrandsInterface {
  async createBrand(name : string, logo : string, website : string, contact : string) : Promise<{brand : Brand}> {
    const brand = new Brand(
      uuidv4(),
      name,
      logo,
      website,
      contact,
    );
    fileCheck(`${__dirname}/data`, false);
    fs.writeFileSync(`${__dirname}/data/${brand.id}.json`, JSON.stringify(brand));
    return { brand };
  }

  async getBrand(id : string) : Promise<Brand> {
    if (fs.existsSync(`${__dirname}/data/${id}.json`)) {
      const readData = fs.readFileSync(`${__dirname}/data/${id}.json`).toString();
      const data = JSON.parse(readData) as Brand;
      return data;
    }
    const err = { message: `Brand not found for id: ${id}`, statusCode: 404 };
    throw err;
  }

  async deleteBrand(id : string) : Promise<{success : boolean}> {
    if (fs.existsSync(`${__dirname}/data/${id}.json`)) {
      fs.unlinkSync(`${__dirname}/data/${id}.json`);
      return { success: true };
    }
    const err = { message: `Brand not found for id: ${id}`, statusCode: 404 };
    throw err;
  }

  async editBrand(id : string, name : string, logo : string, website : string, contact : string) : Promise<{success : boolean}> {
    if (fs.existsSync(`${__dirname}/data/${id}.json`)) {
      const readData = fs.readFileSync(`${__dirname}/data/${id}.json`).toString();
      const data = JSON.parse(readData) as Brand;
      data.name = name;
      data.logo = logo;
      data.website = website;
      data.contact = contact;
      fs.writeFileSync(`${__dirname}/data/${id}.json`, JSON.stringify(data));
      return { success: true };
    }
    const err = { message: `Brand not found for id: ${id}`, statusCode: 404 };
    throw err;
  }

  async getBrands(skip : number, limit : number) : Promise<Brand[]> {
    let tracker = 0;
    fileCheck(`${__dirname}/data`, false);
    const allBrands : Brand[] = [];
    fs.readdirSync(`${__dirname}/data`).forEach((file, ind) => {
      if (skip - 1 < ind && tracker < limit) {
        tracker += 1;
        const toread = fs.readFileSync(`${__dirname}/data/${file}`).toString();
        const brand = JSON.parse(toread) as Brand;
        allBrands.push(brand);
      }
    });
    return allBrands;
  }
}
