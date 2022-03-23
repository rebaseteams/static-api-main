import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  Unique,
} from 'typeorm';
import { PgActionEntity } from './pg-actions';
import { PgResourceEntity } from './pg-resource';
import { PgRoleEntity } from './pg-role';
import { PgRolePermissionsEntity } from './pg-role-permissions';
import { PgUserEntity } from './pg-user';

// This table will have a primary column

@Entity({ name: 'actions_permissions' })
@Unique('super_key', ['role_permission_id', 'user_id'])
export class PgActionPermissionsEntity {
      @PrimaryColumn({ type: 'uuid' })
      id!: string;

      @Column({ type: 'varchar', name: 'user_id' })
      user_id!: string;

      @Column({ type: 'uuid', name: 'role_permission_id' })
      role_permission_id!: string;

      @ManyToOne(() => PgActionEntity, (action) => action.id)
      @JoinColumn({ name: 'action_id', referencedColumnName: 'id' })
      public action!: Promise<PgActionEntity>;

      @ManyToOne(() => PgResourceEntity, (resource) => resource.id)
      @JoinColumn({ name: 'resource_id', referencedColumnName: 'id' })
      public resource!: Promise<PgResourceEntity>;

      @ManyToOne(() => PgRoleEntity, (role) => role.id)
      @JoinColumn({ name: 'role_id', referencedColumnName: 'id' })
      public role!: Promise<PgRoleEntity>;

      @ManyToOne(() => PgUserEntity, (user) => user.id)
      @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
      public user!: Promise<PgUserEntity>;

      @ManyToOne(() => PgRolePermissionsEntity, (rp) => rp.id)
      @JoinColumn({ name: 'role_permission_id', referencedColumnName: 'id' })
      public role_permission!: Promise<PgRolePermissionsEntity>;
}
