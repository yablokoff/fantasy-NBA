import React from "react";
import Anime from "@mollycule/react-anime";


export default () => {
    return (
        <Anime
            in
            duration={800}
            appear
            onEntering={{
                opacity: [0, 1],
                translateY: [220, 0],
                easing: "easeInOutSine"
            }}>

            <div className="empty-label">
                {"Hey! The contests are either live or unavailable today. Look out for updates on "}

                <a className="link"
                   target="_blank"
                   title="FRANK MICHAEL SMITH'S"
                   href="https://www.instagram.com/frankmichaelsmith_/">
                    {"Frank's Instagram"}
                </a>

                {"."}
            </div>
        </Anime>
    )
};
