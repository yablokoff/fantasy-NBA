import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

import { showPreloader, loadUser, logoutUser } from "../actions";
import { getUser, isAuthenticated as isUserAuthenticated } from "../storage/auth";
import routes from "../constants/routes";


const PrivateRoute = ({component: Component, ...rest}) => {
    const dispatch = useDispatch();
    const { response: user } = useSelector(state => state.user);
    const { error } = useSelector(state => state.user);
    const isAuthenticated = isUserAuthenticated();

    useEffect(() => {
        if (isAuthenticated && !user) {
            dispatch(showPreloader());
            dispatch(
                loadUser(getUser())
            ).then(
                (result) => {

                },
                (error) => {
                    // if the user has been removed from airtables
                    dispatch(logoutUser());
                }
            );
        }
    }, []);

    return (
        <Route
            {...rest}
            render={props => {
                return (
                    !isAuthenticated ? (
                        <Redirect to={{
                            pathname: routes.login,
                            state: {from: props.location}
                        }}/>
                    ) : (user && !error) ? (
                        <Component {...props}/>
                    ) : null
                );
            }}
        />
    );
};

PrivateRoute.propTypes = {
    component: PropTypes.elementType.isRequired
};

export default PrivateRoute;
