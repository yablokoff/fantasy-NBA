import React from "react";
import PropTypes from "prop-types";
import { Provider } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";

import Preloader from "../components/Preloader";
import PrivateRoute from "../components/PrivateRoute";
import MainPage from "./MainPage";
import LoginPage from "./LoginPage";
import ThanksPage from "./ThanksPage";
import routes from "../constants/routes";


const Root = ({ store }) => (
    <Provider store={store}>
        <Switch>
            <PrivateRoute exact path={routes.home} component={MainPage} />
            <PrivateRoute path={routes.thanks} component={ThanksPage} />
            <Route path={routes.login} render={LoginPage} />
            <Route path="*"><Redirect to={routes.home} /></Route>
        </Switch>
        <Preloader />
    </Provider>
);

Root.propTypes = {
    store: PropTypes.object.isRequired,
};

export default Root;
