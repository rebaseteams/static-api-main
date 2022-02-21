import { NextFunction, Request, Response } from 'express';
import * as Joi from 'joi';

const schema = Joi.object({
  auth: Joi.object({
    userId: Joi.string().required(),
  }).required(),
  id: Joi.string().required(),
  name: Joi.string().required(),
  address: Joi.object({
    pincode: Joi.number().required(),
    country: Joi.string().required(),
    city: Joi.string().required(),
    geoLocation: Joi.object({
      lat: Joi.number().required(),
      long: Joi.number().required(),
    }),

  }).required(),
  capacity: Joi.number().required(),
});

const editVenueValidator = (req : Request, res : Response, next : NextFunction) => {
  const val = schema.validate(req.body);
  if (val.error) {
    const err = { message: val.error.message, statusCode: 400 };
    throw err;
  }
  next();
};

export default editVenueValidator;
