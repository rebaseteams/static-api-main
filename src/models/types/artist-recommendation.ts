import { Artist } from './artist';
import { ArtistMatch } from './artist-match';
import { Questions } from './questions';

export type ARec = {
  artist?: Artist;
  match?: ArtistMatch;
  summary?: string;
};

export type ArtistRecommendation = {
  concertData: Questions;
  artists: Array<ARec>;
  status: boolean
};
