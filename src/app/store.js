import { configureStore } from '@reduxjs/toolkit';
import { persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import { api } from './services/api';
import preloader from '../features/preloader/preloaderSlice';
import auth from '../features/auth';
import game from '../features/game/gameSlice';
import listenerMiddleware from './listenerMiddleware';
import '../features/game/listener';

export const createStore = options =>
    configureStore({
        reducer: {
            [api.reducerPath]: api.reducer,
            preloader,
            auth,
            game,
        },
        middleware: getDefaultMiddleware =>
            getDefaultMiddleware({
                serializableCheck: {
                    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
                },
            })
                .prepend(listenerMiddleware.middleware)
                .concat(api.middleware),
        ...options,
    });

export const store = createStore();
export const persistor = persistStore(store);
