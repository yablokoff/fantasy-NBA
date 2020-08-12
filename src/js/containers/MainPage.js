import React from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

import Page from "../components/Page";
import Cards from "../components/Cards";
import routes from "../constants/routes";


const MainPage = () => {
    const { ids } = useSelector(state => state.selectedCards);
    return (ids.length ?
            <Redirect to={routes.thanks} />
            :
            <Page>
                <div className="cards-wrapper">
                    <div className="container">
                        <Cards />
                    </div>
                </div>
            </Page>
    );
};

export default MainPage;
