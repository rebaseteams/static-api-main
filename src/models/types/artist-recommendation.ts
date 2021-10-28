import { Artist } from './artist';
import { ArtistMatch } from './artist-match';

export type ArtistRecommendation = {
  artist: Artist;
  match: ArtistMatch;
  summary: string;
};
