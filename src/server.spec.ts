import * as request from 'supertest';
import { Server } from 'http';
import app from './server';
import * as dummyArtists from './repos/dummy-artist-data.json';

describe('Artists', () => {
  describe('GET /artists/recommendations/:id', () => {
    let server: Server;
    beforeEach(() => {
      server = app.listen();
    });
    it('should return recommendation for the queried valid id', async () => {
      const validId = '123';
      const result = await request(server).get(`/artists/recommendations/${validId}`);
      expect(result.status).toEqual(200);
      expect(result.body).toEqual(dummyArtists);
    });

    it('should return empty array for an invalid artists recoommendation id', async () => {
      const invalidId = '234';
      const result = await request(server).get(`/artists/recommendations/${invalidId}`);
      expect(result.status).toEqual(200);
      expect(result.body).toEqual([]);
    });

    afterEach(() => {
      server.close();
    });
  });
});
