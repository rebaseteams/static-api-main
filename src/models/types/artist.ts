/* eslint-disable semi */
/* eslint-disable no-unused-vars */

import { Brand } from './brand';
import { Venue } from './venue';

export type Artist = {
    artistName : string;
    artistId : string;
    brands : Array<Brand>;
    venues : Array<Venue>;
}
