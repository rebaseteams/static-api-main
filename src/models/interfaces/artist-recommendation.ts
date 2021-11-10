/* eslint-disable no-unused-vars */

import { Artist } from '../types/artist';
import { ARec, ArtistRecommendation } from '../types/artist-recommendation';
import { PatchRequest } from '../types/patch-request';
import { ConcertCreationResponse } from '../types/questions';

/* The repositories are supposed to implement this interface */
export interface ArtistRecommendationRepoInterface {
  getArtistRecommendation(id: string): ArtistRecommendation | { error : string };
  addNewRecommendation(artistRecomendation: ArtistRecommendation): Boolean;
  updateDiscardedArtist(request: PatchRequest): { data:ARec[], success: Boolean} | { data:{ error : string}, success: Boolean};
  getConcerts(): ConcertCreationResponse[] | { error : string };
}
