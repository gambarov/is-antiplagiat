import { useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { SigninForm } from '@/features/auth/signin';
import { Row } from 'antd';

export const SigninPage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const onComplete = useCallback(() => {
        navigate(location.state?.redirectUrl ?? '/');
    }, [navigate]);

    return (
        <div>
            <Row align="middle" justify="center" style={{ minHeight: '100vh' }}>
                <SigninForm onComplete={onComplete} />
            </Row>
        </div>
    );
};
