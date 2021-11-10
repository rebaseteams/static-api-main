import * as express from 'express';
import { QuestionsUI } from './models/types/questions';
import ArtistService from './services/artist';

export default class ArtistRoute {
  private artistService: ArtistService;

  router: express.Router;

  constructor(artistService: ArtistService) {
    this.artistService = artistService;
    this.router = express.Router();

    this.router.get('/recommendations/:id', (req, res) => {
      if (req.params.id === 'id1') {
        res.send(this.artistService.getRecommendation(req.params.id));
      } else {
        res.send([]);
      }
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
  }
}
