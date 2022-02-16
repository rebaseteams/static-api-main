import { MigrationInterface, QueryRunner } from 'typeorm';

export class revertChanges1645000966798 implements MigrationInterface {
    name = 'revertChanges1645000966798'

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
            ALTER TABLE "pg_resource_entity_actions_actions" DROP CONSTRAINT "fk_pg_resource_entity_actions_actions_pg_resource_entity_id__pg"
        `);
      await queryRunner.query(`
            ALTER TABLE "pg_role_entity_resources_pg_resource_entity" DROP CONSTRAINT "fk_pg_role_entity_resources_pg_resource_entity_pg_role_entity_i"
        `);
      await queryRunner.query(`
            ALTER TABLE "pg_role_entity_resources_pg_resource_entity" DROP CONSTRAINT "fk_pg_role_entity_resources_pg_resource_entity_pg_resource_enti"
        `);
      await queryRunner.query(`
            DROP INDEX "public"."idx_pg_role_entity_resources_pg_resource_entity_pg_role_entity_"
        `);
      await queryRunner.query(`
            DROP INDEX "public"."idx_pg_role_entity_resources_pg_resource_entity_pg_resource_ent"
        `);
      await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "roles"
        `);
      await queryRunner.query(`
            ALTER TABLE "user"
            ALTER COLUMN "approved"
            SET DEFAULT false
        `);
      await queryRunner.query(`
            CREATE INDEX "idx_pg_role_entity_resources_pg_resource_entity_pg_role_entity_id" ON "pg_role_entity_resources_pg_resource_entity" ("pg_role_entity_id")
        `);
      await queryRunner.query(`
            CREATE INDEX "idx_pg_role_entity_resources_pg_resource_entity_pg_resource_entity_id" ON "pg_role_entity_resources_pg_resource_entity" ("pg_resource_entity_id")
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
            DROP INDEX "public"."idx_pg_role_entity_resources_pg_resource_entity_pg_resource_entity_id"
        `);
      await queryRunner.query(`
            DROP INDEX "public"."idx_pg_role_entity_resources_pg_resource_entity_pg_role_entity_id"
        `);
      await queryRunner.query(`
            ALTER TABLE "user"
            ALTER COLUMN "approved" DROP DEFAULT
        `);
      await queryRunner.query(`
            ALTER TABLE "user"
            ADD "roles" text array NOT NULL
        `);
      await queryRunner.query(`
            CREATE INDEX "idx_pg_role_entity_resources_pg_resource_entity_pg_resource_ent" ON "pg_role_entity_resources_pg_resource_entity" ("pg_resource_entity_id")
        `);
      await queryRunner.query(`
            CREATE INDEX "idx_pg_role_entity_resources_pg_resource_entity_pg_role_entity_" ON "pg_role_entity_resources_pg_resource_entity" ("pg_role_entity_id")
        `);
      await queryRunner.query(`
            ALTER TABLE "pg_role_entity_resources_pg_resource_entity"
            ADD CONSTRAINT "fk_pg_role_entity_resources_pg_resource_entity_pg_resource_enti" FOREIGN KEY ("pg_resource_entity_id") REFERENCES "pg_resource_entity"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
      await queryRunner.query(`
            ALTER TABLE "pg_role_entity_resources_pg_resource_entity"
            ADD CONSTRAINT "fk_pg_role_entity_resources_pg_resource_entity_pg_role_entity_i" FOREIGN KEY ("pg_role_entity_id") REFERENCES "pg_role_entity"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
      await queryRunner.query(`
            ALTER TABLE "pg_resource_entity_actions_actions"
            ADD CONSTRAINT "fk_pg_resource_entity_actions_actions_pg_resource_entity_id__pg" FOREIGN KEY ("pg_resource_entity_id") REFERENCES "pg_resource_entity"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    }
}
