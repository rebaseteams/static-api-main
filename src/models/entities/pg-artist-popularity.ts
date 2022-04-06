import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: 'artist-popularity' })
export class PgArtistPopularity {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column({ type: 'uuid' })
  artist_id: string;

  @Column({ type: 'float' })
  popularity: number;

  @Column({ type: 'varchar' })
  comments: string;

  @Column({ type: 'varchar' })
  last_updated_by?: string;

  @Column({ type: 'date', default: () => 'CURRENT_TIMESTAMP' })
  last_updated_at?: string;
}
