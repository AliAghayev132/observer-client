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
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
// components/admin/categories/CategoriesTable.tsx
import { useState } from 'react';
// Icons
import { Eye, Image as ImageIcon, Calendar, Trash2, RotateCcw, Edit3 } from 'lucide-react';
// Api
import { useDeleteCategoryMutation, useRestoreCategoryMutation, } from '@/redux/admin/categories/adminCategoriesApi';
// Utils
import { getCategoryImageUrl } from '@/utils/imageHandler';
// Components
import { CategoryViewModal } from '../CategoryViewModal/CategoryViewModal';
import { CategoryEditModal } from '../CategoryEditModal/CategoryEditModal';
// Toast
import { showLoadingToast, showSuccessToast, showErrorToast } from '@/utils/toastConfig';
import toast from 'react-hot-toast';
// SweetAlert2
import Swal from 'sweetalert2';
export var CategoriesTable = function (_a) {
    var categories = _a.categories, isLoading = _a.isLoading, error = _a.error, searchTerm = _a.searchTerm;
    var _b = useState(null), selectedCategory = _b[0], setSelectedCategory = _b[1];
    var _c = useState(false), isViewModalOpen = _c[0], setIsViewModalOpen = _c[1];
    var _d = useState(false), isEditModalOpen = _d[0], setIsEditModalOpen = _d[1];
    // RTK Mutations
    var _e = useDeleteCategoryMutation(), deleteCategory = _e[0], isDeleting = _e[1].isLoading;
    var _f = useRestoreCategoryMutation(), restoreCategory = _f[0], isRestoring = _f[1].isLoading;
    var handleViewCategory = function (category) {
        setSelectedCategory(category);
        setIsViewModalOpen(true);
    };
    var handleEditCategory = function (category) {
        setSelectedCategory(category);
        setIsEditModalOpen(true);
    };
    var handleCloseViewModal = function () {
        setIsViewModalOpen(false);
        setSelectedCategory(null);
    };
    var handleCloseEditModal = function () {
        setIsEditModalOpen(false);
        setSelectedCategory(null);
    };
    var handleDeleteCategory = function (category) { return __awaiter(void 0, void 0, void 0, function () {
        var result, loadingToastId, error_1, errorMessage, error_2;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 8, , 9]);
                    return [4 /*yield*/, Swal.fire({
                            title: 'Delete Category?',
                            html: "\n                    <div class=\"text-center\">\n                        <div class=\"mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4\">\n                            <svg class=\"h-6 w-6 text-red-600\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\">\n                                <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16\" />\n                            </svg>\n                        </div>\n                        <p class=\"text-sm text-gray-600 mb-2\">Are you sure you want to delete</p>\n                        <p class=\"font-semibold text-gray-900 mb-4\">\"".concat(category.name, "\"?</p>\n                        <div class=\"bg-red-50 border border-red-200 rounded-lg p-3 mb-4\">\n                            <p class=\"text-xs text-red-700\">\n                                <strong>Warning:</strong> This action will soft delete the category.\n                            </p>\n                        </div>\n                    </div>\n                "),
                            icon: 'warning',
                            showCancelButton: true,
                            confirmButtonColor: '#EF4444',
                            cancelButtonColor: '#6B7280',
                            confirmButtonText: 'Yes, Delete',
                            cancelButtonText: 'Cancel',
                            reverseButtons: true,
                            customClass: {
                                popup: 'rounded-2xl shadow-2xl',
                                title: 'text-xl font-semibold text-gray-900',
                                confirmButton: 'px-6 py-2.5 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200',
                                cancelButton: 'px-6 py-2.5 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200',
                            },
                            buttonsStyling: true,
                            focusConfirm: false,
                            focusCancel: true,
                        })];
                case 1:
                    result = _b.sent();
                    if (!result.isConfirmed) return [3 /*break*/, 7];
                    loadingToastId = showLoadingToast("Deleting \"".concat(category.name, "\"..."));
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 5, , 7]);
                    return [4 /*yield*/, deleteCategory(category._id).unwrap()];
                case 3:
                    _b.sent();
                    toast.dismiss(loadingToastId);
                    showSuccessToast("Category \"".concat(category.name, "\" deleted successfully!"));
                    // Show success animation
                    return [4 /*yield*/, Swal.fire({
                            title: 'Deleted!',
                            text: "Category \"".concat(category.name, "\" has been deleted."),
                            icon: 'success',
                            timer: 2000,
                            showConfirmButton: false,
                            customClass: {
                                popup: 'rounded-2xl',
                            },
                        })];
                case 4:
                    // Show success animation
                    _b.sent();
                    return [3 /*break*/, 7];
                case 5:
                    error_1 = _b.sent();
                    toast.dismiss(loadingToastId);
                    errorMessage = ((_a = error_1 === null || error_1 === void 0 ? void 0 : error_1.data) === null || _a === void 0 ? void 0 : _a.message) ||
                        (error_1 === null || error_1 === void 0 ? void 0 : error_1.message) ||
                        'Failed to delete category. Please try again.';
                    showErrorToast(errorMessage);
                    // Show error animation
                    return [4 /*yield*/, Swal.fire({
                            title: 'Error!',
                            text: errorMessage,
                            icon: 'error',
                            confirmButtonColor: '#EF4444',
                            customClass: {
                                popup: 'rounded-2xl',
                                confirmButton: 'px-6 py-2.5 rounded-lg font-medium',
                            },
                        })];
                case 6:
                    // Show error animation
                    _b.sent();
                    return [3 /*break*/, 7];
                case 7: return [3 /*break*/, 9];
                case 8:
                    error_2 = _b.sent();
                    console.error('Error in delete confirmation:', error_2);
                    showErrorToast('An unexpected error occurred');
                    return [3 /*break*/, 9];
                case 9: return [2 /*return*/];
            }
        });
    }); };
    var handleRestoreCategory = function (category) { return __awaiter(void 0, void 0, void 0, function () {
        var result, loadingToastId, error_3, errorMessage, error_4;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 8, , 9]);
                    return [4 /*yield*/, Swal.fire({
                            title: 'Restore Category?',
                            html: "\n                    <div class=\"text-center\">\n                        <div class=\"mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4\">\n                            <svg class=\"h-6 w-6 text-green-600\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\">\n                                <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z\" />\n                            </svg>\n                        </div>\n                        <p class=\"text-sm text-gray-600 mb-2\">Are you sure you want to restore</p>\n                        <p class=\"font-semibold text-gray-900\">\"".concat(category.name, "\"?</p>\n                        <div class=\"bg-green-50 border border-green-200 rounded-lg p-3 mt-4\">\n                            <p class=\"text-xs text-green-700\">\n                                This will make the category active and available again.\n                            </p>\n                        </div>\n                    </div>\n                "),
                            icon: 'question',
                            showCancelButton: true,
                            confirmButtonColor: '#10B981',
                            cancelButtonColor: '#6B7280',
                            confirmButtonText: 'Yes, Restore',
                            cancelButtonText: 'Cancel',
                            reverseButtons: true,
                            customClass: {
                                popup: 'rounded-2xl shadow-2xl',
                                title: 'text-xl font-semibold text-gray-900',
                                confirmButton: 'px-6 py-2.5 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200',
                                cancelButton: 'px-6 py-2.5 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200',
                            },
                            buttonsStyling: true,
                        })];
                case 1:
                    result = _b.sent();
                    if (!result.isConfirmed) return [3 /*break*/, 7];
                    loadingToastId = showLoadingToast("Restoring \"".concat(category.name, "\"..."));
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 5, , 7]);
                    return [4 /*yield*/, restoreCategory(category._id).unwrap()];
                case 3:
                    _b.sent();
                    toast.dismiss(loadingToastId);
                    showSuccessToast("Category \"".concat(category.name, "\" restored successfully!"));
                    // Show success animation
                    return [4 /*yield*/, Swal.fire({
                            title: 'Restored!',
                            text: "Category \"".concat(category.name, "\" has been restored."),
                            icon: 'success',
                            timer: 2000,
                            showConfirmButton: false,
                            customClass: {
                                popup: 'rounded-2xl',
                            },
                        })];
                case 4:
                    // Show success animation
                    _b.sent();
                    return [3 /*break*/, 7];
                case 5:
                    error_3 = _b.sent();
                    toast.dismiss(loadingToastId);
                    errorMessage = ((_a = error_3 === null || error_3 === void 0 ? void 0 : error_3.data) === null || _a === void 0 ? void 0 : _a.message) ||
                        (error_3 === null || error_3 === void 0 ? void 0 : error_3.message) ||
                        'Failed to restore category. Please try again.';
                    showErrorToast(errorMessage);
                    // Show error animation
                    return [4 /*yield*/, Swal.fire({
                            title: 'Error!',
                            text: errorMessage,
                            icon: 'error',
                            confirmButtonColor: '#EF4444',
                            customClass: {
                                popup: 'rounded-2xl',
                                confirmButton: 'px-6 py-2.5 rounded-lg font-medium',
                            },
                        })];
                case 6:
                    // Show error animation
                    _b.sent();
                    return [3 /*break*/, 7];
                case 7: return [3 /*break*/, 9];
                case 8:
                    error_4 = _b.sent();
                    console.error('Error in restore confirmation:', error_4);
                    showErrorToast('An unexpected error occurred');
                    return [3 /*break*/, 9];
                case 9: return [2 /*return*/];
            }
        });
    }); };
    if (error) {
        return (_jsx("div", { className: "bg-white rounded-xl shadow-sm border border-gray-200 p-8", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-red-500 text-lg font-medium", children: "Error loading categories" }), _jsx("p", { className: "text-gray-600 mt-2", children: "Please try again later" })] }) }));
    }
    if (!isLoading && categories.length === 0) {
        return (_jsx("div", { className: "bg-white rounded-xl shadow-sm border border-gray-200 p-8", children: _jsxs("div", { className: "text-center", children: [_jsx(ImageIcon, { className: "w-16 h-16 text-gray-300 mx-auto mb-4" }), _jsx("div", { className: "text-gray-500 text-lg font-medium", children: "No categories found" }), _jsx("p", { className: "text-gray-400 mt-2", children: searchTerm ? 'Try adjusting your search criteria' : 'Create your first category to get started' })] }) }));
    }
    return (_jsxs(_Fragment, { children: [_jsxs("div", { className: "bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden", children: [_jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full", children: [_jsx("thead", { className: "bg-gray-50 border-b border-gray-200", children: _jsxs("tr", { children: [_jsx("th", { className: "text-left py-4 px-6 font-semibold text-gray-900", children: "Category" }), _jsx("th", { className: "text-left py-4 px-6 font-semibold text-gray-900", children: "Description" }), _jsx("th", { className: "text-left py-4 px-6 font-semibold text-gray-900", children: "Status" }), _jsx("th", { className: "text-left py-4 px-6 font-semibold text-gray-900", children: "Created" }), _jsx("th", { className: "text-left py-4 px-6 font-semibold text-gray-900", children: "Actions" })] }) }), _jsx("tbody", { className: "divide-y divide-gray-200", children: categories.map(function (category) { return (_jsxs("tr", { className: "hover:bg-gray-50 transition-colors", children: [_jsx("td", { className: "py-4 px-6", children: _jsxs("div", { className: "flex items-center space-x-3", children: [_jsxs("div", { className: "w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden", children: [category.image ? (_jsx("img", { src: getCategoryImageUrl(category.image), alt: category.name, className: "w-full h-full object-cover", onError: function (e) {
                                                                        var _a;
                                                                        var target = e.target;
                                                                        target.style.display = 'none';
                                                                        (_a = target.nextElementSibling) === null || _a === void 0 ? void 0 : _a.classList.remove('hidden');
                                                                    } })) : (_jsx(ImageIcon, { className: "w-6 h-6 text-gray-400" })), _jsx(ImageIcon, { className: "w-6 h-6 text-gray-400 hidden" })] }), _jsxs("div", { children: [_jsx("div", { className: "font-medium text-gray-900", children: category.name }), _jsx("div", { className: "text-sm text-gray-500", children: category.slug })] })] }) }), _jsx("td", { className: "py-4 px-6", children: _jsx("div", { className: "text-gray-900 max-w-xs truncate", children: category.description || 'No description' }) }), _jsx("td", { className: "py-4 px-6", children: _jsx("span", { className: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ".concat(category.isDeleted
                                                        ? 'bg-red-100 text-red-800'
                                                        : 'bg-green-100 text-green-800'), children: category.isDeleted ? 'Deleted' : 'Active' }) }), _jsx("td", { className: "py-4 px-6", children: _jsxs("div", { className: "flex items-center space-x-1 text-gray-600", children: [_jsx(Calendar, { className: "w-4 h-4" }), _jsx("span", { className: "text-sm", children: category.formattedCreatedAt })] }) }), _jsx("td", { className: "py-4 px-6", children: _jsxs("div", { className: "flex items-center space-x-2", children: [_jsxs("button", { onClick: function () { return handleViewCategory(category); }, className: "inline-flex items-center px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 hover:border-blue-300 transition-colors", title: "View Details", children: [_jsx(Eye, { className: "w-3.5 h-3.5 mr-1" }), "View"] }), !category.isDeleted && (_jsxs("button", { onClick: function () { return handleEditCategory(category); }, className: "inline-flex items-center px-3 py-1.5 text-xs font-medium text-amber-700 bg-amber-50 border border-amber-200 rounded-lg hover:bg-amber-100 hover:border-amber-300 transition-colors", title: "Edit Category", children: [_jsx(Edit3, { className: "w-3.5 h-3.5 mr-1" }), "Edit"] })), category.isDeleted ? (_jsxs("button", { onClick: function () { return handleRestoreCategory(category); }, disabled: isRestoring, className: "inline-flex items-center px-3 py-1.5 text-xs font-medium text-green-700 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 hover:border-green-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed", title: "Restore Category", children: [_jsx(RotateCcw, { className: "w-3.5 h-3.5 mr-1" }), isRestoring ? 'Restoring...' : 'Restore'] })) : (_jsxs("button", { onClick: function () { return handleDeleteCategory(category); }, disabled: isDeleting, className: "inline-flex items-center px-3 py-1.5 text-xs font-medium text-red-700 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 hover:border-red-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed", title: "Delete Category", children: [_jsx(Trash2, { className: "w-3.5 h-3.5 mr-1" }), isDeleting ? 'Deleting...' : 'Delete'] }))] }) })] }, category._id)); }) })] }) }), (isDeleting || isRestoring) && (_jsx("div", { className: "absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center", children: _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("div", { className: "animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600" }), _jsx("span", { className: "text-sm text-gray-600", children: isDeleting ? 'Deleting...' : 'Restoring...' })] }) }))] }), _jsx(CategoryViewModal, { category: selectedCategory, isOpen: isViewModalOpen, onClose: handleCloseViewModal }), _jsx(CategoryEditModal, { category: selectedCategory, isOpen: isEditModalOpen, onClose: handleCloseEditModal })] }));
};
