import React from 'react';
import { RouterProvider } from './RouterProvider';
import { ThemeProvider } from './ThemeProvider';
import { StoreProvider } from './StoreProvider';
import { store } from '../store';
import { AuthProvider } from './AuthProvider';
import { ApolloProvider } from '@apollo/client';
import createGraphqlClient from 'src/shared/api/client';
import { tokenStorage } from 'src/shared/storage/tokenStorage';
import ErrorBoundary from './ErrorBoundary';

export const graphqlClient = createGraphqlClient(tokenStorage);

export const Providers: React.FC = () => {
  return (
    <ErrorBoundary>
      <ApolloProvider client={graphqlClient}>
        <StoreProvider store={store}>
          <ThemeProvider>
            <AuthProvider>
              <RouterProvider />
            </AuthProvider>
          </ThemeProvider>
        </StoreProvider>
      </ApolloProvider>
    </ErrorBoundary>
  );
};
