import React from 'react';
// import anime from "animejs";
import Anime from '@mollycule/react-anime';
import { useContent } from '../../hooks';
import { createMarkup } from '../../utils';

const delay = 1000;

const LoginBottom = () => {
    const { login_consent } = useContent();

    return (
        <div className="login-bottom-wrapper">
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
                <div className="login-consent center-text" dangerouslySetInnerHTML={createMarkup(login_consent)} />
            </Anime>
        </div>
    );
};

export default LoginBottom;
