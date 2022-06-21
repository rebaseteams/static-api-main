import { MigrationInterface, QueryRunner } from 'typeorm';

export class addArtistAffinity1655812588198 implements MigrationInterface {
    name = 'addArtistAffinity1655812588198'

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
            CREATE TABLE "artist-affinity" (
                "id" uuid NOT NULL,
                "artist_id" uuid NOT NULL,
                "affinity_last_3_months" jsonb NOT NULL DEFAULT '[]',
                "comments" text NOT NULL DEFAULT '',
                "last_updated_by" character varying NOT NULL DEFAULT '',
                "last_updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "pk_artist-affinity_id" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
            DROP TABLE "artist-affinity"
        `);
    }
}
