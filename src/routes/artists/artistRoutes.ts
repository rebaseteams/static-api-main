import * as express from 'express';
import ArtistService from '../../services/artist';
import DocumentsService from '../../services/documents';
import RecommendationsRoute from './recommendations/recommendationsRoutes';

export default class ArtistRoute {
  private artistService: ArtistService;

  private documentsService: DocumentsService;

  router: express.Router;

  constructor(artistService: ArtistService, documentsService: DocumentsService) {
    this.artistService = artistService;
    this.documentsService = documentsService;
    this.router = express.Router();
    this.router.use('/recommendations', new RecommendationsRoute(artistService, documentsService).router);
    this.router.get('/:id', (req, res) => {
      if (req.params.id) res.send(this.artistService.getArtist(req.params.id));
    });
  }
}
