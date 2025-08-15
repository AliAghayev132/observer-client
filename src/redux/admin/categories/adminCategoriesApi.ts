// redux/slices/admin/adminCategoriesApi.ts
import { createApi } from "@reduxjs/toolkit/query/react";
import { adminBaseQueryWithReauth } from "../api/adminBaseQueryWithReauth";

// Category Types
export interface Category {
  _id: string;
  name: string;
  description?: string;
  slug: string;
  image?: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  formattedCreatedAt: string;
}

// API Response Types
export interface CategoriesResponse {
  success: boolean;
  data: Category[];
  pagination: {
    totalCategories: number;
    totalPages: number;
    currentPage: number;
    limit: number;
  };
  filter: {
    status: string;
    name: string | null;
    sortBy: string;
    sortOrder: string;
  };
  messages: {
    code: string;
    httpStatus: number;
    message: string;
  };
}

export interface CategoryResponse {
  success: boolean;
  data: Category;
  messages: {
    code: string;
    httpStatus: number;
    message: string;
  };
}

export interface CategoryImageResponse {
  success: boolean;
  data: {
    image: string | null;
  };
  messages: {
    code: string;
    httpStatus: number;
    message: string;
  };
}

export interface BulkOperationResponse {
  success: boolean;
  data: {
    deletedCount?: number;
    restoredCount?: number;
  };
  messages: {
    code: string;
    httpStatus: number;
    message: string;
  };
}

// Query Parameters
export interface GetCategoriesParams {
  page?: number;
  limit?: number;
  status?: "active" | "deleted" | "all";
  name?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface CreateCategoryData {
  name: string;
  description?: string;
  image?: File;
}

export interface UpdateCategoryData {
  name?: string;
  description?: string;
  image?: File;
}

export interface BulkOperationData {
  ids: string[];
}

// API Error Response
export interface CategoryApiError {
  success: boolean;
  message?: string;
  error?: string;
  messages?: {
    code: string;
    httpStatus: number;
    message: string;
  };
}

export const adminCategoriesApi = createApi({
  reducerPath: "adminCategoriesApi",
  baseQuery: adminBaseQueryWithReauth,
  tagTypes: ["Category", "Categories"],
  endpoints: (build) => ({
    // Get categories with filtering and pagination
    getCategories: build.query<CategoriesResponse, GetCategoriesParams>({
      query: (params) => {
        const searchParams = new URLSearchParams();

        if (params?.page) searchParams.append("page", params.page.toString());
        if (params?.limit)
          searchParams.append("limit", params.limit.toString());
        if (params?.status) searchParams.append("status", params.status);
        if (params?.name) searchParams.append("name", params.name);
        if (params?.sortBy) searchParams.append("sortBy", params.sortBy);
        if (params?.sortOrder)
          searchParams.append("sortOrder", params.sortOrder);

        return {
          url: `/admin/categories?${searchParams.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["Categories"],
    }),

    // Get single category by ID or slug
    getCategory: build.query<CategoryResponse, string>({
      query: (identifier) => ({
        url: `/admin/categories/${identifier}`,
        method: "GET",
      }),
      providesTags: (result, error, identifier) => [
        { type: "Category", id: identifier },
      ],
    }),

    // Create new category
    createCategory: build.mutation<CategoryResponse, CreateCategoryData>({
      query: (formData: CreateCategoryData) => {
        return {
          url: "/admin/categories",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["Categories"],
    }),

    // Update category
    updateCategory: build.mutation<
      CategoryResponse,
      { id: string; data: UpdateCategoryData }
    >({
      query: ({ id, data }) => {
        return {
          url: `/admin/categories/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: (result, error, { id }) => [
        "Categories",
        { type: "Category", id },
      ],
    }),

    // Update category image
    updateCategoryImage: build.mutation<
      CategoryImageResponse,
      { id: string; image: File }
    >({
      query: ({ id, image }) => {
        const formData = new FormData();
        formData.append("image", image);

        return {
          url: `/admin/categories/${id}/image`,
          method: "PATCH",
          body: formData,
        };
      },
      invalidatesTags: (result, error, { id }) => [
        "Categories",
        { type: "Category", id },
      ],
    }),

    // Delete category image
    deleteCategoryImage: build.mutation<CategoryImageResponse, string>({
      query: (id) => ({
        url: `/admin/categories/${id}/image`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        "Categories",
        { type: "Category", id },
      ],
    }),

    // Soft delete category
    deleteCategory: build.mutation<CategoryResponse, string>({
      query: (id) => ({
        url: `/admin/categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        "Categories",
        { type: "Category", id },
      ],
    }),

    // Restore deleted category
    restoreCategory: build.mutation<CategoryResponse, string>({
      query: (id) => ({
        url: `/admin/categories/${id}/restore`,
        method: "PATCH",
      }),
      invalidatesTags: (result, error, id) => [
        "Categories",
        { type: "Category", id },
      ],
    }),

    // Permanently delete category
    permanentDeleteCategory: build.mutation<
      { success: boolean; messages },
      string
    >({
      query: (id) => ({
        url: `/admin/categories/${id}/permanent`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        "Categories",
        { type: "Category", id },
      ],
    }),

    // Bulk soft delete categories
    bulkDeleteCategories: build.mutation<
      BulkOperationResponse,
      BulkOperationData
    >({
      query: (data) => ({
        url: "/admin/categories/bulk/delete",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Categories"],
    }),

    // Bulk restore categories
    bulkRestoreCategories: build.mutation<
      BulkOperationResponse,
      BulkOperationData
    >({
      query: (data) => ({
        url: "/admin/categories/bulk/restore",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Categories"],
    }),

    // Bulk permanent delete categories
    bulkPermanentDeleteCategories: build.mutation<
      BulkOperationResponse,
      BulkOperationData
    >({
      query: (data) => ({
        url: "/admin/categories/bulk/permanent",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Categories"],
    }),
  }),
});

// Export hooks
export const {
  useGetCategoriesQuery,
  useGetCategoryQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useUpdateCategoryImageMutation,
  useDeleteCategoryImageMutation,
  useDeleteCategoryMutation,
  useRestoreCategoryMutation,
  usePermanentDeleteCategoryMutation,
  useBulkDeleteCategoriesMutation,
  useBulkRestoreCategoriesMutation,
  useBulkPermanentDeleteCategoriesMutation,
} = adminCategoriesApi;
