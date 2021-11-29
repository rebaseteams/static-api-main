import * as express from 'express';
import { ArtistRecommendation } from '../../../models/types/artist-recommendation';
import { PatchRequest } from '../../../models/types/patch-request';
import { QuestionsUI } from '../../../models/types/questions';
import ArtistService from '../../../services/artist';
import patchRequestValidator from './validators/patchRequest';
import DocumentsRoutes from './documents/documentsRoutes';
import DocumentsService from '../../../services/documents';
import questionsUIValidator from './validators/questionsUIValidator';

export default class RecommendationsRoute {
  router: express.Router;

  constructor(artistService: ArtistService, documentsService: DocumentsService) {
    this.router = express.Router();

    this.router.use('/documents', new DocumentsRoutes(documentsService).router);

    this.router.get('/:id', (req, res) => {
      const { id } = req.params;
      const data : ArtistRecommendation | { error : string} = artistService.getRecommendation(id);
      // eslint-disable-next-line no-prototype-builtins
      if (!data?.hasOwnProperty('error'))res.send({ data, success: true });
      else res.send({ data, success: false });
    });

    this.router.post('/', questionsUIValidator, (req, res) => {
      const request = req.body as QuestionsUI;
      const response = artistService.createNewRecommendation(request);
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

    this.router.patch('/', patchRequestValidator, (req, res) => {
      const request = req.body as PatchRequest;
      const response = artistService.updateRecommendation(request);
      res.send(response);
    });

    this.router.delete('/:id', (req, res) => {
      if (req.params.id) {
        res.send(artistService.deleteConcert(req.params.id));
      } else {
        res.send({ error: 'No formID provided.' });
      }
    });
  }
}
