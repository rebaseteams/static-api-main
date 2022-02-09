import { MigrationInterface, QueryRunner } from 'typeorm';

export class roleUserRelation1644404739719 implements MigrationInterface {
    name = 'roleUserRelation1644404739719'

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
            CREATE TABLE "user_roles_role" (
                "user_id" character varying NOT NULL,
                "role_id" character varying NOT NULL,
                CONSTRAINT "pk_user_roles_role_user_id_role_id" PRIMARY KEY ("user_id", "role_id")
            )
        `);
      await queryRunner.query(`
            CREATE INDEX "idx_user_roles_role_user_id" ON "user_roles_role" ("user_id")
        `);
      await queryRunner.query(`
            CREATE INDEX "idx_user_roles_role_role_id" ON "user_roles_role" ("role_id")
        `);
      await queryRunner.query(`
            ALTER TABLE "user_roles_role"
            ADD CONSTRAINT "fk_user_roles_role_user_id__user" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
      await queryRunner.query(`
            ALTER TABLE "user_roles_role"
            ADD CONSTRAINT "fk_user_roles_role_role_id__role" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
            ALTER TABLE "user_roles_role" DROP CONSTRAINT "fk_user_roles_role_role_id__role"
        `);
      await queryRunner.query(`
            ALTER TABLE "user_roles_role" DROP CONSTRAINT "fk_user_roles_role_user_id__user"
        `);
      await queryRunner.query(`
            DROP INDEX "public"."idx_user_roles_role_role_id"
        `);
      await queryRunner.query(`
            DROP INDEX "public"."idx_user_roles_role_user_id"
        `);
      await queryRunner.query(`
            DROP TABLE "user_roles_role"
        `);
    }
}
