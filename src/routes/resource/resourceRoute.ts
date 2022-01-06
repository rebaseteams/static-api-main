import * as express from 'express';
import ResourcesService from '../../services/resource';

export default class ResourcesRoutes {
  router: express.Router;

  constructor(resourcesService : ResourcesService) {
    this.router = express.Router();

    this.router.post('/', async (req, res, next) => {
      try {
        const data = await resourcesService.createResource(req.body.name, req.body.actions);
        res.send({ success: true, data });
      } catch (error) {
        next(error);
      }
    });

    this.router.get('/:id', async (req, res, next) => {
      try {
        const { id } = req.params;
        const data = await resourcesService.getResource(id);
        res.send({ data, success: true });
      } catch (error) {
        next(error);
      }
    });

    this.router.get('/:skip/:limit', async (req, res, next) => {
      try {
        const data = await resourcesService.getResources(parseInt(req.params.skip, 10), parseInt(req.params.limit, 10));
        res.send({ success: true, data: { resources: data } });
      } catch (error) {
        next(error);
      }
    });

    this.router.patch('/', async (req, res, next) => {
      try {
        const data = await resourcesService.editResource(req.body.id, req.body.name, req.body.actions);
        res.send({ success: data.success });
      } catch (error) {
        next(error);
      }
    });

    this.router.delete('/:id', async (req, res, next) => {
      try {
        const data = await resourcesService.deleteResource(req.params.id);
        res.send({ success: data.success });
      } catch (error) {
        next(error);
      }
    });
  }
}
