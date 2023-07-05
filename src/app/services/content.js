import { parse } from 'marked';
import { removeEmpty } from '../../utils';
import { api } from './api';

export const contentApi = api.injectEndpoints({
    endpoints: build => ({
        getContent: build.query({
            query: () => {
                return {
                    url: `Content`,
                    params: {
                        maxRecords: 1,
                    },
                };
            },
            transformResponse: ({ records }) => {
                if (!records.length) return;

                const { fields } = records[0];

                return removeEmpty({
                    login_label: fields['login_label'],
                    login_text: fields['login_text'],
                    login_consent: fields['login_consent'] && parse(fields['login_consent']),
                    empty_page: fields['empty_page'] && parse(fields['empty_page']),
                    cards_page_green: fields['cards_page_green'] && parse(fields['cards_page_green']),
                    cards_page_gray: fields['cards_page_gray'] && parse(fields['cards_page_gray']),
                    thanks_label: fields['thanks_label'],
                    thanks_block_1: fields['thanks_block_1'] && parse(fields['thanks_block_1']),
                    thanks_block_2: fields['thanks_block_2'] && parse(fields['thanks_block_2']),
                });
            },
        }),
    }),
});

export const { useGetContentQuery } = contentApi;
