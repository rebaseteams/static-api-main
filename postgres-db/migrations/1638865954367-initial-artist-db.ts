import { MigrationInterface, QueryRunner } from 'typeorm';

export class initialArtistDb1638865954367 implements MigrationInterface {
    name = 'initialArtistDb1638865954367'

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
            ALTER TABLE "artist" DROP COLUMN "contact"
        `);
      await queryRunner.query(`
            ALTER TABLE "artist"
            ADD "contact" character varying NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
            ALTER TABLE "artist" DROP COLUMN "contact"
        `);
      await queryRunner.query(`
            ALTER TABLE "artist"
            ADD "contact" text NOT NULL
        `);
    }
}
