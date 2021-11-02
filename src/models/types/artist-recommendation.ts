import { Artist } from './artist';
import { Questions } from './questions';

export type ArtistRecommendation = {
  id: String;
  questions?: Questions;
  artist?: Artist;
};
