export type ArtistMatch = {
  match_percentage: number;
  match_attributes: {
    venues: {
      name: string,
      match_percentage: number
    }[];
    gender: string;
    genre: string;
    age: string;
    associated_brands: {
      name: string;
      contact: string;
      website: string;
    }[]
  }
}
