import * as expectedArtists from './data/artists.json';
import InMemoryArtistRepo from './artist';
import { Artist } from '../../../models/types/artist';

describe('Artists', () => {
  let artistRepo: InMemoryArtistRepo;

  beforeEach(() => {
    artistRepo = new InMemoryArtistRepo();
  });

  describe('getArtist', () => {
    it('should return the artist if it exists', () => {
      const expectedArtist = expectedArtists[0];
      const actualArtist = artistRepo.getArtist('id1');
      expect(actualArtist).toEqual(expectedArtist);
    });

    it('should return the error if artist does not exist', () => {
      const expectedError = { message: 'Not Found' };
      const actualArtist = artistRepo.getArtist('invalidId');
      expect(actualArtist).toEqual(expectedError);
    });
  });

  describe('addArtist', () => {
    it('should add the artist if it does not exist', () => {
      const artistToAdd: Artist = {
        artistId: 'id10',
        artistName: 'Test Artist',
        venues: [],
        brands: [],
      };
      const actualArtist = artistRepo.addArtist(artistToAdd);
      expect(actualArtist).toBe(true);
    });

    it('should not add the artist if it already exists', () => {
      const artistToAdd: Artist = {
        artistId: 'id1',
        artistName: 'Test Artist',
        venues: [],
        brands: [],
      };
      const actualArtist = artistRepo.addArtist(artistToAdd);
      expect(actualArtist).toBe(false);
    });
  });
});
