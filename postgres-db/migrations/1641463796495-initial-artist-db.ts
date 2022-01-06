import { MigrationInterface, QueryRunner } from 'typeorm';

export class initialArtistDb1641463796495 implements MigrationInterface {
    name = 'initialArtistDb1641463796495'

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
            CREATE TABLE "role" (
                "id" character varying NOT NULL,
                "name" character varying NOT NULL,
                "resource_actions" jsonb NOT NULL,
                CONSTRAINT "pk_role_id" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
            DROP TABLE "role"
        `);
    }
}
