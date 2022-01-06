import { MigrationInterface, QueryRunner } from 'typeorm';

export class initialArtistDb1641457550413 implements MigrationInterface {
    name = 'initialArtistDb1641457550413'

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
            CREATE TABLE "user" (
                "id" character varying NOT NULL,
                "name" character varying NOT NULL,
                "email" character varying NOT NULL,
                "roles" text array NOT NULL,
                "approved" boolean,
                CONSTRAINT "pk_user_id" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
            DROP TABLE "user"
        `);
    }
}
