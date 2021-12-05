import { MigrationInterface, QueryRunner } from 'typeorm';

export class initialArtistDb1638701412201 implements MigrationInterface {
    name = 'initialArtistDb1638701412201'

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
            CREATE TABLE "artists" (
                "id" uuid NOT NULL,
                "name" character varying NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "pk_artists_id" PRIMARY KEY ("id")
            )
        `);
      await queryRunner.query(`
            CREATE INDEX "idx_artists_name" ON "artists" ("name")
        `);
      await queryRunner.query(`
            CREATE INDEX "idx_artists_created_at" ON "artists" ("created_at")
        `);
      await queryRunner.query(`
            CREATE INDEX "idx_artists_updated_at" ON "artists" ("updated_at")
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
            DROP INDEX "public"."idx_artists_updated_at"
        `);
      await queryRunner.query(`
            DROP INDEX "public"."idx_artists_created_at"
        `);
      await queryRunner.query(`
            DROP INDEX "public"."idx_artists_name"
        `);
      await queryRunner.query(`
            DROP TABLE "artists"
        `);
    }
}
