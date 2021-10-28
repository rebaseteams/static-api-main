export type Venue = {
  name: string;
  match_percentage: number;
}

export type Brand = {
  name: string;
  contact: string;
  website: string;
}

export type MatchAttributes = {
  venues: Venue[];
  gender: string;
  genre: string;
  age: string;
  associated_brands: Brand[];
}

export type Artist = {
    artist_name: string;
    artist_id: string;
    match_percentage: number;
    match_attributes: MatchAttributes;
    summary: string;
}
