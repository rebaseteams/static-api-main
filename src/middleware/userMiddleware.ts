/* eslint-disable no-unused-vars */

import { Request, Response, NextFunction } from 'express';

const validateToken = (token: string | string[]): Boolean => {
  if (token === process.env.DEFAULT_USERID) {
    return true;
  }
  return false;
};

// eslint-disable-next-line consistent-return
const validateUser = ():((req: Request, res: Response, next: NextFunction) => void) => async (req: Request, res: Response, next: NextFunction) => {
  const notSecurePath = ['/auth/login', '/auth/signup'];

  if (notSecurePath.includes(req.path)) {
    return next();
  }
  if (req.headers.userid) {
    const userValidation = validateToken(req.headers.userid);
    if (userValidation === true) {
      const headerData = {
        userId: req.headers.userid,
      };
      req.body.auth = headerData;
      next();
    } else {
      res.status(401).send({ error: 'Invalid User' });
    }
  } else {
    res.status(400).send({ error: 'No UserId in headers!' });
  }
};

export default validateUser;
