/* eslint-disable no-console */
import { Router } from 'express';
import { DocumentInput } from '../../../../models/types/documents';
import DocumentsService from '../../../../services/documents';
import TemplatesService from '../../../../services/templates';
import TemplatesRoutes from './templates/templatesRoutes';
import documentInputValidator from './validators/documentInput';

export default class DocumentsRoutes {
  router: Router;

  constructor(documentsService: DocumentsService, templatesService: TemplatesService) {
    this.router = Router();

    this.router.use('/templates', new TemplatesRoutes(templatesService).router);

    this.router.post('/', documentInputValidator, (req, res) => {
      const options = req.body as DocumentInput;
      const response = documentsService.sendHtmlTemplates(options);
      res.send(response);
    });

    this.router.get('/:docid', (req, res) => {
      res.send('TODO : send the given document');
    });

    this.router.patch('/:docid', (req, res) => {
      res.send('TODO : edit the document');
    });

    this.router.delete('/:docid', (req, res) => {
      res.send('TODO : delete the document');
    });
  }
}
