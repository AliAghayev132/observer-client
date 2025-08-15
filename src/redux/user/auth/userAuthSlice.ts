// RTK
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// Auth Api
import { userAuthApi } from "./userAuthApi";

interface UserAuthState {
  accessToken: string | null;
  isAuthenticated: boolean;
}

const initialState: UserAuthState = {
  accessToken: null,
  isAuthenticated: false,
};

const userAuthSlice = createSlice({
  name: "userAuth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ accessToken: string }>) => {
      state.accessToken = action.payload.accessToken;
      state.isAuthenticated = true;
    },
    clearCredentials: (state) => {
      state.accessToken = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        userAuthApi.endpoints.userLogin.matchFulfilled,
        (state, { payload }) => {
          state.accessToken = payload.accessToken;
          state.isAuthenticated = true;
        }
      )
      .addMatcher(userAuthApi.endpoints.userLogout.matchFulfilled, (state) => {
        state.accessToken = null;
        state.isAuthenticated = false;
      })
      .addMatcher(
        userAuthApi.endpoints.userRefreshToken.matchFulfilled,
        (state, { payload }) => {
          state.accessToken = payload.accessToken;
          state.isAuthenticated = true;
        }
      );
  },
});

export const { setCredentials, clearCredentials } = userAuthSlice.actions;
export default userAuthSlice.reducer;
