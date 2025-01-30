import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  token: string;
  profile: {
    username?: string;
    isAdmin?: boolean;
  };
}

const initialState: AuthState = {
  token: '',
  profile: {},
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    clearToken: (state) => {
      state.token = '';
      state.profile = {};
    },
    setProfile: (state, action: PayloadAction<{ username: string; isAdmin: boolean }>) => {
      state.profile = action.payload;
    },
    clearProfile: (state) => {
      state.profile = {};
    },
  },
});

export const { setToken, clearToken, setProfile, clearProfile } = authSlice.actions;
export default authSlice.reducer;
