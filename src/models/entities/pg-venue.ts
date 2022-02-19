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
}
