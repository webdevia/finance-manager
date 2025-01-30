import React from "react";
import { Navigate, Outlet, RouterProvider as ReactRouterProvider, createBrowserRouter } from 'react-router-dom';

import { Home } from 'src/pages/Home/Home';
import { SignIn } from 'src/pages/SignIn/SignIn';
// import { SignUp } from 'src/pages/SignUp/SignUp';
import { Profile } from 'src/pages/ProfilePage/Profile';
import { Layout } from 'src/widgets/Layout/Layout';

import { OperationListPage } from "src/pages/OperationListPage/OperationListPage";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export const ProtectedRoute: React.FC = () => {
    const token = useSelector((state: RootState) => state.auth.token);
    const isAuthenticated = !!token;

    if (!isAuthenticated) {
        return <Navigate to="/signin" replace />;
    }

    return <Outlet />;
};

export const ProtectedAdminRoute: React.FC = () => {
    const token = useSelector((state: RootState) => state.auth.token);
    const isAuthenticated = !!token;

    if (!isAuthenticated) {
        return <Navigate to="/signin" replace />;
    }

    return <Outlet />;
};

import OperationDialog from "src/shared/ui/Dialogs/OperationDialog/OperationDialog";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            { index: true, element: <Home /> },
            { path: 'signin', element: <SignIn /> },
            { path: 'signup', element: <SignIn /> },
            { path: 'profile', element: <Profile /> },
            { path: "operation-new-test", element: <OperationDialog visible /> },
            {
                element: <ProtectedRoute />,
                children: [
                    { path: 'profile', element: <Profile /> },
                    {
                        path: 'operations',
                        element: <OperationListPage />,
                        children: [
                            {
                                //index: true,
                                element: <ProtectedAdminRoute />,
                                children: [
                                    { path: ':id/edit', element: <OperationListPage /> },
                                    { path: 'add', element: <OperationListPage /> },
                                ]
                            }
                        ]
                    },
                ]
            }
        ],
    },
]);


export const RouterProvider: React.FC = () => {
    return (
        <ReactRouterProvider router={router} />
    );
}