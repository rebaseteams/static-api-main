/* eslint-disable semi */
/* eslint-disable no-unused-vars */

import Brand from './Brand';
import Venue from './Venue';

export default interface ArtistType {
    artistName : string;

    artistId : string;

    summary : string;

    brands : Array<Brand>;

    venues : Array<Venue>;

    getArtist(id : string) : ArtistType|{message : string};

    addArtist(artist : ArtistType) : Boolean;
}
