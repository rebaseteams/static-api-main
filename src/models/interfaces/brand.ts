/* eslint-disable no-unused-vars */
import Brand from '../entities/Brand';
/* The repositories are supposed to implement this interface */
export interface BrandsInterface{
  createBrand(name : string, logo : string, website : string, contact : string) : Promise<{ brand : Brand }>;
  getBrand(id : string) : Promise<Brand>;
  deleteBrand(id : string) : Promise<{ success : boolean }>;
  editBrand(id : string, name : string, logo : string, website : string, contact : string) : Promise<{ success : boolean }>;
  getBrands(skip : number, limit : number) : Promise<Brand[]>;
}
