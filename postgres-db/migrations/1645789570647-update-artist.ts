import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateArtist1645789570647 implements MigrationInterface {
    name = 'updateArtist1645789570647'

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
            ALTER TABLE "artist"
            ADD "bowie_artist_ids" text array NOT NULL DEFAULT '{}'
        `);
      await queryRunner.query(`
            ALTER TABLE "artist"
            ADD "comments" text NOT NULL DEFAULT ''
        `);
      await queryRunner.query(`
            ALTER TABLE "artist"
            ADD "last_modified_by" character varying NOT NULL DEFAULT ''
        `);
      await queryRunner.query(`
            ALTER TABLE "artist"
            ADD "last_modified_at" date NOT NULL DEFAULT now()
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
            ALTER TABLE "artist" DROP COLUMN "last_modified_at"
        `);
      await queryRunner.query(`
            ALTER TABLE "artist" DROP COLUMN "last_modified_by"
        `);
      await queryRunner.query(`
            ALTER TABLE "artist" DROP COLUMN "comments"
        `);
      await queryRunner.query(`
            ALTER TABLE "artist" DROP COLUMN "bowie_artist_ids"
        `);
    }
}
