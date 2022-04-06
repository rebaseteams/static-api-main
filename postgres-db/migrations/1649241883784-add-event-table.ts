import { MigrationInterface, QueryRunner } from 'typeorm';

export class addEventTable1649241883784 implements MigrationInterface {
    name = 'addEventTable1649241883784'

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
            CREATE TABLE "artist-popularity" (
                "id" uuid NOT NULL,
                "artist_id" uuid NOT NULL,
                "popularity" double precision NOT NULL,
                "comments" character varying NOT NULL,
                "last_updated_by" character varying NOT NULL,
                "last_updated_at" date NOT NULL DEFAULT now(),
                CONSTRAINT "pk_artist-popularity_id" PRIMARY KEY ("id")
            )
        `);
      await queryRunner.query(`
            CREATE TABLE "event-performers" (
                "id" uuid NOT NULL,
                "performer_id" uuid NOT NULL,
                "event_id" uuid NOT NULL,
                "metadata" jsonb NOT NULL,
                "comments" character varying NOT NULL,
                "last_updated_by" character varying NOT NULL,
                "last_updated_at" date NOT NULL DEFAULT now(),
                CONSTRAINT "pk_event-performers_id" PRIMARY KEY ("id")
            )
        `);
      await queryRunner.query(`
            CREATE TABLE "artist-genre" (
                "id" uuid NOT NULL,
                "artist_id" uuid NOT NULL,
                "genre_id" uuid NOT NULL,
                "comments" character varying NOT NULL,
                "last_updated_by" character varying NOT NULL,
                "last_updated_at" date NOT NULL DEFAULT now(),
                CONSTRAINT "pk_artist-genre_id" PRIMARY KEY ("id")
            )
        `);
      await queryRunner.query(`
            ALTER TABLE "events"
            ADD "venue_id" uuid NOT NULL DEFAULT '43e20942-3029-4801-ab01-3493786169c9'
        `);
      await queryRunner.query(`
            ALTER TABLE "events"
            ADD "metadata" jsonb NOT NULL DEFAULT '{}'
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
            ALTER TABLE "events" DROP COLUMN "metadata"
        `);
      await queryRunner.query(`
            ALTER TABLE "events" DROP COLUMN "venue_id"
        `);
      await queryRunner.query(`
            DROP TABLE "artist-genre"
        `);
      await queryRunner.query(`
            DROP TABLE "event-performers"
        `);
      await queryRunner.query(`
            DROP TABLE "artist-popularity"
        `);
    }
}
