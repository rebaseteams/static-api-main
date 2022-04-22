import { Entity, Column, PrimaryColumn } from 'typeorm';
import { float } from 'aws-sdk/clients/lightsail';

@Entity({ name: 'events' })
export default class PgEventsEntity {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column({ type: 'varchar', default: '' })
  name: string;

  @Column({ type: 'varchar', default: '' })
  description: string;

  @Column({ type: 'uuid' })
  event_type_id: string;

  @Column({ type: 'uuid', default: '43e20942-3029-4801-ab01-3493786169c9' })
  venue_id: string;

  @Column({ type: 'jsonb', default: {} })
  metadata: any;

  @Column({ type: 'date' })
  start_date: string;

  @Column({ type: 'date' })
  end_date: string;

  @Column({ type: 'varchar', default: '' })
  comments: string;

  @Column({ type: 'float', default: 0.0 })
  approx_budget: float;

  @Column({ type: 'date', default: () => 'CURRENT_TIMESTAMP' })
  last_updated_at: string;

  @Column({ type: 'varchar', default: '' })
  last_updated_by: string;
}
