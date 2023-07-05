import React from 'react';
// import anime from "animejs";
import Anime from '@mollycule/react-anime';
import { useContent } from '../../hooks';
// import SplitText from "./SplitText";

const delay = 600;

const LoginPreview = () => {
    const { login_text } = useContent();

    return (
        <div className="login-preview-wrapper">
            <Anime
                in
                duration={1200}
                appear
                onEntering={{
                    opacity: [0, 1],
                    delay: delay,
                    easing: 'easeOutExpo',
                }}
            >
                <div className="login-preview">
                    <img
                        className="login-preview-img"
                        src={process.env.PUBLIC_URL + '/images/preview2.png'}
                        alt="preview"
                    />
                </div>
            </Anime>

            <Anime
                in
                duration={800}
                appear
                onEntering={{
                    opacity: [0, 1],
                    translateX: [270, 0],
                    delay: delay,
                }}
            >
                <div className="login-preview-label center-text">{login_text}</div>
            </Anime>
        </div>
    );
};

export default LoginPreview;
