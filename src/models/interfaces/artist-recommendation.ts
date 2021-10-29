/* eslint-disable no-unused-vars */

import { ArtistRecommendation } from '../types/artist-recommendation';

/* The repositories are supposed to implement this interface */
export interface ArtistRecommendationRepoInterface {
  getArtistRecommendations(id: string) : ArtistRecommendation[];
  addNewRecommendation(artistRecomendation: ArtistRecommendation): Boolean;
}
