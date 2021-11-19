// import * as moment from 'moment';
// import { v4 as uuidv4 } from 'uuid';
import { AuthRepoInterface } from '../models/interfaces/auth';

export default class AuthService implements AuthRepoInterface {
  private authRepo: AuthRepoInterface;

  constructor(
    authRepo: AuthRepoInterface,
  ) {
    this.authRepo = authRepo;
  }

  login(username:string, password:string): {token: string} {
    return this.authRepo.login(username, password);
  }

  signUp(username: string, password: string): {status: boolean} {
    return this.authRepo.signUp(username, password);
  }
  //   validateUser(token: string): boolean  {
  //     return this.authRepo.validateUser(token)
  //   };
}
