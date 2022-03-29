import { Entity, Column, PrimaryColumn } from 'typeorm';
import { ArtistBudget } from '../types/artist-budget';
import { ARec } from '../types/artist-recommendation';
import { TargetAudience } from '../types/target-audience';
import { WhatSellsMost } from '../types/what-sells-most';

@Entity({ name: 'artist_recommendation' })
export default class PgArtistRecommendationEntity {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column()
  name: string;

  @Column()
  date_created: Date;

  @Column({ type: 'varchar' })
  user_id: string;

  @Column({ type: 'jsonb', default: {} })
  event_type: {id: string, name: string;};

  @Column('jsonb', { array: true, default: [] })
  venue: {id: string, name: string;}[];

  @Column('jsonb')
  artist_budget: ArtistBudget;

  @Column()
  sponsorship_type: string;

  @Column('jsonb', { array: true, default: [] })
  wanted_brands: {id: string, name: string;}[];

  @Column('jsonb', { array: true, default: [] })
  unwanted_brands: {id: string, name: string;}[];

  @Column('jsonb')
  target_audience: TargetAudience;

  @Column('jsonb')
  what_sells_most: WhatSellsMost;

  @Column('jsonb')
  artists: ARec[];

  @Column('jsonb')
  discarded_artists: ARec[];

  @Column('text', { array: true, default: [] })
  documents : string[];

  @Column()
  status: boolean;
}
