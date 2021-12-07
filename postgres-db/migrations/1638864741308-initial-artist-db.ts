import { MigrationInterface, QueryRunner } from 'typeorm';

export class initialArtistDb1638864741308 implements MigrationInterface {
    name = 'initialArtistDb1638864741308'

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
            ALTER TABLE "artist"
            ADD "media_handles" text NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
            ALTER TABLE "artist" DROP COLUMN "media_handles"
        `);
    }
}
