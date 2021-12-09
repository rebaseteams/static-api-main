// import * as expectedArtistRecommendations from './data/artist-recommendations.json';
// import * as questionsData from './data/questions.json';
// import { request } from 'express';
import InMemoryArtistRecommendationRepo from './artist-recommendation';

// import { PatchRequest } from '../../../models/types/patch-request';

describe('ArtistRecommendations', () => {
  // eslint-disable-next-line no-unused-vars
  let artistRecommendationRepo: InMemoryArtistRecommendationRepo;

  beforeEach(() => {
    artistRecommendationRepo = new InMemoryArtistRecommendationRepo();
  });

  it('artist recommendation demo test', () => {
    expect(true).toEqual(true);
  });
});
