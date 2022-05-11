import { Entity, Column, PrimaryColumn } from 'typeorm';
import { demographics, media_handles } from '../types/brand';

@Entity({ name: 'brand' })
export default class PgBrandEntity {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column()
  name: string;

  @Column()
  logo: string;

  @Column()
  website: string;

  @Column()
  contact: string;

  @Column({ type: 'uuid', nullable: true })
  bowie_brand_id: string;

  @Column({ type: 'jsonb', nullable: true })
  demographics: demographics;

  @Column({ type: 'jsonb', nullable: true })
  media_handles: media_handles;

  @Column({ type: 'jsonb', nullable: true, default: [] })
  industry: string[];

  @Column({ type: 'text', nullable: true, default: '' })
  comments?: string;

  @Column({ type: 'varchar', nullable: true, default: '' })
  last_updated_by?: string;

  @Column({ type: 'timestamp', nullable: true })
  last_modified_at?: Date;
}
