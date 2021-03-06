import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { CSSTransition } from "react-transition-group";

import { LOAD_CARDS_FULFILLED, SET_SELECTED_CARDS_FULFILLED } from "../constants/ActionTypes";
import { CARDS_SHOW_COUNT, CARDS_SELECT_COUNT } from "../constants/defaults";
import { showPreloader, hidePreloader, loadCards, setCards } from "../actions";
import { fetchedCards, selectedCards } from "../storage/cards";
import { formattingCardsResponse } from "../api";
import { createMarkup, loadImages } from "../utils";


const appearAnimationDuration = 2000;
const animationClasses = {
    enter: 'enter',
    enterActive: 'active-enter',
    enterDone: 'done-enter',
    exit: 'exit',
    exitActive: 'active-exit',
    exitDone: 'done-exit',
};

const MainList = (props) => {
    const dispatch = useDispatch();
    const content = useSelector(state => state.content);
    const { cards } = useSelector(store => store.cards);
    const [showCards, setShowCards] = useState(false);

    useEffect(() => {
        dispatch(showPreloader());
        dispatch(
            loadCards(props.fetched_ids)
        ).then(
            ({value, action}) => {
                if (action && action.type === LOAD_CARDS_FULFILLED) {
                    const cards = formattingCardsResponse(value.data);
                    return loadImages(cards.map(card => card.image_url))
                }
            }, (error) => {}
        ).then(() => {
            dispatch(hidePreloader());
            setShowCards(true);
        });
    }, []);

    const [lastChoiceIndex, setLastChoiceIndex] = useState(null);
    const [choicedCards, setChoicedCards] = useState(Array(CARDS_SHOW_COUNT).fill(0));

    const isFullSet = () => choicedCards.filter(Boolean).length === CARDS_SELECT_COUNT;

    const handlePersonClick = (i) => {
        const currentSelectedCards = choicedCards.slice();
        if (currentSelectedCards[i]) {
            currentSelectedCards[i] = 0
        } else {
            if (isFullSet()) currentSelectedCards[lastChoiceIndex] = 0;
            currentSelectedCards[i] = 1
        }
        setLastChoiceIndex(i);
        setChoicedCards(currentSelectedCards);
    };

    const handleEnterClick = (event) => {
        // setShowCards(false);
        // on exit callback CSS transition
        dispatch(showPreloader());

        const cards_ids = cards.map(card => card.id);
        const selected_ids = cards_ids.filter((id, i) => choicedCards[i]);
        dispatch(setCards(selected_ids, choicedCards.slice())).then(
            ({value, action}) => {
                if (action && action.type === SET_SELECTED_CARDS_FULFILLED) {
                    selectedCards.set({
                        selected_ids,
                        ts: value.data.fields["Date"]
                    });
                    fetchedCards.clear();
                }
            }, (error) => {});
    };

    if (!cards.length) return null;

    return (
        <div className="list">
            {cards.map((card, i) => {
                let classes = 'card';
                if (choicedCards[i]) classes += ' selected';
                else if (isFullSet()) classes += ' skipped';

                return (
                    <CSSTransition
                        in={showCards}
                        timeout={appearAnimationDuration}
                        classNames={animationClasses}
                        key={card.id}
                        unmountOnExit>
                        <div className="list-item">
                            <div className={classes} onClick={() => handlePersonClick(i)}>
                                <div className="card-image-wrapper">
                                    <img className="card-image"
                                         src={card.image_url}
                                         alt={card.name} />
                                </div>
                            </div>
                        </div>
                    </CSSTransition>
                )
            })}

            <CSSTransition
                in={showCards}
                timeout={appearAnimationDuration}
                key="button"
                classNames={animationClasses}
                unmountOnExit>
                <div className="list-item">
                    <div className="rules">
                        <div className="rule-1"
                             dangerouslySetInnerHTML={createMarkup(content.cards_page_green)} />
                        <div className="rule-2"
                             dangerouslySetInnerHTML={createMarkup(content.cards_page_gray)} />
                    </div>
                    <div className="button-wrapper">
                        <button type="button"
                                className="btn btn-green"
                                onClick={handleEnterClick}
                                disabled={!isFullSet()}>
                            <span className="btn-text">{"enter"}</span>
                        </button>
                    </div>
                </div>
            </CSSTransition>
        </div>
    );
};

MainList.propTypes = {
    fetched_ids: PropTypes.array.isRequired
};

export default MainList;
