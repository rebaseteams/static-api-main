/* eslint-disable no-throw-literal */
import * as express from 'express';

const contentType = (req : express.Request, res : express.Response, next : express.NextFunction) => {
  try {
    if (!req.is('application/json')) throw new Error('Request should be of JSON type');
    express.json(req.body);
    next();
  } catch (err : any) {
    res.status(415).send({ error: true, message: err.message });
  }
};

export default contentType;
