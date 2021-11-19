// import * as expectedArtists from './data/artists.json';

import InMemoryAuthRepo from './auth';

describe('Artists', () => {
  // eslint-disable-next-line no-unused-vars
  let authReop: InMemoryAuthRepo;

  beforeEach(() => {
    authReop = new InMemoryAuthRepo();
  });

  describe('login', () => {
    it('auth login demo test', () => {
      expect(true).toEqual(true);
    });
  });
});
