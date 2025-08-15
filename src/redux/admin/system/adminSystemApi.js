// redux/slices/admin/adminSystemApi.ts
import { createApi } from "@reduxjs/toolkit/query/react";
import { adminBaseQueryWithReauth } from "../api/adminBaseQueryWithReauth";
export var adminSystemApi = createApi({
    reducerPath: "adminSystemApi",
    baseQuery: adminBaseQueryWithReauth, // Uses automatic token refresh
    tagTypes: ["SystemInfo"],
    endpoints: function (build) { return ({
        // Get system information - matches your backend route
        getSystemInfo: build.query({
            query: function () { return ({
                url: "/admin/system-info",
                method: "GET",
            }); },
        }),
    }); },
});
// Export hooks
export var useGetSystemInfoQuery = adminSystemApi.useGetSystemInfoQuery;
