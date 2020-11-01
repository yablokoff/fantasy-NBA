import * as ActionTypes from "../constants/ActionTypes";


const initialState = {
    isFetching: false,
    response: null,
    error: false
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        // load user
        case ActionTypes.LOAD_USER_PENDING:
            return {
                ...state,
                isFetching: true
            };
        case ActionTypes.LOAD_USER_REJECTED: {
            const { data } = action.payload.response || {};
            return {
                ...state,
                isFetching: false,
                response: null,
                // response: data, // TODO if need errors rendering
                error: true
            };
        }
        case ActionTypes.LOAD_USER_FULFILLED:
            return {
                ...state,
                isFetching: false,
                response: action.payload.data,
                error: false
            };

        // create user
        case ActionTypes.LOGIN_PENDING:
            return {
                ...state,
                isFetching: true
            };
        case ActionTypes.LOGIN_REJECTED: {
            const { data } = action.payload.response || {};
            return {
                ...state,
                isFetching: false,
                response: null,
                // response: data, // TODO if need errors rendering
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

        // logout
        case ActionTypes.LOGOUT:
            return {
                isFetching: false,
                response: null,
                error: false
            };
        default:
            return state;
    }
};

export default userReducer;
