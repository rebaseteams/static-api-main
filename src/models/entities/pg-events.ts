import { Entity, Column, PrimaryColumn } from 'typeorm';

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

  @Column({ type: 'date' })
  start_date: string;

  @Column({ type: 'date' })
  end_date: string;

  @Column({ type: 'varchar', default: '' })
  comments: string;

  @Column({ type: 'date', default: () => 'CURRENT_TIMESTAMP' })
  last_updated_at: string;

  @Column({ type: 'varchar', default: '' })
  last_updated_by: string;
}
