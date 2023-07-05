import { useGetContentQuery } from '../app/services/content';

const initialState = {
    login_label: "frank michael smith's",
    login_text: 'Free to enter. Winner receives $20.\n' + 'The top 5 receive shoutouts and tags!',
    login_consent:
        'By participating, you consent to receive recurring autodialed SMS/MMS promotional messages. ' +
        'No purchase required. Msg&data rates may apply. Reply HELP for help, or STOP to end.',
    empty_page: "Hey! The contests are either live or unavailable today. Look out for updates on Frank's Instagram.",
    cards_page_green: 'most total pts\nscored wins',
    cards_page_gray: 'select 3\n&\u00A0discard 2',
    thanks_label: 'thanks for entering',
    thanks_block_1: 'winner announced\n' + 'on frank`s instagram\n' + 'story after the game',
    thanks_block_2: 'must be following\n' + '@SBD_PLAY \n' + 'on instagram to win',
};

export const useContent = () => {
    return useGetContentQuery(undefined, {
        selectFromResult: ({ data }) => ({
            ...initialState,
            ...data,
        }),
    });
};
