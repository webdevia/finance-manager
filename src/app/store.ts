import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import appReducer from 'src/app/slices/appSlice';
import authReducer from 'src/features/auth/authSlice';
import updatedOperationReducer from 'src/features/operation/updateOperation/slices/updatedOperationSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  updatedOperation: updatedOperationReducer,
  app: appReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
