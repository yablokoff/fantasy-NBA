import anime from 'animejs';
import React from 'react';
import { useContent } from '../../hooks';

import SplitText from '../../components/SplitText';

const LoginLabel = () => {
    const { login_label } = useContent();

    return (
        <div className="head-label-wrapper">
            <div className="container">
                <div className="head-label center-text">
                    <SplitText
                        text={login_label}
                        duration={650}
                        onEnterAnimation={{
                            opacity: [0, 1],
                            translateX: function (el, index) {
                                return [-1 * el.offsetLeft, 0];
                            },
                            delay: anime.stagger(50),
                            easing: 'easeOutQuint',
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default LoginLabel;
