import * as request from 'supertest';
import { Server } from 'http';
import MainServer from '../../../server';
// import * as dummyArtistRecommendation from './repositories/in-memory/data/artist-recommendations.json';
// import * as questionsData from './repositories/in-memory/data/questions.json';

describe('Artists', () => {
  describe('GET /artists/recommendations/:id', () => {
    let server: Server;
    beforeEach(() => {
      server = new MainServer().app.listen();
    });

    it('should return empty array for an invalid artists recoommendation id', async () => {
      const invalidId = '234';
      const result = await request(server).get(`/artists/recommendations/${invalidId}`).set({ userid: '1238989' });
      expect(result.status).toEqual(200);
      expect(result.body).toEqual({
        data: {
          error: 'Recommendation not found',
        },
        success: false,
      });
    });

    it('should return No userId in headers', async () => {
      const invalidId = '234';
      const result = await request(server).get(`/artists/recommendations/${invalidId}`);
      expect(result.status).toEqual(400);
      expect(result.body).toEqual({ error: 'No UserId in headers!' });
    });

    afterEach(() => {
      server.close();
    });
  });
});
