import * as request from 'supertest';
import { Server } from 'http';
import MainServer from '../../../../../server';
// import recommendationRequest from '../../../../repositories/artistRecommendations/in-memory/data/recommendationRequest.json';

describe('Templates', () => {
  describe('GET artists/recommendations/documents/templates/:id', () => {
    let server: Server;
    beforeEach(() => {
      server = new MainServer().app.listen();
    });

    it('should return No userId in header', async () => {
      const templateId = '1234';
      const result = await request(server).get(`/artists/recommendations/documents/templates/${templateId}`).send({});
      expect(result.status).toEqual(400);
      expect(result.body).toEqual({ error: 'No UserId in headers!' });
    });

    it('should return Invalid User', async () => {
      const templateId = '1234';
      const result = await request(server).get(`/artists/recommendations/documents/templates/${templateId}`).set({ userid: '1234899' }).send({});
      expect(result.status).toEqual(401);
      expect(result.body).toEqual({ error: 'Invalid User' });
    });

    it('should return Template data successfully', async () => {
      const templateId = '1234';
      const result = await request(server).get(`/artists/recommendations/documents/templates/${templateId}`).set({ userid: '1238989' }).send({});
      expect(result.status).toEqual(200);
      expect(result.body).toEqual({
        data: {
          templateId: '1234',
          template: '',
          questions: [
            {
              question: 'Who are you?',
              field: 'artistName',
              type: 'string',
            },
          ],
        },
        success: true,
      });
    });

    afterEach(() => {
      server.close();
    });
  });
});
