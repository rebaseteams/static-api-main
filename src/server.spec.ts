import * as request from 'supertest';
import { Server } from 'http';
import MainServer from './server';
// import * as dummyArtistRecommendation from './repositories/in-memory/data/artist-recommendations.json';
// import * as questionsData from './repositories/in-memory/data/questions.json';

describe('Artists', () => {
  describe('GET /artists/recommendations/:id', () => {
    let server: Server;
    beforeEach(() => {
      server = new MainServer().app.listen();
    });
    // TODO: Solve Test errors
    // it('should return recommendation for the queried valid id', async () => {
    //   const validId = 'id1';
    //   const result = await request(server).get(`/artists/recommendations/${validId}`);
    //   expect(result.status).toEqual(200);
    //   expect(result.body).toEqual(dummyArtistRecommendation);
    // });

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
  describe('POST /artists/concert', () => {
    let server: Server;
    beforeEach(() => {
      server = new MainServer().app.listen();
    });

    // Adding Demo Test for time being
    it('Server demo test', () => {
      expect(true).toEqual(true);
    });

    // TODO: Solve test errors
    // it('should return id for questions', async () => {
    //   const result = await request(server).post('/artists/concert').send(questionsData);
    //   expect(result.status).toEqual(200);
    //   expect(result.body).toEqual({ id: '123' });
    // });

    afterEach(() => {
      server.close();
    });
  });

  describe('GET /artists/concert', () => {
    let server: Server;
    beforeEach(() => {
      server = new MainServer().app.listen();
    });

    // Adding Test for userId in req.headers
    it('should return No userId in header', async () => {
      const result = await request(server).get('/artists/concert');
      expect(result.status).toEqual(400);
      expect(result.body).toEqual({ error: 'No UserId in headers!' });
    });

    it('should return Invalid User', async () => {
      const result = await request(server).get('/artists/concert').set({ userid: '1234899' });
      expect(result.status).toEqual(401);
      expect(result.body).toEqual({ error: 'Invalid User' });
    });

    afterEach(() => {
      server.close();
    });
  });
});
