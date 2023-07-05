import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { useContent } from '../../hooks';
import { useCardsListQuery } from '../../app/services/cards';
import { useSetsCreateMutation } from '../../app/services/sets';
import { CARDS_SHOW_COUNT, CARDS_SELECT_COUNT, ANIMATION_CLASSES } from '../../constants/defaults';
import { createMarkup } from '../../utils';
import { selectDailyPlayersIds, setSelectedCards } from './gameSlice';
import { selectIsPreloaderRunning } from '../preloader/preloaderSlice';

const appearAnimationDuration = 2000;

const BoardList = ({ boardCardIds }) => {
    const dispatch = useDispatch();
    const isPreloaderRunning = useSelector(selectIsPreloaderRunning);
    const showCards = !isPreloaderRunning; // this means the images have been loaded too
    const dailyPlayersIds = useSelector(selectDailyPlayersIds);
    const { cards_page_green, cards_page_gray } = useContent();
    const { cards, cardsLoaded } = useCardsListQuery(
        { ids: boardCardIds },
        {
            selectFromResult: ({ data }) => ({
                cardsLoaded: Boolean(data?.length),
                cards: data,
            }),
        },
    );

    const [createSet] = useSetsCreateMutation();
    const [lastChoiceIndex, setLastChoiceIndex] = useState(null);
    const [choicedCards, setChoicedCards] = useState(Array(CARDS_SHOW_COUNT).fill(0));

    const isFullSet = choicedCards.filter(Boolean).length === CARDS_SELECT_COUNT;

    const handlePersonClick = index => {
        const currentSelectedCards = choicedCards.slice();
        if (currentSelectedCards[index]) {
            currentSelectedCards[index] = 0;
        } else {
            if (isFullSet) currentSelectedCards[lastChoiceIndex] = 0; // unpick previous
            currentSelectedCards[index] = 1;
        }
        setLastChoiceIndex(index);
        setChoicedCards(currentSelectedCards);
    };

    const handleEnterClick = async event => {
        const cardsIds = cards.map(card => card.id);
        const selectedIds = cardsIds.filter((id, i) => choicedCards[i]);
        const players = dailyPlayersIds.filter((id, i) => choicedCards[i]);

        await createSet({
            players,
        }).unwrap();

        dispatch(setSelectedCards(selectedIds));
    };

    if (!cardsLoaded) return null;

    return (
        <div className="list">
            {cards.map((card, i) => {
                let classes = 'card';
                if (choicedCards[i]) classes += ' selected';
                else if (isFullSet) classes += ' skipped';

                return (
                    <CSSTransition
                        in={showCards}
                        timeout={appearAnimationDuration}
                        classNames={ANIMATION_CLASSES}
                        key={card.id}
                        unmountOnExit
                    >
                        <div className="list-item">
                            <div className={classes} onClick={() => handlePersonClick(i)}>
                                <div className="card-image-wrapper">
                                    <img className="card-image" src={card.image_url} alt={card.name} />
                                </div>
                            </div>
                        </div>
                    </CSSTransition>
                );
            })}

            <CSSTransition
                in={showCards}
                timeout={appearAnimationDuration}
                classNames={ANIMATION_CLASSES}
                unmountOnExit
            >
                <div className="list-item">
                    <div className="rules">
                        <div className="rule-1" dangerouslySetInnerHTML={createMarkup(cards_page_green)} />
                        <div className="rule-2" dangerouslySetInnerHTML={createMarkup(cards_page_gray)} />
                    </div>
                    <div className="button-wrapper">
                        <button
                            type="button"
                            className="btn btn-green"
                            onClick={handleEnterClick}
                            disabled={!isFullSet}
                        >
                            <span className="btn-text">{'enter'}</span>
                        </button>
                    </div>
                </div>
            </CSSTransition>
        </div>
    );
};

BoardList.propTypes = {
    boardCardIds: PropTypes.array.isRequired,
};

export default BoardList;
