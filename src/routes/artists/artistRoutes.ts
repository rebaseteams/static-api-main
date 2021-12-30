import * as express from 'express';
import ArtistService from '../../services/artist';
import DocumentsService from '../../services/documents';
import { DocusignService } from '../../services/docusign';
import TemplatesService from '../../services/templates';
import snakeToCamel from '../../utils/snakeToCamel';
import RecommendationsRoute from './recommendations/recommendationsRoutes';

export default class ArtistRoute {
  router: express.Router;

  constructor(artistService: ArtistService,
    documentsService: DocumentsService,
    templatesService: TemplatesService,
    docusignService: DocusignService) {
    this.router = express.Router();

    this.router.use('/recommendations', new RecommendationsRoute(artistService, documentsService, templatesService, docusignService).router);

    this.router.get('/:id', async (req, res, next) => {
      try {
        const data = snakeToCamel(await artistService.getArtist(req.params.id));
        if (req.params.id) res.send({ success: true, data });
      } catch (error) {
        next(error);
      }
    });

    this.router.get('/:skip/:limit', async (req, res, next) => {
      try {
        const artists = await artistService.getArtists(parseInt(req.params.skip, 10), parseInt(req.params.limit, 10));
        res.send({ success: true, data: { artists } });
      } catch (error) {
        next(error);
      }
    });
  }
}
