var _a;
// RTK
import { createSlice } from "@reduxjs/toolkit";
// Auth Api
import { userAuthApi } from "./userAuthApi";
var initialState = {
    accessToken: null,
    isAuthenticated: false,
};
var userAuthSlice = createSlice({
    name: "userAuth",
    initialState: initialState,
    reducers: {
        setCredentials: function (state, action) {
            state.accessToken = action.payload.accessToken;
            state.isAuthenticated = true;
        },
        clearCredentials: function (state) {
            state.accessToken = null;
            state.isAuthenticated = false;
        },
    },
    extraReducers: function (builder) {
        builder
            .addMatcher(userAuthApi.endpoints.userLogin.matchFulfilled, function (state, _a) {
            var payload = _a.payload;
            state.accessToken = payload.accessToken;
            state.isAuthenticated = true;
        })
            .addMatcher(userAuthApi.endpoints.userLogout.matchFulfilled, function (state) {
            state.accessToken = null;
            state.isAuthenticated = false;
        })
            .addMatcher(userAuthApi.endpoints.userRefreshToken.matchFulfilled, function (state, _a) {
            var payload = _a.payload;
            state.accessToken = payload.accessToken;
            state.isAuthenticated = true;
        });
    },
});
export var setCredentials = (_a = userAuthSlice.actions, _a.setCredentials), clearCredentials = _a.clearCredentials;
export default userAuthSlice.reducer;
