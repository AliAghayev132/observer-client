// RTK
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// Variables
import { API_BASE_URL } from "@/constants";
// Custom
import type { RootState } from "../../store";

export const adminAuthApi = createApi({
  reducerPath: "adminAuthApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    credentials: "include", // refresh token cookie için önemli
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).adminAuth.accessToken;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (build) => ({
    adminLogin: build.mutation<
      {
        accessToken: string;
      },
      { username: string; password: string }
    >({
      query: (credentials) => ({
        url: "/admin/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    adminLogout: build.mutation<void, void>({
      query: () => ({
        url: "/admin/auth/logout",
        method: "POST",
      }),
    }),
    adminRefreshToken: build.mutation<{ accessToken: string }, void>({
      query: () => ({
        url: "/admin/auth/refresh",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useAdminLoginMutation,
  useAdminLogoutMutation,
  useAdminRefreshTokenMutation,
} = adminAuthApi;
