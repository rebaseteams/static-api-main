import { ConfigInterface } from './models/types/config';
import AdvancedSearchProvider from './providers/advancedSearchProvider';
import ActionsRepo from './repositories/actions/postgres/actions';
import ArtistRecommendationRepo from './repositories/artistRecommendations/cc-recomm-api/artistRecommendation';
import ArtistsRepo from './repositories/artists/postgres/artists';
import { Auth0 } from './repositories/auth0/http/auth0';
import BrandRepo from './repositories/brands/postgres/brand';
import DocumentsRepo from './repositories/documents/postgres/documents';
import { DocusignRepo } from './repositories/docusign/http/docusign';
import EventsTypeRepo from './repositories/eventsType/postgres/eventsType';
import { FileManagerAWSS3Repo } from './repositories/file-manager/s3-file-manager/awsS3';
import GenreRepo from './repositories/genre/postgres/genre';
import ResourceRepo from './repositories/resource/postgres/resource';
import RoleRepo from './repositories/role/postgres/role';
import InMemoryTemplatesRepo from './repositories/templates/in-memory/templates'; // TODO: THis has to postgres
import UserRepo from './repositories/user/postgres/user';
import VenueRepo from './repositories/venues/postgres/venue';
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

export class ProdServer {
  config: ConfigInterface;

  constructor() {
    const conn = new DBConnection();
    const timeout = setTimeout(() => {
      if (conn) {
        const { connection } = conn;
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

        const desiredSearchRepos = getDesiredSearchRepos(connection);

        // Creating objects of repo
        const auth0 = new Auth0(connection, configConstants);
        const artistRepo = new ArtistsRepo(connection);
        const artistRecommendationRepo = new ArtistRecommendationRepo(connection);
        const fileManagerRepo = new FileManagerAWSS3Repo();
        const documentsRepo = new DocumentsRepo(connection, fileManagerRepo);
        const docusignRepo = new DocusignRepo(fileManagerRepo);

        const templatesRepo = new InMemoryTemplatesRepo(fileManagerRepo);
        const brandRepo = new BrandRepo(connection);
        const venueRepo = new VenueRepo(connection);
        const genreRepo = new GenreRepo(connection);
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
        clearTimeout(timeout);
      }
    }, 3000);
  }
}
