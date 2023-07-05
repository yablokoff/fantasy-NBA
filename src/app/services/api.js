import axios from 'axios';
import { use } from 'marked';
import { createApi } from '@reduxjs/toolkit/query/react';
import { REHYDRATE } from 'redux-persist';
import { renderer } from '../../utils';
import { selectBoardCardIds, selectDailyPlayersIds } from '../../features/game/gameSlice';

use({ renderer });

const environment = process.env.NODE_ENV;

const baseURL = (() => {
    switch (environment) {
        case 'test':
            return '';
        case 'development':
            return 'https://api.airtable.com/v0/app9n7ewo4p9CrxlC/'; // my
        default:
            return 'https://api.airtable.com/v0/appLEgyLGr8Xpum8P/';
    }
})();

export const axiosInstance = axios.create({
    baseURL: baseURL,
    timeout: 5000,
    headers: {
        Authorization: `Bearer ${environment === 'development' ? 'keyQcY7BJrFix6otc' : 'keyMZ0LJwZkwSeJuQ'}`, // dev is my
        'Content-Type': 'application/json',
        accept: 'application/json',
    },
});

// 429 status code need retry
// axiosAPI.interceptors.response.use(null, error => {
//     const status = error.status || error.response.status;
//     if (status === 401 || status === 403) {
//         store.dispatch(logoutUser());
//     }
//     return Promise.reject(error);
// });

const baseQuery = async ({ body, ...args }, { signal, getState, endpoint }) => {
    const localDailyPlayersIds = selectDailyPlayersIds(getState());
    const boardCardIds = selectBoardCardIds(getState());

    // const token = getState().auth.token;
    //
    // if (token) {
    //     axiosInstance.defaults.headers['Authorization'] = `Token ${token}`;
    // }

    try {
        const result = await axiosInstance({ data: body, signal, ...args });
        return { data: result.data, meta: { boardCardIds, localDailyPlayersIds } };
    } catch (axiosError) {
        const err = axiosError;
        return {
            error: {
                status: err.response?.status,
                data: err.response?.data || err.message,
            },
        };
    }
};

export const api = createApi({
    baseQuery,
    endpoints: () => ({}),
    // extractRehydrationInfo(action, { reducerPath }) {
    //     if (action.type === REHYDRATE) {
    //         return action.payload[reducerPath];
    //     }
    // },
});
