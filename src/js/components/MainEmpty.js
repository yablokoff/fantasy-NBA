import React from "react";
import anime from "animejs";
import SplitText from "./SplitText";


const firstPartText = "Hey! The contests are either live or unavailable today. Look out for updates on ";
const secondPartText = "Frank's Instagram";
const thirdPartText = ".";

export default () => {
    return (
        <div className="empty-label">
            <SplitText
                text={firstPartText}
                duration={500}
                onEnterAnimation={{
                    opacity: [0, 1],
                    translateX: function(el, index) {
                        return [-1 * el.offsetLeft, 0];
                    },
                    delay: anime.stagger(40),
                    easing: "easeOutQuint"
                }} />

            <a className="link"
               target="_blank"
               title="FRANK MICHAEL SMITH'S"
               href="https://www.instagram.com/frankmichaelsmith_/">
                <SplitText
                    text={secondPartText}
                    duration={500}
                    onEnterAnimation={{
                        opacity: [0, 1],
                        translateX: function(el, index) {
                            return [-1 * el.offsetLeft, 0];
                        },
                        delay: anime.stagger(40, {start: firstPartText.length * 40}),
                        easing: "easeOutQuint"
                    }} />
            </a>

            <SplitText
                text={thirdPartText}
                duration={500}
                onEnterAnimation={{
                    opacity: [0, 1],
                    translateX: function(el, index) {
                        return [-1 * el.offsetLeft, 0];
                    },
                    delay: anime.stagger(40, {start: firstPartText.length * 40 + secondPartText.length * 40}),
                    easing: "easeOutQuint"
                }} />
        </div>
    )
};
