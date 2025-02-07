import { ApolloError } from '@apollo/client';

export type HandledError<T> = {
  fields: T[];
  message: string;
};

export type ServerErrorExtension = {
  code: string;
};

export type ServerError =
  | 'ERR_INCORRECT_EMAIL_OR_PASSWORD'
  | 'ERR_ACCOUNT_ALREADY_EXIST'
  | 'ERR_FIELD_REQUIRED'
  | 'INCORRECT_PASSWORD'
  | 'ERR_INVALID_PASSWORD'
  | 'ERR_NOT_VALID'
  | 'VALIDATION'
  | 'ERR_AUTH'
  | 'ERR_NO_FILES'
  | 'ERR_NOT_ALLOWED'
  | 'ERR_NOT_FOUND'
  | 'ERR_VALIDATION_ERROR'
  | 'ERR_INTERNAL_SERVER';

export type ErrorFieldsMap<T> = Partial<Record<ServerError, T[]>>;

export const handleApolloError = <T>(serverError: ApolloError, errorFieldsMap: ErrorFieldsMap<T>): HandledError<T> => {
  const message = serverError.cause?.message || '';
  const extensions = serverError.cause?.extensions;
  const serverErrorExtension = extensions as ServerErrorExtension;
  const fields = errorFieldsMap[serverErrorExtension.code as ServerError];

  return { fields: fields ?? [], message };
};

export const handleUnknownError = (serverError: string): HandledError<[]> => {
  return { fields: [], message: serverError };
};
