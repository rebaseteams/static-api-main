import { NextFunction, Request, Response } from 'express';
import * as Joi from 'joi';

const schema = Joi.object({
  auth: Joi.object({
    userId: Joi.string().required(),
  }).required(),
  id: Joi.string().required(),
  name: Joi.string().required(),
  logo: Joi.string().uri().required(),
  website: Joi.string().uri().required(),
  contact: Joi.number().integer().min(10 ** (8 - 1)).max(10 ** 15 - 1)
    .required(),
});

const editBrandValidator = (req : Request, res : Response, next : NextFunction) => {
  const val = schema.validate(req.body);
  if (val.error) {
    const err = { message: val.error.message, statusCode: 400 };
    throw err;
  }
  next();
};

export default editBrandValidator;
