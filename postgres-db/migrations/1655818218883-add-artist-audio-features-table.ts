import { MigrationInterface, QueryRunner } from 'typeorm';

export class addArtistAudioFeaturesTable1655818218883 implements MigrationInterface {
    name = 'addArtistAudioFeaturesTable1655818218883'

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
            CREATE TABLE "artist-audio-features" (
                "id" uuid NOT NULL,
                "artist_id" uuid NOT NULL,
                "acousticness" numeric NOT NULL DEFAULT '0',
                "danceability" numeric NOT NULL DEFAULT '0',
                "energy" numeric NOT NULL DEFAULT '0',
                "liveness" numeric NOT NULL DEFAULT '0',
                "loudness" numeric NOT NULL DEFAULT '0',
                "speechiness" numeric NOT NULL DEFAULT '0',
                "tempo" numeric NOT NULL DEFAULT '0',
                "valence" numeric NOT NULL DEFAULT '0',
                "instrumentalness" numeric NOT NULL DEFAULT '0',
                "popularity" double precision NOT NULL DEFAULT '0',
                "comments" text NOT NULL DEFAULT '',
                "last_updated_by" character varying NOT NULL DEFAULT '',
                "last_updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "pk_artist-audio-features_id" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
            DROP TABLE "artist-audio-features"
        `);
    }
}
