import { NextFunction, Request, Response } from 'express';
import * as Joi from 'joi';

const schema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().required(),
  description: Joi.string().required(),
});

const editGenreValidator = (req : Request, res : Response, next : NextFunction) => {
  const val = schema.validate(req.body);
  if (val.error) {
    const err = { message: val.error.message, statusCode: 400 };
    throw err;
  }
  next();
};

export default editGenreValidator;
