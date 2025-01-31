import React from 'react';
import { RouterProvider } from './RouterProvider';
import { ThemeProvider } from './ThemeProvider';
import { StoreProvider } from './StoreProvider';
import { store } from '../store';
import { AuthProvider } from './AuthProvider';

export const Providers: React.FC = () => {
  return (
    <StoreProvider store={store}>
      <ThemeProvider>
        <AuthProvider>
          <RouterProvider />
        </AuthProvider>
      </ThemeProvider>
    </StoreProvider>
  );
};
