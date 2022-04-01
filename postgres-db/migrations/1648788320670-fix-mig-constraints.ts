import { MigrationInterface, QueryRunner } from 'typeorm';

export class fixMigConstraints1648788320670 implements MigrationInterface {
    name = 'fixMigConstraints1648788320670'

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
            CREATE TABLE "artist-recom-brands-wanted" (
                "brand_id" uuid NOT NULL,
                "artist_recomm_id" uuid NOT NULL,
                CONSTRAINT "pk_artist-recom-brands-wanted_brand_id_artist_recomm_id" PRIMARY KEY ("brand_id", "artist_recomm_id")
            )
        `);
      await queryRunner.query(`
            CREATE INDEX "idx_artist-recom-brands-wanted_brand_id" ON "artist-recom-brands-wanted" ("brand_id")
        `);
      await queryRunner.query(`
            CREATE INDEX "idx_artist-recom-brands-wanted_artist_recomm_id" ON "artist-recom-brands-wanted" ("artist_recomm_id")
        `);
      await queryRunner.query(`
            CREATE TABLE "artist-recom-brands-unwanted" (
                "brand_id" uuid NOT NULL,
                "artist_recomm_id" uuid NOT NULL,
                CONSTRAINT "pk_artist-recom-brands-unwanted_brand_id_artist_recomm_id" PRIMARY KEY ("brand_id", "artist_recomm_id")
            )
        `);
      await queryRunner.query(`
            CREATE INDEX "idx_artist-recom-brands-unwanted_brand_id" ON "artist-recom-brands-unwanted" ("brand_id")
        `);
      await queryRunner.query(`
            CREATE INDEX "idx_artist-recom-brands-unwanted_artist_recomm_id" ON "artist-recom-brands-unwanted" ("artist_recomm_id")
        `);
      await queryRunner.query(`
            ALTER TABLE "artist-recom-brands-wanted"
            ADD CONSTRAINT "fk_artist-recom-brands-wanted_brand_id__artist_recommendation" FOREIGN KEY ("brand_id") REFERENCES "artist_recommendation"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
      await queryRunner.query(`
            ALTER TABLE "artist-recom-brands-wanted"
            ADD CONSTRAINT "fk_artist-recom-brands-wanted_artist_recomm_id__brand" FOREIGN KEY ("artist_recomm_id") REFERENCES "brand"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
      await queryRunner.query(`
            ALTER TABLE "artist-recom-brands-unwanted"
            ADD CONSTRAINT "fk_artist-recom-brands-unwanted_brand_id__artist_recommendation" FOREIGN KEY ("brand_id") REFERENCES "artist_recommendation"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
      await queryRunner.query(`
            ALTER TABLE "artist-recom-brands-unwanted"
            ADD CONSTRAINT "fk_artist-recom-brands-unwanted_artist_recomm_id__brand" FOREIGN KEY ("artist_recomm_id") REFERENCES "brand"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
            ALTER TABLE "artist-recom-brands-unwanted" DROP CONSTRAINT "fk_artist-recom-brands-unwanted_artist_recomm_id__brand"
        `);
      await queryRunner.query(`
            ALTER TABLE "artist-recom-brands-unwanted" DROP CONSTRAINT "fk_artist-recom-brands-unwanted_brand_id__artist_recommendation"
        `);
      await queryRunner.query(`
            ALTER TABLE "artist-recom-brands-wanted" DROP CONSTRAINT "fk_artist-recom-brands-wanted_artist_recomm_id__brand"
        `);
      await queryRunner.query(`
            ALTER TABLE "artist-recom-brands-wanted" DROP CONSTRAINT "fk_artist-recom-brands-wanted_brand_id__artist_recommendation"
        `);
      await queryRunner.query(`
            DROP INDEX "public"."idx_artist-recom-brands-unwanted_artist_recomm_id"
        `);
      await queryRunner.query(`
            DROP INDEX "public"."idx_artist-recom-brands-unwanted_brand_id"
        `);
      await queryRunner.query(`
            DROP TABLE "artist-recom-brands-unwanted"
        `);
      await queryRunner.query(`
            DROP INDEX "public"."idx_artist-recom-brands-wanted_artist_recomm_id"
        `);
      await queryRunner.query(`
            DROP INDEX "public"."idx_artist-recom-brands-wanted_brand_id"
        `);
      await queryRunner.query(`
            DROP TABLE "artist-recom-brands-wanted"
        `);
    }
}
