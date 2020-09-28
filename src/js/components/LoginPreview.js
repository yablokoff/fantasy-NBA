import React from "react";
import { useSelector } from "react-redux";
// import anime from "animejs";
import Anime from "@mollycule/react-anime";

// import SplitText from "./SplitText";
import preview from "img/preview2.png";


const delay = 600;

const LoginPreview = () => {
    const content = useSelector(state => state.content);

    return (
        <div className="login-preview-wrapper">
            <Anime
                in
                duration={1200}
                appear
                onEntering={{
                    opacity: [0, 1],
                    delay: delay,
                    easing: "easeOutExpo"
                }}>
                <div className="login-preview">
                    <img className="login-preview-img" src={preview} alt="preview"/>
                </div>
            </Anime>

            <Anime
                in
                duration={800}
                appear
                onEntering={{
                    opacity: [0, 1],
                    translateX: [270, 0],
                    delay: delay
                }}>
                <div className="login-preview-label center-text">
                    {content.login_text}
                </div>
            </Anime>
        </div>
    )
};

export default LoginPreview;
