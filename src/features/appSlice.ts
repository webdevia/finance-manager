import { createSlice } from '@reduxjs/toolkit';

interface AppState {
  isAppInitialized: boolean;
}

const initialState: AppState = {
  isAppInitialized: false,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    initializeApp: (state) => {
      state.isAppInitialized = true;
    },
  },
});

export const { initializeApp } = appSlice.actions;
export default appSlice.reducer;