import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const initialState = {
    dailyPlayersIds: [],
    boardCardIds: [],
    selectedCardIds: [],
};

export const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        setupGame(state, { payload: { dailyPlayersIds, boardCardIds } }) {
            state.dailyPlayersIds = dailyPlayersIds;
            state.boardCardIds = boardCardIds;
            state.selectedCardIds = [];
        },
        resetGame(state) {
            state.dailyPlayersIds = [];
            state.boardCardIds = [];
            state.selectedCardIds = [];
        },
        setSelectedCards(state, { payload }) {
            state.selectedCardIds = payload;
        },
    },
});

export default persistReducer(
    {
        key: 'rtk:game',
        storage,
        whitelist: ['dailyPlayersIds', 'boardCardIds', 'selectedCardIds'],
    },
    gameSlice.reducer,
);

export const { setupGame, resetGame, setSelectedCards } = gameSlice.actions;

export const selectDailyPlayersIds = state => state.game.dailyPlayersIds;
export const selectBoardCardIds = state => state.game.boardCardIds;
export const selectPickedCardIds = state => state.game.selectedCardIds;
