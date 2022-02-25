import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateVenue1645791962724 implements MigrationInterface {
    name = 'updateVenue1645791962724'

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
            ALTER TABLE "venue"
            ADD "bowie_venue_id" character varying NOT NULL DEFAULT ''
        `);
      await queryRunner.query(`
            ALTER TABLE "venue"
            ADD "url" character varying NOT NULL DEFAULT ''
        `);
      await queryRunner.query(`
            ALTER TABLE "venue"
            ADD "lat" double precision NOT NULL DEFAULT '0'
        `);
      await queryRunner.query(`
            ALTER TABLE "venue"
            ADD "long" double precision NOT NULL DEFAULT '0'
        `);
      await queryRunner.query(`
            ALTER TABLE "venue"
            ADD "street" character varying NOT NULL DEFAULT ''
        `);
      await queryRunner.query(`
            ALTER TABLE "venue"
            ADD "city" character varying NOT NULL DEFAULT ''
        `);
      await queryRunner.query(`
            ALTER TABLE "venue"
            ADD "state" character varying NOT NULL DEFAULT ''
        `);
      await queryRunner.query(`
            ALTER TABLE "venue"
            ADD "postal_code" character varying NOT NULL DEFAULT ''
        `);
      await queryRunner.query(`
            ALTER TABLE "venue"
            ADD "country" character varying NOT NULL DEFAULT ''
        `);
      await queryRunner.query(`
            ALTER TABLE "venue"
            ADD "comments" text NOT NULL DEFAULT ''
        `);
      await queryRunner.query(`
            ALTER TABLE "venue"
            ADD "last_modified_by" character varying NOT NULL DEFAULT ''
        `);
      await queryRunner.query(`
            ALTER TABLE "venue"
            ADD "last_modified_at" date NOT NULL DEFAULT now()
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
            ALTER TABLE "venue" DROP COLUMN "last_modified_at"
        `);
      await queryRunner.query(`
            ALTER TABLE "venue" DROP COLUMN "last_modified_by"
        `);
      await queryRunner.query(`
            ALTER TABLE "venue" DROP COLUMN "comments"
        `);
      await queryRunner.query(`
            ALTER TABLE "venue" DROP COLUMN "country"
        `);
      await queryRunner.query(`
            ALTER TABLE "venue" DROP COLUMN "postal_code"
        `);
      await queryRunner.query(`
            ALTER TABLE "venue" DROP COLUMN "state"
        `);
      await queryRunner.query(`
            ALTER TABLE "venue" DROP COLUMN "city"
        `);
      await queryRunner.query(`
            ALTER TABLE "venue" DROP COLUMN "street"
        `);
      await queryRunner.query(`
            ALTER TABLE "venue" DROP COLUMN "long"
        `);
      await queryRunner.query(`
            ALTER TABLE "venue" DROP COLUMN "lat"
        `);
      await queryRunner.query(`
            ALTER TABLE "venue" DROP COLUMN "url"
        `);
      await queryRunner.query(`
            ALTER TABLE "venue" DROP COLUMN "bowie_venue_id"
        `);
    }
}
