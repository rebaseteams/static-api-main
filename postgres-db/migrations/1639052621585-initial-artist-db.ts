import { MigrationInterface, QueryRunner } from 'typeorm';

export class initialArtistDb1639052621585 implements MigrationInterface {
    name = 'initialArtistDb1639052621585'

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
            CREATE TABLE "artist_recommendation" (
                "id" character varying NOT NULL,
                "name" character varying NOT NULL,
                "date_created" TIMESTAMP NOT NULL,
                "user_id" character varying NOT NULL,
                "event_type" character varying NOT NULL,
                "venue" text array NOT NULL,
                "artist_budget" jsonb NOT NULL,
                "sponsorship_type" character varying NOT NULL,
                "wanted_brands" jsonb NOT NULL,
                "unwanted_brands" jsonb NOT NULL,
                "target_audience" jsonb NOT NULL,
                "what_sells_most" jsonb NOT NULL,
                "artists" jsonb NOT NULL,
                "discarded_artists" jsonb NOT NULL,
                "status" boolean NOT NULL,
                CONSTRAINT "pk_artist_recommendation_id" PRIMARY KEY ("id")
            )
        `);
      await queryRunner.query(`
            ALTER TABLE "artist" DROP COLUMN "manager"
        `);
      await queryRunner.query(`
            ALTER TABLE "artist"
            ADD "manager" character varying NOT NULL
        `);
      await queryRunner.query(`
            ALTER TABLE "artist" DROP COLUMN "audience"
        `);
      await queryRunner.query(`
            ALTER TABLE "artist"
            ADD "audience" jsonb NOT NULL
        `);
      await queryRunner.query(`
            ALTER TABLE "artist" DROP COLUMN "media_handles"
        `);
      await queryRunner.query(`
            ALTER TABLE "artist"
            ADD "media_handles" jsonb NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
            ALTER TABLE "artist" DROP COLUMN "media_handles"
        `);
      await queryRunner.query(`
            ALTER TABLE "artist"
            ADD "media_handles" text NOT NULL
        `);
      await queryRunner.query(`
            ALTER TABLE "artist" DROP COLUMN "audience"
        `);
      await queryRunner.query(`
            ALTER TABLE "artist"
            ADD "audience" text NOT NULL
        `);
      await queryRunner.query(`
            ALTER TABLE "artist" DROP COLUMN "manager"
        `);
      await queryRunner.query(`
            ALTER TABLE "artist"
            ADD "manager" text NOT NULL
        `);
      await queryRunner.query(`
            DROP TABLE "artist_recommendation"
        `);
    }
}
