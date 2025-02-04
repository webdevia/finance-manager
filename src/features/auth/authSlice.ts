import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import client from 'src/shared/api/client';
import { SIGNIN_MUTATION, SIGNUP_MUTATION } from './api/auth';
import { ApolloError } from '@apollo/client';

export type SignInUser = { email: string; password: string };

type SignInField = 'email' | 'password';

export type SignInUserError = {
  fields: SignInField[];
  message: string;
};

export const handleSignInErrors = (serverError: ApolloError): SignInUserError => {
  const {message, extensions} = serverError.cause;

  console.dir(extensions, message);

  const errorsMap = { INCORRECT_EMAIL_OR_PASSWORD: ['email', 'password'] as SignInField[] };
  return { fields: errorsMap.INCORRECT_EMAIL_OR_PASSWORD, message: '111111111111' };
};
//   return serverError. .map((error) => {
//     const validateField = fieldValidator(error.message);
//     const fieldName =
//       error.extensions.code === 'ERR_VALIDATION_ERROR'
//         ? ['email', 'password'].find((field) => validateField(field))
//         : error.extensions.code === 'ERR_ACCOUNT_ALREADY_EXIST'
//         ? 'email'
//         : '';
//     const message = error.message || 'Unknown error';

//     return fieldName ? { message, fieldName: fieldName as SignUpField } : { message };
//   });
// };

export const signInUser = createAsyncThunk(
  'auth/signInUser',
  async ({ email, password }: SignInUser, { rejectWithValue }) => {
    try {
      const { data } = await client.mutate({
        mutation: SIGNIN_MUTATION,
        variables: { email, password },
      });
      return data.login.token;
    } catch (err) {
      if (err instanceof ApolloError) {
        return rejectWithValue(handleSignInErrors(err));
      }
      return rejectWithValue('An unknown error occurred');
    }
  }
);

type SignUpUser = SignInUser & { commandId: string };

export const signUpUser = createAsyncThunk('auth/signUpUser', async ({ email, password, commandId }: SignUpUser) => {
  const { data } = await client.mutate({
    mutation: SIGNUP_MUTATION,
    variables: { email, password, commandId },
  });

  return data.register.token;
});

interface AuthState {
  token: string;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: SignInUserError | null;
}

const initialState: AuthState = {
  token: localStorage.getItem('token') || '',
  status: 'idle',
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signOut(state) {
      state.token = '';
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.token = action.payload;
        localStorage.setItem('token', action.payload);
      })
      .addCase(signInUser.rejected, (state, action) => {
        // console.dir(action.payload);
        state.status = 'failed';
        state.error = action.payload as SignInUserError;
        // state.errorFields = action.payload as ;
      })
      .addCase(signUpUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.token = action.payload;
        localStorage.setItem('token', action.payload);
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as SignInUserError;
      });
  },
});

export const { signOut } = authSlice.actions;

export default authSlice.reducer;
