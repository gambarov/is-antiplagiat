import { createBrowserRouter } from 'react-router-dom';
import { SigninPage } from '../pages/signin';

export const appRouter = createBrowserRouter([
    {
        element: <SigninPage />,
        path: '/signin',
    },
]);
