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
import { selectIsAdmin } from 'src/features/profile/selectors';

const NavigateToSignIn = () => <Navigate to="/signin" replace />;

export const ProtectedRoute: React.FC = () => {
  const isAuthenticated = useSelector(selectIsAuth);

  if (!isAuthenticated) {
    return <NavigateToSignIn />;
  }

  return <Outlet />;
};

export const ProtectedAdminRoute: React.FC = () => {
  const isAdmin = useSelector(selectIsAdmin);

  if (!isAdmin) {
    return <NavigateToSignIn />;
  }

  return <Outlet />;
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
    element: <GenericLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'signin', element: <SignInWrapper /> },
      {
        element: <ProtectedRoute />,
        children: [
          { path: 'profile', element: <ProfilePage /> },
          {
            path: 'operations',
            element: <OperationListPage />,
            children: [
              {
                element: <ProtectedAdminRoute />,
                children: [
                  { path: 'add', element: <OperationDialogPage /> },
                  { path: ':id/edit', element: <OperationDialogPage /> },
                ],
              },
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
