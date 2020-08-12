import React from "react";
import anime from "animejs";
import SplitText from "./SplitText";


export default ({ title }) => {
    return (
        <div className="head-label-wrapper">
            <div className="container">
                <div className="head-label center-text">
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
            </div>
        </div>
    )
};
