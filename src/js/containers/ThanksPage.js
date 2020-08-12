import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import anime from "animejs";
import Anime from "@mollycule/react-anime";

import Page from "../components/Page";
import ThanksLabel from "../components/ThanksLabel";
import ThanksText from "../components/ThanksText";
import { LOAD_CARDS_FULFILLED } from "../constants/ActionTypes";
import { showPreloader, hidePreloader, loadCards } from "../actions";
import { formattingCardsResponse } from "../api";
import { loadImages } from "../utils";
import routes from "../constants/routes";


const ThanksPage = () => {
    const dispatch = useDispatch();
    const { show } = useSelector(state => state.preloader);
    const { ids: selected_ids } = useSelector(state => state.selectedCards);
    const hasSelected = selected_ids.length;
    let { cards } = useSelector(state => state.cards);
    cards = cards.filter(card => selected_ids.includes(card.id));

    useEffect(() => {
        // в случае когда юзер заходит на сайт повторно после выбора карт
        if (hasSelected && !cards.length) {
            if (!show) {
                dispatch(showPreloader());
            }
            dispatch(
                loadCards(selected_ids)
            ).then(
                ({value, action}) => {
                    if (action && action.type === LOAD_CARDS_FULFILLED) {
                        const cards = formattingCardsResponse(value.data);
                        return loadImages(cards.map(card => card.image_url))
                    }
                }, (error) => {}
            ).then(() => {
                dispatch(hidePreloader());
            });
        } else {
            if (show) {
                dispatch(hidePreloader());
            }
        }
    }, []);

    return (!hasSelected ? (
        <Redirect to={routes.home} />
    ) : (
        <Page>
            <div className="thanks-wrapper">
                <div className="container">
                    <ThanksLabel title="thanks for entering" />

                    <ThanksText delay={700}>
                        <>
                            {"winner announced\non frank's instagram\ntomorrow morning"}
                        </>
                    </ThanksText>

                    <ThanksText delay={800}>
                        <>
                            {"must be following\n"}
                            <a className="link"
                               target="_blank"
                               title="FRANK MICHAEL SMITH'S"
                               href="http://Instagram.com/FRANKMICHAELSMITH_/">
                                {"@FRANKMICHAELSMITH_"}
                            </a>
                            {"\non instagram to win"}
                        </>
                    </ThanksText>

                    {cards.length &&
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
                    </div>}
                </div>
            </div>
        </Page>
    ));
};

export default ThanksPage;
