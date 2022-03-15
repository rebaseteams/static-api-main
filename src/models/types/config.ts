import ActionsService from '../../services/actions';
import AdvancedSearchService from '../../services/advancedSearch';
import ArtistService from '../../services/artist';
// eslint-disable-next-line no-unused-vars
import AuthService from '../../services/auth';
import BrandsService from '../../services/brand';
import DocumentsService from '../../services/documents';
import { DocusignService } from '../../services/docusign';
import EventsTypeService from '../../services/events-type';
import { FileManagerService } from '../../services/file-manager';
import GenresService from '../../services/genre';
import ResourcesService from '../../services/resource';
import RolesService from '../../services/role';
import TemplatesService from '../../services/templates';
import UsersService from '../../services/user';
import VenuesService from '../../services/venue';
import { Auth0Interface } from '../interfaces/auth0';

export type Environment = 'development' | 'production';

export type ConfigConstants = {
  AUTH_AUDIENCE: string;
  AUTH_DOMAIN: string;
  AUTH_CLIENT_ID: string;
  AUTH_CONNECTION: string;
  AUTH_TOKEN: string;
};

export type ConfigServices = {
  artistService: ArtistService;
  // authService: AuthService;
  documentsService: DocumentsService;
  templatesService: TemplatesService;
  brandsService: BrandsService;
  venuesService: VenuesService;
  genresService: GenresService;
  usersService: UsersService;
  rolesService: RolesService;
  resourcesService: ResourcesService;
  docusignService: DocusignService;
  fileManagerService: FileManagerService;
  actionService: ActionsService;
  eventsTypeService: EventsTypeService;
  advancedSearchService: AdvancedSearchService;
}

export type ConfigProviders = {
  auth0: Auth0Interface;
}

export type ConfigInterface = {
    constants: ConfigConstants;
    services: ConfigServices;
    providers: ConfigProviders;
  }
