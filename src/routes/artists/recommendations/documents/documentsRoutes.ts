/* eslint-disable no-console */
import * as express from 'express';
import { DocumentInput } from '../../../../models/types/documents';
import DocumentsService from '../../../../services/documents';

export default class DocumentsRoutes {
  private documentsService: DocumentsService;

  router: express.Router;

  constructor(documentsService: DocumentsService) {
    this.documentsService = documentsService;
    this.router = express.Router();

    this.router.post('/', (req, res) => {
      const options = req.body as DocumentInput;
      const response = this.documentsService.sendHTMLtemplates(options);
      res.send(response);
    });
  }
}
