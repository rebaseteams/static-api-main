import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: 'brand-artist' })
export class PgBrandArtist {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column({ type: 'uuid' })
  brand_id: string;

  @Column({ type: 'uuid' })
  artist_id: string;

  @Column({ type: 'text', default: '' })
  comments?: string;

  @Column({ type: 'varchar', default: '' })
  last_updated_by?: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  last_updated_at: Date;
}
