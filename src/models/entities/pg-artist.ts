import { Entity, Column, PrimaryColumn } from 'typeorm';
import { audience, media_handles } from '../types/artist';

@Entity({ name: 'artist' })
export class PgArtistEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  gender: string;

  @Column('text', { array: true })
  associated_brands: string[];

  @Column('text', { array: true })
  venues: string[];

  @Column()
  country: string;

  @Column()
  image: string;

  @Column()
  cover_image: string;

  @Column()
  bio: string;

  @Column()
  manager: string;

  @Column()
  contact: string;

  @Column({ type: 'text' })
  address: string;

  @Column()
  popularity: number;

  @Column('jsonb')
  audience: audience;

  @Column('jsonb')
  media_handles: media_handles;
}
