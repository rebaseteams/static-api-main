import { MigrationInterface, QueryRunner } from 'typeorm';

export class initialArtistDb1639629567774 implements MigrationInterface {
    name = 'initialArtistDb1639629567774'

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
            ALTER TABLE "document"
            ADD "template_id" character varying NOT NULL DEFAULT '1234'
        `);
      await queryRunner.query(`
            ALTER TABLE "artist_recommendation"
            ADD "documents" text array NOT NULL DEFAULT '{}'
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
            ALTER TABLE "artist_recommendation" DROP COLUMN "documents"
        `);
      await queryRunner.query(`
            ALTER TABLE "document" DROP COLUMN "template_id"
        `);
    }
}
