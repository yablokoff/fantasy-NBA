import * as ActionTypes from "../constants/ActionTypes";
import { selectedCards } from "../storage/cards";


const data = selectedCards.checkForInvalidate();
const initialState = {
    ids: data ? data.card_ids : [],
    isSending: false,
    response: null,
    error: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.SET_SELECTED_CARDS_PENDING:
            return {
                ...state,
                isSending: true
            };
        case ActionTypes.SET_SELECTED_CARDS_REJECTED: {
            const { data } = action.payload.response || {};
            console.log(data);
            return {
                ...state,
                isSending: false,
                response: data,
                error: true
            };
        }
        case ActionTypes.SET_SELECTED_CARDS_FULFILLED:
            return {
                ...state,
                isSending: false,
                ids: action.meta.ids,
                error: false
            };
        // case ActionTypes.CLEAR_SELECTED_CARDS:
        //     return { ids: [] };
        default:
            return state;
    }
};
