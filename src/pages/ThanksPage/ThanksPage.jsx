import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useCardsListQuery } from '../../app/services/cards';
import { selectBoardCardIds, selectPickedCardIds } from '../../features/game/gameSlice';
import { createMarkup } from '../../utils';
import { useContent } from '../../hooks';
import routes from '../../constants/routes';
import ThanksLabel from './ThanksLabel';
import ThanksText from './ThanksText';
import ThanksCards from './ThanksCards';

export const ThanksPage = () => {
    const { thanks_label, thanks_block_1, thanks_block_2 } = useContent();
    const boardCardIds = useSelector(selectBoardCardIds);
    const selectedCardIds = useSelector(selectPickedCardIds);
    const hasSelected = Boolean(selectedCardIds.length);

    // запрос за картами в случае когда юзер заходит на сайт повторно после выбора карт
    const { cards, cardsLoaded } = useCardsListQuery(
        { ids: boardCardIds.length ? boardCardIds : selectedCardIds },
        {
            selectFromResult: ({ data }) => {
                // if already loaded, filter selected
                const cards = boardCardIds.length ? data?.filter(card => selectedCardIds.includes(card.id)) : data;
                return {
                    cards,
                    cardsLoaded: Boolean(cards),
                };
            },
        },
    );

    return !hasSelected ? (
        <Navigate to={routes.home} replace />
    ) : (
        <div className="thanks-wrapper">
            <div className="container">
                <ThanksLabel title={thanks_label} />

                <ThanksText delay={700}>
                    <div className="text-markdown" dangerouslySetInnerHTML={createMarkup(thanks_block_1)} />
                </ThanksText>

                <ThanksText delay={800}>
                    <div className="text-markdown" dangerouslySetInnerHTML={createMarkup(thanks_block_2)} />
                </ThanksText>

                {cardsLoaded && <ThanksCards cards={cards} />}
            </div>
        </div>
    );
};
