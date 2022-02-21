import { MigrationInterface, QueryRunner } from 'typeorm';
import artists from '../../src/repositories/artists/in-memory/data/artists.json';

export class insertArtistsDB1643019298219 implements MigrationInterface {
    name = 'insertArtistsDB1643019298219'

    public async up(queryRunner: QueryRunner): Promise<void> {
      for (let i = 0; i < artists.length - 1; i += 1) {
        const associatedBrands = this.convertArray(artists[i].associated_brands);
        const venues = this.convertArray(artists[i].venues);
        await queryRunner.query(`INSERT INTO artist (id, name, gender, associated_brands, venues, country, image, cover_image, bio, manager, contact, address, popularity, audience, media_handles) VALUES ('${artists[i].id}','${artists[i].name}','${artists[i].gender}','${associatedBrands}','${venues}','${artists[i].country}','${artists[i].image}','${artists[i].cover_image}','${artists[i].bio}','${artists[i].manager}','${artists[i].contact}','${artists[i].address}','${artists[i].popularity}','${JSON.stringify(artists[i].audience)}','${JSON.stringify(artists[i].media_handles)}')`);
      }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      for (let i = 0; i < artists.length - 1; i += 1) {
        await queryRunner.query(`
          DELETE FROM table_name
          WHERE id = ${artists[i].id};
        `);
      }
    }

    convertArray(arr: Array<any>): string {
      let str: string = '{';
      for (let i = 0; i < arr.length; i += 1) {
        if (i === 0) str = `${str} "${arr[i]}"`;
        else str = `${str}, "${arr[i]}"`;
      }
      str += ' }';
      return str;
    }
}
