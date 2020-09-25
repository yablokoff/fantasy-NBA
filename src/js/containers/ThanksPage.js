import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Page from "../components/Page";
import ThanksLabel from "../components/ThanksLabel";
import ThanksText from "../components/ThanksText";
import ThanksCards from "../components/ThanksCards";
import { LOAD_CARDS_FULFILLED } from "../constants/ActionTypes";
import { showPreloader, hidePreloader, loadCards } from "../actions";
import { formattingCardsResponse } from "../api";
import { loadImages } from "../utils";
import routes from "../constants/routes";


const ThanksPage = () => {
    const dispatch = useDispatch();
    const { ids: selected_ids } = useSelector(state => state.selectedCardsIDs);
    const hasSelected = selected_ids.length;
    let { cards } = useSelector(state => state.cards);
    cards = cards.filter(card => selected_ids.includes(card.id));

    useEffect(() => {
        // в случае когда юзер заходит на сайт повторно после выбора карт
        if (hasSelected && !cards.length) {
            dispatch(showPreloader());
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
            dispatch(hidePreloader());
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
                            {"winner announced\non frank's instagram\nstory after the game"}
                        </>
                    </ThanksText>

                    <ThanksText delay={800}>
                        <>
                            {"must be following\n"}
                            <a className="link"
                               target="_blank"
                               title="SBD Play"
                               href="https://www.instagram.com/sbd_play/">
                                {"@SBD_PLAY"}
                            </a>
                            {"\non instagram to win"}
                        </>
                    </ThanksText>

                    {cards.length && <ThanksCards cards={cards} />}
                </div>
            </div>
        </Page>
    ));
};

export default ThanksPage;
