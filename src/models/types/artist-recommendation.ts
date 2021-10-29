import { Artist } from './artist';
import { ArtistMatch } from './artist-match';
import { Questions } from './questions';

export type ArtistRecommendation = {
  questions?: Questions;
  artist?: Artist;
  match?: ArtistMatch;
  summary?: string;
};
