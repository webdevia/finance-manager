import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { graphqlClient as client } from 'src/app/providers';
import { SIGNIN_MUTATION } from './signIn/api/signIn.mutations';
import { SIGNUP_MUTATION } from './signUp/api/signUp.mutations';
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

export const signInUser = createAsyncThunk(
  'auth/signInUser',
  async ({ email, password }: AuthUser, { rejectWithValue }) => {
    try {
      const { data } = await client.mutate({
        mutation: SIGNIN_MUTATION,
        variables: { email, password },
      });
      return data.profile.signin.token;
    } catch (err) {
      if (err instanceof ApolloError) {
        return rejectWithValue(handleAuthError(err));
      }
      return rejectWithValue(handleUnknownError('An unknown error occurred'));
    }
  }
);

export type SignUpUser = AuthUser & { commandId: string };

export const signUpUser = createAsyncThunk(
  'auth/signUpUser',
  async ({ email, password, commandId }: SignUpUser, { rejectWithValue }) => {
    try {
      const { data } = await client.mutate({
        mutation: SIGNUP_MUTATION,
        variables: { email, password, commandId },
      });

      return data.profile.signup.token;
    } catch (err) {
      if (err instanceof ApolloError) {
        return rejectWithValue(handleAuthError(err));
      }
      return rejectWithValue(handleUnknownError('An unknown error occurred'));
    }
  }
);

interface AuthState {
  token: string;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: AuthUserError | null;
}

const initialState: AuthState = {
  token: tokenStorage.get(),
  status: 'idle',
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signOut(state) {
      state.token = '';
      state.status = 'idle';
      tokenStorage.remove();
      client.cache.reset();
    },
    resetError(state) {
      state.error = null;
    },
    setToken(state, action) {
      tokenStorage.set(action.payload);
      state.token = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // SignIn
      .addCase(signInUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.token = action.payload;
        tokenStorage.set(action.payload);
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as AuthUserError;
      })
      // SignUp
      .addCase(signUpUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.token = action.payload;
        tokenStorage.set(action.payload);
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as AuthUserError;
      });
  },
});

export const { signOut, resetError, setToken } = authSlice.actions;
export default authSlice.reducer;
