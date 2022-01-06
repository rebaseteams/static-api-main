import express from 'express';
import * as swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import * as swaggerDoc from './swagger/swagger.json';

import InMemoryArtistRecommendationRepo from './repositories/artistRecommendations/in-memory/artist-recommendation';

import ArtistRoute from './routes/artists/artistRoutes';

import ArtistService from './services/artist';
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
import auth0 from './modules/auth0';
import { DocusignService } from './services/docusign';
import { InMemoryDocusignRep } from './repositories/docusign/in-memory/docusign';
import UserRepo from './repositories/user/postgres/user';
import UsersService from './services/user';
import UsersRoutes from './routes/user/userRoute';

// to use .environment variable in the project
require('dotenv').config();

export default class MainServer {
  private inMemoryArtistRepo: ArtistsRepo;

  private inMemoryArtistRecommendationRepo: InMemoryArtistRecommendationRepo;

  private inMemoryAuthRecommendationRepo: InMemoryAuthRepo;

  private inMemoryDocumentsRepo: InMemoryDocumentsRepo;

  private inMemoryTemplatesRepo: InMemoryTemplatesRepo;

  private inMemoryDocusignRepo: InMemoryDocusignRep;

  private documentsRepo: DocumentsRepo;

  private brandRepo: BrandRepo;

  private venueRepo: VenueRepo;

  private genreRepo: GenreRepo;

  private userRepo: UserRepo;

  private artistRecommendationRepo: ArtistRecommendationRepo;

  private artistService: ArtistService;

  private authService: AuthService;

  private documentsService: DocumentsService;

  private templatesService : TemplatesService;

  private brandsService : BrandsService;

  private venuesService : VenuesService;

  private genresService : GenresService;

  private usersService : UsersService;

  private docusignService: DocusignService;

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
    // this.inMemoryDocumentsRepo = new InMemoryDocumentsRepo();
    this.inMemoryTemplatesRepo = new InMemoryTemplatesRepo();
    this.inMemoryDocusignRepo = new InMemoryDocusignRep();
    this.artistRecommendationRepo = new ArtistRecommendationRepo();
    this.documentsRepo = new DocumentsRepo();
    this.brandRepo = new BrandRepo();
    this.venueRepo = new VenueRepo();
    this.genreRepo = new GenreRepo();
    this.userRepo = new UserRepo();
    this.artistService = new ArtistService(this.inMemoryArtistRepo, this.artistRecommendationRepo);
    this.authService = new AuthService(this.inMemoryAuthRecommendationRepo);
    this.documentsService = new DocumentsService(this.documentsRepo, this.artistRecommendationRepo, this.inMemoryTemplatesRepo);
    this.templatesService = new TemplatesService(this.inMemoryTemplatesRepo);
    this.brandsService = new BrandsService(this.brandRepo);
    this.venuesService = new VenuesService(this.venueRepo);
    this.genresService = new GenresService(this.genreRepo);
    this.usersService = new UsersService(this.userRepo);
    auth0.generateToken();
    this.docusignService = new DocusignService(this.inMemoryDocusignRepo, this.documentsService);
    this.app = express();
    this.app.use(cors(this.corsOptions));
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
    this.app.use(contentType);
    this.app.use(express.json());
    this.app.use(auth0.authenticate);
    this.app.use(auth0.setAuth);
    this.app.use('/artists', auth0.requireRole(['branduser']), new ArtistRoute(this.artistService, this.documentsService, this.templatesService, this.docusignService).router);
    this.app.use('/auth', new AuthRoutes(this.authService).router);
    this.app.use('/brands', new BrandsRoutes(this.brandsService).router);
    this.app.use('/venues', new VenuesRoutes(this.venuesService).router);
    this.app.use('/genres', new GenresRoutes(this.genresService).router);
    this.app.use('/users', new UsersRoutes(this.usersService).router);
    this.app.use(errorHandler);
  }
}
