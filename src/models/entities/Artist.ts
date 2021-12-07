import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export default class Artist {
  constructor(
    id: string,
    name: string,
    gender: string,
    associatedBrands: string[],
    venues: string[],
    country: string,
    image: string,
    coverImage: string,
    bio: string,
    manager: string,
    contact: string,
    address: string,
    popularity: number,
    audience: string,
    mediaHandles: string,
  ) {
    this.id = id;
    this.name = name;
    this.gender = gender;
    this.associatedBrands = associatedBrands;
    this.venues = venues;
    this.country = country;
    this.image = image;
    this.coverImage = coverImage;
    this.bio = bio;
    this.manager = manager;
    this.contact = contact;
    this.address = address;
    this.popularity = popularity;
    this.audience = audience;
    this.mediaHandles = mediaHandles;
  }

  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  gender: string;

  @Column('text', { array: true })
  associatedBrands: string[];

  @Column('text', { array: true })
  venues: string[];

  @Column()
  country: string;

  @Column()
  image: string;

  @Column()
  coverImage: string;

  @Column()
  bio: string;

  @Column({ type: 'text' })
  manager: string;

  @Column()
  contact: string;

  @Column({ type: 'text' })
  address: string;

  @Column()
  popularity: number;

  @Column({ type: 'text' })
  audience: string;

  @Column({ type: 'text' })
  mediaHandles: string;
}
