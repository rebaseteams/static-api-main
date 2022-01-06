import { MigrationInterface, QueryRunner } from 'typeorm';

export class initialArtistDb1641470628273 implements MigrationInterface {
    name = 'initialArtistDb1641470628273'

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
            CREATE TABLE "resource" (
                "id" character varying NOT NULL,
                "name" character varying NOT NULL,
                "actions" text array NOT NULL,
                CONSTRAINT "pk_resource_id" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
            DROP TABLE "resource"
        `);
    }
}
