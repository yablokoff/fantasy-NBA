import { api } from './api';
import { CARDS_SHOW_COUNT } from '../../constants/defaults';

export const dailyPlayersApi = api.injectEndpoints({
    endpoints: build => ({
        dailyPlayersList: build.query({
            query: () => {
                return {
                    url: `Daily players`,
                    params: {
                        filterByFormula: '_active=1',
                        // maxRecords: 100              TODO pagination
                    },
                };
            },
            transformResponse: ({ records }) => {
                if (!records.length) return [];

                // filter unfilled data
                const formattedData = records
                    .filter(dp => Boolean(dp.fields['Player']))
                    .map(dp => {
                        const { fields } = dp;
                        return {
                            id: dp.id,
                            cardId: fields['Player'][0],
                        };
                    });

                // случай захода на страницу во время заполнения таблицы
                return formattedData.length < CARDS_SHOW_COUNT ? [] : formattedData;
            },
        }),
    }),
});

export const { useDailyPlayersListQuery } = dailyPlayersApi;
