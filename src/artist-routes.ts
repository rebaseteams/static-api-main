import * as express from 'express';
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
  }
}
