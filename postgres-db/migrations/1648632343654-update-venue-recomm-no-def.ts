import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateVenueRecommNoDef1648632343654 implements MigrationInterface {
    name = 'updateVenueRecommNoDef1648632343654'

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
            ALTER TABLE "artist_recommendation"
            ALTER COLUMN "venue_id" DROP DEFAULT
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
            ALTER TABLE "artist_recommendation"
            ALTER COLUMN "venue_id"
            SET DEFAULT '{}'
        `);
    }
}
