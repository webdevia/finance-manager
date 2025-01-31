import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

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

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
