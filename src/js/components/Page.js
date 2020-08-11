import React from "react";
import PropTypes from "prop-types";


const Page = (props) => {
    return (
        <div id="app-page">
            <main id="app-main">
                {props.children}
            </main>
        </div>
    );
};

Page.propTypes = {
    children: PropTypes.element
};

export default Page;
