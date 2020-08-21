import * as ActionTypes from "../constants/ActionTypes";
import { formattingCardsResponse } from "../api";


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
            return {
                ...state,
                isFetching: false,
                cards: formattingCardsResponse(action.payload.data),
                error: false
            };
        default:
            return state;
    }
};

export default cardsReducer;
