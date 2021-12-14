import { MigrationInterface, QueryRunner } from 'typeorm';

export class initialArtistDb1639395319604 implements MigrationInterface {
    name = 'initialArtistDb1639395319604'

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
            CREATE TABLE "brand" (
                "id" character varying NOT NULL,
                "name" character varying NOT NULL,
                "logo" character varying NOT NULL,
                "website" character varying NOT NULL,
                "contact" character varying NOT NULL,
                CONSTRAINT "pk_brand_id" PRIMARY KEY ("id")
            )
        `);
      await queryRunner.query(`
            CREATE TABLE "venue" (
                "id" character varying NOT NULL,
                "name" character varying NOT NULL,
                "address" jsonb NOT NULL,
                "capacity" integer NOT NULL,
                CONSTRAINT "pk_venue_id" PRIMARY KEY ("id")
            )
        `);
      await queryRunner.query(`
            CREATE TABLE "genre" (
                "id" character varying NOT NULL,
                "name" character varying NOT NULL,
                "description" character varying NOT NULL,
                CONSTRAINT "pk_genre_id" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
            DROP TABLE "genre"
        `);
      await queryRunner.query(`
            DROP TABLE "venue"
        `);
      await queryRunner.query(`
            DROP TABLE "brand"
        `);
    }
}
