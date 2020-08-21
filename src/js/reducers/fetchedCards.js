import * as ActionTypes from "../constants/ActionTypes";
import { formattingDailyPlayersResponse } from "../api";
import { getRandomIntList } from "../utils";
import { fetchedCards } from "../storage/cards";
import { CARDS_SHOW_COUNT } from "../constants/defaults";


const data = fetchedCards.getOrInvalidate();
const initialState = {
    ids: data ? data.card_ids : [],
    isFetching: false,
    response: null,
    error: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.LOAD_DAILY_PLAYERS_PENDING:
            return {
                ...state,
                isFetching: true
            };
        case ActionTypes.LOAD_DAILY_PLAYERS_REJECTED: {
            const { data } = action.payload.response || {};
            return {
                ...state,
                isFetching: false,
                response: data,
                error: true
            };
        }
        case ActionTypes.LOAD_DAILY_PLAYERS_FULFILLED:
            // полное говно, но отсюда удобнее всего сохранить в стораж
            const formattedData = formattingDailyPlayersResponse(action.payload.data);

            let filtered_cards_ids;
            const count = formattedData.length;

            if (count < CARDS_SHOW_COUNT) {
                // случай захода на страницу во время заполнения таблицы
                filtered_cards_ids = [];
            } else {
                const indexes = getRandomIntList({
                    count: CARDS_SHOW_COUNT,
                    rangeMin: 0,
                    rangeMax: count - 1
                });

                const pd_ids = formattedData.map(pd => pd.id);
                const cards_ids = formattedData.map(pd => pd.card_id);
                filtered_cards_ids = cards_ids.filter((id, i) => indexes.includes(i));
                fetchedCards.set({
                    pd_ids: pd_ids.filter((id, i) => indexes.includes(i)),
                    card_ids: filtered_cards_ids,
                });
            }

            return {
                ...state,
                ids: filtered_cards_ids,
                isFetching: false,
                error: false
            };
        default:
            return state;
    }
};
