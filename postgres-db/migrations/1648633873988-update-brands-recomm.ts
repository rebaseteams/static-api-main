import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateBrandsRecomm1648633873988 implements MigrationInterface {
    name = 'updateBrandsRecomm1648633873988'

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
            CREATE TABLE "artist-recommendation-brands-wanted" (
                "brand_id" uuid NOT NULL,
                "artist_recomm_id" uuid NOT NULL,
                CONSTRAINT "pk_artist-recommendation-brands-wanted_brand_id_artist_recomm_id" PRIMARY KEY ("brand_id", "artist_recomm_id")
            )
        `);
      await queryRunner.query(`
            CREATE INDEX "idx_artist-recommendation-brands-wanted_brand_id" ON "artist-recommendation-brands-wanted" ("brand_id")
        `);
      await queryRunner.query(`
            CREATE INDEX "idx_artist-recommendation-brands-wanted_artist_recomm_id" ON "artist-recommendation-brands-wanted" ("artist_recomm_id")
        `);
      await queryRunner.query(`
            CREATE TABLE "artist-recommendation-brands-unwanted" (
                "brand_id" uuid NOT NULL,
                "artist_recomm_id" uuid NOT NULL,
                CONSTRAINT "pk_artist-recommendation-brands-unwanted_brand_id_artist_recomm_id" PRIMARY KEY ("brand_id", "artist_recomm_id")
            )
        `);
      await queryRunner.query(`
            CREATE INDEX "idx_artist-recommendation-brands-unwanted_brand_id" ON "artist-recommendation-brands-unwanted" ("brand_id")
        `);
      await queryRunner.query(`
            CREATE INDEX "idx_artist-recommendation-brands-unwanted_artist_recomm_id" ON "artist-recommendation-brands-unwanted" ("artist_recomm_id")
        `);
      await queryRunner.query(`
            ALTER TABLE "artist_recommendation" DROP COLUMN "wanted_brands"
        `);
      await queryRunner.query(`
            ALTER TABLE "artist_recommendation" DROP COLUMN "unwanted_brands"
        `);
      await queryRunner.query(`
            ALTER TABLE "artist_recommendation"
            ADD "wanted_brands_id" uuid array NOT NULL DEFAULT '{}'
        `);
      await queryRunner.query(`
            ALTER TABLE "artist_recommendation"
            ADD "unwanted_brands_id" uuid array NOT NULL DEFAULT '{}'
        `);
      await queryRunner.query(`
            ALTER TABLE "artist-recommendation-brands-wanted"
            ADD CONSTRAINT "fk_artist-recommendation-brands-wanted_brand_id__artist_recommendation" FOREIGN KEY ("brand_id") REFERENCES "artist_recommendation"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
      await queryRunner.query(`
            ALTER TABLE "artist-recommendation-brands-wanted"
            ADD CONSTRAINT "fk_artist-recommendation-brands-wanted_artist_recomm_id__brand" FOREIGN KEY ("artist_recomm_id") REFERENCES "brand"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
      await queryRunner.query(`
            ALTER TABLE "artist-recommendation-brands-unwanted"
            ADD CONSTRAINT "fk_artist-recommendation-brands-unwanted_brand_id__artist_recommendation" FOREIGN KEY ("brand_id") REFERENCES "artist_recommendation"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
      await queryRunner.query(`
            ALTER TABLE "artist-recommendation-brands-unwanted"
            ADD CONSTRAINT "fk_artist-recommendation-brands-unwanted_artist_recomm_id__brand" FOREIGN KEY ("artist_recomm_id") REFERENCES "brand"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
            ALTER TABLE "artist-recommendation-brands-unwanted" DROP CONSTRAINT "fk_artist-recommendation-brands-unwanted_artist_recomm_id__brand"
        `);
      await queryRunner.query(`
            ALTER TABLE "artist-recommendation-brands-unwanted" DROP CONSTRAINT "fk_artist-recommendation-brands-unwanted_brand_id__artist_recommendation"
        `);
      await queryRunner.query(`
            ALTER TABLE "artist-recommendation-brands-wanted" DROP CONSTRAINT "fk_artist-recommendation-brands-wanted_artist_recomm_id__brand"
        `);
      await queryRunner.query(`
            ALTER TABLE "artist-recommendation-brands-wanted" DROP CONSTRAINT "fk_artist-recommendation-brands-wanted_brand_id__artist_recommendation"
        `);
      await queryRunner.query(`
            ALTER TABLE "artist_recommendation" DROP COLUMN "unwanted_brands_id"
        `);
      await queryRunner.query(`
            ALTER TABLE "artist_recommendation" DROP COLUMN "wanted_brands_id"
        `);
      await queryRunner.query(`
            ALTER TABLE "artist_recommendation"
            ADD "unwanted_brands" jsonb NOT NULL
        `);
      await queryRunner.query(`
            ALTER TABLE "artist_recommendation"
            ADD "wanted_brands" jsonb NOT NULL
        `);
      await queryRunner.query(`
            DROP INDEX "public"."idx_artist-recommendation-brands-unwanted_artist_recomm_id"
        `);
      await queryRunner.query(`
            DROP INDEX "public"."idx_artist-recommendation-brands-unwanted_brand_id"
        `);
      await queryRunner.query(`
            DROP TABLE "artist-recommendation-brands-unwanted"
        `);
      await queryRunner.query(`
            DROP INDEX "public"."idx_artist-recommendation-brands-wanted_artist_recomm_id"
        `);
      await queryRunner.query(`
            DROP INDEX "public"."idx_artist-recommendation-brands-wanted_brand_id"
        `);
      await queryRunner.query(`
            DROP TABLE "artist-recommendation-brands-wanted"
        `);
    }
}
