import { ActionInterface } from '../models/interfaces/actions';
import { Action } from '../models/types/role';

export default class ActionsService {
    private actionRepo: ActionInterface;

    constructor(
      actionRepo: ActionInterface,
    ) {
      this.actionRepo = actionRepo;
    }

    async createAction(name: string): Promise<{ action: Action; }> {
      return this.actionRepo.createAction(name);
    }

    async getActions(): Promise<{ actions: Array<Action> }> {
      return this.actionRepo.getActions();
    }
}
