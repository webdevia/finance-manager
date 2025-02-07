import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { graphqlClient as client } from 'src/app/providers';
import { UPDATE_PROFILE } from 'src/entities/profile/api/profile.mutations';
import { GET_PROFILE } from 'src/entities/profile/api/profile.queries';
import { ApolloError } from '@apollo/client';

export type ProfileInputFields = { input: { name: string } };

export type ProfileField = 'name';

export type ProfileError = {
  fields: ProfileField[];
  message: string;
};

type ServerErrorExtension = {
  code: string;
};

type ErrorFieldsMap = Record<string, ProfileField[]>;
const errorFieldsMap: ErrorFieldsMap = {
  VALIDATION: ['name'],
};

export const handleProfileError = (serverError: ApolloError): ProfileError => {
  const message = serverError.cause?.message || '';
  const extensions = serverError.cause?.extensions;
  const serverErrorExtension = extensions as ServerErrorExtension;
  const fields = errorFieldsMap[serverErrorExtension.code];

  return { fields: fields ?? [], message };
};

export const handleUnknownError = (serverError: string): ProfileError => {
  return { fields: [], message: serverError };
};

export const fetchProfile = createAsyncThunk('profile/fetchProfile', async () => {
  const { data } = await client.query({ query: GET_PROFILE });
  return data.profile;
});

export const updateProfile = createAsyncThunk(
  'profile/updateProfile',
  async ({ input }: ProfileInputFields, { rejectWithValue }) => {
    try {
      const { data } = await client.mutate({
        mutation: UPDATE_PROFILE,
        variables: { input },
        refetchQueries: [{ query: GET_PROFILE }],
      });
      return data.profile.update;
    } catch (err) {
      if (err instanceof ApolloError) {
        return rejectWithValue(handleProfileError(err));
      }
      return rejectWithValue(handleUnknownError('An unknown error occurred'));
    }
  }
);

export interface Profile {
  email: string;
  id: string;
  name: string;
  signUpDate: string;
}

type FetchProfileStatus = 'fetch_loading' | 'fetch_succeeded' | 'fetch_failed';
type UpdateProfileStatus = 'update_loading' | 'update_succeeded' | 'update_failed';

interface ProfileState {
  profile: Profile | null;
  status: 'idle' | FetchProfileStatus | UpdateProfileStatus;
  error: ProfileError | null;
}

const initialState: ProfileState = {
  profile: null,
  status: 'idle',
  error: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    resetError(state) {
      state.error = null;
    },
    clearProfile(state) {
      state.profile = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Profile
      .addCase(fetchProfile.pending, (state) => {
        state.status = 'fetch_loading';
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.status = 'fetch_succeeded';
        state.profile = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.status = 'fetch_failed';
        state.error = action.payload as ProfileError;
      })
      // Update Profile
      .addCase(updateProfile.pending, (state) => {
        state.status = 'update_loading';
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.status = 'update_succeeded';
        state.profile = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.status = 'update_failed';
        state.error = action.payload as ProfileError;
      });
  },
});

export const { resetError, clearProfile } = profileSlice.actions;
export default profileSlice.reducer;
