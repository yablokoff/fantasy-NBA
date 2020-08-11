import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CSSTransition } from "react-transition-group";

import Page from "../components/Page";
import { LOAD_CARDS_FULFILLED } from "../constants/ActionTypes";
import { showPreloader, hidePreloader, loadCards } from "../actions";
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
            dispatch(loadCards(selected_ids)).then(
                ({value, action}) => {
                    if (action && action.type === LOAD_CARDS_FULFILLED) {
                        dispatch(hidePreloader());
                    }
                }, (error) => {});
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
                    {cards.map(card => {
                        return (
                            <div className="card" key={card.id}>
                                <div className="card-image-wrapper">
                                    <img className="card-image"
                                         src={card.image_url}
                                         alt={card.name} />
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </Page>
    ));
};

export default ThanksPage;
