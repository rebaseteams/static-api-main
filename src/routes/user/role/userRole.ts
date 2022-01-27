import * as express from 'express';
import jwt from 'jsonwebtoken';
import { UsersInterface } from '../../../models/interfaces/user';

export default class UserRoleRoute {
  router: express.Router;

  constructor(userService: UsersInterface) {
    this.router = express.Router();

    this.router.get('/', async (req, res, next) => {
      try {
        const token = req.headers.authorization.split(' ')[1];
        const payload = jwt.decode(token);
        if (!payload && !payload.sub && !payload.sub.toString().split('|')[1]) {
          res.status(400).send('Invalid Authrization token');
        } else {
          const userId = payload.sub.toString().split('|')[1];
          // eslint-disable-next-line no-console
          console.log(userId);
          const data = await userService.getRoles(userId);
          res.send(data);
        }
      } catch (error) {
        next(error);
      }
    });
  }
}
