import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as swaggerUi from 'swagger-ui-express';
import * as cors from 'cors';
import * as dotenv from 'dotenv';
import * as swaggerDoc from './swagger/swagger.json';

import InMemoryArtistRepo from './repositories/in-memory/artist';
import InMemoryArtistRecommendationRepo from './repositories/in-memory/artist-recommendation';

import ArtistRoute from './artist-routes';
import NotificationRoute from './notification-routes';

import ArtistService from './services/artist';

// to use .environment variable in the project
dotenv.config();
export default class MainServer {
  private inMemoryArtistRepo: InMemoryArtistRepo;

  private inMemoryArtistRecommendationRepo: InMemoryArtistRecommendationRepo;

  private artistService: ArtistService;

  app;

  corsOptions = {
    origin: '*',
    credentials: true, // access-control-allow-credentials:true
    optionSuccessStatus: 200,
  };

  constructor() {
    this.inMemoryArtistRepo = new InMemoryArtistRepo();
    this.inMemoryArtistRecommendationRepo = new InMemoryArtistRecommendationRepo();
    this.artistService = new ArtistService(this.inMemoryArtistRepo, this.inMemoryArtistRecommendationRepo);
    this.app = express();
    this.app.use(cors(this.corsOptions));
    this.app.use(bodyParser.json());
    this.app.use('/notification', new NotificationRoute().router);
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
    this.app.use('/artists', new ArtistRoute(this.artistService).router);
  }
}
