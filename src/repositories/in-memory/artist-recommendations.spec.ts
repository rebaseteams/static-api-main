import * as expectedArtistRecommendations from './data/artist-recommendations.json';
// import * as questionsData from './data/questions.json';
import InMemoryArtistRecommendationRepo from './artist-recommendation';

describe('ArtistRecommendations', () => {
  let artistRecommendationRepo: InMemoryArtistRecommendationRepo;

  beforeEach(() => {
    artistRecommendationRepo = new InMemoryArtistRecommendationRepo();
  });

  describe('getArtistRecommendations', () => {
    it('should return the artist recommendation if it exists', () => {
      const actualArtistRecommnedations = artistRecommendationRepo.getArtistRecommendation('id1');
      expect(actualArtistRecommnedations).toEqual(expectedArtistRecommendations);
    });
  });
  // describe('addNewRecommendation', () => {
  //   it('should return the artist recommendation if it exists', () => {
  //     const addedArtistRecommendation = artistRecommendationRepo.addNewRecommendation(questionsData[0]);
  //     expect(addedArtistRecommendation).toEqual(true);
  //   });
  // });
});
