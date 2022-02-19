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
  const roles = [];
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
    roles,
  };

  return mapperUser;
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

export async function mapRole(pgRole: PgRoleEntity): Promise<Role> {
  const pgRoleResources = await pgRole.resources;
  const resources = [];
  for (let i = 0; i < pgRoleResources.length; i += 1) {
    const resource = await mapResource(pgRoleResources[i]);
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
