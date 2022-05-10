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
    host: process.env.DB_HOST,
    port: '5432',
    database: 'concert_curator',
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
  };
};

export const migrationsFolder = path.join(__dirname, '..', 'migrations');
