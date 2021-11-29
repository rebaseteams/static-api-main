import * as express from 'express';
import ArtistService from '../../services/artist';
import DocumentsService from '../../services/documents';
import TemplatesService from '../../services/templates';
import RecommendationsRoute from './recommendations/recommendationsRoutes';

export default class ArtistRoute {
  router: express.Router;

  constructor(artistService: ArtistService, documentsService: DocumentsService, templatesService: TemplatesService) {
    this.router = express.Router();
    this.router.use('/recommendations', new RecommendationsRoute(artistService, documentsService, templatesService).router);
    this.router.get('/:id', (req, res) => {
      if (req.params.id) res.send(artistService.getArtist(req.params.id));
    });
  }
}
