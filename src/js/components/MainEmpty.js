import React from "react";
import anime from "animejs";
import SplitText from "./SplitText";


export default () => {
    return (
        <div className="empty-label">
            <SplitText
                text="Hey, sadly no NBA games today, come back another day."
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
    )
};
