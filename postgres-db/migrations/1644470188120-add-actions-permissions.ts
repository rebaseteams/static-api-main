import { MigrationInterface, QueryRunner } from 'typeorm';

export class addActionsPermissions1644470188120 implements MigrationInterface {
    name = 'addActionsPermissions1644470188120'

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
            ALTER TABLE "pg_resource_entity_actions_actions" DROP CONSTRAINT "fk_pg_resource_entity_actions_actions_pg_resource_entity_id__pg"
        `);
      await queryRunner.query(`
            CREATE TABLE "actions_permissions" (
                "id" uuid NOT NULL,
                "user_id" character varying NOT NULL,
                "role_id" character varying NOT NULL,
                "resource_id" character varying NOT NULL,
                "action_id" character varying NOT NULL,
                "permission" boolean NOT NULL DEFAULT false,
                CONSTRAINT "ap_unique_constraint" UNIQUE ("action_id", "role_id", "resource_id", "user_id"),
                CONSTRAINT "pk_actions_permissions_id" PRIMARY KEY ("id")
            )
        `);
      await queryRunner.query(`
            CREATE TABLE "pg_role_entity_resources_pg_resource_entity" (
                "pg_role_entity_id" character varying NOT NULL,
                "pg_resource_entity_id" character varying NOT NULL,
                CONSTRAINT "pk_pg_role_entity_resources_pg_resource_entity_pg_role_entity_id_pg_resource_entity_id" PRIMARY KEY ("pg_role_entity_id", "pg_resource_entity_id")
            )
        `);
      await queryRunner.query(`
            CREATE INDEX "idx_pg_role_entity_resources_pg_resource_entity_pg_role_entity_id" ON "pg_role_entity_resources_pg_resource_entity" ("pg_role_entity_id")
        `);
      await queryRunner.query(`
            CREATE INDEX "idx_pg_role_entity_resources_pg_resource_entity_pg_resource_entity_id" ON "pg_role_entity_resources_pg_resource_entity" ("pg_resource_entity_id")
        `);
      await queryRunner.query(`
            ALTER TABLE "pg_role_entity" DROP COLUMN "resource_actions"
        `);
      await queryRunner.query(`
            ALTER TABLE "pg_resource_entity_actions_actions"
            ADD CONSTRAINT "fk_pg_resource_entity_actions_actions_pg_resource_entity_id__pg_resource_entity" FOREIGN KEY ("pg_resource_entity_id") REFERENCES "pg_resource_entity"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
      await queryRunner.query(`
            ALTER TABLE "pg_role_entity_resources_pg_resource_entity"
            ADD CONSTRAINT "fk_pg_role_entity_resources_pg_resource_entity_pg_role_entity_id__pg_role_entity" FOREIGN KEY ("pg_role_entity_id") REFERENCES "pg_role_entity"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
      await queryRunner.query(`
            ALTER TABLE "pg_role_entity_resources_pg_resource_entity"
            ADD CONSTRAINT "fk_pg_role_entity_resources_pg_resource_entity_pg_resource_entity_id__pg_resource_entity" FOREIGN KEY ("pg_resource_entity_id") REFERENCES "pg_resource_entity"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
            ALTER TABLE "pg_role_entity_resources_pg_resource_entity" DROP CONSTRAINT "fk_pg_role_entity_resources_pg_resource_entity_pg_resource_entity_id__pg_resource_entity"
        `);
      await queryRunner.query(`
            ALTER TABLE "pg_role_entity_resources_pg_resource_entity" DROP CONSTRAINT "fk_pg_role_entity_resources_pg_resource_entity_pg_role_entity_id__pg_role_entity"
        `);
      await queryRunner.query(`
            ALTER TABLE "pg_resource_entity_actions_actions" DROP CONSTRAINT "fk_pg_resource_entity_actions_actions_pg_resource_entity_id__pg_resource_entity"
        `);
      await queryRunner.query(`
            ALTER TABLE "pg_role_entity"
            ADD "resource_actions" jsonb NOT NULL
        `);
      await queryRunner.query(`
            DROP INDEX "public"."idx_pg_role_entity_resources_pg_resource_entity_pg_resource_entity_id"
        `);
      await queryRunner.query(`
            DROP INDEX "public"."idx_pg_role_entity_resources_pg_resource_entity_pg_role_entity_id"
        `);
      await queryRunner.query(`
            DROP TABLE "pg_role_entity_resources_pg_resource_entity"
        `);
      await queryRunner.query(`
            DROP TABLE "actions_permissions"
        `);
      await queryRunner.query(`
            ALTER TABLE "pg_resource_entity_actions_actions"
            ADD CONSTRAINT "fk_pg_resource_entity_actions_actions_pg_resource_entity_id__pg" FOREIGN KEY ("pg_resource_entity_id") REFERENCES "pg_resource_entity"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    }
}
