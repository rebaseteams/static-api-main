/* eslint-disable no-console */
import express from 'express';
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
import setPoll from './utils/handleToken';

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
    } = server.config.services;

    const { auth0 } = server.config.providers;

    setPoll(() => console.log('hello'), 2000);
    auth0.generateToken();

    this.app = express();
    this.app.use(cors(this.corsOptions));
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
    this.app.use(contentType);
    this.app.use(express.json());
    this.app.use(auth0.authenticate);
    this.app.use(auth0.setAuth);
    this.app.use('/artists', auth0.requireRole(['branduser']), new ArtistRoute(artistService, documentsService, templatesService, docusignService).router);
    this.app.use('/brands', new BrandsRoutes(brandsService).router);
    this.app.use('/venues', new VenuesRoutes(venuesService).router);
    this.app.use('/genres', new GenresRoutes(genresService).router);
    this.app.use('/users', new UsersRoutes(usersService).router);
    this.app.use('/roles', new RolesRoutes(rolesService).router);
    this.app.use('/resources', new ResourcesRoutes(resourcesService).router);
    this.app.use(errorHandler);
  }
}
