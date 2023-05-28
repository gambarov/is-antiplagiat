import { createBrowserRouter } from 'react-router-dom';
import { LoginPage } from '../pages/login';

export const appRouter = createBrowserRouter([
    {
        element: <LoginPage />,
        path: '/signin',
    },
]);
