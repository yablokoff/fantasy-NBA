import * as ActionTypes from "../constants/ActionTypes";
import { formattingCardsResponse } from "../api";
import { fetchedCards } from "../storage/cards";


const initialState = {
    cards: [],
    isFetching: false,
    response: null,
    error: false
};

const cardsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.LOAD_CARDS_PENDING:
            return {
                ...state,
                isFetching: true
            };
        case ActionTypes.LOAD_CARDS_REJECTED: {
            const { data } = action.payload.response || {};
            return {
                ...state,
                isFetching: false,
                response: data,
                error: true
            };
        }
        case ActionTypes.LOAD_CARDS_FULFILLED:
            const result = formattingCardsResponse(action.payload.data);

            // sort according to daily players fetch
            const data = fetchedCards.get();
            if (data) {
                const ids = data.card_ids;
                result.sort((a, b) => ids.indexOf(a.id) > ids.indexOf(b.id));
            }

            return {
                ...state,
                isFetching: false,
                cards: result,
                error: false
            };
        default:
            return state;
    }
};

export default cardsReducer;
