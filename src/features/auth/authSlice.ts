import { createSlice } from '@reduxjs/toolkit';
import { graphqlClient as client } from 'src/app/providers/RouterProvider';
import { ApolloError } from '@apollo/client';
import { tokenStorage } from 'src/shared/storage/tokenStorage';

// TODO: review and remove
export type AuthUser = { email: string; password: string };

type AuthField = 'email' | 'password';

export type AuthUserError = {
  fields: AuthField[];
  message: string;
};

type ServerErrorExtension = {
  code: string;
};

type ErrorFieldsMap = Record<string, AuthField[]>;
const errorFieldsMap: ErrorFieldsMap = {
  INCORRECT_EMAIL_OR_PASSWORD: ['email', 'password'],
  ACCOUNT_ALREADY_EXIST: ['email'],
};

export const handleAuthError = (serverError: ApolloError): AuthUserError => {
  const message = serverError.cause?.message || '';
  const extensions = serverError.cause?.extensions;
  const serverErrorExtension = extensions as ServerErrorExtension;
  const fields = errorFieldsMap[serverErrorExtension.code];

  return { fields: fields ?? [], message };
};

export const handleUnknownError = (serverError: string): AuthUserError => {
  return { fields: [], message: serverError };
};

interface AuthState {
  token: string;
}

const initialState: AuthState = {
  token: tokenStorage.get(),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signOut(state) {
      state.token = '';
      tokenStorage.remove();
      client.cache.reset();
    },
    setToken(state, action) {
      tokenStorage.set(action.payload);
      state.token = action.payload;
    },
  },
});

export const { signOut, setToken } = authSlice.actions;
export default authSlice.reducer;
