import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: 'event-performers' })
export class PgEventPerformers {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column({ type: 'uuid' })
  performer_id: string;

  @Column({ type: 'uuid' })
  event_id: string;

  @Column({ type: 'jsonb' })
  metadata: any;

  @Column({ type: 'varchar' })
  comments: string;

  @Column({ type: 'varchar' })
  last_updated_by?: string;

  @Column({ type: 'date', default: () => 'CURRENT_TIMESTAMP' })
  last_updated_at?: string;
}
