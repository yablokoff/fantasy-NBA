import * as ActionTypes from "../constants/ActionTypes";


const initialState = {
    show: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.SHOW_PRELOADER:
            return { show: true };

        case ActionTypes.HIDE_PRELOADER:
            return { show: false };

        default:
            return state;
    }
};
