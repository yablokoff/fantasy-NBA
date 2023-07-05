import React from 'react';
import { useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { selectIsPreloaderRunning } from './preloaderSlice';
import { ANIMATION_CLASSES } from '../../constants/defaults';

const appearAnimationDuration = 600;

const ballColor = '#f47436';
const strokeColor = '#eeeeee';

const Preloader = () => {
    const show = useSelector(selectIsPreloaderRunning);
    return (
        <CSSTransition
            in={show}
            timeout={appearAnimationDuration}
            classNames={ANIMATION_CLASSES}
            mountOnEnter
            unmountOnExit
        >
            <div className="preloader__wrapper">
                <div className="preloader">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="preloader-ball"
                        viewBox="0 0 100 100"
                        preserveAspectRatio="xMidYMid"
                    >
                        <circle cx="50" cy="50" r="50.25" fill={ballColor} stroke={strokeColor} strokeWidth="4.5" />
                        <path d="M50 0L50 100" stroke={strokeColor} strokeWidth="4" />
                        <path
                            d="M14.644660940672622 14.644660940672622 A50 50 0 0 1 14.644660940672622 85.35533905932738"
                            fill="none"
                            stroke={strokeColor}
                            strokeWidth="4"
                        />
                        <path
                            d="M85.35533905932738 14.644660940672622 A50 50 0 0 0 85.35533905932738 85.35533905932738"
                            fill="none"
                            stroke={strokeColor}
                            strokeWidth="4"
                        />

                        <g transform="translate(0 50)">
                            <path d="M0 0A50 50 0 0 1 100 0" fill="none" stroke={strokeColor} strokeWidth="4">
                                <animate
                                    attributeName="d"
                                    repeatCount="indefinite"
                                    dur="1s"
                                    calcMode="spline"
                                    keyTimes="0;0.499999;0.5;1"
                                    keySplines="0.1 0 1 0.9;0.5 0.5 0.5 0.5;0 0.1 0.9 1"
                                    values="M0 0A50 50 0 0 1 100 0;M0 0A50 0 0 0 1 100 0;M0 0A50 0 0 0 0 100 0;M0 0A50 50 0 0 0 100 0"
                                    begin="0"
                                />
                            </path>
                            <path d="M0 0A50 50 0 0 1 100 0" fill="none" stroke={strokeColor} strokeWidth="4">
                                <animate
                                    attributeName="d"
                                    repeatCount="indefinite"
                                    dur="1s"
                                    calcMode="spline"
                                    keyTimes="0;0.499999;0.5;1"
                                    keySplines="0.1 0 1 0.9;0.5 0.5 0.5 0.5;0 0.1 0.9 1"
                                    values="M0 0A50 50 0 0 1 100 0;M0 0A50 0 0 0 1 100 0;M0 0A50 0 0 0 0 100 0;M0 0A50 50 0 0 0 100 0"
                                    begin="-0.5"
                                />
                            </path>
                        </g>
                    </svg>
                </div>
            </div>
        </CSSTransition>
    );
};

export default Preloader;
