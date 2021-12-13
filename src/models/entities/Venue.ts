import { Entity, Column, PrimaryColumn } from 'typeorm';
import { Address } from '../types/address';

@Entity()
export default class Venue {
  constructor(id: string, name: string, address : Address, capacity: number) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.capacity = capacity;
  }

  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column('jsonb')
  address: Address;

  @Column()
  capacity: number;
}
