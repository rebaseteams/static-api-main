// import { BaseTypeORMRepo } from '@rebaseitlabs/typeorm-generic';
import { Connection, Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { PgActionEntity } from '../../../models/entities/pg-actions';
import { ActionInterface } from '../../../models/interfaces/actions';
import { Action } from '../../../models/types/role';

// function mapEntityToType(entity: PgActionEntity): Action {
//   return {
//     id: entity.id,
//     name: entity.name,
//   };
// }

// function mapTypeToEntity(type: Action): PgActionEntity {
//   return {
//     id: type.id,
//     name: type.name,
//   };
// }
export default class ActionsRepo implements ActionInterface {
  private actionsRepo : Repository<PgActionEntity>;

  constructor(connection: Connection) {
    this.actionsRepo = connection.getRepository(PgActionEntity);
  }

  async createAction(name: string): Promise<{action: Action}> {
    const action:PgActionEntity = {
      id: uuidv4(),
      name,
    };
    const resp = this.actionsRepo.create(action);
    return { action: resp };
  }

  async getActions(): Promise<{ actions: Action[] }> {
    const resp = await this.actionsRepo.find();
    return { actions: resp };
  }
}
