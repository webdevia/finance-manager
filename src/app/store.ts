import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import appReducer from 'src/features/appSlice';
import authReducer from 'src/features/authSlice';
import profileReducer from 'src/features/profileSlice';
import operationsReducer from 'src/features/operationSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  operations: operationsReducer,
  app: appReducer,
});


export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
