import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: 'genre' })
export default class PgGenreEntity {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ default: '' })
  bowie_genre_id: string;

  @Column({ type: 'text', default: '' })
  comments?: string;

  @Column({ type: 'varchar', default: '' })
  last_modified_by?: string;

  @Column({ type: 'date', default: () => 'CURRENT_TIMESTAMP' })
  last_modified_at?: string;
}
