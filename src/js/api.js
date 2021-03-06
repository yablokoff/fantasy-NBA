import axios from "axios";
import marked from "marked";

import { removeEmpty } from "./utils";
import renderer from "./renderer";


marked.use({ renderer });

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

export const axiosAPI = axios.create({
    baseURL: baseURL,
    timeout: 5000,
    headers: {
        Authorization: `Bearer ${environment === 'development' ? 
                                'keyQcY7BJrFix6otc' : 'keyMZ0LJwZkwSeJuQ'}`, // dev is my
        "Content-Type": "application/json",
        accept: "application/json",
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


export const urls = {
    cards: 'Cards',
    daily: 'Daily players',
    sets: 'Sets',
    users: 'Users',
    content: 'Content',
};

export const formattingContentResponse = (data) => {
    const { records } = data;
    if (!records.length) return

    const { fields } = records[0];

    return removeEmpty({
        login_label: fields["login_label"],
        login_text: fields["login_text"],
        login_consent: fields["login_consent"] && marked(fields["login_consent"]),
        empty_page: fields["empty_page"] && marked(fields["empty_page"]),
        cards_page_green: fields["cards_page_green"] && marked(fields["cards_page_green"]),
        cards_page_gray: fields["cards_page_gray"] && marked(fields["cards_page_gray"]),
        thanks_label: fields["thanks_label"],
        thanks_block_1: fields["thanks_block_1"] && marked(fields["thanks_block_1"]),
        thanks_block_2: fields["thanks_block_2"] && marked(fields["thanks_block_2"])
    })
};

export const formattingDailyPlayersResponse = (data) => {
    const { records } = data;
    if (!records.length) return [];

    return records.filter(dp => Boolean(dp.fields["Player"])).map(dp => {
        const { fields } = dp;
        return {
            id: dp.id,
            card_id: fields["Player"][0]
        }
    });
};

export const formattingCardsResponse = (data) => {
    const { records } = data;
    return records.map(card => {
        const { fields } = card;
        const first_image = fields["Card"][0];
        return {
            id: card.id,
            name: fields["Name"],
            image_url: first_image.url
        }
    });
};
