import fs from 'fs';
import { MigrationGenerateCommand } from 'typeorm/commands/MigrationGenerateCommand';
import * as yargs from 'yargs';
import path from 'path';
import { Connection } from 'typeorm';
import { getDbConfig, migrationsFolder } from './context';
import { createPgConnection } from '../../src/utils/pg-connection';

export class AppMigrationGenerateCommand extends MigrationGenerateCommand {
  command = 'migration:generate';

  describe = 'Generates a new migration file with sql which needs to be executed to update schema.'

  async handler(args: yargs.Arguments): Promise<void> {
    const timestamp = new Date().getTime();
    const filename = `${timestamp}-${args.name}.ts`;
    const config = await getDbConfig();
    const connection = await createPgConnection(config, [path.join(migrationsFolder, '*ts')]);

    if ((connection as Connection).isConnected) {
      const con = connection as Connection;
      const sqlInMemory = await con.driver.createSchemaBuilder().log();
      await con.close();

      if (args.pretty) {
        sqlInMemory.upQueries.forEach((upQuery) => {
          // eslint-disable-next-line no-param-reassign
          upQuery.query = MigrationGenerateCommand.prettifyQuery(upQuery.query);
        });

        sqlInMemory.downQueries.forEach((downQuery) => {
          // eslint-disable-next-line no-param-reassign
          downQuery.query = MigrationGenerateCommand.prettifyQuery(downQuery.query);
        });
      } else {
        // eslint-disable-next-line no-console
        console.log('Connection was unsuccessful');
      }

      const upSqls: string[] = [];
      const downSqls: string[] = [];

      sqlInMemory.upQueries.forEach((upQuery) => {
        upSqls.push(`      await queryRunner.query(\`${upQuery.query.replace(new RegExp('`', 'g'), '\\`')}\`${MigrationGenerateCommand.queryParams(upQuery.parameters)});`);
      });

      sqlInMemory.downQueries.forEach((downQuery) => {
        downSqls.push(`      await queryRunner.query(\`${downQuery.query.replace(new RegExp('`', 'g'), '\\`')}\`${MigrationGenerateCommand.queryParams(downQuery.parameters)});`);
      });

      if (upSqls.length > 0 || downSqls.length > 0) {
        const fileContent = MigrationGenerateCommand.getTemplate(args.name as string, timestamp, upSqls, downSqls.reverse());
        fs.writeFileSync(path.join(migrationsFolder, filename), fileContent);
      } else {
        // eslint-disable-next-line no-console
        console.log('Nothing to generate migration for');
      }
    }
  }
}
