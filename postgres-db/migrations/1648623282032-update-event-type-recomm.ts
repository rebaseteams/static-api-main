import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateEventTypeRecomm1648623282032 implements MigrationInterface {
    name = 'updateEventTypeRecomm1648623282032'

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
            ALTER TABLE "artist_recommendation"
                RENAME COLUMN "event_type" TO "event_type_id"
        `);
      await queryRunner.query(`
            ALTER TABLE "artist_recommendation" DROP COLUMN "event_type_id"
        `);
      await queryRunner.query(`
            ALTER TABLE "artist_recommendation"
            ADD "event_type_id" uuid NOT NULL DEFAULT '07cc7ec0-5f0c-48e1-92dd-85e56d732671'
        `);
      await queryRunner.query(`
            ALTER TABLE "artist_recommendation"
            ADD CONSTRAINT "fk_artist_recommendation_event_type_id__events_type" FOREIGN KEY ("event_type_id") REFERENCES "events_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
            ALTER TABLE "artist_recommendation" DROP CONSTRAINT "fk_artist_recommendation_event_type_id__events_type"
        `);
      await queryRunner.query(`
            ALTER TABLE "artist_recommendation" DROP COLUMN "event_type_id"
        `);
      await queryRunner.query(`
            ALTER TABLE "artist_recommendation"
            ADD "event_type_id" character varying NOT NULL
        `);
      await queryRunner.query(`
            ALTER TABLE "artist_recommendation"
                RENAME COLUMN "event_type_id" TO "event_type"
        `);
    }
}
