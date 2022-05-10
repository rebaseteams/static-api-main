/* eslint-disable no-unused-vars */
import Brand from '../entities/pg-brand';
import { demographics as Demo, media_handles as Media } from '../types/brand';

export interface BrandsInterface{
  createBrand(name : string, logo : string, website : string, contact : string, bowie_brand_id: string, demographics: Demo, media_handles: Media, industry: string[], comments?: string, userId?: string) : Promise<{ brand : Brand }>;
  getBrand(id : string) : Promise<Brand>;
  deleteBrand(id : string) : Promise<{ success : boolean }>;
  editBrand(id : string, name : string, logo : string, website : string, contact : string) : Promise<{ success : boolean }>;
  getBrands(skip : number, limit : number) : Promise<Brand[]>;
  getAllBrands(): Promise<Array<{id: string, name: string}>>;
}
