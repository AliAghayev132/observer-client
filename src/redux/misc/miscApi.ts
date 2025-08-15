// Api
import { createApi } from "@reduxjs/toolkit/query/react";
// RTK
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// Constants
import { API_BASE_URL } from "@/constants";

export const miscApi = createApi({
  reducerPath: "miscApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
  }),
  tagTypes: ["Categories", "Leaders"],
  endpoints: (builder) => ({
    // Get all categories
    getCategories: builder.query({
      providesTags: ["Categories"],
      query: () => "/misc/categories",
    }),

    // Get all leaders
    getLeaders: builder.query({
      providesTags: ["Leaders"],
      query: () => "/misc/leaders",
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useLazyGetCategoriesQuery,
  useGetLeadersQuery,
  useLazyGetLeadersQuery,
} = miscApi;
