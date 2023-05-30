import { useAppSelector } from '../../../shared/model/hooks';
import { selectIsAuth } from '../model/session-slice';
import { Navigate, Outlet } from 'react-router-dom';

export const PrivateRoutes = (): JSX.Element => {
    const isAuth = useAppSelector(selectIsAuth);

    return isAuth ? <Outlet /> : <Navigate to="/signin" />;
};
