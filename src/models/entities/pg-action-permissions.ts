import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  PrimaryColumn,
  Unique,
} from 'typeorm';
import { PgActionEntity } from './pg-actions';
import { PgResourceEntity } from './pg-resource';
import { PgRoleEntity } from './pg-role';
import { PgUserEntity } from './pg-user';

// This table will have a primary column

@Entity({ name: 'actions_permissions' })
@Unique('ap_unique_constraint', ['action_id', 'role_id', 'resource_id', 'user_id'])
export class PgActionPermissionsEntity {
      @PrimaryColumn({ type: 'uuid' })
      id!: string;

      @Column({ type: 'varchar', name: 'user_id' })
      user_id!: string;

      @Column({ type: 'varchar', name: 'role_id' })
      role_id!: string;

      @Column({ type: 'varchar', name: 'resource_id' })
      resource_id!: string;

      @Column({ type: 'varchar', name: 'action_id' })
      action_id!: string;

      @ManyToMany(() => PgActionEntity, (action) => action.id)
      @JoinColumn({ name: 'action_id' })
      public action!: PgActionEntity;

      @ManyToMany(() => PgResourceEntity, (resource) => resource.id)
      @JoinColumn({ name: 'resource_id' })
      public resource!: PgResourceEntity;

      @ManyToMany(() => PgRoleEntity, (role) => role.id)
      @JoinColumn({ name: 'role_id' })
      public role!: PgRoleEntity;

      @ManyToMany(() => PgUserEntity, (user) => user.id)
      @JoinColumn({ name: 'user_id' })
      public user!: PgUserEntity;

      @Column({
        type: 'boolean',
        name: 'permission',
        default: false,
      })
      permission: boolean;
}
