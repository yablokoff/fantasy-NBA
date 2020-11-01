import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import { showPreloader, hidePreloader, loadContent } from "../actions";


const Page = (props) => {
    const dispatch = useDispatch();
    const content = useSelector(state => state.content);

    useEffect(() => {
        if (!content.response) {
            dispatch(showPreloader());
            dispatch(
                loadContent()
            ).then(() => {
                if (props.isPageLoaded) {
                    dispatch(hidePreloader());
                }
            });
        }
    }, []);

    return (
        <div id="app-page">
            <main id="app-main">
                {content.isFetching || !content.response ? null : props.children}
            </main>
        </div>
    );
};

Page.propTypes = {
    children: PropTypes.element.isRequired,
    isPageLoaded: PropTypes.bool
};

Page.defaultProps = {
  isPageLoaded: true
};

export default Page;
