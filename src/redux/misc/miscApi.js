// Api
import { createApi } from "@reduxjs/toolkit/query/react";
// RTK
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// Constants
import { API_BASE_URL } from "@/constants";
export var miscApi = createApi({
    reducerPath: "miscApi",
    baseQuery: fetchBaseQuery({
        baseUrl: API_BASE_URL,
    }),
    tagTypes: ["Categories", "Leaders"],
    endpoints: function (builder) { return ({
        // Get all categories
        getCategories: builder.query({
            providesTags: ["Categories"],
            query: function () { return "/misc/categories"; },
        }),
        // Get all leaders
        getLeaders: builder.query({
            providesTags: ["Leaders"],
            query: function () { return "/misc/leaders"; },
        }),
    }); },
});
export var useGetCategoriesQuery = miscApi.useGetCategoriesQuery, useLazyGetCategoriesQuery = miscApi.useLazyGetCategoriesQuery, useGetLeadersQuery = miscApi.useGetLeadersQuery, useLazyGetLeadersQuery = miscApi.useLazyGetLeadersQuery;
