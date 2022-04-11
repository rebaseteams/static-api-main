import { Router } from 'express';
import TemplatesService from '../../../../../services/templates';

export default class TemplatesRoutes {
  router: Router;

  constructor(templatesService: TemplatesService) {
    this.router = Router();

    this.router.post('/', async (req, res) => {
      const resp = await templatesService.createTemplate(req.body.id, req.body.templateObject, req.body.template);
      res.send(resp);
    });

    this.router.get('/', async (req, res) => {
      const data = await templatesService.getAllTemplates();
      const toSend = data.map((value) => ({
        templateId: value.templateId,
        templateImg: value.templateImg,
        templateName: value.templateName,
      }));
      res.send({ success: true, data: toSend });
    });

    this.router.get('/:tempid', async (req, res) => {
      const data = await templatesService.getTemplate(req.params.tempid);
      res.send({
        success: true,
        data: {
          templateId: data.templateId,
          questions: data.questions,
          required: data.required,
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
