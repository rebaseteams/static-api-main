import * as express from 'express';
import ActionsService from '../../services/actions';

export default class ActionsRoutes {
  router: express.Router;

  constructor(actionService : ActionsService) {
    this.router = express.Router();

    this.router.post('/', async (req, res, next) => {
      try {
        const data = await actionService.createAction(req.body.name);
        res.send({ success: true, data });
      } catch (error) {
        next(error);
      }
    });
  }
}
