import { ConfigInterface } from './models/types/config';
import InMemoryArtistRecommendationRepo from './repositories/artistRecommendations/in-memory/artist-recommendation';
import ArtistsRepo from './repositories/artists/in-memory/artist';
import { Auth0 } from './repositories/auth0/http/auth0';
import BrandRepo from './repositories/brands/inmemory/brand';
import DocumentsRepo from './repositories/documents/in-memory/documents';
import { DocusignRepo } from './repositories/docusign/http/docusign'; // TODO: This should be in-memory docusign implementation
import { FileManagerInmemoryRepo } from './repositories/file-manager/in-memory/file-manager';
import GenreRepo from './repositories/genre/in-memory/genre';
import ResourceRepo from './repositories/resource/postgres/resource'; // TODO: This has to be in-memory
import RoleRepo from './repositories/role/postgres/role'; // TODO: This has to be in-memory
import InMemoryTemplatesRepo from './repositories/templates/in-memory/templates';
import UserRepo from './repositories/user/postgres/user'; // TODO: This has to be in-memory
import VenueRepo from './repositories/venues/inmemory/venue';
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

export class DevServer {
  config: ConfigInterface;

  constructor() {
    const configConstants = {
      AUTH_AUDIENCE: 'http://localhost:4000',
      AUTH_DOMAIN: 'https://dev-bnfcgcth.us.auth0.com/',
      AUTH_CLIENT_ID: 'B7hdgDYvx7fyGktJJxxidg9qg0Xvbq0s',
      AUTH_CONNECTION: 'Username-Password-Authentication',
      AUTH_TOKEN: '',
    };

    Auth0.initAuth(configConstants.AUTH_DOMAIN, configConstants.AUTH_AUDIENCE);
    const auth0 = new Auth0(configConstants);

    /** Repositories Initializations: */
    const artistRepo = new ArtistsRepo();
    const fileManagerRepo = new FileManagerInmemoryRepo();
    const artistRecommendationRepo = new InMemoryArtistRecommendationRepo(fileManagerRepo);
    const documentsRepo = new DocumentsRepo(fileManagerRepo);
    const docusignRepo = new DocusignRepo(fileManagerRepo);

    const templatesRepo = new InMemoryTemplatesRepo(fileManagerRepo);
    const brandRepo = new BrandRepo(fileManagerRepo);
    const venueRepo = new VenueRepo(fileManagerRepo);
    const genreRepo = new GenreRepo(fileManagerRepo);
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
        usersService: new UsersService(userRepo, roleRepo, resourceRepo),
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
