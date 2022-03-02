import * as express from 'express';
import EventsTypeService from '../../services/events-type';

export default class EventsTypeRoute {
  router: express.Router;

  constructor(eventsTypeService : EventsTypeService) {
    this.router = express.Router();

    this.router.post('/', async (req, res, next) => {
      try {
        const data = await eventsTypeService.create(req.body.name, req.body.description, req.body.comments);
        res.send({ success: true, data });
      } catch (error) {
        next(error);
      }
    });

    this.router.patch('/', async (req, res, next) => {
      try {
        const data = await eventsTypeService.update(req.body.id, req.body.name, req.body.description, req.body.comments);
        res.send({ success: data.success });
      } catch (error) {
        next(error);
      }
    });

    this.router.get('/:id', async (req, res, next) => {
      try {
        const { id } = req.params;
        const data = await eventsTypeService.getById(id);
        res.send({ data, success: true });
      } catch (error) {
        next(error);
      }
    });

    this.router.get('/:skip/:limit', async (req, res, next) => {
      try {
        const data = await eventsTypeService.get(parseInt(req.params.skip, 10), parseInt(req.params.limit, 10));
        res.send({ success: true, data: { eventsType: data } });
      } catch (error) {
        next(error);
      }
    });

    this.router.get('/', async (req, res, next) => {
      try {
        const data = await eventsTypeService.getAll();
        res.send({ success: true, data: { eventsType: data } });
      } catch (error) {
        next(error);
      }
    });

    this.router.delete('/:id', async (req, res, next) => {
      try {
        const data = await eventsTypeService.detele(req.params.id);
        res.send({ success: data.success });
      } catch (error) {
        next(error);
      }
    });
  }
}
