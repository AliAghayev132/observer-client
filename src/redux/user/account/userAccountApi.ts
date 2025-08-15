// Api
import { createApi } from "@reduxjs/toolkit/query/react";
// RTK
import { userBaseQueryWithReauth } from "../api/userBaseQueryWithReauth";

export const userAccountApi = createApi({
  reducerPath: "userAccountApi",
  baseQuery: userBaseQueryWithReauth,
  tagTypes: ["User"],
  endpoints: (builder) => ({
    // Get user profile
    getUser: builder.query({
      providesTags: ["User"],
      query: () => "/user/account/me",
    }),

    // Change password
    changePassword: builder.mutation({
      query: ({ oldPassword, newPassword }) => ({
        url: "/user/account/change-password",
        method: "POST",
        body: { oldPassword, newPassword },
      }),
    }),

    // Edit profile
    editProfile: builder.mutation({
      query: ({ firstName, secondName, birthDate, phoneNumber }) => ({
        url: "/user/account/edit-profile",
        method: "PUT",
        body: { firstName, secondName, birthDate, phoneNumber },
      }),
      invalidatesTags: ["User"],
    }),

    // Update profile picture
    updateProfilePicture: builder.mutation({
      query: (formData) => ({
        url: "/user/account/update-profile-picture",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["User"],
    }),

    // Delete profile picture
    deleteProfilePicture: builder.mutation({
      query: () => ({
        url: "/user/account/delete-profile-picture",
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetUserQuery,
  useLazyGetUserQuery,
  useChangePasswordMutation,
  useEditProfileMutation,
  useUpdateProfilePictureMutation,
  useDeleteProfilePictureMutation,
} = userAccountApi;
