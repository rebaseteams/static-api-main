/* eslint-disable no-console */
import { Router } from 'express';
import multer from 'multer';
import DocumentsService from '../../../../services/documents';
import TemplatesService from '../../../../services/templates';
import TemplatesRoutes from './templates/templatesRoutes';
import createDocumentValidator from './validators/createDocument';
import editDocumentValidator from './validators/editDocument';

const upload = multer({ storage: multer.memoryStorage() });

export default class DocumentsRoutes {
  router: Router;

  constructor(documentsService: DocumentsService, templatesService: TemplatesService) {
    this.router = Router();

    this.router.use('/templates', new TemplatesRoutes(templatesService).router);

    this.router.post('/', createDocumentValidator, async (req, res, next) => {
      try {
        const template = templatesService.getTemplate(req.body.templateId);
        const data = await documentsService.createDocument(req.body.fields, template, req.body.recommendationId, req.body.name, req.body.auth.userId);
        res.send({ success: true, data });
      } catch (error) {
        next(error);
      }
    });

    this.router.post('/ids', async (req, res, next) => {
      try {
        const data = await documentsService.getDocuments(req.body.ids);
        const resp = data.map((value) => ({
          id: value.id,
          name: value.name,
          createdOn: value.createdOn,
        }));
        res.send({ success: true, data: resp });
      } catch (error) {
        next(error);
      }
    });

    this.router.get('/', async (req, res, next) => {
      try {
        const data = await documentsService.getAllDocuments();
        const resp = data.map((value) => ({
          id: value.id,
          name: value.name,
          createdOn: value.createdOn,
        }));
        res.send({ success: true, data: resp });
      } catch (error) {
        next(error);
      }
    });

    this.router.get('/:docid', async (req, res, next) => {
      try {
        const data = await documentsService.getDocument(req.params.docid);
        res.send({ success: true, data });
      } catch (error) {
        next(error);
      }
    });

    this.router.patch('/:docid', editDocumentValidator, async (req, res, next) => {
      try {
        const data = await documentsService.editDocument(req.params.docid, req.body.html);
        res.send({ success: data.success });
      } catch (error) {
        next(error);
      }
    });

    this.router.delete('/:docid', async (req, res, next) => {
      try {
        const data = await documentsService.deleteDocument(req.params.docid);
        res.send({ success: data.success });
      } catch (error) {
        next(error);
      }
    });

    this.router.post('/share/:docid', upload.array('attachments'), async (req, res, next) => {
      try {
        const data = await documentsService.shareDocument(req.params.docid, req.files, JSON.parse(req.body.emails));
        res.send({ success: data.success });
      } catch (error) {
        next(error);
      }
    });
  }
}
