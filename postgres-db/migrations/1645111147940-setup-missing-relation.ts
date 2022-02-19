import { MigrationInterface, QueryRunner } from 'typeorm';

export class setupMissingRelation1645111147940 implements MigrationInterface {
    name = 'setupMissingRelation1645111147940'

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
            CREATE TABLE "artist" (
                "id" uuid NOT NULL,
                "name" character varying NOT NULL,
                "gender" character varying NOT NULL,
                "associated_brands" text array NOT NULL,
                "venues" text array NOT NULL,
                "country" character varying NOT NULL,
                "image" character varying NOT NULL,
                "cover_image" character varying NOT NULL,
                "bio" character varying NOT NULL,
                "manager" character varying NOT NULL,
                "contact" character varying NOT NULL,
                "address" text NOT NULL,
                "popularity" integer NOT NULL,
                "audience" jsonb NOT NULL,
                "media_handles" jsonb NOT NULL,
                CONSTRAINT "pk_artist_id" PRIMARY KEY ("id")
            )
        `);
      await queryRunner.query(`
            CREATE TABLE "artist_recommendation" (
                "id" uuid NOT NULL,
                "name" character varying NOT NULL,
                "date_created" TIMESTAMP NOT NULL,
                "user_id" character varying NOT NULL,
                "event_type" character varying NOT NULL,
                "venue" text array NOT NULL,
                "artist_budget" jsonb NOT NULL,
                "sponsorship_type" character varying NOT NULL,
                "wanted_brands" jsonb NOT NULL,
                "unwanted_brands" jsonb NOT NULL,
                "target_audience" jsonb NOT NULL,
                "what_sells_most" jsonb NOT NULL,
                "artists" jsonb NOT NULL,
                "discarded_artists" jsonb NOT NULL,
                "documents" text array NOT NULL DEFAULT '{}',
                "status" boolean NOT NULL,
                CONSTRAINT "pk_artist_recommendation_id" PRIMARY KEY ("id")
            )
        `);
      await queryRunner.query(`
            CREATE TABLE "user" (
                "id" character varying NOT NULL,
                "name" character varying NOT NULL,
                "email" character varying NOT NULL,
                "approved" boolean DEFAULT false,
                CONSTRAINT "pk_user_id" PRIMARY KEY ("id")
            )
        `);
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
            CREATE TABLE "resource" (
                "id" uuid NOT NULL,
                "name" character varying NOT NULL,
                CONSTRAINT "pk_resource_id" PRIMARY KEY ("id")
            )
        `);
      await queryRunner.query(`
            CREATE TABLE "role" (
                "id" uuid NOT NULL,
                "name" character varying NOT NULL,
                CONSTRAINT "pk_role_id" PRIMARY KEY ("id")
            )
        `);
      await queryRunner.query(`
            CREATE TABLE "actions_permissions" (
                "id" uuid NOT NULL,
                "user_id" character varying NOT NULL,
                "role_id" uuid NOT NULL,
                "resource_id" uuid NOT NULL,
                "action_id" uuid NOT NULL,
                "permission" boolean NOT NULL DEFAULT false,
                CONSTRAINT "ap_unique_constraint" UNIQUE ("action_id", "role_id", "resource_id", "user_id"),
                CONSTRAINT "REL_74673dbf2b1297e062ed28c419" UNIQUE ("action_id"),
                CONSTRAINT "REL_23c4c2b8904e64795a6662fb11" UNIQUE ("resource_id"),
                CONSTRAINT "REL_055fa97d2ed0aed7970c1df03b" UNIQUE ("role_id"),
                CONSTRAINT "REL_0fa28aa07529bad4909da7b424" UNIQUE ("user_id"),
                CONSTRAINT "pk_actions_permissions_id" PRIMARY KEY ("id")
            )
        `);
      await queryRunner.query(`
            CREATE TABLE "brand" (
                "id" uuid NOT NULL,
                "name" character varying NOT NULL,
                "logo" character varying NOT NULL,
                "website" character varying NOT NULL,
                "contact" character varying NOT NULL,
                CONSTRAINT "pk_brand_id" PRIMARY KEY ("id")
            )
        `);
      await queryRunner.query(`
            CREATE TABLE "document" (
                "id" uuid NOT NULL,
                "template_id" uuid NOT NULL,
                "name" character varying NOT NULL,
                "created_by" character varying NOT NULL,
                "created_on" TIMESTAMP NOT NULL,
                "mode" character varying DEFAULT 'edit',
                "html" text NOT NULL,
                "contract" jsonb DEFAULT '{"envelopeId":"","url":"","dateCreated":"","signDate":"","status":""}',
                CONSTRAINT "pk_document_id" PRIMARY KEY ("id")
            )
        `);
      await queryRunner.query(`
            CREATE TABLE "venue" (
                "id" uuid NOT NULL,
                "name" character varying NOT NULL,
                "address" jsonb NOT NULL,
                "capacity" integer NOT NULL,
                CONSTRAINT "pk_venue_id" PRIMARY KEY ("id")
            )
        `);
      await queryRunner.query(`
            CREATE TABLE "genre" (
                "id" uuid NOT NULL,
                "name" character varying NOT NULL,
                "description" character varying NOT NULL,
                CONSTRAINT "pk_genre_id" PRIMARY KEY ("id")
            )
        `);
      await queryRunner.query(`
            CREATE TABLE "resource_actions_actions" (
                "resource_id" uuid NOT NULL,
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
            CREATE TABLE "role_resources_resource" (
                "role_id" uuid NOT NULL,
                "resource_id" uuid NOT NULL,
                CONSTRAINT "pk_role_resources_resource_role_id_resource_id" PRIMARY KEY ("role_id", "resource_id")
            )
        `);
      await queryRunner.query(`
            CREATE INDEX "idx_role_resources_resource_role_id" ON "role_resources_resource" ("role_id")
        `);
      await queryRunner.query(`
            CREATE INDEX "idx_role_resources_resource_resource_id" ON "role_resources_resource" ("resource_id")
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
            ALTER TABLE "resource_actions_actions"
            ADD CONSTRAINT "fk_resource_actions_actions_resource_id__resource" FOREIGN KEY ("resource_id") REFERENCES "resource"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
      await queryRunner.query(`
            ALTER TABLE "resource_actions_actions"
            ADD CONSTRAINT "fk_resource_actions_actions_actions_id__actions" FOREIGN KEY ("actions_id") REFERENCES "actions"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
      await queryRunner.query(`
            ALTER TABLE "role_resources_resource"
            ADD CONSTRAINT "fk_role_resources_resource_role_id__role" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
      await queryRunner.query(`
            ALTER TABLE "role_resources_resource"
            ADD CONSTRAINT "fk_role_resources_resource_resource_id__resource" FOREIGN KEY ("resource_id") REFERENCES "resource"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
            ALTER TABLE "role_resources_resource" DROP CONSTRAINT "fk_role_resources_resource_resource_id__resource"
        `);
      await queryRunner.query(`
            ALTER TABLE "role_resources_resource" DROP CONSTRAINT "fk_role_resources_resource_role_id__role"
        `);
      await queryRunner.query(`
            ALTER TABLE "resource_actions_actions" DROP CONSTRAINT "fk_resource_actions_actions_actions_id__actions"
        `);
      await queryRunner.query(`
            ALTER TABLE "resource_actions_actions" DROP CONSTRAINT "fk_resource_actions_actions_resource_id__resource"
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
            DROP INDEX "public"."idx_role_resources_resource_resource_id"
        `);
      await queryRunner.query(`
            DROP INDEX "public"."idx_role_resources_resource_role_id"
        `);
      await queryRunner.query(`
            DROP TABLE "role_resources_resource"
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
            DROP TABLE "genre"
        `);
      await queryRunner.query(`
            DROP TABLE "venue"
        `);
      await queryRunner.query(`
            DROP TABLE "document"
        `);
      await queryRunner.query(`
            DROP TABLE "brand"
        `);
      await queryRunner.query(`
            DROP TABLE "actions_permissions"
        `);
      await queryRunner.query(`
            DROP TABLE "role"
        `);
      await queryRunner.query(`
            DROP TABLE "resource"
        `);
      await queryRunner.query(`
            DROP INDEX "public"."idx_actions_name"
        `);
      await queryRunner.query(`
            DROP TABLE "actions"
        `);
      await queryRunner.query(`
            DROP TABLE "user"
        `);
      await queryRunner.query(`
            DROP TABLE "artist_recommendation"
        `);
      await queryRunner.query(`
            DROP TABLE "artist"
        `);
    }
}
