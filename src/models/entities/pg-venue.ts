import { float } from 'aws-sdk/clients/lightsail';
import { Entity, Column, PrimaryColumn } from 'typeorm';
import { Address } from '../types/address';

@Entity({ name: 'venue' })
export default class PgVenueEntity {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column()
  name: string;

  @Column('jsonb')
  address: Address;

  @Column()
  capacity: number;

  @Column({ type: 'varchar', default: '' })
  bowie_venue_id: string;

  @Column({ type: 'varchar', default: '' })
  url: string;

  @Column({ type: 'float', default: 0.0 })
  lat: float;

  @Column({ type: 'float', default: 0.0 })
  long: float;

  @Column({ type: 'varchar', default: '' })
  street: string;

  @Column({ type: 'varchar', default: '' })
  city: string;

  @Column({ type: 'varchar', default: '' })
  state: string;

  @Column({ type: 'varchar', default: '' })
  postal_code: string;

  @Column({ type: 'varchar', default: '' })
  country: string;

  @Column({ type: 'text', default: '' })
  comments?: string;

  @Column({ type: 'varchar', default: '' })
  last_modified_by?: string;

  @Column({ type: 'date', default: () => 'CURRENT_TIMESTAMP' })
  last_modified_at?: string;
}
