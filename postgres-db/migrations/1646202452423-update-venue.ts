import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateVenue1646202452423 implements MigrationInterface {
    name = 'updateVenue1646202452423'

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
            ALTER TABLE "events_type"
            ALTER COLUMN "name"
            SET DEFAULT ''
        `);
      await queryRunner.query(`
            ALTER TABLE "events_type"
            ALTER COLUMN "description"
            SET DEFAULT ''
        `);
      await queryRunner.query(`
            ALTER TABLE "events_type"
            ALTER COLUMN "comments"
            SET DEFAULT ''
        `);
      await queryRunner.query(`
            ALTER TABLE "events_type" DROP COLUMN "last_updated_at"
        `);
      await queryRunner.query(`
            ALTER TABLE "events_type"
            ADD "last_updated_at" date NOT NULL DEFAULT now()
        `);
      await queryRunner.query(`
            ALTER TABLE "events_type"
            ALTER COLUMN "last_updated_by"
            SET DEFAULT ''
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
            ALTER TABLE "events_type"
            ALTER COLUMN "last_updated_by" DROP DEFAULT
        `);
      await queryRunner.query(`
            ALTER TABLE "events_type" DROP COLUMN "last_updated_at"
        `);
      await queryRunner.query(`
            ALTER TABLE "events_type"
            ADD "last_updated_at" character varying NOT NULL
        `);
      await queryRunner.query(`
            ALTER TABLE "events_type"
            ALTER COLUMN "comments" DROP DEFAULT
        `);
      await queryRunner.query(`
            ALTER TABLE "events_type"
            ALTER COLUMN "description" DROP DEFAULT
        `);
      await queryRunner.query(`
            ALTER TABLE "events_type"
            ALTER COLUMN "name" DROP DEFAULT
        `);
    }
}
