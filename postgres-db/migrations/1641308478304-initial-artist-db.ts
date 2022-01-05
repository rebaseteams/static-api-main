import { MigrationInterface, QueryRunner } from 'typeorm';

export class initialArtistDb1641308478304 implements MigrationInterface {
    name = 'initialArtistDb1641308478304'

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
            ALTER TABLE "document"
            ADD "mode" character varying DEFAULT 'edit'
        `);
      await queryRunner.query(`
            ALTER TABLE "document"
            ADD "contract" jsonb DEFAULT '{}'
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
            ALTER TABLE "document" DROP COLUMN "contract"
        `);
      await queryRunner.query(`
            ALTER TABLE "document" DROP COLUMN "mode"
        `);
    }
}
