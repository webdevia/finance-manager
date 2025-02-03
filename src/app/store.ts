import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import appReducer from 'src/features/appSlice';
import authReducer from 'src/features/auth/authSlice';
import profileReducer from 'src/features/profile/profileSlice';
import operationsReducer from 'src/features/operation/operationSlice';

import { api } from '../features/auth/authApi';

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  operations: operationsReducer,
  app: appReducer,
  api: api.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
