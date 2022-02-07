import { Connection, createConnection } from 'typeorm';

require('dotenv').config();

export class DBConnection {
    private static instance: DBConnection

    public connection: Connection

    constructor() {
      if (DBConnection.instance) {
        return DBConnection.instance;
      }
      createConnection({
        type: 'postgres',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT, 10),
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_DATABASE,
        synchronize: false,
        logging: false,
        entities: [
          'dist/models/entities/**/*.js',
        ],
        migrations: [
          'dist/models/migration/**/*.js',
        ],
        subscribers: [
          'dist/models/subscriber/**/*.js',
        ],
        cli: {
          entitiesDir: 'src/models/entities',
          migrationsDir: 'src/models/migration',
          subscribersDir: 'src/models/subscriber',
        },
      }).then((connection) => {
        this.connection = connection;
      });
      DBConnection.instance = this;
    }
}
