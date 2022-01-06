import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export default class Resource {
  constructor(id: string, name: string, actions: string[]) {
    this.id = id;
    this.name = name;
    this.actions = actions;
  }

  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column('text', { array: true })
  actions: string[];
}
