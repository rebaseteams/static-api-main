import { Questions } from './questions';

export type ARec = {
    artistName: string,
    artistId: string,
    artistImage: string,
    matchPercentage: number,
    matchAttributes: {
      venues: Array<
        {
          id: string,
          name: string,
          address: {
            pincode: number,
            country: string,
            city: string,
            geoLocation: {
              lat: number,
              long: number,
            },
          },
          venueCapacity: number,
          matchPercentage: number,
        }>;
      age: {
        ageGroup: string,
        matchPercentage: number,
      },
      gender: {
        male: number,
        female: number,
      },
      genre: [
        {
          genreName: string,
          matchPercentage: number,
        },
      ],
      associatedBrands: Array<
        {
          id: string,
          name: string,
          contact: string,
          website: string,
          logoUrl: string,
        }>;
    };
    summary: string,
};

export type ArtistRecommendation = {
  concertData: Questions;
  artists: Array<ARec>;
  discardedArtists?: Array<ARec>;
  status: boolean
};
