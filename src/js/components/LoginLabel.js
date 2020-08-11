import React from "react";
import anime from "animejs";
import Anime from "@mollycule/react-anime";


export default ({ name }) => {
    const letters = name.split('').map(
        (letter, i) => <span key={i + letter} className="letter">{letter}</span>
    );

    return (
        <div className="head-label-wrapper">
            <div className="container">
                <div className="head-label center-text">
                    <div className="letters">
                        <Anime
                            in
                            duration={650}
                            appear
                            onEntering={{
                                opacity: [0, 1],
                                translateX: function(el, index) {
                                    return [-1 * el.offsetLeft, 0];
                                },
                                delay: anime.stagger(50),
                                easing: "easeOutQuint"
                            }}>
                            {letters}
                        </Anime>
                    </div>
                </div>
            </div>
        </div>
    )
};
