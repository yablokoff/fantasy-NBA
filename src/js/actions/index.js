import * as ActionTypes from "../constants/ActionTypes";
import { CARDS_SHOW_COUNT } from "../constants/defaults";
import { fetchedCards } from "../storage/cards";

import { axiosAPI, urls } from "../api";
import { getUser } from "../storage/auth";


// preloader
export const showPreloader = () => {
    return {
        type: ActionTypes.SHOW_PRELOADER
    }
};

export const hidePreloader = () => {
    return {
        type: ActionTypes.HIDE_PRELOADER
    }
};

// user
export const loginUser = (Email, Instagram, Phone) => dispatch => {
    const user = getUser();

    if (user) {
        return Promise.resolve(user)
    }

    return dispatch({
        type: ActionTypes.LOGIN,
        payload: axiosAPI.post(urls.users, {fields: { Email, Instagram, Phone }})
    });
};


// cards
export const loadCards = (ids) => (dispatch, getState) => {
    const state = getState();
    if (state.cards.isFetching) {
        return Promise.reject(null)
    }

    ids = ids || fetchedCards.getIds();

    // OR({Card ID}=1,{Card ID}=2,{Card ID}=3,{Card ID}=4,{Card ID}=5)
    const operands = ids.map(value => `{Card ID}=${value}`);
    const filter = `OR(${operands.join(',')})`;

    return dispatch({
        type: ActionTypes.LOAD_CARDS,
        payload: axiosAPI.get(urls.cards, {
            params: {
                filterByFormula: filter,
                maxRecords: CARDS_SHOW_COUNT
            }
        })
    });
};

export const setCards = (selected_ids) => (dispatch, getState) => {
    const state = getState();
    if (state.selectedCards.isSending) {
        return Promise.reject(null)
    }

    const user = getUser();
    if (!user) {
        return Promise.reject(null);
    }

    const { cards } = state.cards;
    if (!cards.length) {
        return Promise.reject(null);
    }

    const filtered_cards = cards.filter(card => selected_ids.includes(card.id));

    return dispatch({
        type: ActionTypes.SET_SELECTED_CARDS,
        payload: axiosAPI.post(urls.sets, {
            fields: {
                'User': [user], // API require array
                'Cards': filtered_cards.map(card => card.db_id)
            }
        }),
        meta: {
            ids: selected_ids
        }
    });
};
