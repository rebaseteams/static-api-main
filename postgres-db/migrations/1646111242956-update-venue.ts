import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateVenue1646111242956 implements MigrationInterface {
    name = 'updateVenue1646111242956'

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
            ALTER TABLE "venue" DROP COLUMN "last_modified_at"
        `);
      await queryRunner.query(`
            ALTER TABLE "venue" DROP COLUMN "last_modified_by"
        `);
      await queryRunner.query(`
            ALTER TABLE "venue"
            ADD "last_updated_by" character varying NOT NULL DEFAULT ''
        `);
      await queryRunner.query(`
            ALTER TABLE "venue"
            ADD "last_updated_at" date NOT NULL DEFAULT now()
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
            ALTER TABLE "venue" DROP COLUMN "last_updated_at"
        `);
      await queryRunner.query(`
            ALTER TABLE "venue" DROP COLUMN "last_updated_by"
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
}
