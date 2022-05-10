import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateBrandTable1652252218593 implements MigrationInterface {
    name = 'updateBrandTable1652252218593'

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
            ALTER TABLE "brand"
            ADD "bowie_brand_id" uuid
        `);
      await queryRunner.query(`
            ALTER TABLE "brand"
            ADD "demographics" jsonb
        `);
      await queryRunner.query(`
            ALTER TABLE "brand"
            ADD "media_handles" jsonb
        `);
      await queryRunner.query(`
            ALTER TABLE "brand"
            ADD "industry" jsonb DEFAULT '[]'
        `);
      await queryRunner.query(`
            ALTER TABLE "brand"
            ADD "comments" text DEFAULT ''
        `);
      await queryRunner.query(`
            ALTER TABLE "brand"
            ADD "last_updated_by" character varying DEFAULT ''
        `);
      await queryRunner.query(`
            ALTER TABLE "brand"
            ADD "last_modified_at" TIMESTAMP NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
            ALTER TABLE "brand" DROP COLUMN "last_modified_at"
        `);
      await queryRunner.query(`
            ALTER TABLE "brand" DROP COLUMN "last_updated_by"
        `);
      await queryRunner.query(`
            ALTER TABLE "brand" DROP COLUMN "comments"
        `);
      await queryRunner.query(`
            ALTER TABLE "brand" DROP COLUMN "industry"
        `);
      await queryRunner.query(`
            ALTER TABLE "brand" DROP COLUMN "media_handles"
        `);
      await queryRunner.query(`
            ALTER TABLE "brand" DROP COLUMN "demographics"
        `);
      await queryRunner.query(`
            ALTER TABLE "brand" DROP COLUMN "bowie_brand_id"
        `);
    }
}
