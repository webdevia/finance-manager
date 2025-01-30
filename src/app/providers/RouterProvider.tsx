import React from "react";
import { RouterProvider as ReactRouterProvider, createBrowserRouter } from 'react-router-dom';

import { Home } from 'src/pages/Home/Home';
import { SignIn } from 'src/pages/SignIn/SignIn';
// import { SignUp } from 'src/pages/SignUp/SignUp';
import { Profile } from 'src/pages/ProfilePage/Profile';
import { Layout } from 'src/widgets/Layout/Layout';

import { OperationListPage } from "src/pages/OperationListPage/OperationListPage";
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
            {path: "operation-new-test", element: <OperationDialog visible />},
            {
                path: 'operations', element: <OperationListPage />, children: [
                   // { path: ':operationId/edit', element: <OperationListPage /> },
                ]
            },
        ],
    },
]);


export const RouterProvider: React.FC = () => {
    return (
        <ReactRouterProvider router={router} />
    );
}