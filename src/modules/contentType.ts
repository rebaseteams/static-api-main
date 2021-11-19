/* eslint-disable no-throw-literal */
import * as express from 'express';

const contentType = (req : express.Request, res : express.Response, next : express.NextFunction) => {
  try {
    if (req.is('application/json')) express.json(req.body);
    next();
  } catch (err : any) {
    throw { message: err.message, statusCode: 400 };
  }
};

export default contentType;
