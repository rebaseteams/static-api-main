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
    // TODO : Delete brand from in memory
    console.log(id);
    return { success: true };
  }

  async editBrand(id : string) : Promise<{success : boolean}> {
    // TODO : Edit brand from in memory
    console.log(id);
    return { success: true };
  }

  async getBrands(skip : number, limit : number) : Promise<Brand[]> {
    // TODO : Get brands with given pagination conditions from in memory
    console.log(skip, limit);
    const brands = [new Brand(
      uuidv4(),
      'name',
      'logo',
      'website',
      'contact',
    )];
    return brands;
  }
}
