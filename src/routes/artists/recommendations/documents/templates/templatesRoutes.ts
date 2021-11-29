/* eslint-disable no-console */
import { Router } from 'express';
import DocumentsService from '../../../../../services/documents';

export default class TemplatesRoutes {
  router: Router;

  constructor(documentsService: DocumentsService) {
    this.router = Router();

    this.router.post('/', (req, res) => {
      res.send('TODO : create new template');
    });

    this.router.get('/', (req, res) => {
      res.send('TODO : send all templates name and id');
      documentsService.sendHtmlTemplates({ artistName: 'something', reason: 'something' });
    });

    this.router.get('/:tempid', (req, res) => {
      res.send('TODO : send data about given template');
    });

    this.router.patch('/:tempid', (req, res) => {
      res.send('TODO : edit the template');
    });

    this.router.delete('/:tempid', (req, res) => {
      res.send('TODO : delete the template');
    });
  }
}
