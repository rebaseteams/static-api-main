import {
  Entity, Column, PrimaryColumn, ManyToMany, JoinTable,
} from 'typeorm';
import { PgActionEntity } from './pg-actions';

@Entity({ name: 'resource' })
export class PgResourceEntity {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column()
  name: string;

  @ManyToMany(() => PgActionEntity, { cascade: true })
  @JoinTable(
    {
      name: 'resource_actions_actions',
      joinColumn: {
        name: 'resource_id',
        referencedColumnName: 'id',
      },
      inverseJoinColumn: {
        name: 'actions_id',
        referencedColumnName: 'id',
      },
    },
  )
  actions: PgActionEntity[];
}
