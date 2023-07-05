import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useUsersRetrieveQuery } from '../app/services/users';
import { useDailyPlayersListQuery } from '../app/services/daily';
import { selectUserId, selectIsAuthenticated } from '../features/auth';
import routes from '../constants/routes';

const PrivateRoute = ({ children }) => {
    const location = useLocation();
    const userId = useSelector(selectUserId);
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const { data: user, isError } = useUsersRetrieveQuery(
        { id: userId },
        {
            skip: !isAuthenticated,
        },
    );

    // fetch daily players to show board cards
    const { isLoadingDailyPlayers } = useDailyPlayersListQuery(undefined, {
        skip: !isAuthenticated,
        selectFromResult: ({ data }) => ({
            isLoadingDailyPlayers: !Boolean(data),
        }),
    });

    if (!isAuthenticated) {
        return <Navigate to={routes.login} replace state={{ from: location }} />;
    }

    if (!isLoadingDailyPlayers && user && !isError) {
        return children ? children : <Outlet />;
    }

    // app loading or user was deleted
    return null;
};

export default PrivateRoute;
