// redux/api/baseQueryWithReauth.ts
import {
  FetchArgs,
  BaseQueryApi,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
// Apis
import { API_BASE_URL } from "@/constants";
// Redux
import type { RootState } from "@/redux/store";

import {
  setCredentials,
  clearCredentials,
} from "@/redux/user/auth/userAuthSlice";

// Define the refresh token response type
interface RefreshTokenResponse {
  accessToken: string;
  success: boolean;
}

const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  credentials: "include", // Important for cookies
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).userAuth.accessToken;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const userBaseQueryWithReauth = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: Record<string, unknown>
) => {
  // First attempt with current token
  let result = await baseQuery(args, api, extraOptions);

  // If we get 401, try to refresh the token
  if (result.error && (result.error as FetchBaseQueryError).status === 401) {
    console.log("Access token expired, attempting to refresh...");

    // Try to refresh the token
    const refreshResult = await baseQuery(
      {
        url: "/user/auth/refresh",
        method: "POST",
      },
      api,
      extraOptions
    );

    if (refreshResult.data) {
      console.log("Token refreshed successfully");

      // Store the new token with proper typing
      const refreshData = refreshResult.data as RefreshTokenResponse;
      api.dispatch(setCredentials({ accessToken: refreshData.accessToken }));

      // Retry the original request with new token
      result = await baseQuery(args, api, extraOptions);
    } else {
      console.log("Refresh token failed, logging out...");

      // Refresh failed, clear credentials and redirect to login
      api.dispatch(clearCredentials());
    }
  }

  return result;
};
