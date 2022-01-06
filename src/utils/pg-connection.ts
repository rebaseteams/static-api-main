/* eslint-disable class-methods-use-this */
import { Connection, createConnection, Table } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { PgArtistEntity } from '../models/entities/pg-artist';
import { InvalidConfigurationError, TypedError } from '../models/types/errors';
import { DbConfig } from '../providers/db-config.provider';
import { OmitStrict } from './omit';
import Artist from '../models/entities/Artist';
import Document from '../models/entities/Document';
import ArtistRecommendation from '../models/entities/ArtistRecommendation';
import Brand from '../models/entities/Brand';
import Venue from '../models/entities/Venue';
import Genre from '../models/entities/Genre';
import User from '../models/entities/User';
import Role from '../models/entities/Role';

export type ConnectionInfo = OmitStrict<DbConfig, 'password'>;

interface ConnectionError extends Required<TypedError> {
  connectionInfo: ConnectionInfo;
}

export interface UnknownConnectionError extends ConnectionError {
  type: 'unknown-connection-error';
}

export interface ActiveConnectionAlreadyExistsError extends ConnectionError {
  type: 'active-connection-already-exists-error';
}

export interface InvalidPasswordConnectionError extends ConnectionError {
  type: 'invalid-password-connection-error';
}

export type ConnectionErrors =
  | UnknownConnectionError
  | InvalidConfigurationError
  | ActiveConnectionAlreadyExistsError;

// enum PgErrorCode {
//   // eslint-disable-next-line no-unused-vars
//   InvalidPassword = '28P01',
// }

class NamingStrategy extends SnakeNamingStrategy {
  primaryKeyName(tableOrName: Table | string, columnNames: string[]): string {
    const table = tableOrName instanceof Table ? tableOrName.name : tableOrName;
    const columnsSnakeCase = columnNames.join('_');

    return `pk_${table}_${columnsSnakeCase}`;
  }

  foreignKeyName(tableOrName: Table | string, columnNames: string[], referencedTablePath: string): string {
    const table = tableOrName instanceof Table ? tableOrName.name : tableOrName;
    const columnsSnakeCase = columnNames.join('_');

    return `fk_${table}_${columnsSnakeCase}__${referencedTablePath}`;
  }

  uniqueConstraintName(tableOrName: Table | string, columnNames: string[]): string {
    const table = tableOrName instanceof Table ? tableOrName.name : tableOrName;
    const columnsSnakeCase = columnNames.join('_');

    return `uc_${table}_${columnsSnakeCase}`;
  }

  indexName(tableOrName: Table | string, columnNames: string[]): string {
    const table = tableOrName instanceof Table ? tableOrName.name : tableOrName;
    const columnsSnakeCase = columnNames.join('_');

    return `idx_${table}_${columnsSnakeCase}`;
  }
}

export async function createPgConnection(
  dbConfig: DbConfig, migrations?: string[],
): Promise<ConnectionErrors | Connection> {
  const {
    host,
    port,
    database,
    username,
    password,
  } = dbConfig;

  try {
    const connection = await createConnection({
      name: 'postgres',
      type: 'postgres',
      entities: [
        PgArtistEntity,
        Artist,
        Document,
        ArtistRecommendation,
        Brand,
        Venue,
        Genre,
        User,
        Role,
      ],
      migrations,
      database,
      host,
      username,
      password,
      port,
      applicationName: 'concert_curation',
      connectTimeoutMS: 5000,
      namingStrategy: new NamingStrategy(),
    });

    return connection;
  } catch (err) {
    const { name, code } = err as { name?: string; code?: string; };
    const connectionInfo: ConnectionInfo = {
      host,
      port,
      database,
      username,
    };

    if (name === 'AlreadyHasActiveConnectionError') {
      return {
        type: 'active-connection-already-exists-error',
        connectionInfo,
        cause: err as Error,
      };
    }

    if (code === '28P01') {
      const invalidConfigurationError: InvalidConfigurationError = {
        type: 'invalid-configuration-error',
        service: 'pg-connection',
        cause: err as Error,
        reason: 'Invalid Password',
      };
      return invalidConfigurationError;
    }

    return {
      type: 'unknown-connection-error',
      connectionInfo,
      cause: err as Error,
    };
  }
}
