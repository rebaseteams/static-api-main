import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateVenue1648030123492 implements MigrationInterface {
    name = 'updateVenue1648030123492'

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
            ALTER TABLE "actions_permissions" DROP CONSTRAINT "ap_unique_constraint"
        `);
      await queryRunner.query(`
            ALTER TABLE "actions_permissions" DROP COLUMN "permission"
        `);
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
            ALTER TABLE "actions_permissions"
            ALTER COLUMN "action_id" DROP NOT NULL
        `);
      await queryRunner.query(`
            ALTER TABLE "actions_permissions"
            ALTER COLUMN "resource_id" DROP NOT NULL
        `);
      await queryRunner.query(`
            ALTER TABLE "actions_permissions"
            ALTER COLUMN "role_id" DROP NOT NULL
        `);
      await queryRunner.query(`
            ALTER TABLE "actions_permissions"
            ADD CONSTRAINT "fk_actions_permissions_action_id__actions" FOREIGN KEY ("action_id") REFERENCES "actions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
      await queryRunner.query(`
            ALTER TABLE "actions_permissions"
            ADD CONSTRAINT "fk_actions_permissions_resource_id__resource" FOREIGN KEY ("resource_id") REFERENCES "resource"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
      await queryRunner.query(`
            ALTER TABLE "actions_permissions"
            ADD CONSTRAINT "fk_actions_permissions_role_id__role" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
            ALTER TABLE "actions_permissions" DROP CONSTRAINT "fk_actions_permissions_role_id__role"
        `);
      await queryRunner.query(`
            ALTER TABLE "actions_permissions" DROP CONSTRAINT "fk_actions_permissions_resource_id__resource"
        `);
      await queryRunner.query(`
            ALTER TABLE "actions_permissions" DROP CONSTRAINT "fk_actions_permissions_action_id__actions"
        `);
      await queryRunner.query(`
            ALTER TABLE "actions_permissions"
            ALTER COLUMN "role_id"
            SET NOT NULL
        `);
      await queryRunner.query(`
            ALTER TABLE "actions_permissions"
            ALTER COLUMN "resource_id"
            SET NOT NULL
        `);
      await queryRunner.query(`
            ALTER TABLE "actions_permissions"
            ALTER COLUMN "action_id"
            SET NOT NULL
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
      await queryRunner.query(`
            ALTER TABLE "actions_permissions"
            ADD "permission" boolean NOT NULL DEFAULT false
        `);
      await queryRunner.query(`
            ALTER TABLE "actions_permissions"
            ADD CONSTRAINT "ap_unique_constraint" UNIQUE ("user_id", "role_id", "resource_id", "action_id")
        `);
    }
}
