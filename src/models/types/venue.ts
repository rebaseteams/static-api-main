import { Address } from './address';

export type Venue = {
    name : string;
    id : string;
    address? : Address;
    capacity? : number;
}
