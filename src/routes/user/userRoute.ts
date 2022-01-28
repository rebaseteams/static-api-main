import * as express from 'express';
import { Auth0Interface } from '../../models/interfaces/auth0';
import UsersService from '../../services/user';

export default class UsersRoutes {
  router: express.Router;

  constructor(auth0 : Auth0Interface, usersService : UsersService) {
    this.router = express.Router();

    this.router.get('/roles', async (req, res, next) => {
      try {
        const { userId } = req.body.auth;
        const data = await usersService.getRoles(userId);
        res.send(data);
      } catch (error) {
        next(error);
      }
    });

    this.router.post('/', async (req, res, next) => {
      try {
        const data = await usersService.createUser(req.body.name, req.body.email, req.body.password, req.body.role);
        res.send({ success: true, data });
      } catch (error) {
        next(error);
      }
    });

    this.router.get('/:id', auth0.checkAuthorization('user', 'view'), async (req, res, next) => {
      try {
        const { id } = req.params;
        const data = await usersService.getUser(id);
        res.send({ data, success: true });
      } catch (error) {
        next(error);
      }
    });

    this.router.delete('/:id', auth0.checkAuthorization('user', 'delete'), async (req, res, next) => {
      try {
        const data = await usersService.deleteUser(req.params.id);
        res.send({ success: data.success });
      } catch (error) {
        next(error);
      }
    });

    this.router.get('/:skip/:limit', auth0.checkAuthorization('users', 'view'), async (req, res, next) => {
      try {
        const data = await usersService.getUsers(parseInt(req.params.skip, 10), parseInt(req.params.limit, 10));
        res.send({ success: true, data: { users: data } });
      } catch (error) {
        next(error);
      }
    });

    this.router.get('/pending/:skip/:limit', auth0.checkAuthorization('users', 'view'), async (req, res, next) => {
      try {
        const data = await usersService.getPendingUsers(parseInt(req.params.skip, 10), parseInt(req.params.limit, 10));
        res.send({ success: true, data: { users: data } });
      } catch (error) {
        next(error);
      }
    });

    this.router.patch('/approval', auth0.checkAuthorization('user', 'approval'), async (req, res, next) => {
      try {
        const data = await usersService.approveUser(req.body.id, req.body.approval);
        res.send({ success: data.success });
      } catch (error) {
        next(error);
      }
    });

    this.router.patch('/roles', auth0.checkAuthorization('user', 'update'), async (req, res, next) => {
      try {
        const data = await usersService.updateUsersRole(req.body.id, req.body.roles);
        res.send({ success: data.success });
      } catch (error) {
        next(error);
      }
    });
  }
}
