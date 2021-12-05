export type Errors = Array<Error>;

export interface RootError {
  name: string;
  message: string;
  stack?: string;
}

export interface TypedError {
  type: string;
  cause?: TypedError | RootError;
}

export interface UnhandledError extends TypedError {
  type: 'unknown-error';
  method?: string;
  path?: string;
}

export interface UnknownError extends TypedError {
  type: 'unknown-error';
}

export interface ValidationError extends TypedError {
  type: 'validation-error';
  issues: Errors
}

export interface UnknownServiceError extends Required<TypedError> {
  type: 'unknown-service-error';
  service: string;
}

export interface InvalidConfigurationError extends TypedError {
  type: 'invalid-configuration-error';
  service: string;
  reason: string;
  details?: string[];
}

export interface ResourceNotFoundError<Type extends string = string> extends TypedError {
  type: 'resource-not-found-error';
  message?: string;
  resource: {
    id: string;
    type: Type;
  }
}
