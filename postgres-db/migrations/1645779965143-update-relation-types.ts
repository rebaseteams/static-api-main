import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateRelationTypes1645779965143 implements MigrationInterface {
    name = 'updateRelationTypes1645779965143'

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
            ALTER TABLE "user"
            ALTER COLUMN "approved" DROP DEFAULT
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
            ALTER TABLE "user"
            ALTER COLUMN "approved"
            SET DEFAULT false
        `);
    }
}
