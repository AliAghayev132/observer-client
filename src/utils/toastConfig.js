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
// Utils/toastConfig.ts
import toast from "react-hot-toast";
// Success toast
export var showSuccessToast = function (message, options) {
    return toast.success(message, __assign({ duration: 3000, icon: "✅", style: {
            background: "#10B981",
            color: "#fff",
        } }, options));
};
// Error toast
export var showErrorToast = function (message, options) {
    return toast.error(message, __assign({ duration: 4000, icon: "❌", style: {
            background: "#EF4444",
            color: "#fff",
        } }, options));
};
// Loading toast
export var showLoadingToast = function (message, options) {
    return toast.loading(message, __assign({ style: {
            background: "#3B82F6",
            color: "#fff",
        } }, options));
};
// Warning toast (default toast with icon)
export var showWarningToast = function (message, options) {
    return toast(message, __assign({ duration: 3000, icon: "⚠️", style: {
            background: "#F59E0B",
            color: "#fff",
        } }, options));
};
