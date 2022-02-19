import Brand from '../models/entities/pg-brand';
import { BrandsInterface } from '../models/interfaces/brand';

export default class BrandsService implements BrandsInterface {
  private brandRepo: BrandsInterface;

  constructor(
    brandRepo: BrandsInterface,
  ) {
    this.brandRepo = brandRepo;
  }

  async createBrand(name : string, logo : string, website : string, contact : string) : Promise<{brand : Brand}> {
    return this.brandRepo.createBrand(name, logo, website, contact);
  }

  async editBrand(id : string, name : string, logo : string, website : string, contact : string) : Promise<{success : boolean}> {
    return this.brandRepo.editBrand(id, name, logo, website, contact);
  }

  async getBrand(id : string) : Promise<Brand> {
    return this.brandRepo.getBrand(id);
  }

  async getBrands(skip : number, limit : number) : Promise<Brand[]> {
    return this.brandRepo.getBrands(skip, limit);
  }

  async deleteBrand(id : string) : Promise<{success : boolean}> {
    return this.brandRepo.deleteBrand(id);
  }
}
