import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { graphqlClient as client } from 'src/app/providers';
import { PASSWORD_MUTATION } from './api/password';
import { ApolloError } from '@apollo/client';
// import { ProfilePasswordMutations } from 'src/shared/generated/types'

export type PasswordInputFields = { input: { password: string; newPassword: string } };

export type PasswordField = 'password';

export type PasswordError = {
  fields: PasswordField[];
  message: string;
};

type ServerErrorExtension = {
  code: string;
};

type ErrorFieldsMap = Record<string, PasswordField[]>;

const errorFieldsMap: ErrorFieldsMap = {
  VALIDATION: ['password'],
  INCORRECT_PASSWORD: ['password'],
};

export const handlePasswordError = (serverError: ApolloError): PasswordError => {
  const message = serverError.cause?.message || '';
  const extensions = serverError.cause?.extensions;
  const serverErrorExtension = extensions as ServerErrorExtension;
  const fields = errorFieldsMap[serverErrorExtension.code];

  return { fields: fields ?? [], message };
};

export const handleUnknownError = (serverError: string): PasswordError => {
  return { fields: [], message: serverError };
};

export const updatePassword = createAsyncThunk(
  'profile/updatePassword',
  async ({ input }: PasswordInputFields, { rejectWithValue }) => {
    try {
      const { data } = await client.mutate({
        mutation: PASSWORD_MUTATION,
        variables: { input },
      });
      return data.profile.update;
    } catch (err) {
      if (err instanceof ApolloError) {
        return rejectWithValue(handlePasswordError(err));
      }
      return rejectWithValue(handleUnknownError('An unknown error occurred'));
    }
  }
);

export interface Password {
  email: string;
  id: string;
  name: string;
  signUpDate: string;
}

interface PasswordState {
  profile: Password | null;
  status: 'idle' | 'loading' | 'update_succeeded' | 'failed';
  error: PasswordError | null;
}

const initialState: PasswordState = {
  profile: null,
  status: 'idle',
  error: null,
};

const passwordSlice = createSlice({
  name: 'password',
  initialState,
  reducers: {
    resetError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updatePassword.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        console.log('update_succeeded', action.payload);
        state.status = 'update_succeeded';
        state.profile = action.payload;
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as PasswordError;
      });
  },
});

export const { resetError } = passwordSlice.actions;
export default passwordSlice.reducer;
