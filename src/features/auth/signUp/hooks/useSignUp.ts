import { ApolloError, useMutation } from '@apollo/client';
import { SIGNUP_MUTATION } from '../api/signUp.mutations';
import { SignupMutationVariables } from '../types/signUp.types';
import { ErrorFieldsMap, handleApolloError, handleUnknownError } from 'src/shared/api/errors/errors';
import { SignupMutation } from 'src/shared/api/types/generated.dto.types';

export type SignUpErrorableField = 'email' | 'password';
const errorFieldsMap: ErrorFieldsMap<SignUpErrorableField> = {
  VALIDATION: ['email', 'password'],
};

export const useSignUp = () => {
  const [signUp, { loading, error }] = useMutation<SignupMutation>(SIGNUP_MUTATION);

  const handleSignUp = async (signUpInputArgs: SignupMutationVariables) => {
    try {
      const { data } = await signUp({ variables: signUpInputArgs });
      return data?.profile?.signup.token;
    } catch (err) {
      if (err instanceof ApolloError) {
        return Promise.reject(handleApolloError(err, errorFieldsMap));
      }
      return Promise.reject(handleUnknownError('An unknown error occurred'));
    }
  };

  return { handleSignUp, loading, error };
};
