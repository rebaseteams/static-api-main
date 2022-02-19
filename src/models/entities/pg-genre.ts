import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: 'genre' })
export default class PgGenreEntity {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;
}
