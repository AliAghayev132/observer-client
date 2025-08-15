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
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
// pages/admin/AdminCategoriesPage.tsx
import { useState } from 'react';
// Components
import { CategoriesTable } from './CategoriesTable/CategoriesTable';
import { CategoriesHeader } from './CategoriesHeader/CategoriesHeader';
import { CategoriesFilters } from './CategoriesFilters/CategoriesFilters';
import { CategoriesPagination } from './CategoriesPagination/CategoriesPagination';
import { AddCategoryModal } from './AddCategoryModal/AddCategoryModal';
// Components
import { LoadingSpinner } from '@/components/LoadingSpinner/LoadingSpinner';
// RTK
import { useGetCategoriesQuery, useCreateCategoryMutation, } from '@/redux/admin/categories/adminCategoriesApi';
// Toast
import { showLoadingToast, showSuccessToast, showErrorToast } from '@/utils/toastConfig';
import toast from 'react-hot-toast';
export var AdminCategoriesPage = function () {
    var _a = useState({
        page: 1,
        limit: 10,
        status: 'active',
        sortBy: 'createdAt',
        sortOrder: 'desc'
    }), filters = _a[0], setFilters = _a[1];
    var _b = useState(false), isAddModalOpen = _b[0], setIsAddModalOpen = _b[1];
    var _c = useGetCategoriesQuery(filters), data = _c.data, isLoading = _c.isLoading, isFetching = _c.isFetching, error = _c.error;
    var _d = useCreateCategoryMutation(), createCategory = _d[0], isCreating = _d[1].isLoading;
    var handleFilterChange = function (newFilters) {
        setFilters(function (prev) { return (__assign(__assign(__assign({}, prev), newFilters), { page: newFilters.page || 1 })); });
    };
    var handlePageChange = function (page) {
        setFilters(function (prev) { return (__assign(__assign({}, prev), { page: page })); });
    };
    // ✅ Return tipini Promise<void> yapın
    var handleAddCategory = function (categoryData) { return __awaiter(void 0, void 0, void 0, function () {
        var loadingToastId, createData, error_1, errorMessage;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    loadingToastId = showLoadingToast('Creating category...');
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    createData = {
                        name: categoryData.name.trim(),
                        description: categoryData.description.trim(),
                        image: categoryData.image || undefined, // null yerine undefined
                    };
                    // ✅ Direkt createData'yı gönderin (API FormData'ya çevirecek)
                    return [4 /*yield*/, createCategory(createData).unwrap()];
                case 2:
                    // ✅ Direkt createData'yı gönderin (API FormData'ya çevirecek)
                    _b.sent();
                    // Dismiss loading toast
                    toast.dismiss(loadingToastId);
                    // Show success toast
                    showSuccessToast("Category \"".concat(categoryData.name, "\" created successfully!"));
                    // Close modal
                    setIsAddModalOpen(false);
                    // Optionally refresh the first page to show the new category
                    if (filters.page !== 1) {
                        setFilters(function (prev) { return (__assign(__assign({}, prev), { page: 1 })); });
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _b.sent();
                    // Dismiss loading toast
                    toast.dismiss(loadingToastId);
                    errorMessage = ((_a = error_1 === null || error_1 === void 0 ? void 0 : error_1.data) === null || _a === void 0 ? void 0 : _a.message) ||
                        (error_1 === null || error_1 === void 0 ? void 0 : error_1.message) ||
                        'Failed to create category. Please try again.';
                    // Show error toast
                    showErrorToast(errorMessage);
                    // Re-throw error so modal can handle it
                    throw new Error(errorMessage);
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var handleOpenAddModal = function () {
        setIsAddModalOpen(true);
    };
    var handleCloseAddModal = function () {
        setIsAddModalOpen(false);
    };
    if (isLoading || isFetching) {
        return _jsx(LoadingSpinner, { text: "Loading categories..." });
    }
    return (_jsxs(_Fragment, { children: [_jsx("div", { className: "min-h-screen bg-gray-50 p-6", children: _jsxs("div", { className: "max-w-7xl mx-auto space-y-6", children: [_jsx(CategoriesHeader, { totalCategories: (data === null || data === void 0 ? void 0 : data.pagination.totalCategories) || 0, onAddCategory: handleOpenAddModal }), _jsx(CategoriesFilters, { filters: filters, onFilterChange: handleFilterChange }), _jsx(CategoriesTable, { categories: (data === null || data === void 0 ? void 0 : data.data) || [], isLoading: isLoading, error: error, searchTerm: filters.name }), (data === null || data === void 0 ? void 0 : data.pagination) && (_jsx(CategoriesPagination, { pagination: data.pagination, onPageChange: handlePageChange }))] }) }), _jsx(AddCategoryModal, { isOpen: isAddModalOpen, onClose: handleCloseAddModal, onSubmit: handleAddCategory, isLoading: isCreating })] }));
};
