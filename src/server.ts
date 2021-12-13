import express from 'express';
import * as swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import * as swaggerDoc from './swagger/swagger.json';

import InMemoryArtistRecommendationRepo from './repositories/artistRecommendations/in-memory/artist-recommendation';

import ArtistRoute from './routes/artists/artistRoutes';
import NotificationRoute from './routes/notification/notification-routes';

import ArtistService from './services/artist';
import validateUser from './middleware/userMiddleware';
import errorHandler from './modules/errorHandler';
import contentType from './modules/contentType';
import AuthRoutes from './routes/auth/auth-routes';
import AuthService from './services/auth';
import InMemoryAuthRepo from './repositories/auth/in-memory/auth';
import DocumentsService from './services/documents';
import TemplatesService from './services/templates';
import InMemoryTemplatesRepo from './repositories/templates/in-memory/templates';
import InMemoryDocumentsRepo from './repositories/documents/in-memory/documents';
import DocumentsRepo from './repositories/documents/postgres/documents';
import ArtistsRepo from './repositories/artists/in-memory/artist';
import ArtistRecommendationRepo from './repositories/artistRecommendations/postgres/artistRecommendation';
import BrandsRoutes from './routes/brand/brandRoutes';
import BrandRepo from './repositories/brands/inmemory/brand';
import BrandsService from './services/brand';
import VenuesRoutes from './routes/venue/venueRoutes';
import VenueRepo from './repositories/venues/inmemory/venue';
import VenuesService from './services/venue';
import GenreRepo from './repositories/genre/in-memory/genre';
import GenresService from './services/genre';
import GenresRoutes from './routes/genre/genreRoutes';

// to use .environment variable in the project
require('dotenv').config();

export default class MainServer {
  private inMemoryArtistRepo: ArtistsRepo;

  private inMemoryArtistRecommendationRepo: InMemoryArtistRecommendationRepo;

  private inMemoryAuthRecommendationRepo: InMemoryAuthRepo;

  private inMemoryDocumentsRepo: InMemoryDocumentsRepo;

  private inMemoryTemplatesRepo: InMemoryTemplatesRepo;

  private documentsRepo: DocumentsRepo;

  private brandRepo: BrandRepo;

  private venueRepo: VenueRepo;

  private genreRepo: GenreRepo;

  private artistRecommendationRepo: ArtistRecommendationRepo;

  private artistService: ArtistService;

  private authService: AuthService;

  private documentsService: DocumentsService;

  private templatesService : TemplatesService;

  private brandsService : BrandsService;

  private venuesService : VenuesService;

  private genresService : GenresService;

  app;

  corsOptions = {
    origin: '*',
    credentials: true, // access-control-allow-credentials:true
    optionSuccessStatus: 200,
  };

  constructor() {
    this.inMemoryArtistRepo = new ArtistsRepo();
    this.inMemoryArtistRecommendationRepo = new InMemoryArtistRecommendationRepo();
    this.inMemoryAuthRecommendationRepo = new InMemoryAuthRepo();
    this.inMemoryDocumentsRepo = new InMemoryDocumentsRepo();
    this.inMemoryTemplatesRepo = new InMemoryTemplatesRepo();
    // this.artistRecommendationRepo = new ArtistRecommendationRepo();
    // this.documentsRepo = new DocumentsRepo();
    this.brandRepo = new BrandRepo();
    this.venueRepo = new VenueRepo();
    this.genreRepo = new GenreRepo();
    this.artistService = new ArtistService(this.inMemoryArtistRepo, this.inMemoryArtistRecommendationRepo);
    this.authService = new AuthService(this.inMemoryAuthRecommendationRepo);
    this.documentsService = new DocumentsService(this.inMemoryDocumentsRepo);
    this.templatesService = new TemplatesService(this.inMemoryTemplatesRepo);
    this.brandsService = new BrandsService(this.brandRepo);
    this.venuesService = new VenuesService(this.venueRepo);
    this.genresService = new GenresService(this.genreRepo);
    this.app = express();
    this.app.use(cors(this.corsOptions));
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
    this.app.use(contentType);
    this.app.use(express.json());
    this.app.use(validateUser());
    this.app.use('/notification', new NotificationRoute().router);
    this.app.use('/artists', new ArtistRoute(this.artistService, this.documentsService, this.templatesService).router);
    this.app.use('/auth', new AuthRoutes(this.authService).router);
    this.app.use('/brands', new BrandsRoutes(this.brandsService).router);
    this.app.use('/venues', new VenuesRoutes(this.venuesService).router);
    this.app.use('/genres', new GenresRoutes(this.genresService).router);
    this.app.use(errorHandler);
  }
}
