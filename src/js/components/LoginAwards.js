import React from "react";
import anime from "animejs";
import Anime from "@mollycule/react-anime";
import SplitText from "./SplitText";


const delay = 400;
const awardsValues = ['$100', 'signed hoodie', 'shoutout'];
const awards = awardsValues.map(
    (award) =>
        <li key={award} className="award">
            <span className="award-label">{award}</span>
        </li>
);

export default ({ title }) => {
    return (
        <div className="form-content center-text">
            <Anime
                in
                appear
                duration={1200}
                onEntering={{
                    keyframes: [
                        {
                            backgroundPositionX: 'calc(50% - 127px)',
                            backgroundSize: '3px 3px',
                        },
                        {
                            backgroundPositionX: 'calc(50% - 0px)',
                            backgroundSize: '260px 2px',
                        }
                    ],
                    delay: delay,
                    easing: 'easeOutExpo'
                }}>

                <div className="form-label">
                    <SplitText
                        text={title}
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
            </Anime>

            <ul className="awards">
                <Anime
                    in
                    duration={800}
                    appear
                    initProps={{opacity: 0}}
                    onEntering={{
                        opacity: [0, 1],
                        translateX: [270, 0],
                        easing: 'easeOutElastic(1, 0.7)',
                        delay: anime.stagger(100, {start: delay})
                    }}>
                    {awards}
                </Anime>
            </ul>
        </div>
    )
};
