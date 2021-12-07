/* eslint-disable no-console */
import * as expectedArtists from './data/artists.json';
import InMemoryArtistRepo from './artist';

describe('Artists', () => {
  let artistRepo: InMemoryArtistRepo;

  beforeEach(() => {
    artistRepo = new InMemoryArtistRepo();
  });

  describe('getArtist', () => {
    it('should return the artist if it exists', async () => {
      const expectedArtist = expectedArtists[0];
      const actualArtist = await artistRepo.getArtist(expectedArtist.id);
      expect(actualArtist).toEqual(expectedArtist);
    });
  });
});
