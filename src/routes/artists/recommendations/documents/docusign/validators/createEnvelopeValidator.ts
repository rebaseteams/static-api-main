import { NextFunction, Request, Response } from 'express';
import * as Joi from 'joi';

const schema = Joi.object({
  auth: Joi.object({
    userId: Joi.string().required(),
  }).required(),
  emailSubject: Joi.string().required(),
  documents: Joi.array().items({
    htmlDefinition: Joi.object({
      source: Joi.string().required(),
    }),
    documentId: Joi.string().required(),
    name: Joi.string().required(),
  }),
  recipients: Joi.object({
    carbonCopies: Joi.array().items({
      email: Joi.string().email().required(),
      name: Joi.string().required(),
      recipientId: Joi.string().required(),
      routingOrder: Joi.string().required(),
    }),
    signers: Joi.array().items({
      email: Joi.string().email().required(),
      name: Joi.string().required(),
      recipientId: Joi.string().required(),
      routingOrder: Joi.string().required(),
      tabs: Joi.object({
        signHereTabs: Joi.array().items({
          anchorString: Joi.string().required(),
          anchorUnits: Joi.string().required(),
          anchorXOffset: Joi.string().required(),
          anchorYOffset: Joi.string().required(),

        }),
      }),
    }),
  }),

  status: Joi.string().required(),
});

const createEnvelopeValidator = (req : Request, res : Response, next : NextFunction) => {
  const val = schema.validate(req.body);
  if (val.error) {
    const err = { message: val.error.message, statusCode: 400 };
    throw err;
  }
  next();
};

export default createEnvelopeValidator;
