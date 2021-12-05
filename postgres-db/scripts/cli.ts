/* eslint-disable import/no-extraneous-dependencies */

import * as yargs from 'yargs';
import { AppMigrationGenerateCommand } from './migration-generate';
import { AppMigrationRunCommand } from './migration-run';

require('yargonaut')
  .style('blue')
  .helpStyle('green')
  .errorsStyle('red');

// eslint-disable-next-line no-unused-expressions
yargs
  .command(new AppMigrationGenerateCommand())
  .command(new AppMigrationRunCommand())
  .argv;
