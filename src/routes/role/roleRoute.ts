import * as express from 'express';
import RolesService from '../../services/role';

export default class RolesRoutes {
  router: express.Router;

  constructor(rolesService : RolesService) {
    this.router = express.Router();

    this.router.post('/', async (req, res, next) => {
      try {
        const data = await rolesService.createRole(req.body.name, req.body.resourceActions);
        res.send({ success: true, data });
      } catch (error) {
        next(error);
      }
    });

    this.router.get('/:id', async (req, res, next) => {
      try {
        const { id } = req.params;
        const data = await rolesService.getRole(id);
        res.send({ data, success: true });
      } catch (error) {
        next(error);
      }
    });

    this.router.get('/:skip/:limit', async (req, res, next) => {
      try {
        const data = await rolesService.getRoles(parseInt(req.params.skip, 10), parseInt(req.params.limit, 10));
        res.send({ success: true, data: { roles: data } });
      } catch (error) {
        next(error);
      }
    });

    this.router.patch('/', async (req, res, next) => {
      try {
        const data = await rolesService.editRole(req.body.id, req.body.name, req.body.resourceActions);
        res.send({ success: data.success });
      } catch (error) {
        next(error);
      }
    });

    this.router.delete('/:id', async (req, res, next) => {
      try {
        const data = await rolesService.deleteRole(req.params.id);
        res.send({ success: data.success });
      } catch (error) {
        next(error);
      }
    });
  }
}
