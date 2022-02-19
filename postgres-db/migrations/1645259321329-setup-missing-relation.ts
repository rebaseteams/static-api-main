import { MigrationInterface, QueryRunner } from 'typeorm';

export class setupMissingRelation1645259321329 implements MigrationInterface {
    name = 'setupMissingRelation1645259321329'

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
            CREATE TABLE "role_permissions" (
                "id" uuid NOT NULL,
                "role_id" uuid NOT NULL,
                "resource_id" uuid NOT NULL,
                "action_id" uuid NOT NULL,
                "permission" boolean NOT NULL DEFAULT false,
                CONSTRAINT "rp_unique_constraint" UNIQUE ("action_id", "role_id", "resource_id"),
                CONSTRAINT "REL_ecb74533dc9bffc56ffcb97450" UNIQUE ("action_id"),
                CONSTRAINT "REL_bcc469570df0158006c95ea111" UNIQUE ("resource_id"),
                CONSTRAINT "REL_178199805b901ccd220ab7740e" UNIQUE ("role_id"),
                CONSTRAINT "pk_role_permissions_id" PRIMARY KEY ("id")
            )
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

    public async down(queryRunner: QueryRunner): Promise<void> {
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
            DROP TABLE "role_permissions"
        `);
    }
}
