import * as ActionTypes from "../constants/ActionTypes";


const initialState = {
    isFetching: false,
    response: null,
    error: false
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.LOGIN_PENDING:
            return {
                ...state,
                isFetching: true
            };
        case ActionTypes.LOGIN_REJECTED: {
            const {data} = action.payload.response || {};
            return {
                ...state,
                isFetching: false,
                response: data,
                error: true
            };
        }
        case ActionTypes.LOGIN_FULFILLED:
            return {
                ...state,
                isFetching: false,
                response: action.payload.data,
                error: false
            };
        default:
            return state;
    }
};

export default userReducer;
