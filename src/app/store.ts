import { configureStore } from '@reduxjs/toolkit';
import authReducer from 'src/features/authSlice';
import operationsReducer from 'src/features/operationSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    operations: operationsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
