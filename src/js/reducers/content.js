import * as ActionTypes from "../constants/ActionTypes";
import { formattingContentResponse } from "../api";


const initialState = {
    login_label: 'frank michael smith\'s',
    login_text: 'Free to enter. Winner receives $20.\n' +
        'The top 5 receive shoutouts and tags!',
    empty_page: 'Hey! The contests are either live or unavailable today. Look out for updates on Frank\'s Instagram.',
    cards_page_green: 'most total pts\nscored wins',
    cards_page_gray: 'select 3\n&\u00A0discard 2',
    thanks_label: 'thanks for entering',
    thanks_block_1: 'winner announced\n' +
        'on frank`s instagram\n' +
        'story after the game',
    thanks_block_2: 'must be following\n' +
        '@SBD_PLAY \n' +
        'on instagram to win',
    isFetching: false,
    response: null,
    error: false
};

const contentReducer = (state=initialState, action) => {
    switch (action.type) {
        case ActionTypes.LOAD_CONTENT_PENDING:
            return {
                ...state,
                isFetching: true
            };
        case ActionTypes.LOAD_CONTENT_REJECTED: {
            const { data } = action.payload.response || {};
            return {
                ...state,
                isFetching: false,
                response: data,
                error: true
            };
        }
        case ActionTypes.LOAD_CONTENT_FULFILLED: {
            const data = action.payload.data;
            const result = formattingContentResponse(data);
            return {
                ...result,
                response: data,
                isFetching: false,
                error: false
            };
        }
        default:
            return state;
    }
};

export default contentReducer;
