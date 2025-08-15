import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { ChevronLeft, ChevronRight } from 'lucide-react';
export var CategoriesPagination = function (_a) {
    var pagination = _a.pagination, onPageChange = _a.onPageChange;
    var totalCategories = pagination.totalCategories, totalPages = pagination.totalPages, currentPage = pagination.currentPage, limit = pagination.limit;
    var startItem = (currentPage - 1) * limit + 1;
    var endItem = Math.min(currentPage * limit, totalCategories);
    var getPageNumbers = function () {
        var pages = [];
        var maxVisiblePages = 5;
        var startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        var endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }
        for (var i = startPage; i <= endPage; i++) {
            pages.push(i);
        }
        return pages;
    };
    if (totalPages <= 1)
        return null;
    return (_jsx("div", { className: "bg-white rounded-xl shadow-sm border border-gray-200 p-4", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "text-sm text-gray-600", children: ["Showing ", startItem, " to ", endItem, " of ", totalCategories, " categories"] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsxs("button", { onClick: function () { return onPageChange(currentPage - 1); }, disabled: currentPage === 1, className: "flex items-center space-x-1 px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors", children: [_jsx(ChevronLeft, { className: "w-4 h-4" }), _jsx("span", { children: "Previous" })] }), _jsx("div", { className: "flex items-center space-x-1", children: getPageNumbers().map(function (page) { return (_jsx("button", { onClick: function () { return onPageChange(page); }, className: "px-3 py-2 text-sm font-medium rounded-lg transition-colors ".concat(page === currentPage
                                    ? 'bg-blue-600 text-white'
                                    : 'text-gray-700 hover:bg-gray-100'), children: page }, page)); }) }), _jsxs("button", { onClick: function () { return onPageChange(currentPage + 1); }, disabled: currentPage === totalPages, className: "flex items-center space-x-1 px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors", children: [_jsx("span", { children: "Next" }), _jsx(ChevronRight, { className: "w-4 h-4" })] })] })] }) }));
};
