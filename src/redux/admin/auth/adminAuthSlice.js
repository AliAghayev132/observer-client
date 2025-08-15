var _a;
// RTK
import { createSlice } from "@reduxjs/toolkit";
// Auth Api
import { adminAuthApi } from "./adminAuthApi";
;
var initialState = {
    accessToken: null,
    isAuthenticated: false,
};
var authSlice = createSlice({
    name: "auth",
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
            .addMatcher(adminAuthApi.endpoints.adminLogin.matchFulfilled, function (state, _a) {
            var payload = _a.payload;
            state.accessToken = payload.accessToken;
            state.isAuthenticated = true;
        })
            .addMatcher(adminAuthApi.endpoints.adminLogout.matchFulfilled, function (state) {
            state.accessToken = null;
            state.isAuthenticated = false;
        })
            .addMatcher(adminAuthApi.endpoints.adminRefreshToken.matchFulfilled, function (state, _a) {
            var payload = _a.payload;
            state.accessToken = payload.accessToken;
            state.isAuthenticated = true;
        });
    },
});
export var setCredentials = (_a = authSlice.actions, _a.setCredentials), clearCredentials = _a.clearCredentials;
export default authSlice.reducer;
