export type Action = {
  name: string;
  permission: boolean;
}

export type Resource = {
  name: string;
  actions: Array<Action>
}

export type Role = {
  name: string;
  resource: Array<Resource>;
}
export type UserRoleType = {
  roles: Array<Role>
};
