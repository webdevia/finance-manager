import { configureStore } from '@reduxjs/toolkit';
import authReducer from 'src/features/authSlice';
// import operationsReducer from '../features/operations/model/operationsSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        // operations: operationsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;