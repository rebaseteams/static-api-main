import { MigrationInterface, QueryRunner } from 'typeorm';

export class initialArtistDb1638865915050 implements MigrationInterface {
    name = 'initialArtistDb1638865915050'

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
            ALTER TABLE "artist" DROP COLUMN "followers"
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
            ALTER TABLE "artist"
            ADD "followers" text NOT NULL
        `);
    }
}
