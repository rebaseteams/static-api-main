import { MigrationInterface, QueryRunner } from 'typeorm';

export class initialArtistDb1639045055974 implements MigrationInterface {
    name = 'initialArtistDb1639045055974'

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
            CREATE TABLE "artist_recommendation" (
                "id" character varying NOT NULL,
                "name" character varying NOT NULL,
                "date_created" TIMESTAMP NOT NULL,
                "user_id" character varying NOT NULL,
                "event_type" character varying NOT NULL,
                "venue" text NOT NULL,
                "artist_budget" text NOT NULL,
                "sponsorship_type" character varying NOT NULL,
                "wanted_brands" text NOT NULL,
                "unwanted_brands" text NOT NULL,
                "target_audience" text NOT NULL,
                "what_sells_most" text NOT NULL,
                "artists" text NOT NULL,
                "discarded_artists" text NOT NULL,
                "status" boolean NOT NULL,
                CONSTRAINT "pk_artist_recommendation_id" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
            DROP TABLE "artist_recommendation"
        `);
    }
}
