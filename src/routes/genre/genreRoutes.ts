import * as express from 'express';
import GenresService from '../../services/genre';
import createGenreValidator from './validators/createGenreValidator';
import editGenreValidator from './validators/editGenreValidator';

export default class GenresRoutes {
  router: express.Router;

  constructor(genresService : GenresService) {
    this.router = express.Router();

    this.router.post('/', createGenreValidator, async (req, res, next) => {
      try {
        const data = await genresService.createGenre(req.body.name, req.body.description);
        res.send({ success: true, data });
      } catch (error) {
        next(error);
      }
    });

    this.router.get('/:id', async (req, res, next) => {
      try {
        const { id } = req.params;
        const data = await genresService.getGenre(id);
        res.send({ data, success: true });
      } catch (error) {
        next(error);
      }
    });

    this.router.get('/:skip/:limit', async (req, res, next) => {
      try {
        const data = await genresService.getGenres(parseInt(req.params.skip, 10), parseInt(req.params.limit, 10));
        res.send({ success: true, data: { genres: data } });
      } catch (error) {
        next(error);
      }
    });

    this.router.get('/', async (req, res, next) => {
      try {
        const data = await genresService.getAllGenres();
        res.send({ success: true, data: { genres: data } });
      } catch (error) {
        next(error);
      }
    });

    this.router.patch('/', editGenreValidator, async (req, res, next) => {
      try {
        const data = await genresService.editGenre(req.body.id, req.body.name, req.body.description);
        res.send({ success: data.success });
      } catch (error) {
        next(error);
      }
    });

    this.router.delete('/:id', async (req, res, next) => {
      try {
        const data = await genresService.deleteGenre(req.params.id);
        res.send({ success: data.success });
      } catch (error) {
        next(error);
      }
    });
  }
}
