import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  Unique,
} from 'typeorm';
import { PgActionEntity } from './pg-actions';
import { PgResourceEntity } from './pg-resource';
import { PgRoleEntity } from './pg-role';

@Entity({ name: 'role_permissions' })
@Unique('rp_unique_constraint', ['action_id', 'role_id', 'resource_id'])
export class PgRolePermissionsEntity {
  @PrimaryColumn({ type: 'uuid' })
  id!: string;

  @Column({ type: 'uuid', name: 'role_id' })
  role_id!: string;

  @Column({ type: 'uuid', name: 'resource_id' })
  resource_id!: string;

  @Column({ type: 'uuid', name: 'action_id' })
  action_id!: string;

  @OneToOne(() => PgActionEntity, (action) => action.id)
  @JoinColumn({ name: 'action_id', referencedColumnName: 'id' })
  public action!: Promise<PgActionEntity>;

  @OneToOne(() => PgResourceEntity, (resource) => resource.id)
  @JoinColumn({ name: 'resource_id', referencedColumnName: 'id' })
  public resource!: Promise<PgResourceEntity>;

  @OneToOne(() => PgRoleEntity, (role) => role.id)
  @JoinColumn({ name: 'role_id', referencedColumnName: 'id' })
  public role!: Promise<PgRoleEntity>;

  @Column({
    type: 'boolean',
    name: 'permission',
    default: false,
  })
  permission: boolean;
}
