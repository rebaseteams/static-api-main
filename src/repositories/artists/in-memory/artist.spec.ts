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
      const actualArtist = await artistRepo.getArtist('id1');
      expect(actualArtist).toEqual(expectedArtist);
    });

    // it('should return the error if artist does not exist', () => {
    //   const expectedError = { message: 'Artist not found for id: invalidId' };
    //   const actualArtist = artistRepo.getArtist('invalidId');
    //   console.log(actualArtist);
    //   expect(actualArtist).toEqual(expectedError);
    // });
  });
});
