/* eslint-disable no-console */
import * as express from 'express';
import { DocusignInterface } from '../../../../../models/interfaces/docusign';

export default class DocusignRoutes {
  router: express.Router;

  docusignService: DocusignInterface;

  // eslint-disable-next-line no-unused-vars
  constructor(docusignService: DocusignInterface) {
    this.router = express.Router();
    this.docusignService = docusignService;

    this.router.post('/:id', async (req, res, next) => {
      const documentId = req.params.id;
      const data = JSON.parse(JSON.stringify(req.body));
      try {
        const response = await this.docusignService.createEnvelope(data, documentId);
        res.send(response);
      } catch (err) {
        next(err);
      }
    });

    this.router.get('/', async (req, res, next) => {
      try {
        const response = await this.docusignService.getAllEnvelopes();
        res.send(response);
      } catch (err) {
        next(err);
      }
    });

    this.router.get('/:envelopeId/:documentId', async (req, res, next) => {
      try {
        const response = await this.docusignService.getEnvelopeStatus(req.params.envelopeId, req.params.documentId);
        res.send(response);
      } catch (err) {
        next(err);
      }
    });
  }
}
