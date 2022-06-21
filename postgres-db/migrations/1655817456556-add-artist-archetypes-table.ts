import { MigrationInterface, QueryRunner } from 'typeorm';

export class addArtistArchetypesTable1655817456556 implements MigrationInterface {
    name = 'addArtistArchetypesTable1655817456556'

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
            CREATE TABLE "artist-archetypes" (
                "id" uuid NOT NULL,
                "artist_id" uuid NOT NULL,
                "archetypes" jsonb NOT NULL DEFAULT '[]',
                "comments" text NOT NULL DEFAULT '',
                "last_updated_by" character varying NOT NULL DEFAULT '',
                "last_updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "pk_artist-archetypes_id" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
            DROP TABLE "artist-archetypes"
        `);
    }
}
