import React from "react";
import { useSelector } from "react-redux";
// import anime from "animejs";
import Anime from "@mollycule/react-anime";

import { createMarkup } from "../utils";


const delay = 1000;

const LoginBottom = () => {
    const content = useSelector(state => state.content);

    return (
        <div className="login-bottom-wrapper">
            <Anime
                in
                duration={1200}
                appear
                onEntering={{
                    opacity: [0, 1],
                    delay: delay,
                    easing: "easeOutExpo"
                }}>
                <div className="login-consent center-text"
                     dangerouslySetInnerHTML={createMarkup(content.login_consent)} />
            </Anime>
        </div>
    )
};

export default LoginBottom;
