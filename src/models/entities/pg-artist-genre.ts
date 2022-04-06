import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: 'artist-genre' })
export class PgArtistGenre {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column({ type: 'uuid' })
  artist_id: string;

  @Column({ type: 'uuid' })
  genre_id: string;

  @Column({ type: 'varchar' })
  comments: string;

  @Column({ type: 'varchar' })
  last_updated_by?: string;

  @Column({ type: 'date', default: () => 'CURRENT_TIMESTAMP' })
  last_updated_at?: string;
}
