import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  token: string;
}

const initialState: AuthState = {
  token: '',
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
    },
  },
});

export const { setToken, clearToken } = authSlice.actions;
export default authSlice.reducer;
