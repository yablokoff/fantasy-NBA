import React from "react";
import PropTypes from "prop-types";
import Anime from "@mollycule/react-anime";


const ThanksText = (props) => {
    return (
        <Anime
            in
            duration={800}
            appear
            onEntering={{
                opacity: [0, 1],
                translateX: [-270, 0],
                delay: props.delay,
                easing: "easeOutExpo"
            }}>
            <div className="thanks-text-block">
                {props.children}
            </div>
        </Anime>
    )
};

ThanksText.propTypes = {
    children: PropTypes.element.isRequired,
    delay: PropTypes.number
};

export default ThanksText;
