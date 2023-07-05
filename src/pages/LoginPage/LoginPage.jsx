import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { selectIsAuthenticated } from '../../features/auth';
import routes from '../../constants/routes';
import LoginLabel from './LoginLabel';
import LoginPreview from './LoginPreview';
import LoginForm from './LoginForm';
import LoginBottom from './LoginBottom';

export const LoginPage = () => {
    const location = useLocation();
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const { from: { pathname: next = routes.home } = {} } = location.state || {};

    return isAuthenticated ? (
        <Navigate to={next} replace />
    ) : (
        <React.Fragment>
            <LoginLabel />

            <div className="login-form-wrapper">
                <div className="container">
                    <LoginPreview />
                    <LoginForm />
                    <LoginBottom />
                </div>
            </div>
        </React.Fragment>
    );
};
