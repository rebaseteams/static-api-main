import { ConfigInterface } from './models/types/config';
import AdvancedSearchProvider from './providers/advancedSearchProvider';
import ActionsRepo from './repositories/actions/postgres/actions';
import InMemoryArtistRecommendationRepo from './repositories/artistRecommendations/in-memory/artist-recommendation';
import ArtistsRepo from './repositories/artists/in-memory/artist';
import { Auth0 } from './repositories/auth0/http/auth0';
import BrandRepo from './repositories/brands/inmemory/brand';
import DocumentsRepo from './repositories/documents/in-memory/documents';
import { DocusignRepo } from './repositories/docusign/http/docusign'; // TODO: This should be in-memory docusign implementation
import EventsTypeRepo from './repositories/eventsType/postgres/eventsType';
import { FileManagerInmemoryRepo } from './repositories/file-manager/in-memory/file-manager';
import GenreRepo from './repositories/genre/in-memory/genre';
import ResourceRepo from './repositories/resource/postgres/resource'; // TODO: This has to be in-memory
import RoleRepo from './repositories/role/postgres/role'; // TODO: This has to be in-memory
import InMemoryTemplatesRepo from './repositories/templates/in-memory/templates';
import UserRepo from './repositories/user/postgres/user'; // TODO: This has to be in-memory
import VenueRepo from './repositories/venues/inmemory/venue';
import ActionsService from './services/actions';
import AdvancedSearchService from './services/advancedSearch';
import ArtistService from './services/artist';
import BrandsService from './services/brand';
import DocumentsService from './services/documents';
import { DocusignService } from './services/docusign';
import EventsTypeService from './services/events-type';
import { FileManagerService } from './services/file-manager';
import GenresService from './services/genre';
import ResourcesService from './services/resource';
import RolesService from './services/role';
import TemplatesService from './services/templates';
import UsersService from './services/user';
import VenuesService from './services/venue';
import { DBConnection } from './utils/createDbConnection';
import getDesiredSearchRepos from './utils/desiredSearchRepos';

export class DevServer {
  config: ConfigInterface;

  // private connection: Connection

  constructor() {
    // eslint-disable-next-line no-unused-vars
    const conn = new DBConnection();
    const timeout = setTimeout(() => {
      if (conn) {
        const { connection } = conn;
        const configConstants = {
          AUTH_AUDIENCE: 'concertcuration.dev.api',
          AUTH_DOMAIN: 'https://dev-yga6eln3.us.auth0.com/',
          AUTH_CLIENT_ID: 'oVngjMIrVInLZTxwFv9k64FS4cQ34d5V',
          AUTH_CONNECTION: 'Username-Password-Authentication',
          AUTH_TOKEN: '',
        };

        Auth0.initAuth(configConstants.AUTH_DOMAIN, configConstants.AUTH_AUDIENCE);
        const auth0 = new Auth0(connection, configConstants);

        const desiredSearchRepos = getDesiredSearchRepos(connection);

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
        const userRepo = new UserRepo(connection, auth0);
        const roleRepo = new RoleRepo(connection);
        const resourceRepo = new ResourceRepo(connection);
        const actionsRepo = new ActionsRepo(connection);
        const eventsTypeRepo = new EventsTypeRepo(connection);
        const advacedSearchRepo = new AdvancedSearchProvider(desiredSearchRepos);

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
            actionService: new ActionsService(actionsRepo),
            eventsTypeService: new EventsTypeService(eventsTypeRepo),
            advancedSearchService: new AdvancedSearchService(advacedSearchRepo),

          },
          providers: {
            auth0,
          },
        };
      }
      clearTimeout(timeout);
    }, 1000);
  }
}
