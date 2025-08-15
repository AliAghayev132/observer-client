// Api
import { createApi } from "@reduxjs/toolkit/query/react";
// RTK
import { userBaseQueryWithReauth } from "../api/userBaseQueryWithReauth";
export var userAccountApi = createApi({
    reducerPath: "userAccountApi",
    baseQuery: userBaseQueryWithReauth,
    tagTypes: ["User"],
    endpoints: function (builder) { return ({
        // Get user profile
        getUser: builder.query({
            providesTags: ["User"],
            query: function () { return "/user/account/me"; },
        }),
        // Change password
        changePassword: builder.mutation({
            query: function (_a) {
                var oldPassword = _a.oldPassword, newPassword = _a.newPassword;
                return ({
                    url: "/user/account/change-password",
                    method: "POST",
                    body: { oldPassword: oldPassword, newPassword: newPassword },
                });
            },
        }),
        // Edit profile
        editProfile: builder.mutation({
            query: function (_a) {
                var firstName = _a.firstName, secondName = _a.secondName, birthDate = _a.birthDate, phoneNumber = _a.phoneNumber;
                return ({
                    url: "/user/account/edit-profile",
                    method: "PUT",
                    body: { firstName: firstName, secondName: secondName, birthDate: birthDate, phoneNumber: phoneNumber },
                });
            },
            invalidatesTags: ["User"],
        }),
        // Update profile picture
        updateProfilePicture: builder.mutation({
            query: function (formData) { return ({
                url: "/user/account/update-profile-picture",
                method: "POST",
                body: formData,
            }); },
            invalidatesTags: ["User"],
        }),
        // Delete profile picture
        deleteProfilePicture: builder.mutation({
            query: function () { return ({
                url: "/user/account/delete-profile-picture",
                method: "DELETE",
            }); },
            invalidatesTags: ["User"],
        }),
    }); },
});
export var useGetUserQuery = userAccountApi.useGetUserQuery, useLazyGetUserQuery = userAccountApi.useLazyGetUserQuery, useChangePasswordMutation = userAccountApi.useChangePasswordMutation, useEditProfileMutation = userAccountApi.useEditProfileMutation, useUpdateProfilePictureMutation = userAccountApi.useUpdateProfilePictureMutation, useDeleteProfilePictureMutation = userAccountApi.useDeleteProfilePictureMutation;
