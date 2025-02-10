import { ApolloError, useMutation } from '@apollo/client';
import { UPDATE_PASSWORD } from '../api/updatePassword.mutations';
import { UpdatePasswordInput } from 'src/features/password/updatePassword/types/password.types';
import { transformToProfilePasswordMutationsChangeArgsDto } from '../lib/updatePassword.lib';
import { ErrorFieldsMap, handleApolloError, handleUnknownError } from 'src/shared/api/errors/errors';

export type PasswordErrorableField = 'password';
const errorFieldsMap: ErrorFieldsMap<PasswordErrorableField> = {
  INCORRECT_PASSWORD: ['password'],
};

export const useUpdatePassword = () => {
  const [updatePassword, { loading, error }] = useMutation(UPDATE_PASSWORD);

  const handleUpdatePassword = async (updatePasswordInputArgs: UpdatePasswordInput) => {
    try {
      await updatePassword({ variables: transformToProfilePasswordMutationsChangeArgsDto(updatePasswordInputArgs) });
    } catch (err) {
      if (err instanceof ApolloError) {
        return Promise.reject(handleApolloError(err, errorFieldsMap));
      }
      return Promise.reject(handleUnknownError('An unknown error occurred'));
    }
  };

  return { handleUpdatePassword, loading, error };
};
