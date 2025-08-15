var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
// redux/slices/admin/adminLeadersApi.ts
import { createApi } from "@reduxjs/toolkit/query/react";
import { adminBaseQueryWithReauth } from "../api/adminBaseQueryWithReauth";
export var adminLeadersApi = createApi({
    reducerPath: "adminLeadersApi",
    baseQuery: adminBaseQueryWithReauth,
    tagTypes: ["Leader", "Leaders", "LeadersByCategory"],
    endpoints: function (build) { return ({
        // Get leaders with pagination and filters
        getLeaders: build.query({
            query: function (params) {
                // Handle undefined params
                var queryParams = params || {};
                return {
                    url: "/admin/leaders",
                    method: "GET",
                    params: queryParams,
                };
            },
            providesTags: function (result) {
                return result
                    ? __spreadArray(__spreadArray([], result.data.map(function (_a) {
                        var _id = _a._id;
                        return ({
                            type: "Leader",
                            id: _id,
                        });
                    }), true), [
                        { type: "Leaders", id: "LIST" },
                    ], false) : [{ type: "Leaders", id: "LIST" }];
            },
            transformResponse: function (response) {
                // Add computed pagination info
                var pagination = __assign(__assign({}, response.pagination), { hasNextPage: response.pagination.currentPage < response.pagination.totalPages, hasPrevPage: response.pagination.currentPage > 1 });
                return __assign(__assign({}, response), { pagination: pagination });
            },
        }),
        // Get single leader by ID or slug
        getLeader: build.query({
            query: function (identifier) { return ({
                url: "/admin/leaders/".concat(identifier),
                method: "GET",
            }); },
            providesTags: function (result, error, identifier) { return [
                { type: "Leader", id: identifier },
                { type: "Leader", id: result === null || result === void 0 ? void 0 : result.data._id },
            ]; },
        }),
        // Get leaders by category
        getLeadersByCategory: build.query({
            query: function (_a) {
                var categoryId = _a.categoryId, _b = _a.includeDeleted, includeDeleted = _b === void 0 ? false : _b;
                return ({
                    url: "/admin/leaders/category/".concat(categoryId),
                    method: "GET",
                    params: { includeDeleted: includeDeleted },
                });
            },
            providesTags: function (result, error, _a) {
                var categoryId = _a.categoryId;
                return __spreadArray([
                    { type: "LeadersByCategory", id: categoryId }
                ], ((result === null || result === void 0 ? void 0 : result.data.map(function (_a) {
                    var _id = _a._id;
                    return ({
                        type: "Leader",
                        id: _id,
                    });
                })) || []), true);
            },
        }),
        // Create new leader
        createLeader: build.mutation({
            query: function (data) {
                var formData = new FormData();
                formData.append("firstName", data.firstName);
                formData.append("lastName", data.lastName);
                formData.append("category", data.category);
                if (data.description) {
                    formData.append("description", data.description);
                }
                if (data.image) {
                    formData.append("image", data.image);
                }
                return {
                    url: "/admin/leaders",
                    method: "POST",
                    body: formData,
                };
            },
            invalidatesTags: [{ type: "Leaders", id: "LIST" }, "LeadersByCategory"],
        }),
        // Update leader
        updateLeader: build.mutation({
            query: function (_a) {
                var id = _a.id, data = _a.data;
                var formData = new FormData();
                if (data.firstName !== undefined) {
                    formData.append("firstName", data.firstName);
                }
                if (data.lastName !== undefined) {
                    formData.append("lastName", data.lastName);
                }
                if (data.category !== undefined) {
                    formData.append("category", data.category);
                }
                if (data.description !== undefined) {
                    formData.append("description", data.description);
                }
                if (data.image) {
                    formData.append("image", data.image);
                }
                return {
                    url: "/admin/leaders/".concat(id),
                    method: "PATCH",
                    body: formData,
                };
            },
            invalidatesTags: function (result, error, _a) {
                var id = _a.id;
                return [
                    { type: "Leader", id: id },
                    { type: "Leaders", id: "LIST" },
                    "LeadersByCategory",
                ];
            },
        }),
        // Update leader image only
        updateLeaderImage: build.mutation({
            query: function (_a) {
                var id = _a.id, image = _a.image;
                var formData = new FormData();
                formData.append("image", image);
                return {
                    url: "/admin/leaders/".concat(id, "/image"),
                    method: "PATCH",
                    body: formData,
                };
            },
            invalidatesTags: function (result, error, _a) {
                var id = _a.id;
                return [
                    { type: "Leader", id: id },
                    { type: "Leaders", id: "LIST" },
                    "LeadersByCategory",
                ];
            },
        }),
        // Delete leader image
        deleteLeaderImage: build.mutation({
            query: function (id) { return ({
                url: "/admin/leaders/".concat(id, "/image"),
                method: "DELETE",
            }); },
            invalidatesTags: function (result, error, id) { return [
                { type: "Leader", id: id },
                { type: "Leaders", id: "LIST" },
                "LeadersByCategory",
            ]; },
        }),
        // Soft delete leader
        deleteLeader: build.mutation({
            query: function (id) { return ({
                url: "/admin/leaders/".concat(id),
                method: "DELETE",
            }); },
            invalidatesTags: function (result, error, id) { return [
                { type: "Leader", id: id },
                { type: "Leaders", id: "LIST" },
                "LeadersByCategory",
            ]; },
        }),
        // Restore leader
        restoreLeader: build.mutation({
            query: function (id) { return ({
                url: "/admin/leaders/".concat(id, "/restore"),
                method: "PATCH",
            }); },
            invalidatesTags: function (result, error, id) { return [
                { type: "Leader", id: id },
                { type: "Leaders", id: "LIST" },
                "LeadersByCategory",
            ]; },
        }),
        // Permanently delete leader
        permanentDeleteLeader: build.mutation({
            query: function (id) { return ({
                url: "/admin/leaders/".concat(id, "/permanent"),
                method: "DELETE",
            }); },
            invalidatesTags: function (result, error, id) { return [
                { type: "Leader", id: id },
                { type: "Leaders", id: "LIST" },
                "LeadersByCategory",
            ]; },
        }),
        // Bulk soft delete leaders
        bulkDeleteLeaders: build.mutation({
            query: function (data) { return ({
                url: "/admin/leaders/bulk/delete",
                method: "POST",
                body: data,
            }); },
            invalidatesTags: function (result, error, _a) {
                var ids = _a.ids;
                return __spreadArray([
                    { type: "Leaders", id: "LIST" },
                    "LeadersByCategory"
                ], ids.map(function (id) { return ({ type: "Leader", id: id }); }), true);
            },
        }),
        // Bulk restore leaders
        bulkRestoreLeaders: build.mutation({
            query: function (data) { return ({
                url: "/admin/leaders/bulk/restore",
                method: "POST",
                body: data,
            }); },
            invalidatesTags: function (result, error, _a) {
                var ids = _a.ids;
                return __spreadArray([
                    { type: "Leaders", id: "LIST" },
                    "LeadersByCategory"
                ], ids.map(function (id) { return ({ type: "Leader", id: id }); }), true);
            },
        }),
        // Bulk permanent delete leaders
        bulkPermanentDeleteLeaders: build.mutation({
            query: function (data) { return ({
                url: "/admin/leaders/bulk/permanent",
                method: "POST",
                body: data,
            }); },
            invalidatesTags: function (result, error, _a) {
                var ids = _a.ids;
                return __spreadArray([
                    { type: "Leaders", id: "LIST" },
                    "LeadersByCategory"
                ], ids.map(function (id) { return ({ type: "Leader", id: id }); }), true);
            },
        }),
    }); },
});
// Export hooks
export var useGetLeadersQuery = adminLeadersApi.useGetLeadersQuery, useLazyGetLeadersQuery = adminLeadersApi.useLazyGetLeadersQuery, useGetLeaderQuery = adminLeadersApi.useGetLeaderQuery, useLazyGetLeaderQuery = adminLeadersApi.useLazyGetLeaderQuery, useGetLeadersByCategoryQuery = adminLeadersApi.useGetLeadersByCategoryQuery, useLazyGetLeadersByCategoryQuery = adminLeadersApi.useLazyGetLeadersByCategoryQuery, useCreateLeaderMutation = adminLeadersApi.useCreateLeaderMutation, useUpdateLeaderMutation = adminLeadersApi.useUpdateLeaderMutation, useUpdateLeaderImageMutation = adminLeadersApi.useUpdateLeaderImageMutation, useDeleteLeaderImageMutation = adminLeadersApi.useDeleteLeaderImageMutation, useDeleteLeaderMutation = adminLeadersApi.useDeleteLeaderMutation, useRestoreLeaderMutation = adminLeadersApi.useRestoreLeaderMutation, usePermanentDeleteLeaderMutation = adminLeadersApi.usePermanentDeleteLeaderMutation, useBulkDeleteLeadersMutation = adminLeadersApi.useBulkDeleteLeadersMutation, useBulkRestoreLeadersMutation = adminLeadersApi.useBulkRestoreLeadersMutation, useBulkPermanentDeleteLeadersMutation = adminLeadersApi.useBulkPermanentDeleteLeadersMutation;
