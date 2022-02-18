/* eslint-disable no-console */
import express, { Request, Response } from 'express';
import * as swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import * as swaggerDoc from './swagger/swagger.json';

import { DevServer } from './config.development';
import ArtistRoute from './routes/artists/artistRoutes';
import errorHandler from './modules/errorHandler';
import contentType from './modules/contentType';
import BrandsRoutes from './routes/brand/brandRoutes';
import VenuesRoutes from './routes/venue/venueRoutes';
import GenresRoutes from './routes/genre/genreRoutes';
import UsersRoutes from './routes/user/userRoute';
import RolesRoutes from './routes/role/roleRoute';
import ResourcesRoutes from './routes/resource/resourceRoute';
import { Environment } from './models/types/config';
import { ProdServer } from './config.production';
import setPoll from './utils/setPoll';
import ActionsRoutes from './routes/actions/actionsRoures';

// to use .environment variable in the project
require('dotenv').config();

export default class MainServer {
  app;

  corsOptions = {
    origin: '*',
    credentials: true, // access-control-allow-credentials:true
    optionSuccessStatus: 200,
  };

  constructor(environment: Environment) {
    const server = environment === 'production' ? new ProdServer() : new DevServer();

    const timeout = setTimeout(() => {
      if (server.config.services) {
        const {
          artistService,
          documentsService,
          docusignService,
          brandsService,
          venuesService,
          genresService,
          usersService,
          rolesService,
          resourcesService,
          templatesService,
          actionService,
        } = server.config.services;

        const { auth0 } = server.config.providers;

        setPoll(() => auth0.generateToken(), 1 * 60 * 60 * 1000);
        this.app = express();
        this.app.use(cors(this.corsOptions));
        this.app.use('/healtcheck', (req : Request, res : Response) => res.status(200).send('OK'));
        this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
        this.app.use(contentType);
        this.app.use(express.json());
        this.app.use('/users', new UsersRoutes(auth0, usersService).router);
        this.app.use(auth0.authenticate);
        this.app.use(auth0.setAuth);
        this.app.use('/artists', new ArtistRoute(artistService, documentsService, templatesService, docusignService).router);
        this.app.use('/brands', new BrandsRoutes(brandsService).router);
        this.app.use('/venues', new VenuesRoutes(venuesService).router);
        this.app.use('/genres', new GenresRoutes(genresService).router);
        this.app.use('/roles', new RolesRoutes(rolesService).router);
        this.app.use('/resources', new ResourcesRoutes(resourcesService).router);
        this.app.use('/actions', new ActionsRoutes(actionService).router);

        this.app.use(errorHandler);
        clearTimeout(timeout);
      }
    }, 1000);
  }
}
