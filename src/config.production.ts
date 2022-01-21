import { ConfigInterface } from './models/types/config';
import ArtistRecommendationRepo from './repositories/artistRecommendations/postgres/artistRecommendation';
import ArtistsRepo from './repositories/artists/in-memory/artist';
import { Auth0 } from './repositories/auth0/http/auth0';
import BrandRepo from './repositories/brands/postgres/brand';
import DocumentsRepo from './repositories/documents/postgres/documents';
import { DocusignRepo } from './repositories/docusign/http/docusign';
import { FileManagerAWSS3Repo } from './repositories/file-manager/s3-file-manager/awsS3';
import GenreRepo from './repositories/genre/postgres/genre';
import ResourceRepo from './repositories/resource/postgres/resource';
import RoleRepo from './repositories/role/postgres/role';
import InMemoryTemplatesRepo from './repositories/templates/in-memory/templates'; // TODO: THis has to postgres
import UserRepo from './repositories/user/postgres/user';
import VenueRepo from './repositories/venues/postgres/venue';
import ArtistService from './services/artist';
import BrandsService from './services/brand';
import DocumentsService from './services/documents';
import { DocusignService } from './services/docusign';
import { FileManagerService } from './services/file-manager';
import GenresService from './services/genre';
import ResourcesService from './services/resource';
import RolesService from './services/role';
import TemplatesService from './services/templates';
import UsersService from './services/user';
import VenuesService from './services/venue';

export class ProdServer {
  config: ConfigInterface;

  constructor() {
    const configConstants = {
      AUTH_AUDIENCE: 'http://localhost:4000',
      AUTH_DOMAIN: 'https://dev-bnfcgcth.us.auth0.com/',
      AUTH_CLIENT_ID: 'B7hdgDYvx7fyGktJJxxidg9qg0Xvbq0s',
      AUTH_CONNECTION: 'Username-Password-Authentication',
      AUTH_TOKEN: '',
    };

    // Initializating static variables
    Auth0.initAuth(configConstants.AUTH_DOMAIN, configConstants.AUTH_AUDIENCE);
    FileManagerAWSS3Repo.initConfig();

    // Creating objects of repo
    const auth0 = new Auth0(configConstants);
    const artistRepo = new ArtistsRepo();
    const artistRecommendationRepo = new ArtistRecommendationRepo();
    const fileManagerRepo = new FileManagerAWSS3Repo();
    const documentsRepo = new DocumentsRepo(fileManagerRepo);
    const docusignRepo = new DocusignRepo(fileManagerRepo);

    const templatesRepo = new InMemoryTemplatesRepo(fileManagerRepo);
    const brandRepo = new BrandRepo();
    const venueRepo = new VenueRepo();
    const genreRepo = new GenreRepo();
    const userRepo = new UserRepo(auth0);
    const roleRepo = new RoleRepo();
    const resourceRepo = new ResourceRepo();

    this.config = {
      constants: configConstants,
      services: {
        artistService: new ArtistService(artistRepo, artistRecommendationRepo),
        // authService: new AuthService();
        documentsService: new DocumentsService(documentsRepo, artistRecommendationRepo, templatesRepo),
        templatesService: new TemplatesService(templatesRepo),
        brandsService: new BrandsService(brandRepo),
        venuesService: new VenuesService(venueRepo),
        genresService: new GenresService(genreRepo),
        usersService: new UsersService(userRepo),
        rolesService: new RolesService(roleRepo),
        resourcesService: new ResourcesService(resourceRepo),
        docusignService: new DocusignService(docusignRepo, documentsRepo), // This doesnt look correct.
        fileManagerService: new FileManagerService(fileManagerRepo),
      },
      providers: {
        auth0,
      },
    };
  }
}
