import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateActionPermission1648466396672 implements MigrationInterface {
    name = 'updateActionPermission1648466396672'

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
            ALTER TABLE "actions_permissions" DROP CONSTRAINT "fk_actions_permissions_action_id__actions"
        `);
      await queryRunner.query(`
            ALTER TABLE "actions_permissions" DROP CONSTRAINT "fk_actions_permissions_resource_id__resource"
        `);
      await queryRunner.query(`
            ALTER TABLE "actions_permissions" DROP CONSTRAINT "fk_actions_permissions_role_id__role"
        `);
      await queryRunner.query(`
            ALTER TABLE "actions_permissions" DROP CONSTRAINT "fk_actions_permissions_user_id__user"
        `);
      await queryRunner.query(`
            ALTER TABLE "actions_permissions" DROP COLUMN "role_id"
        `);
      await queryRunner.query(`
            ALTER TABLE "actions_permissions" DROP COLUMN "resource_id"
        `);
      await queryRunner.query(`
            ALTER TABLE "actions_permissions" DROP COLUMN "action_id"
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
            ALTER TABLE "actions_permissions"
            ADD "action_id" uuid
        `);
      await queryRunner.query(`
            ALTER TABLE "actions_permissions"
            ADD "resource_id" uuid
        `);
      await queryRunner.query(`
            ALTER TABLE "actions_permissions"
            ADD "role_id" uuid
        `);
      await queryRunner.query(`
            ALTER TABLE "actions_permissions"
            ADD CONSTRAINT "fk_actions_permissions_user_id__user" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
      await queryRunner.query(`
            ALTER TABLE "actions_permissions"
            ADD CONSTRAINT "fk_actions_permissions_role_id__role" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
      await queryRunner.query(`
            ALTER TABLE "actions_permissions"
            ADD CONSTRAINT "fk_actions_permissions_resource_id__resource" FOREIGN KEY ("resource_id") REFERENCES "resource"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
      await queryRunner.query(`
            ALTER TABLE "actions_permissions"
            ADD CONSTRAINT "fk_actions_permissions_action_id__actions" FOREIGN KEY ("action_id") REFERENCES "actions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }
}
