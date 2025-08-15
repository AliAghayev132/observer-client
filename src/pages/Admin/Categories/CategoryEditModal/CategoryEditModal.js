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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// components/admin/categories/CategoryEditModal/CategoryEditModal.tsx
import { useState, useEffect, useRef } from 'react';
// Icons
import { X, Tag, FileText, Image as ImageIcon, Upload, Loader2 } from 'lucide-react';
// RTK
import { useUpdateCategoryMutation } from '@/redux/admin/categories/adminCategoriesApi';
// Utils
import { getCategoryImageUrl } from '@/utils/imageHandler';
// Toast
import { showLoadingToast, showSuccessToast, showErrorToast } from '@/utils/toastConfig';
import toast from 'react-hot-toast';
export var CategoryEditModal = function (_a) {
    var category = _a.category, isOpen = _a.isOpen, onClose = _a.onClose;
    var _b = useState(false), isVisible = _b[0], setIsVisible = _b[1];
    var _c = useState(false), isAnimating = _c[0], setIsAnimating = _c[1];
    // ✅ FormData yerine CategoryFormData kullanın
    var _d = useState({
        name: '',
        description: '',
        image: null
    }), formData = _d[0], setFormData = _d[1];
    var _e = useState(''), imagePreview = _e[0], setImagePreview = _e[1];
    var _f = useState({}), errors = _f[0], setErrors = _f[1];
    var fileInputRef = useRef(null);
    var _g = useUpdateCategoryMutation(), updateCategory = _g[0], isUpdating = _g[1].isLoading;
    // Animation effects
    useEffect(function () {
        if (isOpen) {
            setIsAnimating(true);
            setTimeout(function () { return setIsVisible(true); }, 10);
        }
        else {
            setIsVisible(false);
            setTimeout(function () { return setIsAnimating(false); }, 300);
        }
    }, [isOpen]);
    // Handle ESC key and body scroll
    useEffect(function () {
        var handleEsc = function (e) {
            if (e.key === 'Escape' && !isUpdating)
                onClose();
        };
        if (isOpen) {
            document.addEventListener('keydown', handleEsc);
            document.body.style.overflow = 'hidden';
        }
        return function () {
            document.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose, isUpdating]);
    // Initialize form data when category changes
    useEffect(function () {
        if (category && isOpen) {
            setFormData({
                name: category.name || '',
                description: category.description || '',
                image: null
            });
            setImagePreview(category.image ? getCategoryImageUrl(category.image) : '');
            setErrors({});
        }
    }, [category, isOpen]);
    // Reset form when modal closes
    useEffect(function () {
        if (!isOpen) {
            setFormData({ name: '', description: '', image: null });
            setImagePreview('');
            setErrors({});
        }
    }, [isOpen]);
    var validateForm = function () {
        var newErrors = {};
        // Validate name
        if (!formData.name.trim()) {
            newErrors.name = 'Category name is required';
        }
        else if (formData.name.trim().length < 2) {
            newErrors.name = 'Category name must be at least 2 characters';
        }
        else if (formData.name.trim().length > 50) {
            newErrors.name = 'Category name must be less than 50 characters';
        }
        // Validate description (optional but with length limit)
        if (formData.description.trim().length > 500) {
            newErrors.description = 'Description must be less than 500 characters';
        }
        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) {
            showErrorToast('Please fix the form errors');
            return false;
        }
        return true;
    };
    var handleNameChange = function (value) {
        setFormData(function (prev) { return (__assign(__assign({}, prev), { name: value })); });
        if (errors.name) {
            setErrors(function (prev) { return (__assign(__assign({}, prev), { name: undefined })); });
        }
    };
    var handleDescriptionChange = function (value) {
        setFormData(function (prev) { return (__assign(__assign({}, prev), { description: value })); });
        if (errors.description) {
            setErrors(function (prev) { return (__assign(__assign({}, prev), { description: undefined })); });
        }
    };
    var handleImageChange = function (e) {
        var _a;
        var file = (_a = e.target.files) === null || _a === void 0 ? void 0 : _a[0];
        if (file) {
            // Validate file type
            if (!file.type.startsWith('image/')) {
                setErrors(function (prev) { return (__assign(__assign({}, prev), { image: 'Please select a valid image file' })); });
                showErrorToast('Please select a valid image file');
                return;
            }
            // Validate file size (5MB limit)
            if (file.size > 5 * 1024 * 1024) {
                setErrors(function (prev) { return (__assign(__assign({}, prev), { image: 'Image size should be less than 5MB' })); });
                showErrorToast('Image size should be less than 5MB');
                return;
            }
            // Update form data with the file
            setFormData(function (prev) { return (__assign(__assign({}, prev), { image: file })); });
            // Create preview
            var reader = new FileReader();
            reader.onload = function (e) {
                var _a;
                setImagePreview((_a = e.target) === null || _a === void 0 ? void 0 : _a.result);
            };
            reader.readAsDataURL(file);
            // Clear any previous image errors
            if (errors.image) {
                setErrors(function (prev) { return (__assign(__assign({}, prev), { image: undefined })); });
            }
            showSuccessToast('Image uploaded successfully');
        }
    };
    var removeImage = function () {
        setFormData(function (prev) { return (__assign(__assign({}, prev), { image: null })); });
        setImagePreview((category === null || category === void 0 ? void 0 : category.image) ? getCategoryImageUrl(category.image) : '');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
        // Clear any image errors
        if (errors.image) {
            setErrors(function (prev) { return (__assign(__assign({}, prev), { image: undefined })); });
        }
        showSuccessToast('Image removed');
    };
    var handleSubmit = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var loadingToastId, updateData, error_1, errorMessage;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    e.preventDefault();
                    if (!validateForm() || !category || isUpdating)
                        return [2 /*return*/];
                    loadingToastId = showLoadingToast('Updating category...');
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 3, , 4]);
                    updateData = {
                        name: formData.name.trim(),
                        description: formData.description.trim(),
                        image: formData.image || undefined, // null yerine undefined
                    };
                    // ✅ FormData yerine UpdateCategoryFormData objesi gönderin
                    return [4 /*yield*/, updateCategory({
                            id: category._id,
                            data: updateData
                        }).unwrap()];
                case 2:
                    // ✅ FormData yerine UpdateCategoryFormData objesi gönderin
                    _c.sent();
                    toast.dismiss(loadingToastId);
                    showSuccessToast("Category \"".concat(formData.name, "\" updated successfully!"));
                    onClose();
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _c.sent();
                    toast.dismiss(loadingToastId);
                    errorMessage = ((_a = error_1 === null || error_1 === void 0 ? void 0 : error_1.data) === null || _a === void 0 ? void 0 : _a.message) || 'Failed to update category. Please try again.';
                    showErrorToast(errorMessage);
                    // Handle validation errors
                    if ((_b = error_1 === null || error_1 === void 0 ? void 0 : error_1.data) === null || _b === void 0 ? void 0 : _b.errors) {
                        setErrors(error_1.data.errors);
                    }
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var handleClose = function () {
        if (isUpdating) {
            showErrorToast('Please wait for the operation to complete');
            return;
        }
        onClose();
    };
    if (!isAnimating || !category)
        return null;
    var isDisabled = isUpdating;
    return (_jsxs("div", { className: "fixed inset-0 z-50 overflow-y-auto", children: [_jsx("div", { className: "fixed inset-0 backdrop-blur-sm bg-white/30 transition-all duration-300 ".concat(isVisible ? 'opacity-100' : 'opacity-0'), onClick: !isDisabled ? handleClose : undefined }), _jsx("div", { className: "flex min-h-full items-center justify-center p-2 sm:p-4", children: _jsxs("div", { className: "relative bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl max-h-[98vh] sm:max-h-[95vh] overflow-hidden border border-gray-200 transition-all duration-300 transform ".concat(isVisible
                        ? 'opacity-100 scale-100 translate-y-0'
                        : 'opacity-0 scale-95 translate-y-4'), children: [_jsxs("div", { className: "flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50", children: [_jsxs("div", { className: "flex items-center space-x-2 sm:space-x-3", children: [_jsx("div", { className: "p-1.5 sm:p-2 bg-blue-100 rounded-lg", children: _jsx(Tag, { className: "w-4 h-4 sm:w-6 sm:h-6 text-blue-600" }) }), _jsxs("div", { children: [_jsx("h2", { className: "text-lg sm:text-xl font-semibold text-gray-900", children: "Edit Category" }), _jsx("p", { className: "text-xs sm:text-sm text-gray-500 hidden sm:block", children: "Update category information" })] })] }), _jsx("button", { onClick: handleClose, disabled: isDisabled, className: "p-1.5 sm:p-2 hover:bg-white/50 rounded-lg transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed", children: _jsx(X, { className: "w-4 h-4 sm:w-5 sm:h-5 text-gray-500" }) })] }), _jsx("form", { onSubmit: handleSubmit, className: "p-3 sm:p-4 md:p-6 overflow-y-auto max-h-[calc(98vh-140px)] sm:max-h-[calc(95vh-160px)]", children: _jsxs("div", { className: "space-y-4 sm:space-y-6", children: [_jsxs("div", { className: "space-y-2 sm:space-y-3", children: [_jsxs("label", { className: "flex items-center space-x-2 text-xs sm:text-sm font-medium text-gray-700", children: [_jsx(ImageIcon, { className: "w-3 h-3 sm:w-4 sm:h-4 text-blue-500" }), _jsx("span", { children: "Category Image" }), _jsx("span", { className: "text-gray-400", children: "(Optional)" })] }), _jsxs("div", { className: "flex flex-col items-center space-y-3 sm:space-y-4", children: [_jsx("div", { className: "w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl flex items-center justify-center overflow-hidden border-2 border-dashed border-gray-300", children: imagePreview ? (_jsx("img", { src: imagePreview, alt: "Preview", className: "w-full h-full object-cover" })) : (_jsxs("div", { className: "text-center", children: [_jsx(ImageIcon, { className: "w-6 h-6 sm:w-8 sm:h-8 text-gray-400 mx-auto mb-1" }), _jsx("p", { className: "text-xs text-gray-500", children: "No image" })] })) }), _jsxs("div", { className: "flex flex-col sm:flex-row gap-2 sm:gap-3", children: [_jsxs("button", { type: "button", onClick: function () { var _a; return (_a = fileInputRef.current) === null || _a === void 0 ? void 0 : _a.click(); }, disabled: isDisabled, className: "flex items-center space-x-2 px-3 sm:px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm", children: [_jsx(Upload, { className: "w-4 h-4" }), _jsx("span", { children: "Upload Image" })] }), imagePreview && (_jsx("button", { type: "button", onClick: removeImage, disabled: isDisabled, className: "px-3 sm:px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm", children: "Remove" }))] }), _jsx("input", { ref: fileInputRef, type: "file", accept: "image/*", onChange: handleImageChange, className: "hidden", disabled: isDisabled }), errors.image && (_jsx("p", { className: "text-red-500 text-xs sm:text-sm", children: errors.image })), formData.image && (_jsx("p", { className: "text-green-600 text-xs sm:text-sm", children: "New image selected" }))] })] }), _jsxs("div", { className: "space-y-2 sm:space-y-3", children: [_jsxs("label", { className: "flex items-center space-x-2 text-xs sm:text-sm font-medium text-gray-700", children: [_jsx(Tag, { className: "w-3 h-3 sm:w-4 sm:h-4 text-blue-500" }), _jsx("span", { children: "Category Name *" })] }), _jsx("input", { type: "text", value: formData.name, onChange: function (e) { return handleNameChange(e.target.value); }, placeholder: "Enter category name", disabled: isDisabled, className: "w-full p-3 sm:p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg sm:rounded-xl border text-sm sm:text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed ".concat(errors.name ? 'border-red-300' : 'border-blue-100') }), errors.name && (_jsx("p", { className: "text-red-500 text-xs sm:text-sm", children: errors.name }))] }), _jsxs("div", { className: "space-y-2 sm:space-y-3", children: [_jsxs("label", { className: "flex items-center space-x-2 text-xs sm:text-sm font-medium text-gray-700", children: [_jsx(FileText, { className: "w-3 h-3 sm:w-4 sm:h-4 text-purple-500" }), _jsx("span", { children: "Description" }), _jsx("span", { className: "text-gray-400", children: "(Optional)" })] }), _jsx("textarea", { value: formData.description, onChange: function (e) { return handleDescriptionChange(e.target.value); }, placeholder: "Enter category description...", rows: 4, disabled: isDisabled, className: "w-full p-3 sm:p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg sm:rounded-xl border text-sm sm:text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed resize-none ".concat(errors.description ? 'border-red-300' : 'border-purple-100') }), errors.description && (_jsx("p", { className: "text-red-500 text-xs sm:text-sm", children: errors.description })), _jsxs("p", { className: "text-xs text-gray-500", children: [formData.description.length, "/500 characters"] })] })] }) }), _jsxs("div", { className: "flex items-center justify-end space-x-3 p-4 sm:p-6 border-t border-gray-200 bg-gradient-to-r from-gray-50 to-slate-50", children: [_jsx("button", { type: "button", onClick: handleClose, disabled: isDisabled, className: "px-4 sm:px-6 py-2 sm:py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg sm:rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 hover:scale-105 font-medium disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base", children: "Cancel" }), _jsxs("button", { onClick: handleSubmit, disabled: isDisabled, className: "flex items-center space-x-2 px-4 sm:px-6 py-2 sm:py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg sm:rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base", children: [isUpdating && _jsx(Loader2, { className: "w-4 h-4 animate-spin" }), _jsx("span", { children: isUpdating ? 'Updating...' : 'Update Category' })] })] })] }) })] }));
};
