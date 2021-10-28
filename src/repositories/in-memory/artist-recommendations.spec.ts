import * as expectedArtistRecommendations from './data/artist-recommendations.json';
import InMemoryArtistRecommendationRepo from './artist-recommendation';

describe('ArtistRecommendations', () => {
  let artistRecommendationRepo: InMemoryArtistRecommendationRepo;

  beforeEach(() => {
    artistRecommendationRepo = new InMemoryArtistRecommendationRepo();
  });

  describe('getArtistRecommendations', () => {
    it('should return the artist recommendation if it exists', () => {
      const actualArtistRecommnedations = artistRecommendationRepo.getArtistRecommendations('id1');
      expect(actualArtistRecommnedations).toEqual(expectedArtistRecommendations);
    });
  });
});
