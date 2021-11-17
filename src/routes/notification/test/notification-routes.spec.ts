// import * as request from 'supertest';
import { Server } from 'http';
import MainServer from '../../../server';
// import * as dummyArtistRecommendation from './repositories/in-memory/data/artist-recommendations.json';
// import * as questionsData from './repositories/in-memory/data/questions.json';

describe('Notifications', () => {
  describe('GET /', () => {
    let server: Server;
    beforeEach(() => {
      server = new MainServer().app.listen();
    });

    // Added demo test.
    it('Server demo test', () => {
      expect(true).toEqual(true);
    });

    afterEach(() => {
      server.close();
    });
  });
});
