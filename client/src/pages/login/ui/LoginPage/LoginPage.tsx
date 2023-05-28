import { useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LoginForm } from '@/features/auth/login';
import { Row } from 'antd';

export const LoginPage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const onComplete = useCallback(() => {
        navigate(location.state?.redirectUrl ?? '/');
    }, [navigate]);

    return (
        <div>
            <Row align="middle" justify="center" style={{ minHeight: '100vh' }}>
                <LoginForm onComplete={onComplete} />
            </Row>
        </div>
    );
};
