import { MigrationInterface, QueryRunner } from 'typeorm';

export class setupMissingRelation1645259851533 implements MigrationInterface {
    name = 'setupMissingRelation1645259851533'

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
            ALTER TABLE "actions_permissions"
            ADD "role_permission_id" uuid NOT NULL
        `);
      await queryRunner.query(`
            ALTER TABLE "actions_permissions"
            ADD CONSTRAINT "uc_actions_permissions_role_permission_id" UNIQUE ("role_permission_id")
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
            ALTER TABLE "actions_permissions" DROP CONSTRAINT "uc_actions_permissions_role_permission_id"
        `);
      await queryRunner.query(`
            ALTER TABLE "actions_permissions" DROP COLUMN "role_permission_id"
        `);
    }
}
