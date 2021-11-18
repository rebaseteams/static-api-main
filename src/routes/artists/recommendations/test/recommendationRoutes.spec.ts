import * as request from 'supertest';
import { Server } from 'http';
import MainServer from '../../../../server';
// import recommendationRequest from '../../../../repositories/artistRecommendations/in-memory/data/recommendationRequest.json';

describe('Recommendations', () => {
  describe('DELETE /recommendations/:id', () => {
    let server: Server;
    beforeEach(() => {
      server = new MainServer().app.listen();
    });

    it('should return No userId in header', async () => {
      const formId = 'id1';
      const result = await request(server).delete(`/artists/recommendations/${formId}`).send({});
      expect(result.status).toEqual(400);
      expect(result.body).toEqual({ error: 'No UserId in headers!' });
    });

    it('should return Invalid User', async () => {
      const formId = 'id1';
      const result = await request(server).delete(`/artists/recommendations/${formId}`).set({ userid: '1234899' }).send({});
      expect(result.status).toEqual(401);
      expect(result.body).toEqual({ error: 'Invalid User' });
    });

    afterEach(() => {
      server.close();
    });
  });

  describe('GET /artists/recommendations', () => {
    let server: Server;
    beforeEach(() => {
      server = new MainServer().app.listen();
    });

    // Adding Test for userId in req.headers
    it('should return No userId in header', async () => {
      const result = await request(server).get('/artists/recommendations/').send({});
      expect(result.status).toEqual(400);
      expect(result.body).toEqual({ error: 'No UserId in headers!' });
    });

    it('should return Invalid User', async () => {
      const result = await request(server).get('/artists/recommendations/').set({ userid: '1234899' }).send({});
      expect(result.status).toEqual(401);
      expect(result.body).toEqual({ error: 'Invalid User' });
    });

    it('should return all recommendations', async () => {
      const result = await request(server).get('/artists/recommendations/').set({ userid: '1238989' }).send({});
      expect(result.status).toEqual(200);
    });

    afterEach(() => {
      server.close();
    });
  });

  describe('GET /artists/recommendations/:id', () => {
    let server: Server;
    beforeEach(() => {
      server = new MainServer().app.listen();
    });

    it('should return empty array for an invalid artists recoommendation id', async () => {
      const invalidId = '234';
      const result = await request(server).get(`/artists/recommendations/${invalidId}`).set({ userid: '1238989' }).send({});
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
      const result = await request(server).get(`/artists/recommendations/${invalidId}`).send({});
      expect(result.status).toEqual(400);
      expect(result.body).toEqual({ error: 'No UserId in headers!' });
    });

    afterEach(() => {
      server.close();
    });
  });

  describe('PATCH /artists/recommendations/:id', () => {
    let server: Server;
    beforeEach(() => {
      server = new MainServer().app.listen();
    });

    it('should return No userId in header', async () => {
      const artistId = 'id1';
      const result = await request(server).patch(`/artists/recommendations/${artistId}`).send({});
      expect(result.status).toEqual(400);
      expect(result.body).toEqual({ error: 'No UserId in headers!' });
    });

    it('should return Invalid User', async () => {
      const artistId = 'id1';
      const result = await request(server).patch(`/artists/recommendations/${artistId}`).set({ userid: '1234899' }).send({});
      expect(result.status).toEqual(401);
      expect(result.body).toEqual({ error: 'Invalid User' });
    });

    afterEach(() => {
      server.close();
    });
  });

  describe('POST /artists/recommendations', () => {
    let server: Server;
    beforeEach(() => {
      server = new MainServer().app.listen();
    });

    // Adding Demo Test for time being
    it('Server demo test', () => {
      expect(true).toEqual(true);
    });

    afterEach(() => {
      server.close();
    });
  });
});
