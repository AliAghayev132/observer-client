// RTK
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// Variables
import { API_BASE_URL } from "@/constants";
// Custom
import type { RootState } from "../../store";

export const userAuthApi = createApi({
  reducerPath: "userAuthApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    credentials: "include", // refresh token cookie için önemli
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).userAuth.accessToken;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (build) => ({
    userLogin: build.mutation<
      {
        accessToken: string;
      },
      { email: string; password: string }
    >({
      query: (credentials) => ({
        url: "/user/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    userLogout: build.mutation<void, void>({
      query: () => ({
        url: "/user/auth/logout",
        method: "POST",
      }),
    }),
    userRefreshToken: build.mutation<{ accessToken: string }, void>({
      query: () => ({
        url: "/user/auth/refresh",
        method: "POST",
      }),
    }),
    userRegisterStepOne: build.mutation<void, { email: string }>({
      query: (data) => ({
        url: "/user/auth/register/step-1",
        method: "POST",
        body: data,
      }),
    }),
    userRegisterStepTwo: build.mutation<
      { token: string },
      { email: string; otp: string }
    >({
      query: (data) => ({
        url: "/user/auth/register/step-2",
        method: "POST",
        body: data,
      }),
    }),
    userRegisterStepThree: build.mutation<
      void,
      {
        firstName: string;
        secondName: string;
        gender: "male" | "female";
        birthDate: string;
        password: string;
        token: string; // Register token from step 2
      }
    >({
      query: ({ token, ...data }) => ({
        url: "/user/auth/register/step-3",
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    userForgotPasswordStepOne: build.mutation<void, { email: string }>({
      query: (data) => ({
        url: "/user/auth/forgot-password/step-1",
        method: "POST",
        body: data,
      }),
    }),
    userForgotPasswordStepTwo: build.mutation<
      { token: string },
      { email: string; otp: string }
    >({
      query: (data) => ({
        url: "/user/auth/forgot-password/step-2",
        method: "POST",
        body: data,
      }),
    }),
    userForgotPasswordStepThree: build.mutation<
      void,
      { password: string; token: string }
    >({
      query: ({ token, ...data }) => ({
        url: "/user/auth/forgot-password/step-3",
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const {
  useUserLoginMutation,
  useUserLogoutMutation,
  useUserRefreshTokenMutation,
  useUserRegisterStepOneMutation,
  useUserRegisterStepTwoMutation,
  useUserRegisterStepThreeMutation,
  useUserForgotPasswordStepOneMutation,
  useUserForgotPasswordStepTwoMutation,
  useUserForgotPasswordStepThreeMutation,
} = userAuthApi;
