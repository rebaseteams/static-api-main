import { MigrationInterface, QueryRunner } from 'typeorm';

export class removeActionsFromResource1644426886003 implements MigrationInterface {
    name = 'removeActionsFromResource1644426886003'

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
            CREATE TABLE "pg_role_entity" (
                "id" character varying NOT NULL,
                "name" character varying NOT NULL,
                "resource_actions" jsonb NOT NULL,
                CONSTRAINT "pk_pg_role_entity_id" PRIMARY KEY ("id")
            )
        `);
      await queryRunner.query(`
            CREATE TABLE "pg_resource_entity" (
                "id" character varying NOT NULL,
                "name" character varying NOT NULL,
                CONSTRAINT "pk_pg_resource_entity_id" PRIMARY KEY ("id")
            )
        `);
      await queryRunner.query(`
            CREATE TABLE "user_roles_pg_role_entity" (
                "user_id" character varying NOT NULL,
                "pg_role_entity_id" character varying NOT NULL,
                CONSTRAINT "pk_user_roles_pg_role_entity_user_id_pg_role_entity_id" PRIMARY KEY ("user_id", "pg_role_entity_id")
            )
        `);
      await queryRunner.query(`
            CREATE INDEX "idx_user_roles_pg_role_entity_user_id" ON "user_roles_pg_role_entity" ("user_id")
        `);
      await queryRunner.query(`
            CREATE INDEX "idx_user_roles_pg_role_entity_pg_role_entity_id" ON "user_roles_pg_role_entity" ("pg_role_entity_id")
        `);
      await queryRunner.query(`
            CREATE TABLE "pg_resource_entity_actions_actions" (
                "pg_resource_entity_id" character varying NOT NULL,
                "actions_id" uuid NOT NULL,
                CONSTRAINT "pk_pg_resource_entity_actions_actions_pg_resource_entity_id_actions_id" PRIMARY KEY ("pg_resource_entity_id", "actions_id")
            )
        `);
      await queryRunner.query(`
            CREATE INDEX "idx_pg_resource_entity_actions_actions_pg_resource_entity_id" ON "pg_resource_entity_actions_actions" ("pg_resource_entity_id")
        `);
      await queryRunner.query(`
            CREATE INDEX "idx_pg_resource_entity_actions_actions_actions_id" ON "pg_resource_entity_actions_actions" ("actions_id")
        `);
      await queryRunner.query(`
            ALTER TABLE "user"
            ALTER COLUMN "approved"
            SET NOT NULL
        `);
      await queryRunner.query(`
            ALTER TABLE "user"
            ALTER COLUMN "approved"
            SET DEFAULT false
        `);
      await queryRunner.query(`
            ALTER TABLE "user_roles_pg_role_entity"
            ADD CONSTRAINT "fk_user_roles_pg_role_entity_user_id__user" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
      await queryRunner.query(`
            ALTER TABLE "user_roles_pg_role_entity"
            ADD CONSTRAINT "fk_user_roles_pg_role_entity_pg_role_entity_id__pg_role_entity" FOREIGN KEY ("pg_role_entity_id") REFERENCES "pg_role_entity"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
      await queryRunner.query(`
            ALTER TABLE "pg_resource_entity_actions_actions"
            ADD CONSTRAINT "fk_pg_resource_entity_actions_actions_pg_resource_entity_id__pg_resource_entity" FOREIGN KEY ("pg_resource_entity_id") REFERENCES "pg_resource_entity"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
      await queryRunner.query(`
            ALTER TABLE "pg_resource_entity_actions_actions"
            ADD CONSTRAINT "fk_pg_resource_entity_actions_actions_actions_id__actions" FOREIGN KEY ("actions_id") REFERENCES "actions"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
            ALTER TABLE "pg_resource_entity_actions_actions" DROP CONSTRAINT "fk_pg_resource_entity_actions_actions_actions_id__actions"
        `);
      await queryRunner.query(`
            ALTER TABLE "pg_resource_entity_actions_actions" DROP CONSTRAINT "fk_pg_resource_entity_actions_actions_pg_resource_entity_id__pg_resource_entity"
        `);
      await queryRunner.query(`
            ALTER TABLE "user_roles_pg_role_entity" DROP CONSTRAINT "fk_user_roles_pg_role_entity_pg_role_entity_id__pg_role_entity"
        `);
      await queryRunner.query(`
            ALTER TABLE "user_roles_pg_role_entity" DROP CONSTRAINT "fk_user_roles_pg_role_entity_user_id__user"
        `);
      await queryRunner.query(`
            ALTER TABLE "user"
            ALTER COLUMN "approved" DROP DEFAULT
        `);
      await queryRunner.query(`
            ALTER TABLE "user"
            ALTER COLUMN "approved" DROP NOT NULL
        `);
      await queryRunner.query(`
            DROP INDEX "public"."idx_pg_resource_entity_actions_actions_actions_id"
        `);
      await queryRunner.query(`
            DROP INDEX "public"."idx_pg_resource_entity_actions_actions_pg_resource_entity_id"
        `);
      await queryRunner.query(`
            DROP TABLE "pg_resource_entity_actions_actions"
        `);
      await queryRunner.query(`
            DROP INDEX "public"."idx_user_roles_pg_role_entity_pg_role_entity_id"
        `);
      await queryRunner.query(`
            DROP INDEX "public"."idx_user_roles_pg_role_entity_user_id"
        `);
      await queryRunner.query(`
            DROP TABLE "user_roles_pg_role_entity"
        `);
      await queryRunner.query(`
            DROP TABLE "pg_resource_entity"
        `);
      await queryRunner.query(`
            DROP TABLE "pg_role_entity"
        `);
    }
}
