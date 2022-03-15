import * as express from 'express';
import { AdvancedSearchInterface } from '../../models/interfaces/adancedSearch';
import { AdvancedSearchQuery } from '../../models/types/adancedSearch';

export default class AdvancedSearchRoute {
  router: express.Router;

  constructor(advancedSearchService : AdvancedSearchInterface) {
    this.router = express.Router();

    this.router.get('/', async (req, res, next) => {
      try {
        const { category, subcategory, query } = req.query as AdvancedSearchQuery;
        const data = await advancedSearchService.get({ category, subcategory, query });
        res.send({ data, success: true });
      } catch (error) {
        next(error);
      }
    });
  }
}
