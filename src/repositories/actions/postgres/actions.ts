import { BaseTypeORMRepo } from '@rebaseitlabs/typeorm-generic';
import { v4 as uuidv4 } from 'uuid';

import { PgActionEntity } from '../../../models/entities/pg-actions';
import { ActionInterface } from '../../../models/interfaces/actions';
import { Action } from '../../../models/types/role';

export default class ActionsRepo extends BaseTypeORMRepo<PgActionEntity> implements ActionInterface {
  async createAction(name: string): Promise<{action: Action}> {
    const action:PgActionEntity = {
      id: uuidv4(),
      name,
    };
    const resp = await super.create(action);
    if (resp instanceof PgActionEntity) {
      return { action: resp };
    }
    throw resp;
  }
}
