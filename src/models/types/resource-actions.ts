export type ResourceActions = Array<{
  resourceId : string,
  actions : Array<{
    name : string,
    permission : boolean
  }>
}>;
