// Redux
import { createSlice } from "@reduxjs/toolkit";
// RTK
import { userAccountApi } from "./userAccountApi";

interface UserProfile {
  _id: string;
  firstName: string;
  secondName: string;
  email: string;
  birthDate: string;
  gender: "male" | "female";
  profilePicture?: string | null;
  block: {
    isBlocked: boolean;
    blockedAt?: string | null;
    reason?: string | null;
  };
  delete: {
    isDeleted: boolean;
    deletedAt?: string | null;
    reason?: string | null;
  };
  createdAt: string;
  updatedAt: string;
}

interface AccountState {
  user: UserProfile | null;
}

const initialState: AccountState = {
  user: null,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    clearUser: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get user fulfilled
      .addMatcher(
        userAccountApi.endpoints.getUser.matchFulfilled,
        (state, action) => {
          if (action.payload.success && action.payload.data) {
            state.user = action.payload.data;
          }
        }
      )
      // Edit profile fulfilled
      .addMatcher(
        userAccountApi.endpoints.editProfile.matchFulfilled,
        (state, action) => {
          if (action.payload.success && action.payload.data) {
            state.user = action.payload.data;
          }
        }
      )
      // Update profile picture fulfilled
      .addMatcher(
        userAccountApi.endpoints.updateProfilePicture.matchFulfilled,
        (state, action) => {
          if (
            action.payload.success &&
            action.payload.data?.profilePicture &&
            state.user
          ) {
            state.user.profilePicture = action.payload.data.profilePicture;
          }
        }
      )
      // Delete profile picture fulfilled
      .addMatcher(
        userAccountApi.endpoints.deleteProfilePicture.matchFulfilled,
        (state, action) => {
          if (action.payload.success && state.user) {
            state.user.profilePicture = null;
          }
        }
      );
  },
});

export const { clearUser } = accountSlice.actions;
export default accountSlice.reducer;
