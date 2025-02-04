import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import client from 'src/shared/api/client';
import { GET_PROFILE } from './api/profile';

export const fetchProfile = createAsyncThunk('todos/fetchProfile', async () => {
    const { data } = await client.query({ query: GET_PROFILE });
    return data.profile;
});

interface Profile {
  commandId: string;
  email: string;
  id: string;
  name: string;
  signUpDate: string;
}

interface ProfileState {
  profile: Profile | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string;
}

const initialState: ProfileState = {
  profile: null,
  status: "idle",
  error: ""
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.profile = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
  },
});

export default profileSlice.reducer;
