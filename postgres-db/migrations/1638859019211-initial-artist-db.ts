import { MigrationInterface, QueryRunner } from 'typeorm';

export class initialArtistDb1638859019211 implements MigrationInterface {
    name = 'initialArtistDb1638859019211'

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
            CREATE TABLE "document" (
                "id" character varying NOT NULL,
                "name" character varying NOT NULL,
                "created_by" character varying NOT NULL,
                "created_on" TIMESTAMP NOT NULL,
                "html" text NOT NULL,
                CONSTRAINT "pk_document_id" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
            DROP TABLE "document"
        `);
    }
}
