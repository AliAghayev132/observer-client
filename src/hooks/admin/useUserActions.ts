// hooks/admin/useUserActions.ts
import { useState } from "react";
import toast from "react-hot-toast";
import {
  useUpdateUserMutation,
  useBlockUserMutation,
  useUnblockUserMutation,
  useDeleteUserMutation,
  useRestoreUserMutation,
  usePermanentDeleteUserMutation,
  useDeleteUserProfilePhotoMutation,
  User,
  UpdateUserData,
} from "@/redux/admin/users/adminUsersApi";
import {
  showLoadingToast,
  showSuccessToast,
  showErrorToast,
} from "@/utils/toastConfig";

export const useUserActions = () => {
  const [updateUser] = useUpdateUserMutation();
  const [blockUser] = useBlockUserMutation();
  const [unblockUser] = useUnblockUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [restoreUser] = useRestoreUserMutation();
  const [permanentDeleteUser] = usePermanentDeleteUserMutation();
  const [deleteUserProfilePhoto] = useDeleteUserProfilePhotoMutation();

  const [loadingStates, setLoadingStates] = useState({
    updating: false,
    blocking: false,
    unblocking: false,
    deleting: false,
    restoring: false,
    permanentDeleting: false,
    deletingPhoto: false,
  });

  const handleUpdateUser = async (user: User, data: UpdateUserData) => {
    setLoadingStates((prev) => ({ ...prev, updating: true }));
    const loadingToastId = showLoadingToast("Updating user...");

    try {
      const result = await updateUser({ id: user._id, data }).unwrap();

      toast.dismiss(loadingToastId as string);
      showSuccessToast(
        `User "${user.firstName} ${user.secondName}" updated successfully!`
      );

      return result;
    } catch (error) {
      toast.dismiss(loadingToastId as string);
      const errorMessage =
        error?.data?.message || error?.message || "Failed to update user";
      showErrorToast(errorMessage);
      throw error;
    } finally {
      setLoadingStates((prev) => ({ ...prev, updating: false }));
    }
  };

  const handleBlockUser = async (user: User, reason?: string) => {
    setLoadingStates((prev) => ({ ...prev, blocking: true }));
    const loadingToastId = showLoadingToast("Blocking user...");

    try {
      const result = await blockUser({
        id: user._id,
        data: reason ? { reason } : undefined,
      }).unwrap();

      toast.dismiss(loadingToastId as string);
      showSuccessToast(
        `User "${user.firstName} ${user.secondName}" blocked successfully!`
      );

      return result;
    } catch (error) {
      toast.dismiss(loadingToastId as string);
      const errorMessage =
        error?.data?.message || error?.message || "Failed to block user";
      showErrorToast(errorMessage);
      throw error;
    } finally {
      setLoadingStates((prev) => ({ ...prev, blocking: false }));
    }
  };

  const handleUnblockUser = async (user: User) => {
    setLoadingStates((prev) => ({ ...prev, unblocking: true }));
    const loadingToastId = showLoadingToast("Unblocking user...");

    try {
      const result = await unblockUser(user._id).unwrap();

      toast.dismiss(loadingToastId as string);
      showSuccessToast(
        `User "${user.firstName} ${user.secondName}" unblocked successfully!`
      );

      return result;
    } catch (error) {
      toast.dismiss(loadingToastId as string);
      const errorMessage =
        error?.data?.message || error?.message || "Failed to unblock user";
      showErrorToast(errorMessage);
      throw error;
    } finally {
      setLoadingStates((prev) => ({ ...prev, unblocking: false }));
    }
  };

  const handleDeleteUser = async (user: User, reason?: string) => {
    setLoadingStates((prev) => ({ ...prev, deleting: true }));
    const loadingToastId = showLoadingToast("Deleting user...");

    try {
      const result = await deleteUser({
        id: user._id,
        data: reason ? { reason } : undefined,
      }).unwrap();

      toast.dismiss(loadingToastId as string);
      showSuccessToast(
        `User "${user.firstName} ${user.secondName}" deleted successfully!`
      );

      return result;
    } catch (error) {
      toast.dismiss(loadingToastId as string);
      const errorMessage =
        error?.data?.message || error?.message || "Failed to delete user";
      showErrorToast(errorMessage);
      throw error;
    } finally {
      setLoadingStates((prev) => ({ ...prev, deleting: false }));
    }
  };

  const handleRestoreUser = async (user: User) => {
    setLoadingStates((prev) => ({ ...prev, restoring: true }));
    const loadingToastId = showLoadingToast("Restoring user...");

    try {
      const result = await restoreUser(user._id).unwrap();

      toast.dismiss(loadingToastId as string);
      showSuccessToast(
        `User "${user.firstName} ${user.secondName}" restored successfully!`
      );

      return result;
    } catch (error) {
      toast.dismiss(loadingToastId as string);
      const errorMessage =
        error?.data?.message || error?.message || "Failed to restore user";
      showErrorToast(errorMessage);
      throw error;
    } finally {
      setLoadingStates((prev) => ({ ...prev, restoring: false }));
    }
  };

  const handlePermanentDeleteUser = async (user: User) => {
    setLoadingStates((prev) => ({ ...prev, permanentDeleting: true }));
    const loadingToastId = showLoadingToast("Permanently deleting user...");

    try {
      const result = await permanentDeleteUser(user._id).unwrap();

      toast.dismiss(loadingToastId as string);
      showSuccessToast(
        `User "${user.firstName} ${user.secondName}" permanently deleted!`
      );

      return result;
    } catch (error) {
      toast.dismiss(loadingToastId as string);
      const errorMessage =
        error?.data?.message ||
        error?.message ||
        "Failed to permanently delete user";
      showErrorToast(errorMessage);
      throw error;
    } finally {
      setLoadingStates((prev) => ({ ...prev, permanentDeleting: false }));
    }
  };

  const handleDeleteUserProfilePhoto = async (user: User) => {
    setLoadingStates((prev) => ({ ...prev, deletingPhoto: true }));
    const loadingToastId = showLoadingToast("Deleting profile photo...");

    try {
      const result = await deleteUserProfilePhoto(user._id).unwrap();

      toast.dismiss(loadingToastId as string);
      showSuccessToast(
        `Profile photo deleted for "${user.firstName} ${user.secondName}"!`
      );

      return result;
    } catch (error) {
      toast.dismiss(loadingToastId as string);
      const errorMessage =
        error?.data?.message ||
        error?.message ||
        "Failed to delete profile photo";
      showErrorToast(errorMessage);
      throw error;
    } finally {
      setLoadingStates((prev) => ({ ...prev, deletingPhoto: false }));
    }
  };

  return {
    // Actions
    handleUpdateUser,
    handleBlockUser,
    handleUnblockUser,
    handleDeleteUser,
    handleRestoreUser,
    handlePermanentDeleteUser,
    handleDeleteUserProfilePhoto,

    // Loading states
    loadingStates,
  };
};
