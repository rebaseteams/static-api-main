import * as express from 'express';
import BrandsService from '../../services/brand';
import createBrandValidator from './validators/createBrandValidator';
import editBrandValidator from './validators/editBrandValidator';

export default class BrandsRoutes {
  router: express.Router;

  constructor(brandsService : BrandsService) {
    this.router = express.Router();

    this.router.post('/', createBrandValidator, async (req, res, next) => {
      try {
        const data = await brandsService.createBrand(req.body.name, req.body.logo, req.body.website, req.body.contact);
        res.send({ success: true, data });
      } catch (error) {
        next(error);
      }
    });

    this.router.get('/:id', async (req, res, next) => {
      try {
        const { id } = req.params;
        const data = await brandsService.getBrand(id);
        res.send({ data, success: true });
      } catch (error) {
        next(error);
      }
    });

    this.router.get('/:skip/:limit', async (req, res, next) => {
      try {
        const data = await brandsService.getBrands(parseInt(req.params.skip, 10), parseInt(req.params.limit, 10));
        res.send({ success: true, data: { brands: data } });
      } catch (error) {
        next(error);
      }
    });

    this.router.patch('/', editBrandValidator, async (req, res, next) => {
      try {
        const data = await brandsService.editBrand(req.body.id, req.body.name, req.body.logo, req.body.website, req.body.contact);
        res.send({ success: data.success });
      } catch (error) {
        next(error);
      }
    });

    this.router.delete('/:id', async (req, res, next) => {
      try {
        const data = await brandsService.deleteBrand(req.params.id);
        res.send({ success: data.success });
      } catch (error) {
        next(error);
      }
    });
  }
}
