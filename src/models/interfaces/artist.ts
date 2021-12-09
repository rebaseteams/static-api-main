/* eslint-disable no-unused-vars */

import { Artist } from '../types/artist';
import { ArtistRecommendation } from '../types/artist-recommendation';
import { ConcertCreationResponse, QuestionsUI } from '../types/questions';

export interface ArtistInterface {
  getArtist(id : string) : Promise<Artist>;
  getArtists(skip: number, limit: number) : Promise<Artist[]>;
}

/* The repositories are supposed to implement this interface */
export interface ArtistRepoInterface {
  getArtist(id : string) : Artist ;
  addArtist(artist : Artist) : Boolean;
}

/* The service is supposed to implement this interface */
export interface ArtistServiceInteface {
  getArtist(id : string) : Artist;
  addArtist(artist : Artist) : Boolean;
  getRecommendation(id : string): ArtistRecommendation;
  getConcerts() : ConcertCreationResponse[] ;
  createNewRecommendation(questions: QuestionsUI): ConcertCreationResponse
}
