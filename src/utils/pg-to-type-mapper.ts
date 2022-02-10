import { PgUserEntity } from '../models/entities/pg-user';
import { PgResourceEntity } from '../models/entities/pg-resource';
import { PgRoleEntity } from '../models/entities/pg-role';
import { User } from '../models/types/user';
import { UserAction, UserResource, UserRole } from '../models/types/userRole';
import { PgActionPermissionsEntity } from '../models/entities/pg-action-permissions';
import { PgActionEntity } from '../models/entities/pg-actions';
import { Action, Resource, Role } from '../models/types/role';

export function mapUserPermission(
  pgActionPermissions: PgActionPermissionsEntity[], userId, roleId, resourceId, actionId,
) {
  const actionPermission = pgActionPermissions.find((p) => p.action_id === actionId && p.resource_id === resourceId
      && p.role_id === roleId && p.user_id === userId);

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

export function mapUserResource(
  ra: PgResourceEntity, pgActionPermissions: PgActionPermissionsEntity[], userId, roleId,
): UserResource {
  const mappedResource: UserResource = {
    id: ra.id,
    name: ra.name,
    actions: ra.actions.map((a) => mapUserAction(a, pgActionPermissions, userId, roleId, ra.id)),
  };

  return mappedResource;
}

export function mapUserRole(
  pgRole: PgRoleEntity, pgActionPermissions: PgActionPermissionsEntity[], userId,
): UserRole {
  const mappedRole: UserRole = {
    id: pgRole.id,
    name: pgRole.name,
    resources: pgRole.resources.map((ra) => mapUserResource(ra, pgActionPermissions, userId, pgRole.id)),
  };

  return mappedRole;
}

export function mapUser(pgUser: PgUserEntity, pgActionPermissions: PgActionPermissionsEntity[]): User {
  const mapperUser: User = {
    id: pgUser.id,
    name: pgUser.name,
    email: pgUser.email,
    roles: pgUser.roles ? pgUser.roles.map((r) => mapUserRole(r, pgActionPermissions, pgUser.id)) : [],
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

export function mapResource(pgResource: PgResourceEntity): Resource {
  const mappedResource: Resource = {
    id: pgResource.id,
    name: pgResource.name,
    actions: pgResource.actions.map((ra) => mapAction(ra)),
  };

  return mappedResource;
}

export function mapRole(pgRole: PgRoleEntity): Role {
  const mappedRole: Role = {
    id: pgRole.id,
    name: pgRole.name,
    resources: pgRole.resources.map((ra) => mapResource(ra)),
  };

  return mappedRole;
}
