export type UserAction = {
  id: string;
  name: string;
  permission: boolean;
}

export type UserResource = {
  id: string;
  name: string;
  actions: Array<UserAction>
}

export type UserRole = {
  id: string;
  name: string;
  resources: Array<UserResource>;
}

export type UserRoleType = {
  roles: Array<UserRole>
};
