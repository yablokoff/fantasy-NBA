import anime from "animejs";
import React from "react";
import { useSelector } from "react-redux";

import SplitText from "./SplitText";


const LoginLabel = () => {
    const content = useSelector(state => state.content);

    return (
        <div className="head-label-wrapper">
            <div className="container">
                <div className="head-label center-text">
                    <SplitText
                        text={content.login_label}
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

export default LoginLabel;
