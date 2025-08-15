// RTK
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// Variables
import { API_BASE_URL } from "@/constants";
export var adminAuthApi = createApi({
    reducerPath: "adminAuthApi",
    baseQuery: fetchBaseQuery({
        baseUrl: API_BASE_URL,
        credentials: "include", // refresh token cookie için önemli
        prepareHeaders: function (headers, _a) {
            var getState = _a.getState;
            var token = getState().adminAuth.accessToken;
            if (token) {
                headers.set("Authorization", "Bearer ".concat(token));
            }
            return headers;
        },
    }),
    endpoints: function (build) { return ({
        adminLogin: build.mutation({
            query: function (credentials) { return ({
                url: "/admin/auth/login",
                method: "POST",
                body: credentials,
            }); },
        }),
        adminLogout: build.mutation({
            query: function () { return ({
                url: "/admin/auth/logout",
                method: "POST",
            }); },
        }),
        adminRefreshToken: build.mutation({
            query: function () { return ({
                url: "/admin/auth/refresh",
                method: "POST",
            }); },
        }),
    }); },
});
export var useAdminLoginMutation = adminAuthApi.useAdminLoginMutation, useAdminLogoutMutation = adminAuthApi.useAdminLogoutMutation, useAdminRefreshTokenMutation = adminAuthApi.useAdminRefreshTokenMutation;
