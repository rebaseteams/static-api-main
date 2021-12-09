import { Entity, Column, PrimaryColumn } from 'typeorm';
import { ArtistBudget } from '../types/artist-budget';
import { ARec } from '../types/artist-recommendation';
import { Brand } from '../types/brand';
import { TargetAudience } from '../types/target-audience';
import { WhatSellsMost } from '../types/what-sells-most';

@Entity()
export default class ArtistRecommendation {
  constructor(
    id: string,
    name: string,
    date_created: Date,
    user_id: string,
    event_type: string,
    venue: string[],
    artist_budget: ArtistBudget,
    sponsorship_type: string,
    wanted_brands: Brand[],
    unwanted_brands: Brand[],
    target_audience: TargetAudience,
    what_sells_most: WhatSellsMost,
    artists : ARec[] = [],
    discarded_artists : ARec[] = [],
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

  @Column('text', { array: true })
  venue: string[];

  @Column('jsonb')
  artist_budget: ArtistBudget;

  @Column()
  sponsorship_type: string;

  @Column('jsonb')
  wanted_brands: Brand[];

  @Column('jsonb')
  unwanted_brands: Brand[];

  @Column('jsonb')
  target_audience: TargetAudience;

  @Column('jsonb')
  what_sells_most: WhatSellsMost;

  @Column('jsonb')
  artists: ARec[];

  @Column('jsonb')
  discarded_artists: ARec[];

  @Column()
  status: boolean;
}
