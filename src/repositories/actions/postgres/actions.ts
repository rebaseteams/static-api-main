import { BaseTypeORMRepo } from '@rebaseitlabs/typeorm-generic';
import { Connection } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { PgActionEntity } from '../../../models/entities/pg-actions';
import { ActionInterface } from '../../../models/interfaces/actions';
import { Action } from '../../../models/types/role';

function mapEntityToType(entity: PgActionEntity): Action {
  return {
    id: entity.id,
    name: entity.name,
  };
}

function mapTypeToEntity(type: Action): PgActionEntity {
  return {
    id: type.id,
    name: type.name,
  };
}
export default class ActionsRepo extends BaseTypeORMRepo<Action, PgActionEntity> implements ActionInterface {
  constructor(connection: Connection, resourceName: string) {
    super(connection, resourceName, mapEntityToType, mapTypeToEntity);
  }

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
