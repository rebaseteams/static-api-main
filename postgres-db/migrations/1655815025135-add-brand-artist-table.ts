import { MigrationInterface, QueryRunner } from 'typeorm';

export class addBrandArtistTable1655815025135 implements MigrationInterface {
    name = 'addBrandArtistTable1655815025135'

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
            CREATE TABLE "brand-artist" (
                "id" uuid NOT NULL,
                "brand_id" uuid NOT NULL,
                "artist_id" uuid NOT NULL,
                "comments" text NOT NULL DEFAULT '',
                "last_updated_by" character varying NOT NULL DEFAULT '',
                "last_updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "pk_brand-artist_id" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
            DROP TABLE "brand-artist"
        `);
    }
}
