// Redux
import { createSlice } from "@reduxjs/toolkit";
// RTK
import { userAccountApi } from "./userAccountApi";
var initialState = {
    user: null,
};
var accountSlice = createSlice({
    name: "account",
    initialState: initialState,
    reducers: {
        clearUser: function (state) {
            state.user = null;
        },
    },
    extraReducers: function (builder) {
        builder
            // Get user fulfilled
            .addMatcher(userAccountApi.endpoints.getUser.matchFulfilled, function (state, action) {
            if (action.payload.success && action.payload.data) {
                state.user = action.payload.data;
            }
        })
            // Edit profile fulfilled
            .addMatcher(userAccountApi.endpoints.editProfile.matchFulfilled, function (state, action) {
            if (action.payload.success && action.payload.data) {
                state.user = action.payload.data;
            }
        })
            // Update profile picture fulfilled
            .addMatcher(userAccountApi.endpoints.updateProfilePicture.matchFulfilled, function (state, action) {
            var _a;
            if (action.payload.success &&
                ((_a = action.payload.data) === null || _a === void 0 ? void 0 : _a.profilePicture) &&
                state.user) {
                state.user.profilePicture = action.payload.data.profilePicture;
            }
        })
            // Delete profile picture fulfilled
            .addMatcher(userAccountApi.endpoints.deleteProfilePicture.matchFulfilled, function (state, action) {
            if (action.payload.success && state.user) {
                state.user.profilePicture = null;
            }
        });
    },
});
export var clearUser = accountSlice.actions.clearUser;
export default accountSlice.reducer;
