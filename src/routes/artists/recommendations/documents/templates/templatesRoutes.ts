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
      const data = templatesService.getAllTemplates();
      const toSend = data.map((value) => ({
        templateId: value.templateId,
        templateImg: value.templateImg,
        templateName: value.templateName,
      }));
      res.send({ success: true, data: toSend });
    });

    this.router.get('/:tempid', (req, res) => {
      const data = templatesService.getTemplate(req.params.tempid);
      res.send({
        success: true,
        data: {
          templateId: data.templateId,
          questions: data.questions,
        },
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
