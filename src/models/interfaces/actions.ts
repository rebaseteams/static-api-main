import { RepoInterface } from '@rebaseitlabs/typeorm-generic';
import { PgActionEntity } from '../entities/pg-actions';

export interface ActionInterface extends RepoInterface<PgActionEntity>{}
