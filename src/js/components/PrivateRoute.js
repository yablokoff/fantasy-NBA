import React from "react";
import PropTypes from "prop-types";
import { Redirect, Route } from "react-router-dom";

import { isAuthenticated } from "../storage/auth";
import routes from "../constants/routes";


const PrivateRoute = ({component: Component, ...rest}) => {
    return (
        <Route
            {...rest}
            render={props => {
                return (isAuthenticated() ? (
                    <Component {...props}/>
                ) : (
                    <Redirect to={{
                        pathname: routes.login,
                        state: {from: props.location}
                    }}/>
                ));
            }}
        />
    );
};

PrivateRoute.propTypes = {
    component: PropTypes.elementType.isRequired
};

export default PrivateRoute;
