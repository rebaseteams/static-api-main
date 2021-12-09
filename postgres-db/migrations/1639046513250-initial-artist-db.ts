import { MigrationInterface, QueryRunner } from 'typeorm';

export class initialArtistDb1639046513250 implements MigrationInterface {
    name = 'initialArtistDb1639046513250'

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
            ALTER TABLE "artist" DROP COLUMN "audience"
        `);
      await queryRunner.query(`
            ALTER TABLE "artist"
            ADD "audience" jsonb NOT NULL
        `);
      await queryRunner.query(`
            ALTER TABLE "artist" DROP COLUMN "media_handles"
        `);
      await queryRunner.query(`
            ALTER TABLE "artist"
            ADD "media_handles" jsonb NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
            ALTER TABLE "artist" DROP COLUMN "media_handles"
        `);
      await queryRunner.query(`
            ALTER TABLE "artist"
            ADD "media_handles" text NOT NULL
        `);
      await queryRunner.query(`
            ALTER TABLE "artist" DROP COLUMN "audience"
        `);
      await queryRunner.query(`
            ALTER TABLE "artist"
            ADD "audience" text NOT NULL
        `);
      await queryRunner.query(`
            DROP TABLE "artist_recommendation"
        `);
    }
}
