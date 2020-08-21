import * as ActionTypes from "../constants/ActionTypes";
import { formattingDailyPlayersResponse } from "../api";
import { fetchedCards } from "../storage/cards";


const data = fetchedCards.getOrInvalidate();
const initialState = {
    ids: data ? data.card_ids : [],
    isFetching: false,
    response: null,
    error: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.LOAD_DAILY_PLAYERS_PENDING:
            return {
                ...state,
                isFetching: true
            };
        case ActionTypes.LOAD_DAILY_PLAYERS_REJECTED: {
            const { data } = action.payload.response || {};
            return {
                ...state,
                isFetching: false,
                response: data,
                error: true
            };
        }
        case ActionTypes.LOAD_DAILY_PLAYERS_FULFILLED:
            return {
                ...state,
                ids: formattingDailyPlayersResponse(action.payload.data),
                isFetching: false,
                error: false
            };
        default:
            return state;
    }
};
