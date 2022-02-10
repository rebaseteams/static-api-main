import {
  Entity, Column, PrimaryColumn, ManyToMany, JoinTable,
} from 'typeorm';
import { PgRoleEntity } from './pg-role';

@Entity('user')
export class PgUserEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  email: string

  @Column({ default: false })
  approved: boolean;

  @ManyToMany(() => PgRoleEntity) @JoinTable()
  roles: PgRoleEntity[];
}
