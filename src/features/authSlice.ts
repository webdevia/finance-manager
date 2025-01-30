import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  token: string;
  profile: {
    username?: string;
    isAdmin?: boolean;
  };
}

const initialState: AuthState = {
  token: localStorage.getItem('token') || '',
  profile: {},
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      localStorage.setItem('token', action.payload);
      state.token = action.payload;
    },
    clearToken: (state) => {
      localStorage.removeItem('token');
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
