/* eslint-disable no-console */
import { Router } from 'express';
import multer from 'multer';
import { DocusignInterface } from '../../../../models/interfaces/docusign';
import DocumentsService from '../../../../services/documents';
import TemplatesService from '../../../../services/templates';
import DocusignRoutes from './docusign/docusignRoutes';
import TemplatesRoutes from './templates/templatesRoutes';
import createDocumentValidator from './validators/createDocument';
import editDocumentValidator from './validators/editDocument';

const upload = multer({ storage: multer.memoryStorage() });

export default class DocumentsRoutes {
  router: Router;

  constructor(
    documentsService: DocumentsService,
    templatesService: TemplatesService,
    docusignService: DocusignInterface,
  ) {
    this.router = Router();

    this.router.use('/templates', new TemplatesRoutes(templatesService).router);

    this.router.use('/docusign', new DocusignRoutes(docusignService).router);

    this.router.post('/', createDocumentValidator, async (req, res, next) => {
      try {
        const userId: string = req.headers.userId ? String(req.headers.userId) : '';
        const template = await templatesService.getTemplate(req.body.templateId);
        const data = await documentsService.createDocument(req.body.fields, req.body.required, template, req.body.recommendationId, req.body.name, userId);
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
          createdOn: value.created_on,
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
          createdOn: value.created_on,
          mode: value.mode,
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
