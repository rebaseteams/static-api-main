import { Address } from './address';

export type Venue = {
    id : String;
    name : String;
    address : Address;
    venueCapacity? : Number;
    matchPercentage: Number
}
