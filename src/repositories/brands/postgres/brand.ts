/* eslint-disable no-console */
import { Connection, Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import Brand from '../../../models/entities/Brand';
import { BrandsInterface } from '../../../models/interfaces/brand';

export default class BrandRepo implements BrandsInterface {
    private brandRepository : Repository<Brand>;

    constructor(connection: Connection) {
      this.brandRepository = connection.getRepository(Brand);
    }

    async createBrand(name : string, logo : string, website : string, contact : string) : Promise<{brand : Brand}> {
      const brand = new Brand(
        uuidv4(),
        name,
        logo,
        website,
        contact,
      );
      await this.brandRepository.save(brand);
      return { brand };
    }

    async getBrand(id : string) : Promise<Brand> {
      const brand = await this.brandRepository.findOne({ id });
      if (brand) return brand;
      const err = { message: `Brand not found for id: ${id}`, statusCode: 404 };
      throw err;
    }

    async deleteBrand(id : string) : Promise<{success : boolean}> {
      const resp = await this.brandRepository.delete({ id });
      if (resp.affected && resp.affected > 0) return { success: true };
      const err = { message: `Brand not found for id: ${id}`, statusCode: 404 };
      throw err;
    }

    async editBrand(id : string, name : string, logo : string, website : string, contact : string) : Promise<{success : boolean}> {
      const brand = await this.brandRepository.findOne({ id });
      if (brand) {
        brand.name = name;
        brand.logo = logo;
        brand.website = website;
        brand.contact = contact;
        this.brandRepository.save(brand);
        return { success: true };
      }
      const err = { message: `Brand not found for id: ${id}`, statusCode: 404 };
      throw err;
    }

    async getBrands(skip : number, limit : number) : Promise<Brand[]> {
      const brands : Brand[] = await this.brandRepository.find({
        take: limit,
        skip,
      });
      return brands;
    }
}
