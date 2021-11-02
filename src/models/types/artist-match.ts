import { Brand } from './brand';
import { Genre } from './genre';
import { Venue } from './venue';

export type ArtistMatch = {
  venues: Array<Venue>;
  age: {
    ageGroup: String;
    matchPercentage?: Number;
  };
  gender: {
    male: Number;
    female: Number;
  };
  genre: Array<Genre>;
  associatedBrands: Array<Brand>;
}
