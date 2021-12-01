/* eslint-disable no-console */
import { Router } from 'express';
import DocumentsService from '../../../../services/documents';
import TemplatesService from '../../../../services/templates';
import TemplatesRoutes from './templates/templatesRoutes';
import createDocumentValidator from './validators/createDocument';
import editDocumentValidator from './validators/editDocument';

export default class DocumentsRoutes {
  router: Router;

  constructor(documentsService: DocumentsService, templatesService: TemplatesService) {
    this.router = Router();

    this.router.use('/templates', new TemplatesRoutes(templatesService).router);

    this.router.post('/', createDocumentValidator, (req, res) => {
      const template = templatesService.getTemplate(req.body.templateId);
      const data = documentsService.createDocument(req.body.fields, template, req.body.recommendationId);
      res.send({ success: true, data });
    });

    this.router.get('/', (req, res) => {
      const data = documentsService.getAllDocuments();
      const resp = data.map((value) => ({
        documentId: value.documentId,
      }));
      res.send({ success: true, data: resp });
    });

    this.router.get('/:docid', (req, res) => {
      const data = documentsService.getDocument(req.params.docid);
      res.send({ success: true, data });
    });

    this.router.patch('/:docid', editDocumentValidator, (req, res) => {
      const data = documentsService.editDocument(req.params.docid, req.body.html);
      res.send({ success: data.success });
    });

    this.router.delete('/:docid', (req, res) => {
      const data = documentsService.deleteDocument(req.params.docid);
      res.send({ success: data.success });
    });
  }
}
