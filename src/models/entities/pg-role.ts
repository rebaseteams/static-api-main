import {
  Entity, Column, PrimaryColumn, ManyToMany, JoinTable,
} from 'typeorm';
import { PgResourceEntity } from './pg-resource';

@Entity({ name: 'role' })
export class PgRoleEntity {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column()
  name: string;

  @ManyToMany(() => PgResourceEntity, { cascade: true })
  @JoinTable(
    {
      name: 'role_resources_resource',
      joinColumn: {
        name: 'role_id',
        referencedColumnName: 'id',
      },
      inverseJoinColumn: {
        name: 'resource_id',
        referencedColumnName: 'id',
      },
    },
  )
  resources: Promise<PgResourceEntity[]>;
}
