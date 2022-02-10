import {
  Entity, Column, PrimaryColumn, ManyToMany, JoinTable,
} from 'typeorm';
import { PgResourceEntity } from './pg-resource';

@Entity()
export class PgRoleEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @ManyToMany(() => PgResourceEntity) @JoinTable()
  resources: PgResourceEntity[];
}
