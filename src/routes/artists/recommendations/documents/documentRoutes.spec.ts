import request from 'supertest';
import { Server } from 'http';
import MainServer from '../../../../server';
// import recommendationRequest from '../../../../repositories/artistRecommendations/in-memory/data/recommendationRequest.json';

describe('Documents', () => {
  describe('POST artists/recommendations/documents', () => {
    let server: Server;
    beforeEach(() => {
      server = new MainServer().app.listen();
    });

    it('should return No userId in header', async () => {
      const result = await request(server).post('/artists/recommendations/documents').send({});
      expect(result.status).toEqual(400);
      expect(result.body).toEqual({ error: 'No UserId in headers!' });
    });

    it('should return Invalid User', async () => {
      const result = await request(server).post('/artists/recommendations/documents').set({ userid: '1234899' }).send({});
      expect(result.status).toEqual(401);
      expect(result.body).toEqual({ error: 'Invalid User' });
    });

    afterEach(() => {
      server.close();
    });
  });

  describe('GET artists/recommendations/documents/:docid', () => {
    let server: Server;
    beforeEach(() => {
      server = new MainServer().app.listen();
    });

    it('should return No userId in header', async () => {
      const result = await request(server).get('/artists/recommendations/documents/someid').send({});
      expect(result.status).toEqual(400);
      expect(result.body).toEqual({ error: 'No UserId in headers!' });
    });

    it('should return Invalid User', async () => {
      const result = await request(server).get('/artists/recommendations/documents/someid').set({ userid: '1234899' }).send({});
      expect(result.status).toEqual(401);
      expect(result.body).toEqual({ error: 'Invalid User' });
    });

    afterEach(() => {
      server.close();
    });
  });
});
