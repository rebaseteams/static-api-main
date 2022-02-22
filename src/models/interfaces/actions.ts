/* eslint-disable no-unused-vars */
import { RepoInterface } from '@rebaseitlabs/typeorm-generic';
import { Action } from '../types/role';

export interface ActionInterface {
    createAction(name: string): Promise<{action: Action}>
    getActions(): Promise<{ actions: Array<Action> }>
}
