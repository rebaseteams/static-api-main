import { Entity, Column, PrimaryColumn } from 'typeorm';

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
}
