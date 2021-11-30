/* eslint-disable no-console */
import { Router } from 'express';
import DocumentsService from '../../../../services/documents';
import TemplatesService from '../../../../services/templates';
import TemplatesRoutes from './templates/templatesRoutes';

export default class DocumentsRoutes {
  router: Router;

  constructor(documentsService: DocumentsService, templatesService: TemplatesService) {
    this.router = Router();

    this.router.use('/templates', new TemplatesRoutes(templatesService).router);

    this.router.post('/', (req, res) => {
      const template = templatesService.getTemplate(req.body.templateId);
      const data = documentsService.createDocument(req.body.fields, template, req.body.recommendationId);
      res.send({ success: true, data });
    });

    this.router.get('/', (req, res) => {
      res.send('TODO : send all documents');
    });

    this.router.get('/:docid', (req, res) => {
      const data = documentsService.getDocument(req.params.docid);
      res.send({ success: true, data });
    });

    this.router.patch('/:docid', (req, res) => {
      res.send('TODO : edit the document');
    });

    this.router.delete('/:docid', (req, res) => {
      const data = documentsService.deleteDocument(req.params.docid);
      res.send({ success: data.success });
    });
  }
}
