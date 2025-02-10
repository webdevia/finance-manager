import React from 'react';
import { Navigate, Outlet, RouterProvider as ReactRouterProvider, createHashRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { HomePage } from 'src/pages/HomePage/HomePage';
import { SignInPage } from 'src/pages/SignInPage/SignInPage';
import { ProfilePage } from 'src/pages/ProfilePage/ProfilePage';
import { GenericLayout } from 'src/widgets/Layout/GenericLayout';
import { OperationListPage } from 'src/pages/OperationListPage/OperationListPage';
import OperationDialogPage from 'src/pages/OperationDialogPage/OperationDialogPage';
import { selectIsAuth } from 'src/features/auth/selectors';
import { SignUpPage } from 'src/pages/SignUpPage/SignUpPage';
import ErrorBoundary from './ErrorBoundary';
import { CategoryListPage } from 'src/pages/CategoryListPage/CategoryListPage';
import CategoryDialogPage from 'src/pages/CategoryDialogPage/CategoryDialogPage';
import { ThemeProvider } from './ThemeProvider';
import { ApolloProvider } from '@apollo/client';
import { StoreProvider } from './StoreProvider';
import { AuthProvider } from './AuthProvider';
import { tokenStorage } from 'src/shared/storage/tokenStorage';
import createGraphqlClient from 'src/shared/api/client';
import { store } from '../store';

export const graphqlClient = createGraphqlClient(tokenStorage);

const NavigateToSignIn = () => <Navigate to="/signin" replace />;

export const ProtectedRoute: React.FC = () => {
  const isAuthenticated = useSelector(selectIsAuth);

  if (!isAuthenticated) {
    return <NavigateToSignIn />;
  }

  return <Outlet />;
};

const HomePageWrapper: React.FC = () => {
  const isAuthenticated = useSelector(selectIsAuth);

  if (isAuthenticated) {
    return <Navigate to="/operations" replace />;
  }

  return <HomePage />;
};

const SignInWrapper: React.FC = () => {
  const isAuthenticated = useSelector(selectIsAuth);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <SignInPage />;
};

const router = createHashRouter([
  {
    path: '/',
    element: (
      <ErrorBoundary>
        <ApolloProvider client={graphqlClient}>
          <StoreProvider store={store}>
            <ThemeProvider>
              <AuthProvider>
                <GenericLayout />
              </AuthProvider>
            </ThemeProvider>
          </StoreProvider>
        </ApolloProvider>
      </ErrorBoundary>
    ),
    children: [
      { index: true, element: <HomePageWrapper /> },
      { path: 'signin', element: <SignInWrapper /> },
      { path: 'signup', element: <SignUpPage /> },
      {
        element: <ProtectedRoute />,
        children: [
          { path: 'profile', element: <ProfilePage /> },
          {
            path: 'operations',
            element: <OperationListPage />,
            children: [
              { path: 'add', element: <OperationDialogPage /> },
              { path: ':id/edit', element: <OperationDialogPage /> },
            ],
          },
          {
            path: 'categories',
            element: <CategoryListPage />,
            children: [
              { path: 'add', element: <CategoryDialogPage /> },
              { path: ':id/edit', element: <CategoryDialogPage /> },
            ],
          },
        ],
      },
    ],
  },
]);

export const RouterProvider: React.FC = () => {
  return <ReactRouterProvider router={router} />;
};
