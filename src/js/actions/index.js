import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import * as ActionTypes from "../constants/ActionTypes";
import { CARDS_SHOW_COUNT, QUERY_DATE_FORMAT } from "../constants/defaults";
import { fetchedCards } from "../storage/cards";

import { axiosAPI, urls } from "../api";
import { getUser, logout } from "../storage/auth";


dayjs.extend(utc);


// preloader
export const showPreloader = () => (dispatch, getState) => {
    const { show } = getState().preloader;

    if (show) {
        return null
    }

    return dispatch({
        type: ActionTypes.SHOW_PRELOADER
    })
};

export const hidePreloader = () => (dispatch, getState) => {
    const { show } = getState().preloader;

    if (!show) {
        return null
    }

    return dispatch({
        type: ActionTypes.HIDE_PRELOADER
    })
};

// user
export const loadUser = (userId) => (dispatch, getState) => {
    const state = getState();
    const user = state.user.response;

    if (user) {
        return Promise.resolve(user)
    }

    return dispatch({
        type: ActionTypes.LOAD_USER,
        payload: axiosAPI.get(`${urls.users}/${userId}`)
    });
};

export const loginUser = (Email, Instagram, Phone) => dispatch => {
    const user = getUser();

    if (user) {
        return Promise.resolve(user)
    }

    return dispatch({
        type: ActionTypes.LOGIN,
        payload: axiosAPI.post(urls.users, {
            fields: { Email, Instagram, Phone }
        })
    });
};

export const logoutUser = () => dispatch => {
    logout();

    return dispatch({
        type: ActionTypes.LOGOUT
    });
};


// content
export const loadContent = () => (dispatch, getState) => {
    const state = getState();
    if (state.content.isFetching) {
        return Promise.reject(null)
    }

    return dispatch({
        type: ActionTypes.LOAD_CONTENT,
        payload: axiosAPI.get(urls.content, {
            maxRecords: 1
        })
    });
};

// daily players
export const loadDailyPlayers = () => (dispatch, getState) => {
    const state = getState();
    if (state.fetchedCardsIDs.isFetching) {
        return Promise.reject(null)
    }

    const filter = `Date=TODAY()`;
    // const test = dayjs.utc('2020-10-04');
    // const filter = `Date="${test.format(QUERY_DATE_FORMAT)}"`;

    return dispatch({
        type: ActionTypes.LOAD_DAILY_PLAYERS,
        payload: axiosAPI.get(urls.daily, {
            params: {
                filterByFormula: filter,
                // maxRecords: 100              TODO pagination
            }
        })
    });
};

// cards
export const loadCards = (ids) => (dispatch, getState) => {
    const state = getState();
    if (state.cards.isFetching || !ids) {
        return Promise.reject(null)
    }

    const operands = ids.map(value => `RECORD_ID()='${value}'`);
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

// user set
export const setCards = (selected_ids, bitmap) => (dispatch, getState) => {
    const state = getState();
    if (state.selectedCardsIDs.isSending) {
        return Promise.reject(null)
    }

    const user = getUser();
    if (!user) {
        return Promise.reject(null);
    }

    const fetchedData = fetchedCards.get();
    if (!fetchedData) {
        return Promise.reject(null);
    }

    return dispatch({
        type: ActionTypes.SET_SELECTED_CARDS,
        payload: axiosAPI.post(urls.sets, {
            fields: {
                'User': [user], // API require array
                'Players_m2m': fetchedData.pd_ids.filter((id, i) => bitmap[i])
            }
        }),
        meta: {
            ids: selected_ids
        }
    });
};
