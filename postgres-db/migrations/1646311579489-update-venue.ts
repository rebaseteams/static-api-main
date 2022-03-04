import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateVenue1646311579489 implements MigrationInterface {
    name = 'updateVenue1646311579489'

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
            CREATE TABLE "events_type" (
                "id" uuid NOT NULL,
                "name" character varying NOT NULL DEFAULT '',
                "description" character varying NOT NULL DEFAULT '',
                "comments" character varying NOT NULL DEFAULT '',
                "last_updated_at" date NOT NULL DEFAULT now(),
                "last_updated_by" character varying NOT NULL DEFAULT '',
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
