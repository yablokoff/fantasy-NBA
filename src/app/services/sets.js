import { api } from './api';
import { getUser } from '../../storage/auth';

export const setsApi = api.injectEndpoints({
    endpoints: build => ({
        setsCreate: build.mutation({
            query: ({ players }) => ({
                url: `Sets`,
                method: 'POST',
                body: {
                    fields: {
                        User: [getUser()], // API requires array
                        Players_m2m: players,
                    },
                },
            }),
            // async onQueryStarted({ fields }, { dispatch, queryFulfilled }) {
            //     try {
            //         const { data } = await queryFulfilled;
            //         dispatch(api.util.updateQueryData('usersRetrieve', { id: data.id }, draft => data));
            //     } catch {}
            // },
        }),
    }),
});

export const { useSetsCreateMutation } = setsApi;
