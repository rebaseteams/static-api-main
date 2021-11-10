/* eslint-disable no-unused-vars */

import { ArtistRecommendation } from '../types/artist-recommendation';

/* The repositories are supposed to implement this interface */
export interface ArtistRecommendationRepoInterface {
  getArtistRecommendation(id: string): ArtistRecommendation | { error : string };
  addNewRecommendation(artistRecomendation: ArtistRecommendation): Boolean;
}
