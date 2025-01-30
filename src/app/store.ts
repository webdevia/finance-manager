import { configureStore } from '@reduxjs/toolkit';
import authReducer from 'src/features/authSlice';
import operationsReducer from 'src/features/operationSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    operations: operationsReducer,
  },
});

store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem('authState', JSON.stringify(state.auth));
});

const persistedState = localStorage.getItem('authState');
if (persistedState) {
  store.dispatch({ type: 'auth/setToken', payload: JSON.parse(persistedState).token });
  store.dispatch({ type: 'auth/setProfile', payload: JSON.parse(persistedState).profile });
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
