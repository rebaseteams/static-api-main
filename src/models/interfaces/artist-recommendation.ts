/* eslint-disable no-unused-vars */

import { ArtistRecommendation } from '../types/artist-recommendation';
import { ConcertRecommendation } from '../types/concert-recommendation';

/* The repositories are supposed to implement this interface */
export interface ArtistRecommendationRepoInterface {
  getArtistRecommendations(id: string) : ArtistRecommendation | { message : String };
  addNewRecommendation(artistRecomendation: ArtistRecommendation): Boolean;
  updateConcertRecommendation(userSelection: ConcertRecommendation) : Boolean;
}
