var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
// RTK
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// Variables
import { API_BASE_URL } from "@/constants";
export var userAuthApi = createApi({
    reducerPath: "userAuthApi",
    baseQuery: fetchBaseQuery({
        baseUrl: API_BASE_URL,
        credentials: "include", // refresh token cookie için önemli
        prepareHeaders: function (headers, _a) {
            var getState = _a.getState;
            var token = getState().userAuth.accessToken;
            if (token) {
                headers.set("Authorization", "Bearer ".concat(token));
            }
            return headers;
        },
    }),
    endpoints: function (build) { return ({
        userLogin: build.mutation({
            query: function (credentials) { return ({
                url: "/user/auth/login",
                method: "POST",
                body: credentials,
            }); },
        }),
        userLogout: build.mutation({
            query: function () { return ({
                url: "/user/auth/logout",
                method: "POST",
            }); },
        }),
        userRefreshToken: build.mutation({
            query: function () { return ({
                url: "/user/auth/refresh",
                method: "POST",
            }); },
        }),
        userRegisterStepOne: build.mutation({
            query: function (data) { return ({
                url: "/user/auth/register/step-1",
                method: "POST",
                body: data,
            }); },
        }),
        userRegisterStepTwo: build.mutation({
            query: function (data) { return ({
                url: "/user/auth/register/step-2",
                method: "POST",
                body: data,
            }); },
        }),
        userRegisterStepThree: build.mutation({
            query: function (_a) {
                var token = _a.token, data = __rest(_a, ["token"]);
                return ({
                    url: "/user/auth/register/step-3",
                    method: "POST",
                    body: data,
                    headers: {
                        Authorization: "Bearer ".concat(token),
                    },
                });
            },
        }),
        userForgotPasswordStepOne: build.mutation({
            query: function (data) { return ({
                url: "/user/auth/forgot-password/step-1",
                method: "POST",
                body: data,
            }); },
        }),
        userForgotPasswordStepTwo: build.mutation({
            query: function (data) { return ({
                url: "/user/auth/forgot-password/step-2",
                method: "POST",
                body: data,
            }); },
        }),
        userForgotPasswordStepThree: build.mutation({
            query: function (_a) {
                var token = _a.token, data = __rest(_a, ["token"]);
                return ({
                    url: "/user/auth/forgot-password/step-3",
                    method: "POST",
                    body: data,
                    headers: {
                        Authorization: "Bearer ".concat(token),
                    },
                });
            },
        }),
    }); },
});
export var useUserLoginMutation = userAuthApi.useUserLoginMutation, useUserLogoutMutation = userAuthApi.useUserLogoutMutation, useUserRefreshTokenMutation = userAuthApi.useUserRefreshTokenMutation, useUserRegisterStepOneMutation = userAuthApi.useUserRegisterStepOneMutation, useUserRegisterStepTwoMutation = userAuthApi.useUserRegisterStepTwoMutation, useUserRegisterStepThreeMutation = userAuthApi.useUserRegisterStepThreeMutation, useUserForgotPasswordStepOneMutation = userAuthApi.useUserForgotPasswordStepOneMutation, useUserForgotPasswordStepTwoMutation = userAuthApi.useUserForgotPasswordStepTwoMutation, useUserForgotPasswordStepThreeMutation = userAuthApi.useUserForgotPasswordStepThreeMutation;
