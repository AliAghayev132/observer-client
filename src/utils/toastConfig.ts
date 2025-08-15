// Utils/toastConfig.ts
import toast, { ToastOptions } from "react-hot-toast";

// Success toast
export const showSuccessToast = (
  message: string,
  options?: ToastOptions
): string | number => {
  return toast.success(message, {
    duration: 3000,
    icon: "✅",
    style: {
      background: "#10B981",
      color: "#fff",
    },
    ...options,
  });
};

// Error toast
export const showErrorToast = (
  message: string,
  options?: ToastOptions
): string | number => {
  return toast.error(message, {
    duration: 4000,
    icon: "❌",
    style: {
      background: "#EF4444",
      color: "#fff",
    },
    ...options,
  });
};

// Loading toast
export const showLoadingToast = (
  message: string,
  options?: ToastOptions
): string | number => {
  return toast.loading(message, {
    style: {
      background: "#3B82F6",
      color: "#fff",
    },
    ...options,
  });
};

// Warning toast (default toast with icon)
export const showWarningToast = (
  message: string,
  options?: ToastOptions
): string | number => {
  return toast(message, {
    duration: 3000,
    icon: "⚠️",
    style: {
      background: "#F59E0B",
      color: "#fff",
    },
    ...options,
  });
};
