/* eslint-disable no-console */
import { Router } from 'express';
import TemplatesService from '../../../../../services/templates';

export default class TemplatesRoutes {
  router: Router;

  constructor(templatesService: TemplatesService) {
    this.router = Router();

    this.router.post('/', (req, res) => {
      res.send('TODO : create new template');
    });

    this.router.get('/', (req, res) => {
      res.send('TODO : send all templates name and id');
    });

    this.router.get('/:tempid', (req, res) => {
      res.send({
        success: true,
        data: templatesService.getTemplate(req.params.tempid),
      });
    });

    this.router.patch('/:tempid', (req, res) => {
      res.send('TODO : edit the template');
    });

    this.router.delete('/:tempid', (req, res) => {
      res.send('TODO : delete the template');
    });
  }
}
