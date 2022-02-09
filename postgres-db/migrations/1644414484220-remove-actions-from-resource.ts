import { MigrationInterface, QueryRunner } from 'typeorm';

export class removeActionsFromResource1644414484220 implements MigrationInterface {
    name = 'removeActionsFromResource1644414484220'

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
            CREATE TABLE "actions" (
                "id" uuid NOT NULL,
                "name" character varying NOT NULL,
                CONSTRAINT "pk_actions_id" PRIMARY KEY ("id")
            )
        `);
      await queryRunner.query(`
            CREATE INDEX "idx_actions_name" ON "actions" ("name")
        `);
      await queryRunner.query(`
            CREATE TABLE "resource_actions_actions" (
                "resource_id" character varying NOT NULL,
                "actions_id" uuid NOT NULL,
                CONSTRAINT "pk_resource_actions_actions_resource_id_actions_id" PRIMARY KEY ("resource_id", "actions_id")
            )
        `);
      await queryRunner.query(`
            CREATE INDEX "idx_resource_actions_actions_resource_id" ON "resource_actions_actions" ("resource_id")
        `);
      await queryRunner.query(`
            CREATE INDEX "idx_resource_actions_actions_actions_id" ON "resource_actions_actions" ("actions_id")
        `);
      await queryRunner.query(`
            ALTER TABLE "resource" DROP COLUMN "actions"
        `);
      await queryRunner.query(`
            ALTER TABLE "resource_actions_actions"
            ADD CONSTRAINT "fk_resource_actions_actions_resource_id__resource" FOREIGN KEY ("resource_id") REFERENCES "resource"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
      await queryRunner.query(`
            ALTER TABLE "resource_actions_actions"
            ADD CONSTRAINT "fk_resource_actions_actions_actions_id__actions" FOREIGN KEY ("actions_id") REFERENCES "actions"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
            ALTER TABLE "resource_actions_actions" DROP CONSTRAINT "fk_resource_actions_actions_actions_id__actions"
        `);
      await queryRunner.query(`
            ALTER TABLE "resource_actions_actions" DROP CONSTRAINT "fk_resource_actions_actions_resource_id__resource"
        `);
      await queryRunner.query(`
            ALTER TABLE "resource"
            ADD "actions" text array NOT NULL
        `);
      await queryRunner.query(`
            DROP INDEX "public"."idx_resource_actions_actions_actions_id"
        `);
      await queryRunner.query(`
            DROP INDEX "public"."idx_resource_actions_actions_resource_id"
        `);
      await queryRunner.query(`
            DROP TABLE "resource_actions_actions"
        `);
      await queryRunner.query(`
            DROP INDEX "public"."idx_actions_name"
        `);
      await queryRunner.query(`
            DROP TABLE "actions"
        `);
    }
}
