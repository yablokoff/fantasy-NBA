import React from "react";
import anime from "animejs";
import Anime from "@mollycule/react-anime";


const ThanksCards = ({ cards }) => {
    return (
        <div className="selected-cards">
            <Anime
                in
                duration={1400}
                appear
                onEntering={{
                    opacity: [0, 1],
                    delay: anime.stagger(100, {start: 1000}),
                    easing: "easeOutSine"
                }}>
                {cards.map(card => {
                    return (
                        <div className="selected-card" key={card.id}>
                            <div className="card-image-wrapper">
                                <img className="card-image"
                                     src={card.image_url}
                                     alt={card.name} />
                            </div>
                        </div>
                    )
                })}
            </Anime>
        </div>
    )
};

export default ThanksCards;
