import {
  Entity, Column, PrimaryColumn, ManyToOne, JoinColumn, ManyToMany, JoinTable,
} from 'typeorm';
import { ArtistBudget } from '../types/artist-budget';
import { ARec } from '../types/artist-recommendation';
import { TargetAudience } from '../types/target-audience';
import { WhatSellsMost } from '../types/what-sells-most';
import PgBrandEntity from './pg-brand';
import PgEventsTypeEntity from './pg-events-type';
import PgVenueEntity from './pg-venue';

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

  @Column({ type: 'uuid', array: true })
  venue_id: string[];

  @ManyToMany(() => PgVenueEntity)
  @JoinTable({
    name: 'artist-recommendation-venue',
    joinColumn: {
      name: 'venue_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'artist_recomm_id',
      referencedColumnName: 'id',
    },
  })
  venue: PgVenueEntity[]

  @Column('jsonb')
  artist_budget: ArtistBudget;

  @Column()
  sponsorship_type: string;

  @Column({ type: 'uuid', array: true, default: [] })
  wanted_brands_id: string[];

  @ManyToMany(() => PgBrandEntity)
  @JoinTable({
    name: 'artist-recommendation-brands-wanted',
    joinColumn: {
      name: 'brand_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'artist_recomm_id',
      referencedColumnName: 'id',
    },
  })
  wanted_brands: PgBrandEntity[]

  @Column({ type: 'uuid', array: true, default: [] })
  unwanted_brands_id: string[];

  @ManyToMany(() => PgBrandEntity)
  @JoinTable({
    name: 'artist-recommendation-brands-unwanted',
    joinColumn: {
      name: 'brand_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'artist_recomm_id',
      referencedColumnName: 'id',
    },
  })
  unwanted_brands: PgBrandEntity[]

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
