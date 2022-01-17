/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import { SignUp } from '../types/auth';

export interface Auth0Interface {
  setAuth (req: Request, res: Response, next: NextFunction): Promise<void>;

  authenticate (req : Request, res : Response, next : NextFunction): void;

  generateToken (): void;

  checkRoles (roles : Array<string>, userId : string | (() => string)) : Promise<boolean>;

  // eslint-disable-next-line consistent-return
  requireRole (roles : Array<string>): any;

  signupUser (data : SignUp): Promise<any>;
}
