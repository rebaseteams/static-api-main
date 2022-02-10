import { BaseTypeORMService } from '@rebaseitlabs/typeorm-generic';
import { PgActionEntity } from '../models/entities/pg-actions';

export default class ActionsService extends BaseTypeORMService<PgActionEntity> {}
