// import * as request from 'supertest';
import { Server } from 'http';
import MainServer from '../../../server';
// import * as dummyArtistRecommendation from './repositories/in-memory/data/artist-recommendations.json';
// import * as questionsData from './repositories/in-memory/data/questions.json';

describe('POST /artists/concert', () => {
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
