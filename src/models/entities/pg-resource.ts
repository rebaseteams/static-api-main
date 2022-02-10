import {
  Entity, Column, PrimaryColumn, ManyToMany, JoinTable,
} from 'typeorm';
import { PgActionEntity } from './pg-actions';

@Entity()
export class PgResourceEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @ManyToMany(() => PgActionEntity) @JoinTable()
  actions: PgActionEntity[];
}
