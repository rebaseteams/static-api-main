/* eslint-disable no-console */
import express, { Request, Response, Router } from 'express';
import * as swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import YAML from 'yamljs';

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
import ActionsRoutes from './routes/actions/actionsRoutes';
import EventsTypeRoute from './routes/eventsType/eventeTypeRoute';
import AdvancedSearchRoute from './routes/advancedSearch/advancedSearchRoute';
import { setupBackgroundTasks } from './background-tasks';

// to use .environment variable in the project
require('dotenv').config();

export default class MainServer {
  app : Router;

  expressApp;

  corsOptions = {
    origin: '*',
    credentials: true, // access-control-allow-credentials:true
    optionSuccessStatus: 200,
  };

  constructor(environment: Environment) {
    const server = environment === 'production' ? new ProdServer() : new DevServer();
    const swaggerDocument = YAML.load('./src/swagger/index.yaml');

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
          eventsTypeService,
          advancedSearchService,
        } = server.config.services;

        const { auth0 } = server.config.providers;

        this.expressApp = express();
        this.app = Router();
        this.expressApp.use('/cc-bff', this.app);
        this.app.use(cors(this.corsOptions));
        this.app.use('/healthcheck', (req : Request, res : Response) => res.status(200).send('OK'));
        this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
        this.app.use(contentType);
        this.app.use(express.json());
        this.app.use('/users', new UsersRoutes(auth0, usersService).router);
        this.app.use('/roles', new RolesRoutes(rolesService).router);
        this.app.use(auth0.authenticate);
        this.app.use(auth0.setAuth);
        this.app.use('/artists', new ArtistRoute(artistService, documentsService, templatesService, docusignService).router);
        this.app.use('/brands', new BrandsRoutes(brandsService).router);
        this.app.use('/venues', new VenuesRoutes(venuesService).router);
        this.app.use('/genres', new GenresRoutes(genresService).router);
        this.app.use('/resources', new ResourcesRoutes(resourcesService).router);
        this.app.use('/actions', new ActionsRoutes(actionService).router);
        this.app.use('/events-type', new EventsTypeRoute(eventsTypeService).router);
        this.app.use('/search', new AdvancedSearchRoute(advancedSearchService).router);
        this.app.use(errorHandler);
        clearTimeout(timeout);
        setupBackgroundTasks(server.config);
      }
    }, 3000);
  }
}
