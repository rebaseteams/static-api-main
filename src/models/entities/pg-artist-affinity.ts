import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: 'artist-affinity' })
export class PgArtistAffinity {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column({ type: 'uuid' })
  artist_id: string;

  @Column({ type: 'jsonb', default: [] })
  affinity_last_3_months: string[];

  @Column({ type: 'text', default: '' })
  comments?: string;

  @Column({ type: 'varchar', default: '' })
  last_updated_by?: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  last_updated_at: Date;
}
