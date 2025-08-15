// RTK
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// Auth Api
import { adminAuthApi } from "./adminAuthApi";

interface AuthState {
  accessToken: string | null;
  isAuthenticated: boolean;
};

const initialState: AuthState = {
  accessToken: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
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
        adminAuthApi.endpoints.adminLogin.matchFulfilled,
        (state, { payload }) => {
          state.accessToken = payload.accessToken;
          state.isAuthenticated = true;
        }
      )
      .addMatcher(
        adminAuthApi.endpoints.adminLogout.matchFulfilled,
        (state) => {
          state.accessToken = null;
          state.isAuthenticated = false;
        }
      )
      .addMatcher(
        adminAuthApi.endpoints.adminRefreshToken.matchFulfilled,
        (state, { payload }) => {
          state.accessToken = payload.accessToken;
          state.isAuthenticated = true;
        }
      );
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;
export default authSlice.reducer;
