import * as request from 'supertest';
import { Server } from 'http';
import MainServer from '../../../server';
// import * as dummyArtistRecommendation from './repositories/in-memory/data/artist-recommendations.json';
// import * as questionsData from './repositories/in-memory/data/questions.json';

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
