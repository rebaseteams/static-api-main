import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateEventTable1650617898219 implements MigrationInterface {
    name = 'updateEventTable1650617898219'

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
            ALTER TABLE "events"
            ADD "approx_budget" double precision NOT NULL DEFAULT '0'
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
            ALTER TABLE "events" DROP COLUMN "approx_budget"
        `);
    }
}
