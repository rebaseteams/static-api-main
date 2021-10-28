import * as expectedArtists from './dummy-artist-data.json';
import getArtists from './artist';

describe('Artists', () => {
  describe('getArtists', () => {
    test('should return artists', () => {
      const actualArtists = getArtists();
      expect(actualArtists).toBe(expectedArtists);
    });
  });
});
