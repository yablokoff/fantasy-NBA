import React from "react";
import anime from "animejs";

import SplitText from "./SplitText";


const ThanksLabel = ({ title }) => {
    return (
        <div className="thanks-label center-text">
            <SplitText
                text={title}
                duration={650}
                onEnterAnimation={{
                    opacity: [0, 1],
                    translateX: function(el, index) {
                        return [-1 * el.offsetLeft, 0];
                    },
                    delay: anime.stagger(50),
                    easing: "easeOutQuint"
                }} />
        </div>
    )
};

export default ThanksLabel;
