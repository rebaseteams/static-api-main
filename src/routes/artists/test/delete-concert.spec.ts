import * as request from 'supertest';
import { Server } from 'http';
import MainServer from '../../../server';
// import * as dummyArtistRecommendation from './repositories/in-memory/data/artist-recommendations.json';
// import * as questionsData from './repositories/in-memory/data/questions.json';

describe('DELETE /concert/:id', () => {
  let server: Server;
  beforeEach(() => {
    server = new MainServer().app.listen();
  });

  it('should return No userId in header', async () => {
    const formId = 'id1';
    const result = await request(server).delete(`/artists/concert/${formId}`);
    expect(result.status).toEqual(400);
    expect(result.body).toEqual({ error: 'No UserId in headers!' });
  });

  it('should return Invalid User', async () => {
    const formId = 'id1';
    const result = await request(server).delete(`/artists/concert/${formId}`).set({ userid: '1234899' });
    expect(result.status).toEqual(401);
    expect(result.body).toEqual({ error: 'Invalid User' });
  });

  afterEach(() => {
    server.close();
  });
});
