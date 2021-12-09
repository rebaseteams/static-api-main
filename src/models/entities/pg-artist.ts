import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryColumn,
} from 'typeorm';

@Entity({ name: 'artists' })
export class PgArtistEntity {
  @PrimaryColumn({ type: 'uuid' })
  id!: string;

  @Index()
  @Column({
    type: 'varchar',
    name: 'name',
    nullable: false,
  })
  name!: string;

  @Index()
  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_at',
    nullable: false,
  })
  createdAt!: Date;

  @Index()
  @CreateDateColumn({
    type: 'timestamp',
    name: 'updated_at',
    nullable: false,
  })
  updatedAt!: Date;
}