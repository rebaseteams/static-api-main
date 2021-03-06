/* eslint-disable no-console */
import { Connection, Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import PgBrandEntity from '../../../models/entities/pg-brand';
import {
  Brand,
  demographics as Demo, media_handles as Media, ShortBrand,
} from '../../../models/types/brand';
import { BrandsInterface } from '../../../models/interfaces/brand';
import brandAffinity from '../../artists/postgres/addOnData/brandAffinity';
import { youtubeinsights } from '../../artists/postgres/addOnData/youtubeInsights';
import latestReleaseVideos from '../../artists/postgres/addOnData/latestReleaseVideos';

export default class BrandRepo implements BrandsInterface {
    private brandRepository : Repository<PgBrandEntity>;

    constructor(connection: Connection) {
      this.brandRepository = connection.getRepository(PgBrandEntity);
    }

    async createBrand(name: string,
      logo: string,
      website: string,
      contact: string,
      bowie_brand_id: string, demographics: Demo,
      media_handles: Media, industry: string[],
      comments?: string,
      userId?: string): Promise<{ brand: ShortBrand }> {
      const brand: PgBrandEntity = {
        id: uuidv4(),
        name,
        logo,
        website,
        contact,
        bowie_brand_id,
        demographics,
        media_handles,
        industry,
        comments,
        last_updated_by: userId,
        last_modified_at: new Date(),
      };
      await this.brandRepository.save(brand);
      return { brand };
    }

    async getBrand(id : string) : Promise<Brand> {
      const brand = await this.brandRepository.findOne({ id });
      if (brand) {
        return this.convertToTypeBrand(brand);
      }
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
      const brands: PgBrandEntity[] = await this.brandRepository.find({
        take: limit,
        skip,
      });
      const newBrand = brands.map((b) => this.convertToTypeBrand(b));
      return newBrand;
    }

    async getAllBrands() : Promise<Array<{id: string, name: string}>> {
      const brands : Array<{id: string, name: string}> = await this.brandRepository.find({
        select: ['id', 'name'],
      });
      return brands;
    }

    convertToTypeBrand(brand: PgBrandEntity): Brand {
      const toSendBrand: Brand = {
        id: brand.id,
        name: brand.name,
        logo: brand.logo,
        website: brand.website,
        contact: brand.contact,
        bowie_brand_id: brand.bowie_brand_id,
        demographics: brand.demographics,
        // TO-DO: LatestYoutubeReleases,BrandAffinity,YoutubeInsights table
        media_handles: brand.media_handles,
        brand_affinity: brandAffinity,
        latest_youtube_release: latestReleaseVideos,
        youtube_insights: youtubeinsights,
        industry: brand.industry,
        last_modified_at: brand.last_modified_at,
      };
      return toSendBrand;
    }
}
