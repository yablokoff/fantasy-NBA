import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import BoardList from '../features/game/BoardList';
import BoardEmpty from '../features/game/BoardEmpty';
import { selectBoardCardIds, selectPickedCardIds } from '../features/game/gameSlice';

import routes from '../constants/routes';

const Board = () => {
    const boardCardIds = useSelector(selectBoardCardIds);
    const hasFetched = Boolean(boardCardIds.length);

    return (
        <div className="cards-wrapper">
            <div className="container">{hasFetched ? <BoardList boardCardIds={boardCardIds} /> : <BoardEmpty />}</div>
        </div>
    );
};

export const MainPage = () => {
    const selectedCardIds = useSelector(selectPickedCardIds);
    const hasSelected = Boolean(selectedCardIds.length);

    return hasSelected ? <Navigate to={routes.thanks} replace /> : <Board />;
};
