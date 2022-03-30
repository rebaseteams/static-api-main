import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateVenueRecomm1648631474963 implements MigrationInterface {
    name = 'updateVenueRecomm1648631474963'

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
            ALTER TABLE "artist_recommendation"
                RENAME COLUMN "venue" TO "venue_id"
        `);
      await queryRunner.query(`
            CREATE TABLE "artist-recommendation-venue" (
                "venue_id" uuid NOT NULL,
                "artist_recomm_id" uuid NOT NULL,
                CONSTRAINT "pk_artist-recommendation-venue_venue_id_artist_recomm_id" PRIMARY KEY ("venue_id", "artist_recomm_id")
            )
        `);
      await queryRunner.query(`
            CREATE INDEX "idx_artist-recommendation-venue_venue_id" ON "artist-recommendation-venue" ("venue_id")
        `);
      await queryRunner.query(`
            CREATE INDEX "idx_artist-recommendation-venue_artist_recomm_id" ON "artist-recommendation-venue" ("artist_recomm_id")
        `);
      await queryRunner.query(`
            ALTER TABLE "artist_recommendation" DROP COLUMN "venue_id"
        `);
      await queryRunner.query(`
            ALTER TABLE "artist_recommendation"
            ADD "venue_id" uuid array NOT NULL DEFAULT '{}'
        `);
      await queryRunner.query(`
            ALTER TABLE "artist-recommendation-venue"
            ADD CONSTRAINT "fk_artist-recommendation-venue_venue_id__artist_recommendation" FOREIGN KEY ("venue_id") REFERENCES "artist_recommendation"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
      await queryRunner.query(`
            ALTER TABLE "artist-recommendation-venue"
            ADD CONSTRAINT "fk_artist-recommendation-venue_artist_recomm_id__venue" FOREIGN KEY ("artist_recomm_id") REFERENCES "venue"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
            ALTER TABLE "artist-recommendation-venue" DROP CONSTRAINT "fk_artist-recommendation-venue_artist_recomm_id__venue"
        `);
      await queryRunner.query(`
            ALTER TABLE "artist-recommendation-venue" DROP CONSTRAINT "fk_artist-recommendation-venue_venue_id__artist_recommendation"
        `);
      await queryRunner.query(`
            ALTER TABLE "artist_recommendation" DROP COLUMN "venue_id"
        `);
      await queryRunner.query(`
            ALTER TABLE "artist_recommendation"
            ADD "venue_id" text array NOT NULL
        `);
      await queryRunner.query(`
            DROP INDEX "public"."idx_artist-recommendation-venue_artist_recomm_id"
        `);
      await queryRunner.query(`
            DROP INDEX "public"."idx_artist-recommendation-venue_venue_id"
        `);
      await queryRunner.query(`
            DROP TABLE "artist-recommendation-venue"
        `);
      await queryRunner.query(`
            ALTER TABLE "artist_recommendation"
                RENAME COLUMN "venue_id" TO "venue"
        `);
    }
}
