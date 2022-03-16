export type Action = {
    id: string;
    name: string;
    permission?: boolean;
  }

export type Resource = {
    id: string;
    name: string;
    actions: Array<Action>
  }

export type Role = {
    id: string;
    name: string;
    resources: Array<Resource>;
  }
