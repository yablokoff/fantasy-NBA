import axios from "axios";


const baseURL = (() => {
    const environment = process.env.NODE_ENV;

    switch (environment) {
        case 'test':
            return '';
        default:
            return 'https://api.airtable.com/v0/appLEgyLGr8Xpum8P/';
    }
})();


export const axiosAPI = axios.create({
    baseURL: baseURL,
    timeout: 5000,
    headers: {
        Authorization: "Bearer keyQcY7BJrFix6otc",
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
    users: 'Users',
    sets: 'Sets',
};

export const formattingCardsResponse = (data) => {
    const { records } = data;
    return records.map(card => {
        const { fields } = card;
        const first_image = fields["Card"][0];
        return {
            db_id: card.id,             // for create set through API
            id: fields["Card ID"],      // for filter in fetching cards through API
            name: fields["Name"],
            image_url: first_image.url
        }
    });
};
