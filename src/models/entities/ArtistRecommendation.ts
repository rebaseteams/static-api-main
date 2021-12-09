import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export default class ArtistRecommendation {
  constructor(
    id: string,
    name: string,
    date_created: Date,
    user_id: string,
    event_type: string,
    venue: string,
    artist_budget: string,
    sponsorship_type: string,
    wanted_brands: string,
    unwanted_brands: string,
    target_audience: string,
    what_sells_most: string,
    artists : string = '[]',
    discarded_artists : string = '[]',
    status : boolean = false,
  ) {
    this.id = id;
    this.name = name;
    this.date_created = date_created;
    this.user_id = user_id;
    this.event_type = event_type;
    this.venue = venue;
    this.artist_budget = artist_budget;
    this.sponsorship_type = sponsorship_type;
    this.wanted_brands = wanted_brands;
    this.unwanted_brands = unwanted_brands;
    this.target_audience = target_audience;
    this.what_sells_most = what_sells_most;
    this.artists = artists;
    this.discarded_artists = discarded_artists;
    this.status = status;
  }

  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  date_created: Date;

  @Column()
  user_id: string;

  @Column()
  event_type: string;

  @Column('text')
  venue: string;

  @Column('text')
  artist_budget: string;

  @Column()
  sponsorship_type: string;

  @Column('text')
  wanted_brands: string;

  @Column('text')
  unwanted_brands: string;

  @Column('text')
  target_audience: string;

  @Column('text')
  what_sells_most: string;

  @Column('text')
  artists: string;

  @Column('text')
  discarded_artists: string;

  @Column()
  status: boolean;
}
