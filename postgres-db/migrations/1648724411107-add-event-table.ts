import { MigrationInterface, QueryRunner } from 'typeorm';

export class addEventTable1648724411107 implements MigrationInterface {
    name = 'addEventTable1648724411107'

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
            CREATE TABLE "events" (
                "id" uuid NOT NULL,
                "name" character varying NOT NULL DEFAULT '',
                "description" character varying NOT NULL DEFAULT '',
                "event_type_id" uuid NOT NULL,
                "start_date" date NOT NULL,
                "end_date" date NOT NULL,
                "comments" character varying NOT NULL DEFAULT '',
                "last_updated_at" date NOT NULL DEFAULT now(),
                "last_updated_by" character varying NOT NULL DEFAULT '',
                CONSTRAINT "pk_events_id" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
            DROP TABLE "events"
        `);
    }
}
