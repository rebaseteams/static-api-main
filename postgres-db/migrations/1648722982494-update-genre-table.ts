import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateGenreTable1648722982494 implements MigrationInterface {
    name = 'updateGenreTable1648722982494'

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
            ALTER TABLE "genre"
            ADD "bowie_genre_id" character varying NOT NULL DEFAULT ''
        `);
      await queryRunner.query(`
            ALTER TABLE "genre"
            ADD "comments" text NOT NULL DEFAULT ''
        `);
      await queryRunner.query(`
            ALTER TABLE "genre"
            ADD "last_modified_by" character varying NOT NULL DEFAULT ''
        `);
      await queryRunner.query(`
            ALTER TABLE "genre"
            ADD "last_modified_at" date NOT NULL DEFAULT now()
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
            ALTER TABLE "genre" DROP COLUMN "last_modified_at"
        `);
      await queryRunner.query(`
            ALTER TABLE "genre" DROP COLUMN "last_modified_by"
        `);
      await queryRunner.query(`
            ALTER TABLE "genre" DROP COLUMN "comments"
        `);
      await queryRunner.query(`
            ALTER TABLE "genre" DROP COLUMN "bowie_genre_id"
        `);
    }
}
