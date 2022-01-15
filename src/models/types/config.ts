import { Auth0 } from "../../repositories/auth0/http/auth0";
import ArtistService from "../../services/artist";
import AuthService from "../../services/auth";
import BrandsService from "../../services/brand";
import DocumentsService from "../../services/documents";
import { DocusignService } from "../../services/docusign";
import { FileManagerService } from "../../services/file-manager";
import GenresService from "../../services/genre";
import ResourcesService from "../../services/resource";
import RolesService from "../../services/role";
import TemplatesService from "../../services/templates";
import UsersService from "../../services/user";
import VenuesService from "../../services/venue";


export type Environment = 'development' | 'production';

export type ConfigInterface = {
    constants: ConfigConstants;
    services: ConfigServices;
    providers: ConfigProviders;
  }

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
  }

  export type ConfigProviders = {
    auth0: Auth0;
  }