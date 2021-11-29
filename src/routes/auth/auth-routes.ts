import * as express from 'express';
import { Login, SignUp } from '../../models/types/auth';
import AuthService from '../../services/auth';
import loginValidator from './validators/loginValidator';
import signUpValidator from './validators/signUpValidator';

export default class AuthRoutes {
  router: express.Router;

  constructor(authService: AuthService) {
    this.router = express.Router();
    this.router.post('/signup', signUpValidator, (req, res) => {
      const Request = req.body as SignUp;
      res.send(authService.signUp(Request.username, Request.password));
    });
    this.router.post('/login', loginValidator, (req, res) => {
      const Request = req.body as Login;
      res.header(authService.login(Request.username, Request.password)).send({ sucess: true });
    });
  }
}
