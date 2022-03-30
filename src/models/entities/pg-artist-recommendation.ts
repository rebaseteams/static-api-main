import {
  Entity, Column, PrimaryColumn, ManyToOne, JoinColumn,
} from 'typeorm';
import { ArtistBudget } from '../types/artist-budget';
import { ARec } from '../types/artist-recommendation';
import { Brand } from '../types/brand';
import { TargetAudience } from '../types/target-audience';
import { WhatSellsMost } from '../types/what-sells-most';
import PgEventsTypeEntity from './pg-events-type';

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

  @Column({ type: 'uuid' })
  event_type_id: string;

  @ManyToOne(() => PgEventsTypeEntity)
  @JoinColumn({ name: 'event_type_id', referencedColumnName: 'id' })
  event_type: PgEventsTypeEntity

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

  @Column('text', { array: true, default: [] })
  documents : string[];

  @Column()
  status: boolean;
}
