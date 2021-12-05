/* eslint-disable class-methods-use-this */

import path from 'path';
import { Connection, MigrationExecutor } from 'typeorm';
import { MigrationRunCommand } from 'typeorm/commands/MigrationRunCommand';
import yargs from 'yargs';
import { createPgConnection } from '../../src/utils/pg-connection';
import { getDbConfig, migrationsFolder } from './context';

export class AppMigrationRunCommand extends MigrationRunCommand {
  command = 'migration:run';

  describe = 'Runs all pending migrations';

  async handler(args: yargs.Arguments): Promise<void> {
    const config = await getDbConfig();
    const connection = await createPgConnection(config, [path.join(migrationsFolder, '*ts')]);

    if ((connection as Connection).isConnected) {
      const con = connection as Connection;
      const options = {
        transaction: 'all' as 'all' | 'none' | 'each',
      };

      switch (args.t) {
        case 'all':
          options.transaction = 'all';
          break;
        case 'none':
        case 'false':
          options.transaction = 'none';
          break;
        case 'each':
          options.transaction = 'each';
          break;
        default:
          // none;
      }

      const migrationsExecutor = new MigrationExecutor(con, con.createQueryRunner());
      const pendingMigrations = await migrationsExecutor.getPendingMigrations();

      if (pendingMigrations.length === 0) {
        // eslint-disable-next-line no-console
        console.log('Migrations are already up to date');
      } else {
        // eslint-disable-next-line no-console
        console.log(`Running ${pendingMigrations.length} Migration(s)`);
        // eslint-disable-next-line no-console
        pendingMigrations.map(({ name, timestamp }, i) => console.log(`${(i + 1)} ${name} created at ${new Date(timestamp).toISOString()}`));
        await con.runMigrations(options);
      }

      await con.close();
    }
  }
}
