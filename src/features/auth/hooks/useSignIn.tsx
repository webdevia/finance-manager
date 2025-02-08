import { ApolloError, useMutation } from '@apollo/client';
import { SIGNIN_MUTATION } from '../api/auth.mutations';
import { SigninMutationVariables } from '../types/auth.types';
import { ErrorFieldsMap, handleApolloError, handleUnknownError } from 'src/shared/api/errors/errors';
import { SigninMutation } from 'src/shared/api/types/generated.dto.types';

export type SignInErrorableField = 'email' | 'password';
const errorFieldsMap: ErrorFieldsMap<SignInErrorableField> = {
    VALIDATION: ['email', 'password'],
};

export const useSignIn = () => {
    const [signIn, { loading, error }] = useMutation<SigninMutation>(SIGNIN_MUTATION);

    const handleSignIn = async (signInInputArgs: SigninMutationVariables) => {
        try {
            const { data } = await signIn({ variables: signInInputArgs });
            return data?.profile?.signin.token;
        } catch (err) {
            if (err instanceof ApolloError) {
                return Promise.reject(handleApolloError(err, errorFieldsMap));
            }
            return Promise.reject(handleUnknownError('An unknown error occurred'));
        }
    };

    return { handleSignIn, loading, error };
};
