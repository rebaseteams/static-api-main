import { NextFunction, Request, Response } from 'express';
import * as Joi from 'joi';

const QuestionsUIschema = Joi.object({
  userId: Joi.string().required(),
  concertName: Joi.string().required(),
  eventType: Joi.string().required(),
  venue: Joi.array().items(Joi.string()).required(),
  artistBudget: Joi.object({
    min: Joi.number().required(),
    max: Joi.number().required(),
  }),
  sponsorshipType: Joi.string().required(),
  wantedBrands: Joi.array().items(Joi.object({
    brandName: Joi.string().required(),
    brandId: Joi.string().required(),
  })),
  unwantedBrands: Joi.array().items(Joi.object({
    brandName: Joi.string().required(),
    brandId: Joi.string().required(),
  })),
  targetAudience: Joi.object({
    ageGroup: Joi.array().items(Joi.string().required()),
    genre: Joi.array().items(Joi.object({
      genreId: Joi.string().required(),
      genreName: Joi.string().required(),
    })),
    gender: Joi.array().items(Joi.string().required()),
  }),
  whatSellsMost: Joi.object({
    beer: Joi.array().items(Joi.object({
      brandName: Joi.string().required(),
      brandId: Joi.string().required(),
    })),
    liquor: Joi.array().items(Joi.object({
      brandName: Joi.string().required(),
      brandId: Joi.string().required(),
    })),
    softDrinks: Joi.array().items(Joi.object({
      brandName: Joi.string().required(),
      brandId: Joi.string().required(),
    })),
  }),
});

const postRecommendationsSchemaValidator = (req : Request, res : Response, next : NextFunction) => {
  const val = QuestionsUIschema.validate(req.body);
  if (val.error) {
    const err = { message: val.error.message, statusCode: 400 };
    throw err;
  }
  next();
};

export default postRecommendationsSchemaValidator;
