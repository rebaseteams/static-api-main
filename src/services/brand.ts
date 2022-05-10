import Brand from '../models/entities/pg-brand';
import { BrandsInterface } from '../models/interfaces/brand';
import { demographics as Demo, media_handles as Media } from '../models/types/brand';

export default class BrandsService implements BrandsInterface {
  private brandRepo: BrandsInterface;

  constructor(
    brandRepo: BrandsInterface,
  ) {
    this.brandRepo = brandRepo;
  }

  async createBrand(name : string, logo : string, website : string, contact : string, bowie_brand_id: string, demographics: Demo, media_handles: Media, industry: string[], comments?: string, userid?: string) : Promise<{brand : Brand}> {
    return this.brandRepo.createBrand(name, logo, website, contact, bowie_brand_id, demographics, media_handles, industry, comments, userid);
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

  async getAllBrands() : Promise<Array<{id: string, name: string}>> {
    return this.brandRepo.getAllBrands();
  }

  async deleteBrand(id : string) : Promise<{success : boolean}> {
    return this.brandRepo.deleteBrand(id);
  }
}
