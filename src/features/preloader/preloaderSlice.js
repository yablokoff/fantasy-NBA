import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { contentApi } from '../../app/services/content';
import { dailyPlayersApi } from '../../app/services/daily';
import { cardsApi } from '../../app/services/cards';
import { setsApi } from '../../app/services/sets';
import { usersApi } from '../../app/services/users';
import listenerMiddleware from '../../app/listenerMiddleware';

const initialState = {
    show: false,
    activeLoaders: 0,
};

// todo check api start/end
const preloaderSlice = createSlice({
    name: 'preloader',
    initialState,
    reducers: {
        show(state) {
            state.show = true;
        },
        hide(state) {
            state.show = false;
        },
        decrementActiveLoaders(state) {
            state.activeLoaders -= 1;
        },
    },
    extraReducers: builder => {
        builder.addMatcher(
            isAnyOf(
                contentApi.endpoints.getContent.matchPending,
                dailyPlayersApi.endpoints.dailyPlayersList.matchPending,
                cardsApi.endpoints.cardsList.matchPending,
                setsApi.endpoints.setsCreate.matchPending,
                usersApi.endpoints.usersRetrieve.matchPending,
            ),
            (state, { payload }) => {
                state.activeLoaders += 1;
            },
        );
    },
});

export const { show: showPreloader, hide: hidePreloader, decrementActiveLoaders } = preloaderSlice.actions;

export default preloaderSlice.reducer;

export const selectIsPreloaderRunning = state => state.preloader.show || Boolean(state.preloader.activeLoaders);

// to avoid jerky animation on parallel requests
listenerMiddleware.startListening({
    matcher: isAnyOf(
        contentApi.endpoints.getContent.matchFulfilled,
        dailyPlayersApi.endpoints.dailyPlayersList.matchFulfilled,
        cardsApi.endpoints.cardsList.matchFulfilled,
        setsApi.endpoints.setsCreate.matchFulfilled,
        usersApi.endpoints.usersRetrieve.matchFulfilled,
    ),
    effect: async (action, { dispatch, delay }) => {
        await delay(250);
        dispatch(decrementActiveLoaders());
    },
});
