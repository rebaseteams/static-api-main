import * as express from 'express';
import VenuesService from '../../services/venue';
import createVenueValidator from './validators/createVenueValidator';
import editVenueValidator from './validators/editVenueValidator';

export default class VenuesRoutes {
  router: express.Router;

  constructor(venuesService : VenuesService) {
    this.router = express.Router();

    this.router.post('/', createVenueValidator, async (req, res, next) => {
      try {
        const data = await venuesService.createVenue(req.body.name, req.body.address, req.body.capacity);
        res.send({ success: true, data });
      } catch (error) {
        next(error);
      }
    });

    this.router.get('/:id', async (req, res, next) => {
      try {
        const { id } = req.params;
        const data = await venuesService.getVenue(id);
        res.send({ data, success: true });
      } catch (error) {
        next(error);
      }
    });

    this.router.get('/:skip/:limit', async (req, res, next) => {
      try {
        const data = await venuesService.getVenues(parseInt(req.params.skip, 10), parseInt(req.params.limit, 10));
        res.send({ success: true, data: { venues: data } });
      } catch (error) {
        next(error);
      }
    });

    this.router.get('/', async (req, res, next) => {
      try {
        const data = await venuesService.getAllVenues();
        res.send({ success: true, data: { venues: data } });
      } catch (error) {
        next(error);
      }
    });

    this.router.patch('/', editVenueValidator, async (req, res, next) => {
      try {
        const data = await venuesService.editVenue(req.body.id, req.body.name, req.body.address, req.body.capacity);
        res.send({ success: data.success });
      } catch (error) {
        next(error);
      }
    });

    this.router.delete('/:id', async (req, res, next) => {
      try {
        const data = await venuesService.deleteVenue(req.params.id);
        res.send({ success: data.success });
      } catch (error) {
        next(error);
      }
    });
  }
}
