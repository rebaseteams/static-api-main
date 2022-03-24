import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  Unique,
} from 'typeorm';
import { PgRolePermissionsEntity } from './pg-role-permissions';

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

      @ManyToOne(() => PgRolePermissionsEntity, (rp) => rp.id)
      @JoinColumn({ name: 'role_permission_id', referencedColumnName: 'id' })
      public role_permission!: Promise<PgRolePermissionsEntity>;
}
