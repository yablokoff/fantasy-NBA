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
import { createMarkup, loadImages } from "../utils";
import routes from "../constants/routes";


const ThanksPage = () => {
    const dispatch = useDispatch();
    const content = useSelector(state => state.content);
    const { ids: selected_ids } = useSelector(state => state.selectedCardsIDs);
    let { cards } = useSelector(state => state.cards);
    cards = cards.filter(card => selected_ids.includes(card.id));
    const hasSelected = Boolean(selected_ids.length);
    const hasLoadedCards = Boolean(cards.length);

    useEffect(() => {
        // запрос за картами в случае когда юзер заходит на сайт повторно после выбора карт
        if (hasSelected && !hasLoadedCards) {
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
        <Page isPageLoaded={hasLoadedCards}>
            <div className="thanks-wrapper">
                <div className="container">
                    <ThanksLabel title={content.thanks_label} />

                    <ThanksText delay={700}>
                        <div className="text-markdown"
                             dangerouslySetInnerHTML={createMarkup(content.thanks_block_1)} />
                    </ThanksText>

                    <ThanksText delay={800}>
                        <div className="text-markdown"
                             dangerouslySetInnerHTML={createMarkup(content.thanks_block_2)} />
                    </ThanksText>

                    {cards.length && <ThanksCards cards={cards} />}
                </div>
            </div>
        </Page>
    ));
};

export default ThanksPage;
