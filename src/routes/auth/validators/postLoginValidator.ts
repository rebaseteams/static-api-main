import { NextFunction, Request, Response } from 'express';
import * as Joi from 'joi';

const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

const postLoginValidator = (req : Request, res : Response, next : NextFunction) => {
  const val = loginSchema.validate(req.body);
  if (val.error) {
    const err = { message: val.error.message, statusCode: 400 };
    throw err;
  }
  next();
};

export default postLoginValidator;
