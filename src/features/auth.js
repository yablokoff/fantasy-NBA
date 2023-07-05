import { createSlice } from '@reduxjs/toolkit';
import { usersApi as api } from '../app/services/users';
import { getUser, isAuthenticated as isUserAuthenticated } from '../storage/auth';

// todo add persistReducer when changing to standard auth
const initialState = {
    userId: getUser() || '',
    isAuthenticated: isUserAuthenticated(),
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addMatcher(api.endpoints.usersCreate.matchFulfilled, (state, { payload }) => {
            state.userId = payload.id;
            state.isAuthenticated = true;
        });
    },
});

export default authSlice.reducer;

export const selectUserId = state => state.auth.userId;
export const selectIsAuthenticated = state => state.auth.isAuthenticated;
