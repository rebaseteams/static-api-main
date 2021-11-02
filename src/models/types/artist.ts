/* eslint-disable semi */
/* eslint-disable no-unused-vars */

import { ArtistMatch } from './artist-match';

export type Artist = {
    artistName : String;
    artistId : String;
    artistImage: String;
    matchPercentage: Number;
    matchAttributes: ArtistMatch;
    summary?: String;
}
