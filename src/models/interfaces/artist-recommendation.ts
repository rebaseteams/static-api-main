/* eslint-disable no-unused-vars */

import { Artist } from '../types/artist';
import { ARec, ArtistRecommendation } from '../types/artist-recommendation';
import { ConcertCreationResponse, QuestionsUI } from '../types/questions';

/* The repositories are supposed to implement this interface */
export interface ArtistRecommendationInterface {
  getRecommendation(id : string) : Promise<ArtistRecommendation>;
  getAllRecommendations() : Promise<ConcertCreationResponse[]>;
  discardArtist(id : string, artistId : string) : Promise<{ success: boolean }>;
  deleteRecommendation(id : string) : Promise<{ success: boolean }>
  createRecommendation(questions: QuestionsUI) : Promise<ConcertCreationResponse>;
  generateRecommendedArtists(id : string, _artists : Artist[]) : Promise<{ success: boolean }>;
  getArtistCount(id : string) : Promise<{count : number }>
  getRecommendationStatus(id : string) : Promise<{status : boolean}>;
  registerDocument(id : string, docid : string) : Promise<{success : boolean}>;
}
