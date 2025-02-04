import React from 'react';
import { RouterProvider } from './RouterProvider';
import { ThemeProvider } from './ThemeProvider';
import { StoreProvider } from './StoreProvider';
import { store } from '../store';
import { AuthProvider } from './AuthProvider';
import { ApolloProvider } from '@apollo/client';
import client from 'src/shared/api/client';

export const Providers: React.FC = () => {
  return (
    <ApolloProvider client={client}>
    <StoreProvider store={store}>
      <ThemeProvider>
        <AuthProvider>
          <RouterProvider />
        </AuthProvider>
      </ThemeProvider>
    </StoreProvider>
    </ApolloProvider>
  );
};
