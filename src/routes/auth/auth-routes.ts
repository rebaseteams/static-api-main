import * as express from 'express';
import { Login, SignUp } from '../../models/types/auth';
import AuthService from '../../services/auth';

export default class AuthRoutes {
  private authService: AuthService;

  router: express.Router;

  constructor(authService: AuthService) {
    this.authService = authService;
    this.router = express.Router();
    this.router.post('/signup', (req, res) => {
      const Request = req.body as SignUp;
      res.send(this.authService.signUp(Request.username, Request.password));
    });
    this.router.post('/login', (req, res) => {
      const Request = req.body as Login;
      // eslint-disable-next-line no-unused-expressions
      (this.authService.login(Request.username, Request.password)) ? (res.header(this.authService.login(Request.username, Request.password)).send({ sucess: true })) : (res.send({ sucess: false }));
      // res.send();
    });
  }
}
