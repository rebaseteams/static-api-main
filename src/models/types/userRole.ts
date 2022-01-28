export type Action = {
  name: string;
  permission: boolean;
}

export type Resource = {
  id: string;
  name: string;
  actions: Array<Action>
}

export type Role = {
  id: string;
  name: string;
  resource: Array<Resource>;
}
export type UserRoleType = {
  roles: Array<Role>
};
