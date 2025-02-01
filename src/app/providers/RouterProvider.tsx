import React from 'react';
import { Navigate, Outlet, RouterProvider as ReactRouterProvider, createHashRouter } from 'react-router-dom';

import { Home } from 'src/pages/Home/Home';
import { SignIn } from 'src/pages/SignIn/SignIn';
import { Profile } from 'src/pages/ProfilePage/Profile';
import { Layout } from 'src/widgets/Layout/Layout';

import { OperationListPage } from 'src/pages/OperationListPage/OperationListPage';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { selectIsAuth } from 'src/features/auth/selectors';
import OperationDialogPage from 'src/pages/OperationDialogPage/OperationDialogPage';

export const ProtectedRoute: React.FC = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const isAuthenticated = !!token;

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  return <Outlet />;
};

export const ProtectedAdminRoute: React.FC = () => {
  const isAdmin = useSelector((state: RootState) => state.profile.profile.isAdmin);

  if (!isAdmin) {
    return <Navigate to="/signin" replace />;
  }

  return <Outlet />;
};

const SignInWrapper: React.FC = () => {
  const isAuthenticated = useSelector(selectIsAuth);

  if (isAuthenticated) {
    return <Navigate to="/" replace />; 
  }

  return <SignIn />;
}

const router = createHashRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'signin', element: <SignInWrapper /> },
      {
        element: <ProtectedRoute />,
        children: [
          { path: 'profile', element: <Profile /> },
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
