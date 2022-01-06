import { Entity, Column, PrimaryColumn } from 'typeorm';
import { ResourceActions } from '../types/resource-actions';

@Entity()
export default class Role {
  constructor(id: string, name: string, resource_actions : ResourceActions) {
    this.id = id;
    this.name = name;
    this.resource_actions = resource_actions;
  }

  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column({ type: 'jsonb' })
  resource_actions: ResourceActions;
}
