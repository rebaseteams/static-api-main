import { MigrationInterface, QueryRunner } from 'typeorm';

export class initialArtistDb1641457301841 implements MigrationInterface {
    name = 'initialArtistDb1641457301841'

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
            ALTER TABLE "document"
            ALTER COLUMN "contract"
            SET DEFAULT '{"envelopeId":"","url":"","dateCreated":"","signDate":"","status":""}'
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
            ALTER TABLE "document"
            ALTER COLUMN "contract"
            SET DEFAULT '{}'
        `);
    }
}
