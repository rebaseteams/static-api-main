import { MigrationInterface, QueryRunner } from 'typeorm';

export class roleUserRelation1644404651191 implements MigrationInterface {
    name = 'roleUserRelation1644404651191'

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "roles"
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
            ALTER TABLE "user"
            ADD "roles" text array NOT NULL
        `);
    }
}
