import React from 'react';
import { RouterProvider } from './RouterProvider';
import { ThemeProvider } from './ThemeProvider';
import { StoreProvider } from './StoreProvider';
import store from '../store';

export const Providers: React.FC = () => {
  return (
    <StoreProvider store={store}>
      <ThemeProvider>
        <RouterProvider />
      </ThemeProvider>
    </StoreProvider>
  );
};
