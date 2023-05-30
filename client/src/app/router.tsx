import {
    Route,
    Routes,
    createBrowserRouter,
    createRoutesFromElements,
} from 'react-router-dom';
import { SigninPage } from '../pages/signin';
import { PrivateRoutes } from '@/entities/session';
import { BaseLayout } from './layouts/BaseLayout';

export const appRouter = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/signin" element={<SigninPage />} />
            <Route element={<PrivateRoutes />}>
                <Route element={BaseLayout}>
                    <Route path="/" element={<div>Home Page</div>} />
                </Route>
            </Route>
        </>,
    ),
);
