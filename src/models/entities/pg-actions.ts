import {
  Column,
  Entity,
  Index,
  PrimaryColumn,
} from 'typeorm';

  @Entity({ name: 'actions' })
export class PgActionEntity {
    @PrimaryColumn({ type: 'uuid' })
    id!: string;

    @Index()
    @Column({
      type: 'varchar',
      name: 'name',
      nullable: false,
    })
    name!: string;
}
