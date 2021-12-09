import { Entity, Column, PrimaryColumn } from 'typeorm';
import { audience, media_handles } from '../types/artist';

@Entity()
export default class Artist {
  constructor(
    id: string,
    name: string,
    gender: string,
    associated_brands: string[],
    venues: string[],
    country: string,
    image: string,
    cover_image: string,
    bio: string,
    manager: string,
    contact: string,
    address: string,
    popularity: number,
    _audience: audience,
    _media_handles: media_handles,
  ) {
    this.id = id;
    this.name = name;
    this.gender = gender;
    this.associated_brands = associated_brands;
    this.venues = venues;
    this.country = country;
    this.image = image;
    this.cover_image = cover_image;
    this.bio = bio;
    this.manager = manager;
    this.contact = contact;
    this.address = address;
    this.popularity = popularity;
    this.audience = _audience;
    this.media_handles = _media_handles;
  }

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
