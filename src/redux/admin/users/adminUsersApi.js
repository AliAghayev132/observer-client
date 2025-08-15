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
// redux/slices/admin/adminUsersApi.ts
import { createApi } from "@reduxjs/toolkit/query/react";
import { adminBaseQueryWithReauth } from "../api/adminBaseQueryWithReauth";
// Helper function to flatten user data
export var flattenUser = function (user) { return (__assign(__assign({}, user), { isBlocked: user.block.isBlocked, blockedAt: user.block.blockedAt, blockReason: user.block.reason, isDeleted: user.delete.isDeleted, deletedAt: user.delete.deletedAt, deleteReason: user.delete.reason })); };
export var adminUsersApi = createApi({
    reducerPath: "adminUsersApi",
    baseQuery: adminBaseQueryWithReauth,
    tagTypes: ["User", "Users"],
    endpoints: function (build) { return ({
        // Get users with filtering and pagination
        getUsers: build.query({
            query: function (params) {
                var searchParams = new URLSearchParams();
                if (params === null || params === void 0 ? void 0 : params.page)
                    searchParams.append("page", params.page.toString());
                if (params === null || params === void 0 ? void 0 : params.limit)
                    searchParams.append("limit", params.limit.toString());
                if (params === null || params === void 0 ? void 0 : params.email)
                    searchParams.append("email", params.email);
                if (params === null || params === void 0 ? void 0 : params.phoneNumber)
                    searchParams.append("phoneNumber", params.phoneNumber);
                if (params === null || params === void 0 ? void 0 : params.firstName)
                    searchParams.append("firstName", params.firstName);
                if (params === null || params === void 0 ? void 0 : params.secondName)
                    searchParams.append("secondName", params.secondName);
                if (params === null || params === void 0 ? void 0 : params.gender)
                    searchParams.append("gender", params.gender);
                if ((params === null || params === void 0 ? void 0 : params.isBlocked) !== undefined)
                    searchParams.append("isBlocked", params.isBlocked.toString());
                if ((params === null || params === void 0 ? void 0 : params.isDeleted) !== undefined)
                    searchParams.append("isDeleted", params.isDeleted.toString());
                if (params === null || params === void 0 ? void 0 : params.sortBy)
                    searchParams.append("sortBy", params.sortBy);
                if (params === null || params === void 0 ? void 0 : params.sortOrder)
                    searchParams.append("sortOrder", params.sortOrder);
                return {
                    url: "/admin/users?".concat(searchParams.toString()),
                    method: "GET",
                };
            },
            providesTags: ["Users"],
        }),
        // Get single user by ID
        getUser: build.query({
            query: function (id) { return ({
                url: "/admin/users/".concat(id),
                method: "GET",
            }); },
            providesTags: function (result, error, id) { return [{ type: "User", id: id }]; },
        }),
        // Update user information
        updateUser: build.mutation({
            query: function (_a) {
                var id = _a.id, data = _a.data;
                return ({
                    url: "/admin/users/".concat(id),
                    method: "PATCH",
                    body: data,
                });
            },
            invalidatesTags: function (result, error, _a) {
                var id = _a.id;
                return [
                    "Users",
                    { type: "User", id: id },
                ];
            },
        }),
        // Block user
        blockUser: build.mutation({
            query: function (_a) {
                var id = _a.id, data = _a.data;
                return ({
                    url: "/admin/users/block/".concat(id),
                    method: "POST",
                    body: data || {},
                });
            },
            invalidatesTags: function (result, error, _a) {
                var id = _a.id;
                return [
                    "Users",
                    { type: "User", id: id },
                ];
            },
        }),
        // Unblock user
        unblockUser: build.mutation({
            query: function (id) { return ({
                url: "/admin/users/unblock/".concat(id),
                method: "POST",
            }); },
            invalidatesTags: function (result, error, id) { return ["Users", { type: "User", id: id }]; },
        }),
        // Soft delete user
        deleteUser: build.mutation({
            query: function (_a) {
                var id = _a.id, data = _a.data;
                return ({
                    url: "/admin/users/delete/".concat(id),
                    method: "POST",
                    body: data || {},
                });
            },
            invalidatesTags: function (result, error, _a) {
                var id = _a.id;
                return [
                    "Users",
                    { type: "User", id: id },
                ];
            },
        }),
        // Restore deleted user
        restoreUser: build.mutation({
            query: function (id) { return ({
                url: "/admin/users/restore/".concat(id),
                method: "POST",
            }); },
            invalidatesTags: function (result, error, id) { return ["Users", { type: "User", id: id }]; },
        }),
        // Permanently delete user
        permanentDeleteUser: build.mutation({
            query: function (id) { return ({
                url: "/admin/users/permanent-delete/".concat(id),
                method: "DELETE",
            }); },
            invalidatesTags: function (result, error, id) { return ["Users", { type: "User", id: id }]; },
        }),
        // Delete user profile photo
        deleteUserProfilePhoto: build.mutation({
            query: function (id) { return ({
                url: "/admin/users/photo/delete/".concat(id),
                method: "DELETE",
            }); },
            invalidatesTags: function (result, error, id) { return ["Users", { type: "User", id: id }]; },
        }),
    }); },
});
// Export hooks
export var useGetUsersQuery = adminUsersApi.useGetUsersQuery, useGetUserQuery = adminUsersApi.useGetUserQuery, useUpdateUserMutation = adminUsersApi.useUpdateUserMutation, useBlockUserMutation = adminUsersApi.useBlockUserMutation, useUnblockUserMutation = adminUsersApi.useUnblockUserMutation, useDeleteUserMutation = adminUsersApi.useDeleteUserMutation, useRestoreUserMutation = adminUsersApi.useRestoreUserMutation, usePermanentDeleteUserMutation = adminUsersApi.usePermanentDeleteUserMutation, useDeleteUserProfilePhotoMutation = adminUsersApi.useDeleteUserProfilePhotoMutation;
