/* eslint-disable semi */

import Address from './Address';

export default interface Venue {
    venueName : string;

    venueId : string;

    venueAddress : Address;

    venueCapacity : number;
}
