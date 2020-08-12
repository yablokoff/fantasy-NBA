import React from "react";
import PropTypes from "prop-types";
import Anime from "@mollycule/react-anime";


const SplitText = (props) => {
    const letters = props.text.split('').map(
        (letter, i) => <span key={i + letter} className="letter">{letter}</span>
    );

    return (
        <div className="letters">
            <Anime
                in
                duration={props.duration}
                appear
                onEntering={props.onEnterAnimation}
                onExiting={props.onEnterAnimation}>
                {letters}
            </Anime>
        </div>
    )
};

SplitText.propTypes = {
    text: PropTypes.string,
    duration: PropTypes.number,
    onEnterAnimation: PropTypes.object,
    onExitAnimation: PropTypes.object
};

export default SplitText;
