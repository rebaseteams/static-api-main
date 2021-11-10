/* eslint-disable no-unused-vars */

import { ArtistRecommendation } from '../types/artist-recommendation';

/* The repositories are supposed to implement this interface */
export interface ArtistRecommendationRepoInterface {
  getArtistRecommendation(id: string): ArtistRecommendation | null;
  addNewRecommendation(artistRecomendation: ArtistRecommendation): Boolean;
}
