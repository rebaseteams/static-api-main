import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: 'artist-audio-features' })
export class PgArtistAudioFeatures {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column({ type: 'uuid' })
  artist_id: string;

  @Column({ type: 'decimal', default: 0 })
  acousticness: number;

  @Column({ type: 'decimal', default: 0 })
  danceability: number;

  @Column({ type: 'decimal', default: 0 })
  energy: number;

  @Column({ type: 'decimal', default: 0 })
  liveness: number;

  @Column({ type: 'decimal', default: 0 })
  loudness: number;

  @Column({ type: 'decimal', default: 0 })
  speechiness: number;

  @Column({ type: 'decimal', default: 0 })
  tempo: number;

  @Column({ type: 'decimal', default: 0 })
  valence: number;

  @Column({ type: 'decimal', default: 0 })
  instrumentalness: number;

  @Column({ type: 'float', default: 0 })
  popularity: number;

  @Column({ type: 'text', default: '' })
  comments?: string;

  @Column({ type: 'varchar', default: '' })
  last_updated_by?: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  last_updated_at: Date;
}
