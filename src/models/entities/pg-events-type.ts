import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: 'events_type' })
export default class PgEventsTypeEntity {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column({ type: 'varchar', default: '' })
  name: string;

  @Column({ type: 'varchar', default: '' })
  description: string;

  @Column({ type: 'varchar', default: '' })
  comments: string;

  @Column({ type: 'date', default: () => 'CURRENT_TIMESTAMP' })
  last_updated_at: string;

  @Column({ type: 'varchar', default: '' })
  last_updated_by: string;
}
