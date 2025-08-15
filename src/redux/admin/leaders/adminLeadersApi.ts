// redux/slices/admin/adminLeadersApi.ts
import { createApi } from "@reduxjs/toolkit/query/react";
import { adminBaseQueryWithReauth } from "../api/adminBaseQueryWithReauth";

// Leader Types
export interface Category {
  _id: string;
  name: string;
  slug: string;
}

export interface Leader {
  _id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  slug: string;
  description?: string;
  image?: string;
  category: Category;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  formattedCreatedAt: string;
}

// API Response Types
export interface LeadersResponse {
  success: boolean;
  data: Leader[];
  pagination: {
    totalLeaders: number;
    totalPages: number;
    currentPage: number;
    limit: number;
  };
  filter: {
    status: string;
    name: string | null;
    category: string | null;
    sortBy: string;
    sortOrder: string;
  };
  messages: {
    code: string;
    httpStatus: number;
    message: string;
  };
}

export interface LeaderResponse {
  success: boolean;
  data: Leader;
  messages: {
    code: string;
    httpStatus: number;
    message: string;
  };
}

export interface LeadersByCategoryResponse {
  success: boolean;
  data: Leader[];
  category: {
    id: string;
    name: string;
    slug: string;
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

export interface ImageUpdateResponse {
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

export interface PermanentDeleteResponse {
  success: boolean;
  messages: {
    code: string;
    httpStatus: number;
    message: string;
  };
}

// Query Parameters
export interface GetLeadersParams {
  page?: number;
  limit?: number;
  status?: "active" | "deleted" | "all";
  name?: string;
  category?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface GetLeadersByCategoryParams {
  categoryId: string;
  includeDeleted?: boolean;
}

// Create/Update Leader Data
export interface CreateLeaderData {
  firstName: string;
  lastName: string;
  category: string;
  description?: string;
  image?: File;
}

export interface UpdateLeaderData {
  firstName?: string;
  lastName?: string;
  category?: string;
  description?: string;
  image?: File;
}

export interface BulkOperationData {
  ids: string[];
}

// API Error Response
export interface LeaderApiError {
  success: boolean;
  message?: string;
  error?: string;
  messages?: {
    code: string;
    httpStatus: number;
    message: string;
  };
}

// Form Data Helper Types
export interface LeaderFormData {
  firstName: string;
  lastName: string;
  category: string;
  description: string;
  image: File | null;
}

export interface LeaderUpdateFormData {
  firstName?: string;
  lastName?: string;
  category?: string;
  description?: string;
  image?: File | null;
}

// Filter and Sort Options
export type LeaderStatus = "active" | "deleted" | "all";
export type SortOrder = "asc" | "desc";

export interface LeaderFilters {
  status: LeaderStatus;
  name: string;
  category: string;
  sortBy: string;
  sortOrder: SortOrder;
}

// Pagination Info
export interface PaginationInfo {
  totalLeaders: number;
  totalPages: number;
  currentPage: number;
  limit: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export const adminLeadersApi = createApi({
  reducerPath: "adminLeadersApi",
  baseQuery: adminBaseQueryWithReauth,
  tagTypes: ["Leader", "Leaders", "LeadersByCategory"],
  endpoints: (build) => ({
    // Get leaders with pagination and filters
    getLeaders: build.query<LeadersResponse, GetLeadersParams | void>({
      query: (params = {}) => ({
        url: "/admin/leaders",
        method: "GET",
        params,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ _id }) => ({
                type: "Leader" as const,
                id: _id,
              })),
              { type: "Leaders", id: "LIST" },
            ]
          : [{ type: "Leaders", id: "LIST" }],
      transformResponse: (response: LeadersResponse) => {
        // Add computed pagination info
        const pagination = {
          ...response.pagination,
          hasNextPage:
            response.pagination.currentPage < response.pagination.totalPages,
          hasPrevPage: response.pagination.currentPage > 1,
        };
        return { ...response, pagination };
      },
    }),

    // Get single leader by ID or slug
    getLeader: build.query<LeaderResponse, string>({
      query: (identifier) => ({
        url: `/admin/leaders/${identifier}`,
        method: "GET",
      }),
      providesTags: (result, error, identifier) => [
        { type: "Leader", id: identifier },
        { type: "Leader", id: result?.data._id },
      ],
    }),

    // Get leaders by category
    getLeadersByCategory: build.query<
      LeadersByCategoryResponse,
      GetLeadersByCategoryParams
    >({
      query: ({ categoryId, includeDeleted = false }) => ({
        url: `/admin/leaders/category/${categoryId}`,
        method: "GET",
        params: { includeDeleted },
      }),
      providesTags: (result, error, { categoryId }) => [
        { type: "LeadersByCategory", id: categoryId },
        ...(result?.data.map(({ _id }) => ({
          type: "Leader" as const,
          id: _id,
        })) || []),
      ],
    }),

    // Create new leader
    createLeader: build.mutation<LeaderResponse, CreateLeaderData>({
      query: (data) => {
        const formData = new FormData();
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
    updateLeader: build.mutation<
      LeaderResponse,
      { id: string; data: UpdateLeaderData }
    >({
      query: ({ id, data }) => {
        const formData = new FormData();

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
          url: `/admin/leaders/${id}`,
          method: "PATCH",
          body: formData,
        };
      },
      invalidatesTags: (result, error, { id }) => [
        { type: "Leader", id },
        { type: "Leaders", id: "LIST" },
        "LeadersByCategory",
      ],
    }),

    // Update leader image only
    updateLeaderImage: build.mutation<
      ImageUpdateResponse,
      { id: string; image: File }
    >({
      query: ({ id, image }) => {
        const formData = new FormData();
        formData.append("image", image);

        return {
          url: `/admin/leaders/${id}/image`,
          method: "PATCH",
          body: formData,
        };
      },
      invalidatesTags: (result, error, { id }) => [
        { type: "Leader", id },
        { type: "Leaders", id: "LIST" },
        "LeadersByCategory",
      ],
    }),

    // Delete leader image
    deleteLeaderImage: build.mutation<ImageUpdateResponse, string>({
      query: (id) => ({
        url: `/admin/leaders/${id}/image`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Leader", id },
        { type: "Leaders", id: "LIST" },
        "LeadersByCategory",
      ],
    }),

    // Soft delete leader
    deleteLeader: build.mutation<LeaderResponse, string>({
      query: (id) => ({
        url: `/admin/leaders/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Leader", id },
        { type: "Leaders", id: "LIST" },
        "LeadersByCategory",
      ],
    }),

    // Restore leader
    restoreLeader: build.mutation<LeaderResponse, string>({
      query: (id) => ({
        url: `/admin/leaders/${id}/restore`,
        method: "PATCH",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Leader", id },
        { type: "Leaders", id: "LIST" },
        "LeadersByCategory",
      ],
    }),

    // Permanently delete leader
    permanentDeleteLeader: build.mutation<PermanentDeleteResponse, string>({
      query: (id) => ({
        url: `/admin/leaders/${id}/permanent`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Leader", id },
        { type: "Leaders", id: "LIST" },
        "LeadersByCategory",
      ],
    }),

    // Bulk soft delete leaders
    bulkDeleteLeaders: build.mutation<BulkOperationResponse, BulkOperationData>(
      {
        query: (data) => ({
          url: "/admin/leaders/bulk/delete",
          method: "POST",
          body: data,
        }),
        invalidatesTags: (result, error, { ids }) => [
          { type: "Leaders", id: "LIST" },
          "LeadersByCategory",
          ...ids.map((id) => ({ type: "Leader" as const, id })),
        ],
      }
    ),

    // Bulk restore leaders
    bulkRestoreLeaders: build.mutation<
      BulkOperationResponse,
      BulkOperationData
    >({
      query: (data) => ({
        url: "/admin/leaders/bulk/restore",
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error, { ids }) => [
        { type: "Leaders", id: "LIST" },
        "LeadersByCategory",
        ...ids.map((id) => ({ type: "Leader" as const, id })),
      ],
    }),

    // Bulk permanent delete leaders
    bulkPermanentDeleteLeaders: build.mutation<
      BulkOperationResponse,
      BulkOperationData
    >({
      query: (data) => ({
        url: "/admin/leaders/bulk/permanent",
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error, { ids }) => [
        { type: "Leaders", id: "LIST" },
        "LeadersByCategory",
        ...ids.map((id) => ({ type: "Leader" as const, id })),
      ],
    }),
  }),
});

// Export hooks
export const {
  useGetLeadersQuery,
  useLazyGetLeadersQuery,
  useGetLeaderQuery,
  useLazyGetLeaderQuery,
  useGetLeadersByCategoryQuery,
  useLazyGetLeadersByCategoryQuery,
  useCreateLeaderMutation,
  useUpdateLeaderMutation,
  useUpdateLeaderImageMutation,
  useDeleteLeaderImageMutation,
  useDeleteLeaderMutation,
  useRestoreLeaderMutation,
  usePermanentDeleteLeaderMutation,
  useBulkDeleteLeadersMutation,
  useBulkRestoreLeadersMutation,
  useBulkPermanentDeleteLeadersMutation,
} = adminLeadersApi;

// Export the API reducer and middleware
