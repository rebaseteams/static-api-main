import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateEventTypeRecommNoDef1648623755162 implements MigrationInterface {
    name = 'updateEventTypeRecommNoDef1648623755162'

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
            ALTER TABLE "artist_recommendation" DROP CONSTRAINT "fk_artist_recommendation_event_type_id__events_type"
        `);
      await queryRunner.query(`
            ALTER TABLE "artist_recommendation"
            ALTER COLUMN "event_type_id" DROP DEFAULT
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
            ALTER TABLE "artist_recommendation"
            ALTER COLUMN "event_type_id"
            SET DEFAULT '07cc7ec0-5f0c-48e1-92dd-85e56d732671'
        `);
      await queryRunner.query(`
            ALTER TABLE "artist_recommendation"
            ADD CONSTRAINT "fk_artist_recommendation_event_type_id__events_type" FOREIGN KEY ("event_type_id") REFERENCES "events_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }
}
