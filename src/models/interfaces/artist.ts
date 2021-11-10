/* eslint-disable no-unused-vars */

import { Artist } from '../types/artist';
import { ArtistRecommendation } from '../types/artist-recommendation';
import { ConcertCreationResponse, QuestionsUI } from '../types/questions';

/* The repositories are supposed to implement this interface */
export interface ArtistRepoInterface {
  getArtist(id : string) : Artist | { message : string };
  addArtist(artist : Artist) : Boolean;
}

/* The service is supposed to implement this interface */
export interface ArtistServiceInteface {
  getArtist(id : string) : Artist| { message : string };
  addArtist(artist : Artist) : Boolean;
  getRecommendation(id : string): ArtistRecommendation | { error : string};
  getConcerts() : ConcertCreationResponse[] | { error : string };
  createNewRecommendation(questions: QuestionsUI): ConcertCreationResponse
}
