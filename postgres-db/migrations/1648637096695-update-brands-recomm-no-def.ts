import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateBrandsRecommNoDef1648637096695 implements MigrationInterface {
    name = 'updateBrandsRecommNoDef1648637096695'

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
            ALTER TABLE "artist-recommendation-brands-wanted" DROP CONSTRAINT "fk_artist-recommendation-brands-wanted_brand_id__artist_recomme"
        `);
      await queryRunner.query(`
            ALTER TABLE "artist-recommendation-brands-unwanted" DROP CONSTRAINT "fk_artist-recommendation-brands-unwanted_brand_id__artist_recom"
        `);
      await queryRunner.query(`
            ALTER TABLE "artist-recommendation-brands-unwanted" DROP CONSTRAINT "fk_artist-recommendation-brands-unwanted_artist_recomm_id__bran"
        `);
      await queryRunner.query(`
            ALTER TABLE "artist_recommendation"
            ALTER COLUMN "wanted_brands_id" DROP DEFAULT
        `);
      await queryRunner.query(`
            ALTER TABLE "artist_recommendation"
            ALTER COLUMN "unwanted_brands_id" DROP DEFAULT
        `);
      await queryRunner.query(`
            ALTER TABLE "artist-recommendation-brands-wanted"
            ADD CONSTRAINT "fk_artist-recommendation-brands-wanted_brand_id__artist_recommendation" FOREIGN KEY ("brand_id") REFERENCES "artist_recommendation"("id") ON DELETE CASCADE ON UPDATE CASCADE
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
            ALTER TABLE "artist-recommendation-brands-wanted" DROP CONSTRAINT "fk_artist-recommendation-brands-wanted_brand_id__artist_recommendation"
        `);
      await queryRunner.query(`
            ALTER TABLE "artist_recommendation"
            ALTER COLUMN "unwanted_brands_id"
            SET DEFAULT '{}'
        `);
      await queryRunner.query(`
            ALTER TABLE "artist_recommendation"
            ALTER COLUMN "wanted_brands_id"
            SET DEFAULT '{}'
        `);
      await queryRunner.query(`
            ALTER TABLE "artist-recommendation-brands-unwanted"
            ADD CONSTRAINT "fk_artist-recommendation-brands-unwanted_artist_recomm_id__bran" FOREIGN KEY ("artist_recomm_id") REFERENCES "brand"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
      await queryRunner.query(`
            ALTER TABLE "artist-recommendation-brands-unwanted"
            ADD CONSTRAINT "fk_artist-recommendation-brands-unwanted_brand_id__artist_recom" FOREIGN KEY ("brand_id") REFERENCES "artist_recommendation"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
      await queryRunner.query(`
            ALTER TABLE "artist-recommendation-brands-wanted"
            ADD CONSTRAINT "fk_artist-recommendation-brands-wanted_brand_id__artist_recomme" FOREIGN KEY ("brand_id") REFERENCES "artist_recommendation"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    }
}
