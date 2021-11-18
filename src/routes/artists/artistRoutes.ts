import * as express from 'express';
import ArtistService from '../../services/artist';
import RecommendationsRoute from './recommendations/recommendationsRoutes';

export default class ArtistRoute {
  private artistService: ArtistService;

  router: express.Router;

  constructor(artistService: ArtistService) {
    this.artistService = artistService;
    this.router = express.Router();
    this.router.use('/recommendations', new RecommendationsRoute(artistService).router);
    this.router.get('/:id', (req, res) => {
      if (req.params.id) {
        res.send(this.artistService.getArtist(req.params.id));
      } else {
        res.send([]);
      }
    });
  }
}
