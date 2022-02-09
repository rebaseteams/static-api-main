import {
  Entity, Column, PrimaryColumn, ManyToMany, JoinTable,
} from 'typeorm';
import { PgActionEntity } from './pg-actions';

@Entity()
export default class Resource {
  constructor(id: string, name: string, actions: PgActionEntity[]) {
    this.id = id;
    this.name = name;
    this.actions = actions;
  }

  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @ManyToMany(() => PgActionEntity) @JoinTable()
  actions: PgActionEntity[];
}
