// src/redux/admin/categories/adminCategoriesApi.ts
import { createApi } from "@reduxjs/toolkit/query/react";
import { adminBaseQueryWithReauth } from "../api/adminBaseQueryWithReauth";
export var adminCategoriesApi = createApi({
    reducerPath: "adminCategoriesApi",
    baseQuery: adminBaseQueryWithReauth,
    tagTypes: ["Category", "Categories"],
    endpoints: function (build) { return ({
        // Get categories with filtering and pagination
        getCategories: build.query({
            query: function (params) {
                if (params === void 0) { params = {}; }
                var searchParams = new URLSearchParams();
                if (params.page)
                    searchParams.append("page", params.page.toString());
                if (params.limit)
                    searchParams.append("limit", params.limit.toString());
                if (params.status)
                    searchParams.append("status", params.status);
                if (params.name)
                    searchParams.append("name", params.name);
                if (params.sortBy)
                    searchParams.append("sortBy", params.sortBy);
                if (params.sortOrder)
                    searchParams.append("sortOrder", params.sortOrder);
                return {
                    url: "/admin/categories?".concat(searchParams.toString()),
                    method: "GET",
                };
            },
            providesTags: ["Categories"],
        }),
        // Get single category by ID or slug
        getCategory: build.query({
            query: function (identifier) { return ({
                url: "/admin/categories/".concat(identifier),
                method: "GET",
            }); },
            providesTags: function (result, error, identifier) { return [
                { type: "Category", id: identifier },
            ]; },
        }),
        // ✅ Create new category - FormData kabul eder
        createCategory: build.mutation({
            query: function (data) {
                var formData = new FormData();
                formData.append('name', data.name);
                if (data.description) {
                    formData.append('description', data.description);
                }
                if (data.image) {
                    formData.append('image', data.image);
                }
                return {
                    url: "/admin/categories",
                    method: "POST",
                    body: formData,
                };
            },
            invalidatesTags: ["Categories"],
        }),
        // ✅ Update category - FormData kabul eder
        updateCategory: build.mutation({
            query: function (_a) {
                var id = _a.id, data = _a.data;
                var formData = new FormData();
                if (data.name !== undefined) {
                    formData.append('name', data.name);
                }
                if (data.description !== undefined) {
                    formData.append('description', data.description);
                }
                if (data.image) {
                    formData.append('image', data.image);
                }
                return {
                    url: "/admin/categories/".concat(id),
                    method: "PATCH",
                    body: formData,
                };
            },
            invalidatesTags: function (result, error, _a) {
                var id = _a.id;
                return [
                    "Categories",
                    { type: "Category", id: id },
                ];
            },
        }),
        // Update category image
        updateCategoryImage: build.mutation({
            query: function (_a) {
                var id = _a.id, image = _a.image;
                var formData = new FormData();
                formData.append("image", image);
                return {
                    url: "/admin/categories/".concat(id, "/image"),
                    method: "PATCH",
                    body: formData,
                };
            },
            invalidatesTags: function (result, error, _a) {
                var id = _a.id;
                return [
                    "Categories",
                    { type: "Category", id: id },
                ];
            },
        }),
        // Delete category image
        deleteCategoryImage: build.mutation({
            query: function (id) { return ({
                url: "/admin/categories/".concat(id, "/image"),
                method: "DELETE",
            }); },
            invalidatesTags: function (result, error, id) { return [
                "Categories",
                { type: "Category", id: id },
            ]; },
        }),
        // Soft delete category
        deleteCategory: build.mutation({
            query: function (id) { return ({
                url: "/admin/categories/".concat(id),
                method: "DELETE",
            }); },
            invalidatesTags: function (result, error, id) { return [
                "Categories",
                { type: "Category", id: id },
            ]; },
        }),
        // Restore deleted category
        restoreCategory: build.mutation({
            query: function (id) { return ({
                url: "/admin/categories/".concat(id, "/restore"),
                method: "PATCH",
            }); },
            invalidatesTags: function (result, error, id) { return [
                "Categories",
                { type: "Category", id: id },
            ]; },
        }),
        // ✅ Permanently delete category - Type düzeltmesi
        permanentDeleteCategory: build.mutation({
            query: function (id) { return ({
                url: "/admin/categories/".concat(id, "/permanent"),
                method: "DELETE",
            }); },
            invalidatesTags: function (result, error, id) { return [
                "Categories",
                { type: "Category", id: id },
            ]; },
        }),
        // Bulk soft delete categories
        bulkDeleteCategories: build.mutation({
            query: function (data) { return ({
                url: "/admin/categories/bulk/delete",
                method: "POST",
                body: data,
            }); },
            invalidatesTags: ["Categories"],
        }),
        // Bulk restore categories
        bulkRestoreCategories: build.mutation({
            query: function (data) { return ({
                url: "/admin/categories/bulk/restore",
                method: "POST",
                body: data,
            }); },
            invalidatesTags: ["Categories"],
        }),
        // Bulk permanent delete categories
        bulkPermanentDeleteCategories: build.mutation({
            query: function (data) { return ({
                url: "/admin/categories/bulk/permanent",
                method: "POST",
                body: data,
            }); },
            invalidatesTags: ["Categories"],
        }),
    }); },
});
// Export hooks
export var useGetCategoriesQuery = adminCategoriesApi.useGetCategoriesQuery, useGetCategoryQuery = adminCategoriesApi.useGetCategoryQuery, useCreateCategoryMutation = adminCategoriesApi.useCreateCategoryMutation, useUpdateCategoryMutation = adminCategoriesApi.useUpdateCategoryMutation, useUpdateCategoryImageMutation = adminCategoriesApi.useUpdateCategoryImageMutation, useDeleteCategoryImageMutation = adminCategoriesApi.useDeleteCategoryImageMutation, useDeleteCategoryMutation = adminCategoriesApi.useDeleteCategoryMutation, useRestoreCategoryMutation = adminCategoriesApi.useRestoreCategoryMutation, usePermanentDeleteCategoryMutation = adminCategoriesApi.usePermanentDeleteCategoryMutation, useBulkDeleteCategoriesMutation = adminCategoriesApi.useBulkDeleteCategoriesMutation, useBulkRestoreCategoriesMutation = adminCategoriesApi.useBulkRestoreCategoriesMutation, useBulkPermanentDeleteCategoriesMutation = adminCategoriesApi.useBulkPermanentDeleteCategoriesMutation;
