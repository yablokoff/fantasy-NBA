import { api } from './api';
import { showPreloader, hidePreloader } from '../../features/preloader/preloaderSlice';
import { loadImages } from '../../utils';
import { CARDS_SHOW_COUNT } from '../../constants/defaults';

export const cardsApi = api.injectEndpoints({
    endpoints: build => ({
        cardsList: build.query({
            query: ({ ids }) => {
                const operands = ids.map(value => `RECORD_ID()='${value}'`);
                const filter = `OR(${operands.join(',')})`;

                return {
                    url: `Cards`,
                    params: {
                        filterByFormula: filter,
                        maxRecords: CARDS_SHOW_COUNT,
                    },
                };
            },
            transformResponse: ({ records }, { boardCardIds }) => {
                if (!records.length) return [];

                const result = records.map(card => {
                    const { fields } = card;
                    const first_image = fields['Card'][0];
                    return {
                        id: card.id,
                        name: fields['Name'],
                        image_url: first_image.url,
                    };
                });

                // always sort by daily player shuffling
                if (boardCardIds.length) {
                    result.sort((a, b) => {
                        if (boardCardIds.indexOf(a.id) > boardCardIds.indexOf(b.id)) return 1;
                        if (boardCardIds.indexOf(a.id) < boardCardIds.indexOf(b.id)) return -1;
                    });
                }

                return result;
            },
            async onQueryStarted({ ids }, { dispatch, queryFulfilled }) {
                try {
                    dispatch(showPreloader());
                    const { data } = await queryFulfilled;
                    await loadImages(data.map(card => card.image_url));
                    dispatch(hidePreloader());
                } catch {}
            },
        }),
    }),
});

export const { useCardsListQuery } = cardsApi;
