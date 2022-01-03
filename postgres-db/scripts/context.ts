/* eslint-disable no-console */
import path from 'path';

export const getDbConfig = async (): Promise<any> => {
  const env = process.env.ENV || 'dev';

  if (env === 'prd') {
    // TODO
    return {
      database: '',
      username: '',
      password: '',
      host: '',
      port: '',
    };
  }

  return {
    host: 'database',
    port: '5432',
    database: 'concert_curator',
    username: 'admin',
    password: 'admin',
  };
};

export const migrationsFolder = path.join(__dirname, '..', 'migrations');
