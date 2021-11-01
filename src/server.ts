import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as swaggerUi from 'swagger-ui-express';
import * as cors from 'cors';
import * as swaggerDoc from './swagger/swagger.json';

import InMemoryArtistRepo from './repositories/in-memory/artist';
import InMemoryArtistRecommendationRepo from './repositories/in-memory/artist-recommendation';

import ArtistRoute from './artist-routes';
import NotificationRoute from './notification-routes';

import ArtistService from './services/artist';

const inMemoryArtistRepo = new InMemoryArtistRepo();
const inMemoryArtistRecommendationRepo = new InMemoryArtistRecommendationRepo();

const artistService = new ArtistService(inMemoryArtistRepo, inMemoryArtistRecommendationRepo);

const corsOptions = {
  origin: '*',
  credentials: true, // access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

const app = express();
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use('/artists', new ArtistRoute(artistService).router);

app.use('/notification', new NotificationRoute().router);

export default app;
