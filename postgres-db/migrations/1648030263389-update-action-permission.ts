import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateActionPermission1648030263389 implements MigrationInterface {
    name = 'updateActionPermission1648030263389'

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
            ALTER TABLE "actions_permissions"
            ADD CONSTRAINT "super_key" UNIQUE ("role_permission_id", "user_id")
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
            ALTER TABLE "actions_permissions" DROP CONSTRAINT "super_key"
        `);
    }
}
