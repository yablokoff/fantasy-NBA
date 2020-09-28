import React from "react";
import { useSelector } from "react-redux";
import Anime from "@mollycule/react-anime";


import { createMarkup } from "../utils";


const MainEmpty = () => {
    const content = useSelector(state => state.content);

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

            <div className="empty-label text-markdown"
                 dangerouslySetInnerHTML={createMarkup(content.empty_page)} />
        </Anime>
    )
};

export default MainEmpty;
