import { api } from './api';

export const usersApi = api.injectEndpoints({
    endpoints: build => ({
        usersRetrieve: build.query({
            query: queryArg => {
                return {
                    url: `Users/${queryArg.id}`,
                };
            },
        }),
        usersCreate: build.mutation({
            query: ({ fields }) => ({
                url: `Users`,
                method: 'POST',
                body: { fields },
            }),
            async onQueryStarted({ fields }, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(api.util.updateQueryData('usersRetrieve', { id: data.id }, draft => data));
                } catch {}
            },
        }),
    }),
});

export const { useUsersRetrieveQuery, useUsersCreateMutation } = usersApi;
