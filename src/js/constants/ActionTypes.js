import {ActionType} from 'redux-promise-middleware';


// preloader
export const SHOW_PRELOADER = 'SHOW_PRELOADER';
export const HIDE_PRELOADER = 'HIDE_PRELOADER';

// user
export const LOAD_USER = 'LOAD_USER';
export const LOAD_USER_PENDING = `LOAD_USER_${ActionType.Pending}`;
export const LOAD_USER_FULFILLED = `LOAD_USER_${ActionType.Fulfilled}`;
export const LOAD_USER_REJECTED = `LOAD_USER_${ActionType.Rejected}`;

export const LOGIN = 'LOGIN';
export const LOGIN_PENDING = `LOGIN_${ActionType.Pending}`;
export const LOGIN_FULFILLED = `LOGIN_${ActionType.Fulfilled}`;
export const LOGIN_REJECTED = `LOGIN_${ActionType.Rejected}`;

export const LOGOUT = 'LOGOUT';

// content
export const LOAD_CONTENT = 'LOAD_CONTENT';
export const LOAD_CONTENT_PENDING = `LOAD_CONTENT_${ActionType.Pending}`;
export const LOAD_CONTENT_FULFILLED = `LOAD_CONTENT_${ActionType.Fulfilled}`;
export const LOAD_CONTENT_REJECTED = `LOAD_CONTENT_${ActionType.Rejected}`;

// daily players
export const LOAD_DAILY_PLAYERS = 'LOAD_DAILY_PLAYERS';
export const LOAD_DAILY_PLAYERS_PENDING = `LOAD_DAILY_PLAYERS_${ActionType.Pending}`;
export const LOAD_DAILY_PLAYERS_FULFILLED = `LOAD_DAILY_PLAYERS_${ActionType.Fulfilled}`;
export const LOAD_DAILY_PLAYERS_REJECTED = `LOAD_DAILY_PLAYERS_${ActionType.Rejected}`;

// cards
export const LOAD_CARDS = 'LOAD_CARDS';
export const LOAD_CARDS_PENDING = `LOAD_CARDS_${ActionType.Pending}`;
export const LOAD_CARDS_FULFILLED = `LOAD_CARDS_${ActionType.Fulfilled}`;
export const LOAD_CARDS_REJECTED = `LOAD_CARDS_${ActionType.Rejected}`;

// set
export const SET_SELECTED_CARDS = 'SET_SELECTED_CARDS';
export const SET_SELECTED_CARDS_PENDING = `SET_SELECTED_CARDS_${ActionType.Pending}`;
export const SET_SELECTED_CARDS_FULFILLED = `SET_SELECTED_CARDS_${ActionType.Fulfilled}`;
export const SET_SELECTED_CARDS_REJECTED = `SET_SELECTED_CARDS_${ActionType.Rejected}`;

export const CLEAR_SELECTED_CARDS = 'CLEAR_SELECTED_CARDS';
