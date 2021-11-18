import * as request from 'supertest';
import { Server } from 'http';
import MainServer from '../../../server';

describe('Artists', () => {
  describe('GET /:id', () => {
    let server: Server;
    beforeEach(() => {
      server = new MainServer().app.listen();
    });

    // Adding Test for userId in req.headers
    it('should return No userId in header', async () => {
      const artistId = 'id1';
      const result = await request(server).get(`/artists/${artistId}`).send({});
      expect(result.status).toEqual(400);
      expect(result.body).toEqual({ error: 'No UserId in headers!' });
    });

    it('should return Invalid User', async () => {
      const artistId = 'id1';
      const result = await request(server).get(`/artists/${artistId}`).set({ userid: '1234899' }).send({});
      expect(result.status).toEqual(401);
      expect(result.body).toEqual({ error: 'Invalid User' });
    });

    afterEach(() => {
      server.close();
    });
  });
});
