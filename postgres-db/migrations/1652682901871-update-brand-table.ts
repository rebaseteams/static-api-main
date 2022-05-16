import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateBrandTable1652682901871 implements MigrationInterface {
    name = 'updateBrandTable1652682901871'

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
            ALTER TABLE "brand" DROP COLUMN "bowie_brand_id"
        `);
      await queryRunner.query(`
            ALTER TABLE "brand"
            ADD "bowie_brand_id" character varying NOT NULL DEFAULT ''
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
            ALTER TABLE "brand" DROP COLUMN "bowie_brand_id"
        `);
      await queryRunner.query(`
            ALTER TABLE "brand"
            ADD "bowie_brand_id" uuid
        `);
    }
}
