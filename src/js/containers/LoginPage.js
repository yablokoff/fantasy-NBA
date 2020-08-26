import React from "react";
import { Redirect } from "react-router";
import PropTypes from "prop-types";

import Page from "../components/Page";
import LoginLabel from "../components/LoginLabel";
import LoginPreview from "../components/LoginPreview";
import LoginForm from "../components/LoginForm";
import routes from "../constants/routes";
import { isAuthenticated } from "../storage/auth";


const LoginPage = (props) => {
    const { from: { pathname: next = routes.home } = {} } = props.location.state || {};
    return (
        isAuthenticated() ?
            <Redirect to={next}/>
            :
            <Page>
                <React.Fragment>
                    <LoginLabel title="frank michael smith's" />

                    <div className="login-form-wrapper">
                        <div className="container">
                            <LoginPreview
                                text={"Free to enter. Winner receives a shoutout,\n" +
                                "tag and a chance at a free hoodie!"} />
                            <LoginForm next={next} />
                        </div>
                    </div>
                </React.Fragment>
            </Page>
    )
};

LoginPage.propTypes = {
    location: PropTypes.object.isRequired
};

export default LoginPage;
