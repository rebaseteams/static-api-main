/* eslint-disable no-console */
import { v4 as uuidv4 } from 'uuid';
import { Brand } from '../../../models/types/brand';
import { BrandsInterface } from '../../../models/interfaces/brand';
import { FileManagerInterface } from '../../../models/interfaces/file-manager';

export default class BrandRepo implements BrandsInterface {
  fileManager: FileManagerInterface;

  constructor(fileManager: FileManagerInterface) {
    this.fileManager = fileManager;
  }

  async getAllBrands(): Promise<Array<{id: string, name: string}>> {
    throw new Error('Method not implemented.');
  }

  async createBrand(name: string, logo: string, website: string, contact: string): Promise<{ brand: Brand }> {
    const brand = {
      id: uuidv4(),
      name,
      logo,
      website,
      contact,
    };
    // fileCheck(`${__dirname}/data`, false);
    await this.fileManager.set(`brands/${brand.id}.json`, Buffer.from(JSON.stringify(brand)));
    return { brand };
  }

  async getBrand(id: string): Promise<Brand> {
    const exists = await this.fileManager.exists(`brands/${id}.json`);
    if (exists) {
      const readData = await this.fileManager.get(`brands/${id}.json`);
      const data = JSON.parse(readData.data.toString()) as Brand;
      return data;
    }
    const err = { message: `Brand not found for id: ${id}`, statusCode: 404 };
    throw err;
  }

  async deleteBrand(id: string): Promise<{ success: boolean }> {
    const exists = await this.fileManager.exists(`brands/${id}.json`);

    if (exists) {
      const deleteRes = await this.fileManager.delete(`brands/${id}.json`);
      return { success: deleteRes.success };
    }
    const err = { message: `Brand not found for id: ${id}`, statusCode: 404 };
    throw err;
  }

  async editBrand(id: string, name: string, logo: string, website: string, contact: string): Promise<{ success: boolean }> {
    const exists = await this.fileManager.exists(`brands/${id}.json`);

    if (exists) {
      const readData = await this.fileManager.get(`brands/${id}.json`);
      const data = JSON.parse(readData.data.toString()) as Brand;
      data.name = name;
      data.logo = logo;
      data.website = website;
      data.contact = contact;

      const writeRes = await this.fileManager.set(`brands/${id}.json`, Buffer.from(JSON.stringify(data)));
      return { success: writeRes.success };
    }
    const err = { message: `Brand not found for id: ${id}`, statusCode: 404 };
    throw err;
  }

  async getBrands(skip: number, limit: number): Promise<Brand[]> {
    let tracker = 0;
    // fileCheck(`${__dirname}/data`, false);
    const allBrands: Brand[] = [];

    const files = await this.fileManager.list('brands');

    for (let ind = 0; ind < files.data.length; ind += 1) {
      if (skip - 1 < ind && tracker < limit) {
        const file = files[ind];
        tracker += 1;
        const toread = await this.fileManager.get(`brands/${file}`);
        const brand = JSON.parse(toread.data.toString()) as Brand;
        allBrands.push(brand);
      }
    }

    return allBrands;
  }
}
