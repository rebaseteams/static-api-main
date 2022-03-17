import _ from 'lodash';
import { PgUserEntity } from '../models/entities/pg-user';
import { PgResourceEntity } from '../models/entities/pg-resource';
import { PgRoleEntity } from '../models/entities/pg-role';
import { User } from '../models/types/user';
import { UserAction, UserResource, UserRole } from '../models/types/userRole';
import { PgActionPermissionsEntity } from '../models/entities/pg-action-permissions';
import { PgActionEntity } from '../models/entities/pg-actions';
import { Action, Resource, Role } from '../models/types/role';
import PgDocumentEntity from '../models/entities/pg-document';
import { Document } from '../models/types/document';

export function mapUserPermission(
  pgActionPermissions: PgActionPermissionsEntity[], userId, roleId, resourceId, actionId,
) {
  const actionPermission = pgActionPermissions.find(
    (p) => p.action_id === actionId && p.resource_id === resourceId
      && p.role_id === roleId && p.user_id === userId,
  );
  if (!actionPermission) {
    return false;
  }
  return actionPermission.permission;
}

export function mapUserAction(
  pgAction: PgActionEntity, pgActionPermissions: PgActionPermissionsEntity[], userId, roleId, resourceId,
): UserAction {
  const mappedAction: UserAction = {
    id: pgAction.id,
    name: pgAction.name,
    permission: mapUserPermission(pgActionPermissions, userId, roleId, resourceId, pgAction.id),
  };

  return mappedAction;
}

export async function mapUserResource(
  ra: PgResourceEntity, pgActionPermissions: PgActionPermissionsEntity[], userId, roleId,
): Promise<UserResource> {
  const mappedUserActions: UserAction[] = [];

  for (let i = 0; i < pgActionPermissions.length; i += 1) {
    const resource = await pgActionPermissions[i].resource;
    if (resource.id === ra.id) {
      const action = await pgActionPermissions[i].action;
      const mappedAction = await mapUserAction(action, pgActionPermissions, userId, roleId, resource.id);

      mappedUserActions.push(mappedAction);
    }
  }

  const mappedResource: UserResource = {
    id: ra.id,
    name: ra.name,
    actions: mappedUserActions,
  };

  return mappedResource;
}

export async function mapUserRole(
  pgRole: PgRoleEntity, pgActionPermissions: PgActionPermissionsEntity[], userId,
): Promise<UserRole> {
  const resources = [];
  for (let i = 0; i < pgActionPermissions.length; i += 1) {
    const pgResource = await pgActionPermissions[i].resource;
    const resource = await mapUserResource(pgResource, pgActionPermissions, userId, pgRole.id);
    resources.push(resource);
  }
  const mappedRole: UserRole = {
    id: pgRole.id,
    name: pgRole.name,
    resources,
  };

  return mappedRole;
}

export async function mapUser(pgUser: PgUserEntity, pgActionPermissions: PgActionPermissionsEntity[]): Promise<User> {
  const roles: UserRole[] = [];
  for (let i = 0; i < pgActionPermissions.length; i += 1) {
    const pgRole = await pgActionPermissions[i].role;
    const role = await mapUserRole(pgRole, pgActionPermissions, pgUser.id);
    // const role = await mapUserRole(pgUser.roles[i], pgActionPermissions, pgUser.id);
    roles.push(role);
  }
  const mapperUser: User = {
    id: pgUser.id,
    name: pgUser.name,
    email: pgUser.email,
    approved: pgUser.approved,
    roles,
  };

  return mapperUser;
}

export async function mapUserWithUniqueRole(pgUser: PgUserEntity, pgActionPermissions: PgActionPermissionsEntity[]): Promise<User> {
  const user = await mapUser(pgUser, pgActionPermissions);
  return {
    ...user,
    roles: _.unionBy(user.roles, 'id'),
  };
}

export function mapAction(pgAction: PgActionEntity): Action {
  const mappedAction: Action = {
    id: pgAction.id,
    name: pgAction.name,
  };

  return mappedAction;
}

export async function mapResource(pgResource: PgResourceEntity): Promise<Resource> {
  const actions = [];
  const pgActions = await pgResource.actions;
  for (let i = 0; i < pgActions.length; i += 1) {
    const action = mapAction(pgActions[i]);
    actions.push(action);
  }
  const mappedResource: Resource = {
    id: pgResource.id,
    name: pgResource.name,
    actions,
  };

  return mappedResource;
}

export async function mapRole(pgRole: PgRoleEntity, pgResource: PgResourceEntity[]): Promise<Role> {
  const resources = [];
  for (let i = 0; i < pgResource.length; i += 1) {
    const resource = await mapResource(pgResource[i]);
    resources.push(resource);
  }
  const mappedRole: Role = {
    id: pgRole.id,
    name: pgRole.name,
    resources,
  };

  return mappedRole;
}

export function mapDocument(pgDocument: PgDocumentEntity): Document {
  const document: Document = {
    id: pgDocument.id,
    name: pgDocument.name,
    createdOn: pgDocument.created_on,
    createdBy: pgDocument.created_by,
    mode: pgDocument.mode,
    html: pgDocument.html,
    contract: pgDocument.contract,
  };

  return document;
}

export function getArrayOf(field: string, arr: Array<any>) {
  try {
    return arr.map((a) => a[field]);
  } catch (err) {
    return [];
  }
}
