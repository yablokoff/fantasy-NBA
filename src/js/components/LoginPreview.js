import React from "react";
import anime from "animejs";
import Anime from "@mollycule/react-anime";

import SplitText from "./SplitText";
import preview from "img/preview.png";


const delay = 400;

export default ({ text }) => {
    return (
        <div className="login-preview-wrapper">
            <div className="login-preview">
                <img src={preview} alt="preview"/>
            </div>

            <div className="login-preview-label center-text">
                <SplitText
                    text={text}
                    duration={900}
                    onEnterAnimation={{
                        opacity: [0, 1],
                        translateX: [-140, 0],
                        scale: [1.2, 1],
                        rotateY: [-210, 0],
                        rotateZ: [-90, 0],
                        easing: 'easeOutElastic(1, 0.6)',
                        delay: anime.stagger(80, {start: delay})
                    }} />
            </div>
        </div>
    )
};
