import { NextFunction, Request, Response } from 'express';
import * as Joi from 'joi';

const schema = Joi.object({
  auth: Joi.object({
    userId: Joi.string().required(),
  }).required(),
  formId: Joi.string().required(),
  discardedArtistId: Joi.string().required(),
  userId: Joi.string().required(),
});

const patchRequestValidator = (req : Request, res : Response, next : NextFunction) => {
  const val = schema.validate(req.body);
  if (val.error) {
    const err = { message: val.error.message, statusCode: 400 };
    throw err;
  }
  next();
};

export default patchRequestValidator;
