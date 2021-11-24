import * as express from 'express';
import { ArtistRecommendation } from '../../../models/types/artist-recommendation';
import { PatchRequest } from '../../../models/types/patch-request';
import { QuestionsUI } from '../../../models/types/questions';
import ArtistService from '../../../services/artist';
import patchRecommendationsSchemaValidator from './validators/patchRequest';
import DocumentsRoutes from './documents/documentsRoutes';
import DocumentsService from '../../../services/documents';
import postRecommendationsSchemaValidator from './validators/postRequest';

export default class RecommendationsRoute {
  private artistService: ArtistService;

  private documentsService: DocumentsService;

  router: express.Router;

  constructor(artistService: ArtistService, documentsService: DocumentsService) {
    this.artistService = artistService;
    this.documentsService = documentsService;
    this.router = express.Router();

    this.router.use('/documents', new DocumentsRoutes(documentsService).router);

    this.router.get('/:id', (req, res) => {
      const { id } = req.params;
      const data : ArtistRecommendation | { error : string} = artistService.getRecommendation(id);
      // eslint-disable-next-line no-prototype-builtins
      if (!data?.hasOwnProperty('error'))res.send({ data, success: true });
      else res.send({ data, success: false });
    });

    this.router.post('/', postRecommendationsSchemaValidator, (req, res) => {
      const request = req.body as QuestionsUI;
      const response = this.artistService.createNewRecommendation(request);
      res.send(response);
    });

    // Try Catch block addded for async requests example
    this.router.get('/', async (req, res, next) => {
      try {
        const response = artistService.getConcerts();
        res.send(response);
      } catch (err) {
        next(err);
      }
    });

    this.router.patch('/', patchRecommendationsSchemaValidator, (req, res) => {
      const request = req.body as PatchRequest;
      const response = this.artistService.updateRecommendation(request);
      res.send(response);
    });

    this.router.delete('/:id', (req, res) => {
      if (req.params.id) {
        res.send(this.artistService.deleteConcert(req.params.id));
      } else {
        res.send({ error: 'No formID provided.' });
      }
    });
  }
}
