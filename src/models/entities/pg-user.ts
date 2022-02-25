import {
  Entity, Column, PrimaryColumn,
} from 'typeorm';

@Entity('user')
export class PgUserEntity {
  @PrimaryColumn({ type: 'varchar' })
  id: string;

  @Column()
  name: string;

  @Column()
  email: string

  @Column({ nullable: true })
  approved: boolean;
}
