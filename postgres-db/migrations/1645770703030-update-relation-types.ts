import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateRelationTypes1645770703030 implements MigrationInterface {
    name = 'updateRelationTypes1645770703030'

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
            ALTER TABLE "role_permissions" DROP CONSTRAINT "fk_role_permissions_role_id__role"
        `);
      await queryRunner.query(`
            ALTER TABLE "role_permissions" DROP CONSTRAINT "fk_role_permissions_resource_id__resource"
        `);
      await queryRunner.query(`
            ALTER TABLE "role_permissions" DROP CONSTRAINT "fk_role_permissions_action_id__actions"
        `);
      await queryRunner.query(`
            ALTER TABLE "role_permissions" DROP CONSTRAINT "rp_unique_constraint"
        `);
      await queryRunner.query(`
            ALTER TABLE "role_permissions" DROP CONSTRAINT "REL_178199805b901ccd220ab7740e"
        `);
      await queryRunner.query(`
            ALTER TABLE "role_permissions" DROP CONSTRAINT "REL_bcc469570df0158006c95ea111"
        `);
      await queryRunner.query(`
            ALTER TABLE "role_permissions" DROP CONSTRAINT "REL_ecb74533dc9bffc56ffcb97450"
        `);
      await queryRunner.query(`
            ALTER TABLE "actions_permissions" DROP CONSTRAINT "fk_actions_permissions_user_id__user"
        `);
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
            ALTER TABLE "actions_permissions" DROP CONSTRAINT "fk_actions_permissions_role_permission_id__role_permissions"
        `);
      await queryRunner.query(`
            ALTER TABLE "actions_permissions" DROP CONSTRAINT "ap_unique_constraint"
        `);
      await queryRunner.query(`
            ALTER TABLE "actions_permissions" DROP CONSTRAINT "REL_0fa28aa07529bad4909da7b424"
        `);
      await queryRunner.query(`
            ALTER TABLE "actions_permissions" DROP CONSTRAINT "REL_055fa97d2ed0aed7970c1df03b"
        `);
      await queryRunner.query(`
            ALTER TABLE "actions_permissions" DROP CONSTRAINT "REL_23c4c2b8904e64795a6662fb11"
        `);
      await queryRunner.query(`
            ALTER TABLE "actions_permissions" DROP CONSTRAINT "REL_74673dbf2b1297e062ed28c419"
        `);
      await queryRunner.query(`
            ALTER TABLE "actions_permissions" DROP CONSTRAINT "uc_actions_permissions_role_permission_id"
        `);
      await queryRunner.query(`
            ALTER TABLE "role_permissions"
            ADD CONSTRAINT "rp_unique_constraint" UNIQUE ("action_id", "role_id", "resource_id")
        `);
      await queryRunner.query(`
            ALTER TABLE "actions_permissions"
            ADD CONSTRAINT "ap_unique_constraint" UNIQUE ("action_id", "role_id", "resource_id", "user_id")
        `);
      await queryRunner.query(`
            ALTER TABLE "role_permissions"
            ADD CONSTRAINT "fk_role_permissions_action_id__actions" FOREIGN KEY ("action_id") REFERENCES "actions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
      await queryRunner.query(`
            ALTER TABLE "role_permissions"
            ADD CONSTRAINT "fk_role_permissions_resource_id__resource" FOREIGN KEY ("resource_id") REFERENCES "resource"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
      await queryRunner.query(`
            ALTER TABLE "role_permissions"
            ADD CONSTRAINT "fk_role_permissions_role_id__role" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
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
      await queryRunner.query(`
            ALTER TABLE "actions_permissions"
            ADD CONSTRAINT "fk_actions_permissions_user_id__user" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
      await queryRunner.query(`
            ALTER TABLE "actions_permissions"
            ADD CONSTRAINT "fk_actions_permissions_role_permission_id__role_permissions" FOREIGN KEY ("role_permission_id") REFERENCES "role_permissions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
            ALTER TABLE "actions_permissions" DROP CONSTRAINT "fk_actions_permissions_role_permission_id__role_permissions"
        `);
      await queryRunner.query(`
            ALTER TABLE "actions_permissions" DROP CONSTRAINT "fk_actions_permissions_user_id__user"
        `);
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
            ALTER TABLE "role_permissions" DROP CONSTRAINT "fk_role_permissions_role_id__role"
        `);
      await queryRunner.query(`
            ALTER TABLE "role_permissions" DROP CONSTRAINT "fk_role_permissions_resource_id__resource"
        `);
      await queryRunner.query(`
            ALTER TABLE "role_permissions" DROP CONSTRAINT "fk_role_permissions_action_id__actions"
        `);
      await queryRunner.query(`
            ALTER TABLE "actions_permissions" DROP CONSTRAINT "ap_unique_constraint"
        `);
      await queryRunner.query(`
            ALTER TABLE "role_permissions" DROP CONSTRAINT "rp_unique_constraint"
        `);
      await queryRunner.query(`
            ALTER TABLE "actions_permissions"
            ADD CONSTRAINT "uc_actions_permissions_role_permission_id" UNIQUE ("role_permission_id")
        `);
      await queryRunner.query(`
            ALTER TABLE "actions_permissions"
            ADD CONSTRAINT "REL_74673dbf2b1297e062ed28c419" UNIQUE ("action_id")
        `);
      await queryRunner.query(`
            ALTER TABLE "actions_permissions"
            ADD CONSTRAINT "REL_23c4c2b8904e64795a6662fb11" UNIQUE ("resource_id")
        `);
      await queryRunner.query(`
            ALTER TABLE "actions_permissions"
            ADD CONSTRAINT "REL_055fa97d2ed0aed7970c1df03b" UNIQUE ("role_id")
        `);
      await queryRunner.query(`
            ALTER TABLE "actions_permissions"
            ADD CONSTRAINT "REL_0fa28aa07529bad4909da7b424" UNIQUE ("user_id")
        `);
      await queryRunner.query(`
            ALTER TABLE "actions_permissions"
            ADD CONSTRAINT "ap_unique_constraint" UNIQUE ("user_id", "role_id", "resource_id", "action_id")
        `);
      await queryRunner.query(`
            ALTER TABLE "actions_permissions"
            ADD CONSTRAINT "fk_actions_permissions_role_permission_id__role_permissions" FOREIGN KEY ("role_permission_id") REFERENCES "role_permissions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
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
      await queryRunner.query(`
            ALTER TABLE "actions_permissions"
            ADD CONSTRAINT "fk_actions_permissions_user_id__user" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
      await queryRunner.query(`
            ALTER TABLE "role_permissions"
            ADD CONSTRAINT "REL_ecb74533dc9bffc56ffcb97450" UNIQUE ("action_id")
        `);
      await queryRunner.query(`
            ALTER TABLE "role_permissions"
            ADD CONSTRAINT "REL_bcc469570df0158006c95ea111" UNIQUE ("resource_id")
        `);
      await queryRunner.query(`
            ALTER TABLE "role_permissions"
            ADD CONSTRAINT "REL_178199805b901ccd220ab7740e" UNIQUE ("role_id")
        `);
      await queryRunner.query(`
            ALTER TABLE "role_permissions"
            ADD CONSTRAINT "rp_unique_constraint" UNIQUE ("role_id", "resource_id", "action_id")
        `);
      await queryRunner.query(`
            ALTER TABLE "role_permissions"
            ADD CONSTRAINT "fk_role_permissions_action_id__actions" FOREIGN KEY ("action_id") REFERENCES "actions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
      await queryRunner.query(`
            ALTER TABLE "role_permissions"
            ADD CONSTRAINT "fk_role_permissions_resource_id__resource" FOREIGN KEY ("resource_id") REFERENCES "resource"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
      await queryRunner.query(`
            ALTER TABLE "role_permissions"
            ADD CONSTRAINT "fk_role_permissions_role_id__role" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }
}
