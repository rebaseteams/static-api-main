import { Address } from './address';

export type Venue = {
    venueName : string;
    venueId : string;
    venueAddress? : Address;
    venueCapacity? : number;
}
