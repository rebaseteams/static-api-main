import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateVenue1646195505719 implements MigrationInterface {
    name = 'updateVenue1646195505719'

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
            CREATE TABLE "events_type" (
                "id" uuid NOT NULL,
                "name" character varying NOT NULL,
                "description" character varying NOT NULL,
                "comments" character varying NOT NULL,
                "last_updated_at" character varying NOT NULL,
                "last_updated_by" character varying NOT NULL,
                CONSTRAINT "pk_events_type_id" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
            DROP TABLE "events_type"
        `);
    }
}
