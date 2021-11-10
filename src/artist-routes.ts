import * as express from 'express';
import { ArtistRecommendation } from './models/types/artist-recommendation';
import { PatchRequest } from './models/types/patch-request';
import { QuestionsUI } from './models/types/questions';
import ArtistService from './services/artist';

export default class ArtistRoute {
  private artistService: ArtistService;

  router: express.Router;

  constructor(artistService: ArtistService) {
    this.artistService = artistService;
    this.router = express.Router();

    this.router.get('/recommendations/:id', (req, res) => {
      const { id } = req.params;
      const data : ArtistRecommendation | { error : string} = artistService.getRecommendation(id);
      // eslint-disable-next-line no-prototype-builtins
      if (!data?.hasOwnProperty('error'))res.send({ data, success: true });
      else res.send({ data, success: false });
    });

    this.router.post('/concert', async (req, res) => {
      const request = req.body as QuestionsUI;
      const response = this.artistService.createNewRecommendation(request);
      res.send(response);
    });

    this.router.get('/:id', (req, res) => {
      if (req.params.id) {
        res.send(this.artistService.getArtist(req.params.id));
      } else {
        res.send([]);
      }
    });

    this.router.patch('/recommendations', (req, res) => {
      const request = req.body as PatchRequest;
      const response = this.artistService.updateRecommendation(request);
      res.send(response);
    });
  }
}
