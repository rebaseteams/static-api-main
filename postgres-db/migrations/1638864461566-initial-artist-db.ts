import { MigrationInterface, QueryRunner } from 'typeorm';

export class initialArtistDb1638864461566 implements MigrationInterface {
    name = 'initialArtistDb1638864461566'

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
            ALTER TABLE "artist" DROP COLUMN "brands"
        `);
      await queryRunner.query(`
            ALTER TABLE "artist"
            ADD "associated_brands" text array NOT NULL
        `);
      await queryRunner.query(`
            ALTER TABLE "artist"
            ADD "venues" text array NOT NULL
        `);
      await queryRunner.query(`
            ALTER TABLE "artist"
            ADD "country" character varying NOT NULL
        `);
      await queryRunner.query(`
            ALTER TABLE "artist"
            ADD "image" character varying NOT NULL
        `);
      await queryRunner.query(`
            ALTER TABLE "artist"
            ADD "cover_image" character varying NOT NULL
        `);
      await queryRunner.query(`
            ALTER TABLE "artist"
            ADD "bio" character varying NOT NULL
        `);
      await queryRunner.query(`
            ALTER TABLE "artist"
            ADD "manager" text NOT NULL
        `);
      await queryRunner.query(`
            ALTER TABLE "artist"
            ADD "contact" text NOT NULL
        `);
      await queryRunner.query(`
            ALTER TABLE "artist"
            ADD "address" text NOT NULL
        `);
      await queryRunner.query(`
            ALTER TABLE "artist"
            ADD "popularity" integer NOT NULL
        `);
      await queryRunner.query(`
            ALTER TABLE "artist"
            ADD "audience" text NOT NULL
        `);
      await queryRunner.query(`
            ALTER TABLE "artist"
            ADD "followers" text NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
            ALTER TABLE "artist" DROP COLUMN "followers"
        `);
      await queryRunner.query(`
            ALTER TABLE "artist" DROP COLUMN "audience"
        `);
      await queryRunner.query(`
            ALTER TABLE "artist" DROP COLUMN "popularity"
        `);
      await queryRunner.query(`
            ALTER TABLE "artist" DROP COLUMN "address"
        `);
      await queryRunner.query(`
            ALTER TABLE "artist" DROP COLUMN "contact"
        `);
      await queryRunner.query(`
            ALTER TABLE "artist" DROP COLUMN "manager"
        `);
      await queryRunner.query(`
            ALTER TABLE "artist" DROP COLUMN "bio"
        `);
      await queryRunner.query(`
            ALTER TABLE "artist" DROP COLUMN "cover_image"
        `);
      await queryRunner.query(`
            ALTER TABLE "artist" DROP COLUMN "image"
        `);
      await queryRunner.query(`
            ALTER TABLE "artist" DROP COLUMN "country"
        `);
      await queryRunner.query(`
            ALTER TABLE "artist" DROP COLUMN "venues"
        `);
      await queryRunner.query(`
            ALTER TABLE "artist" DROP COLUMN "associated_brands"
        `);
      await queryRunner.query(`
            ALTER TABLE "artist"
            ADD "brands" text array NOT NULL
        `);
      await queryRunner.query(`
            DROP TABLE "document"
        `);
    }
}
