// redux/slices/admin/adminUsersApi.ts
import { createApi } from "@reduxjs/toolkit/query/react";
import { adminBaseQueryWithReauth } from "../api/adminBaseQueryWithReauth";

// User Types
export interface User {
  _id: string;
  firstName: string;
  secondName: string;
  email: string;
  birthDate: string;
  gender: "male" | "female";
  profilePicture?: string | null;

  // Block information
  block: {
    isBlocked: boolean;
    blockedAt?: string | null;
    reason?: string | null;
  };

  // Delete information
  delete: {
    isDeleted: boolean;
    deletedAt?: string | null;
    reason?: string | null;
  };

  // Timestamps
  createdAt: string;
  updatedAt: string;

  // Computed/formatted fields (added by backend)
  formattedCreatedAt?: string;
  isEmailVerified?: boolean; // If you have email verification logic
}

// Alternative flattened interface for easier access (if backend transforms the data)
export interface UserFlattened {
  _id: string;
  firstName: string;
  secondName: string;
  email: string;
  birthDate: string;
  gender: "male" | "female";
  profilePicture?: string | null;

  // Flattened block fields
  isBlocked: boolean;
  blockedAt?: string | null;
  blockReason?: string | null;

  // Flattened delete fields
  isDeleted: boolean;
  deletedAt?: string | null;
  deleteReason?: string | null;

  // Timestamps
  createdAt: string;
  updatedAt: string;

  // Computed fields
  formattedCreatedAt?: string;
  isEmailVerified?: boolean;
}

// Update data interface for editing users
export interface UpdateUserData {
  firstName?: string;
  secondName?: string;
  email?: string;
  birthDate?: string;
  gender?: "male" | "female";
  profilePicture?: string | null;
}

// Block user data interface
export interface BlockUserData {
  reason?: string;
}

// Delete user data interface
export interface DeleteUserData {
  reason?: string;
}

// API Response Types
export interface UsersResponse {
  success: boolean;
  data: User[];
  pagination: {
    totalUsers: number;
    totalPages: number;
    currentPage: number;
    limit: number;
  };
  filter: {
    email?: string;
    phoneNumber?: string;
    firstName?: string;
    secondName?: string;
    gender?: "male" | "female";
    isBlocked?: boolean;
    isDeleted?: boolean;
    sortBy: string;
    sortOrder: string;
  };
  messages: {
    code: string;
    httpStatus: number;
    message: string;
  };
}

export interface UserResponse {
  success: boolean;
  data: User;
  messages: {
    code: string;
    httpStatus: number;
    message: string;
  };
}

export interface UserPhotoResponse {
  success: boolean;
  data: {
    profilePicture: string | null;
  };
  messages: {
    code: string;
    httpStatus: number;
    message: string;
  };
}

export interface UserOperationResponse {
  success: boolean;
  data?: any;
  messages: {
    code: string;
    httpStatus: number;
    message: string;
  };
}

// Query Parameters
export interface GetUsersParams {
  page?: number;
  limit?: number;
  email?: string;
  phoneNumber?: string;
  firstName?: string;
  secondName?: string;
  gender?: "male" | "female";
  isBlocked?: boolean;
  isDeleted?: boolean;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface UpdateUserData {
  firstName?: string;
  secondName?: string;
  birthDate?: string;
  email?: string;
  phoneNumber?: string;
  gender?: "male" | "female";
}

export interface BlockUserData {
  reason?: string;
}

export interface DeleteUserData {
  reason?: string;
}

// API Error Response
export interface UserApiError {
  success: boolean;
  message?: string;
  error?: string;
  messages?: {
    code: string;
    httpStatus: number;
    message: string;
  };
}

export const adminUsersApi = createApi({
  reducerPath: "adminUsersApi",
  baseQuery: adminBaseQueryWithReauth,
  tagTypes: ["User", "Users"],
  endpoints: (build) => ({
    // Get users with filtering and pagination
    getUsers: build.query<UsersResponse, GetUsersParams>({
      query: (params) => {
        const searchParams = new URLSearchParams();

        if (params?.page) searchParams.append("page", params.page.toString());
        if (params?.limit)
          searchParams.append("limit", params.limit.toString());
        if (params?.email) searchParams.append("email", params.email);
        if (params?.phoneNumber)
          searchParams.append("phoneNumber", params.phoneNumber);
        if (params?.firstName)
          searchParams.append("firstName", params.firstName);
        if (params?.secondName)
          searchParams.append("secondName", params.secondName);
        if (params?.gender) searchParams.append("gender", params.gender);
        if (params?.isBlocked !== undefined)
          searchParams.append("isBlocked", params.isBlocked.toString());
        if (params?.isDeleted !== undefined)
          searchParams.append("isDeleted", params.isDeleted.toString());
        if (params?.sortBy) searchParams.append("sortBy", params.sortBy);
        if (params?.sortOrder)
          searchParams.append("sortOrder", params.sortOrder);

        return {
          url: `/admin/users?${searchParams.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["Users"],
    }),

    // Get single user by ID
    getUser: build.query<UserResponse, string>({
      query: (id) => ({
        url: `/admin/users/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "User", id }],
    }),

    // Update user information
    updateUser: build.mutation<
      UserResponse,
      { id: string; data: UpdateUserData }
    >({
      query: ({ id, data }) => ({
        url: `/admin/users/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        "Users",
        { type: "User", id },
      ],
    }),

    // Block user
    blockUser: build.mutation<
      UserOperationResponse,
      { id: string; data?: BlockUserData }
    >({
      query: ({ id, data }) => ({
        url: `/admin/users/block/${id}`,
        method: "POST",
        body: data || {},
      }),
      invalidatesTags: (result, error, { id }) => [
        "Users",
        { type: "User", id },
      ],
    }),

    // Unblock user
    unblockUser: build.mutation<UserOperationResponse, string>({
      query: (id) => ({
        url: `/admin/users/unblock/${id}`,
        method: "POST",
      }),
      invalidatesTags: (result, error, id) => ["Users", { type: "User", id }],
    }),

    // Soft delete user
    deleteUser: build.mutation<
      UserOperationResponse,
      { id: string; data?: DeleteUserData }
    >({
      query: ({ id, data }) => ({
        url: `/admin/users/delete/${id}`,
        method: "POST",
        body: data || {},
      }),
      invalidatesTags: (result, error, { id }) => [
        "Users",
        { type: "User", id },
      ],
    }),

    // Restore deleted user
    restoreUser: build.mutation<UserOperationResponse, string>({
      query: (id) => ({
        url: `/admin/users/restore/${id}`,
        method: "POST",
      }),
      invalidatesTags: (result, error, id) => ["Users", { type: "User", id }],
    }),

    // Permanently delete user
    permanentDeleteUser: build.mutation<UserOperationResponse, string>({
      query: (id) => ({
        url: `/admin/users/permanent-delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => ["Users", { type: "User", id }],
    }),

    // Delete user profile photo
    deleteUserProfilePhoto: build.mutation<UserPhotoResponse, string>({
      query: (id) => ({
        url: `/admin/users/photo/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => ["Users", { type: "User", id }],
    }),
  }),
});

// Export hooks
export const {
  useGetUsersQuery,
  useGetUserQuery,
  useUpdateUserMutation,
  useBlockUserMutation,
  useUnblockUserMutation,
  useDeleteUserMutation,
  useRestoreUserMutation,
  usePermanentDeleteUserMutation,
  useDeleteUserProfilePhotoMutation,
} = adminUsersApi;
