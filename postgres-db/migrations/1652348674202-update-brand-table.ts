import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateBrandTable1652348674202 implements MigrationInterface {
    name = 'updateBrandTable1652348674202'

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
            ALTER TABLE "brand"
            ALTER COLUMN "last_modified_at"
            SET NOT NULL
        `);
      await queryRunner.query(`
            ALTER TABLE "brand"
            ALTER COLUMN "last_modified_at"
            SET DEFAULT now()
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
            ALTER TABLE "brand"
            ALTER COLUMN "last_modified_at" DROP DEFAULT
        `);
      await queryRunner.query(`
            ALTER TABLE "brand"
            ALTER COLUMN "last_modified_at" DROP NOT NULL
        `);
    }
}
