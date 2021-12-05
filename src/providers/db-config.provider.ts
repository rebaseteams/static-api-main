import { InvalidConfigurationError, ResourceNotFoundError, UnknownServiceError } from '../models/types/errors';

export type DbConfigGetError =
  | UnknownServiceError
  | InvalidConfigurationError
  | ResourceNotFoundError;

export interface DbConfig {
  host: string;
  port: number;
  database: string;
  username:string;
  password: string;
}

export interface DbConfigProvider {
  get(): Promise<DbConfig | DbConfigGetError>;
}
