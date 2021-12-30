import * as express from 'express';
import { QuestionsUI } from '../../../models/types/questions';
import ArtistService from '../../../services/artist';
import patchRequestValidator from './validators/patchRequest';
import DocumentsRoutes from './documents/documentsRoutes';
import DocumentsService from '../../../services/documents';
import questionsUIValidator from './validators/questionsUIValidator';
import TemplatesService from '../../../services/templates';
import { DocusignService } from '../../../services/docusign';

export default class RecommendationsRoute {
  router: express.Router;

  constructor(
    artistService: ArtistService,
    documentsService: DocumentsService,
    templatesService: TemplatesService,
    docusignService: DocusignService,
  ) {
    this.router = express.Router();

    this.router.use('/documents', new DocumentsRoutes(documentsService, templatesService, docusignService).router);

    this.router.get('/:id', async (req, res, next) => {
      try {
        const { id } = req.params;
        const data = await artistService.getRecommendation(id);
        res.send({ data, success: true });
      } catch (error) {
        next(error);
      }
    });

    this.router.post('/', questionsUIValidator, async (req, res, next) => {
      try {
        const data = req.body as QuestionsUI;
        const response = await artistService.createRecommendation(data);
        res.send({ success: true, data: response });
      } catch (error) {
        next(error);
      }
    });

    this.router.get('/', async (req, res, next) => {
      try {
        const data = await artistService.getAllRecommendations();
        res.send({ success: true, data: { recommendations: data } });
      } catch (error) {
        next(error);
      }
    });

    this.router.get('/status/:id', async (req, res, next) => {
      try {
        const data = await artistService.getRecommendationStatus(req.params.id);
        res.send({ success: true, data });
      } catch (error) {
        next(error);
      }
    });

    this.router.patch('/', patchRequestValidator, async (req, res, next) => {
      try {
        const data = await artistService.discardArtist(req.body.id, req.body.artistId);
        res.send({ success: data.success });
      } catch (error) {
        next(error);
      }
    });

    this.router.delete('/:id', async (req, res, next) => {
      try {
        const data = await artistService.deleteRecommendation(req.params.id);
        res.send({ success: data.success });
      } catch (error) {
        next(error);
      }
    });
  }
}
