import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// components/admin/users/UsersPagination/UsersPagination.tsx
import React from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
export var UsersPagination = function (_a) {
    var pagination = _a.pagination, onPageChange = _a.onPageChange, onItemsPerPageChange = _a.onItemsPerPageChange, _b = _a.isLoading, isLoading = _b === void 0 ? false : _b;
    var currentPage = pagination.currentPage, totalPages = pagination.totalPages, totalItems = pagination.totalItems, itemsPerPage = pagination.itemsPerPage, hasNextPage = pagination.hasNextPage, hasPrevPage = pagination.hasPrevPage;
    // Calculate visible page numbers
    var getVisiblePages = function () {
        var delta = 2; // Number of pages to show on each side of current page
        var range = [];
        var rangeWithDots = [];
        // Calculate start and end of visible range
        var start = Math.max(1, currentPage - delta);
        var end = Math.min(totalPages, currentPage + delta);
        // Create range array
        for (var i = start; i <= end; i++) {
            range.push(i);
        }
        // Add first page and dots if needed
        if (start > 1) {
            rangeWithDots.push(1);
            if (start > 2) {
                rangeWithDots.push('...');
            }
        }
        // Add visible pages
        rangeWithDots.push.apply(rangeWithDots, range);
        // Add last page and dots if needed
        if (end < totalPages) {
            if (end < totalPages - 1) {
                rangeWithDots.push('...');
            }
            rangeWithDots.push(totalPages);
        }
        return rangeWithDots;
    };
    var visiblePages = getVisiblePages();
    // Calculate current items range
    var startItem = (currentPage - 1) * itemsPerPage + 1;
    var endItem = Math.min(currentPage * itemsPerPage, totalItems);
    var handlePageChange = function (page) {
        if (page >= 1 && page <= totalPages && page !== currentPage && !isLoading) {
            onPageChange(page);
        }
    };
    var handleItemsPerPageChange = function (newItemsPerPage) {
        if (newItemsPerPage !== itemsPerPage && !isLoading) {
            onItemsPerPageChange(newItemsPerPage);
        }
    };
    // Don't render if no items
    if (totalItems === 0) {
        return null;
    }
    return (_jsxs("div", { className: "bg-white rounded-xl shadow-sm border border-gray-200 px-6 py-4", children: [_jsxs("div", { className: "flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("span", { className: "text-sm text-gray-700", children: "Show" }), _jsxs("select", { value: itemsPerPage, onChange: function (e) { return handleItemsPerPageChange(Number(e.target.value)); }, className: "border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500", disabled: isLoading, children: [_jsx("option", { value: 10, children: "10" }), _jsx("option", { value: 25, children: "25" }), _jsx("option", { value: 50, children: "50" }), _jsx("option", { value: 100, children: "100" })] }), _jsx("span", { className: "text-sm text-gray-700", children: "per page" })] }), _jsxs("div", { className: "text-sm text-gray-700", children: ["Showing ", _jsx("span", { className: "font-medium", children: startItem }), " to", ' ', _jsx("span", { className: "font-medium", children: endItem }), " of", ' ', _jsx("span", { className: "font-medium", children: totalItems }), " results"] }), _jsxs("div", { className: "flex items-center space-x-1", children: [_jsx("button", { onClick: function () { return handlePageChange(1); }, disabled: !hasPrevPage || isLoading, className: "p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors", title: "First page", children: _jsx(ChevronsLeft, { className: "w-4 h-4" }) }), _jsx("button", { onClick: function () { return handlePageChange(currentPage - 1); }, disabled: !hasPrevPage || isLoading, className: "p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors", title: "Previous page", children: _jsx(ChevronLeft, { className: "w-4 h-4" }) }), _jsx("div", { className: "flex items-center space-x-1", children: visiblePages.map(function (page, index) { return (_jsx(React.Fragment, { children: page === '...' ? (_jsx("span", { className: "px-3 py-2 text-gray-500", children: "..." })) : (_jsx("button", { onClick: function () { return handlePageChange(page); }, disabled: isLoading, className: "px-3 py-2 text-sm font-medium rounded-lg transition-colors ".concat(page === currentPage
                                            ? 'bg-blue-600 text-white'
                                            : 'text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed'), children: page })) }, index)); }) }), _jsx("button", { onClick: function () { return handlePageChange(currentPage + 1); }, disabled: !hasNextPage || isLoading, className: "p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors", title: "Next page", children: _jsx(ChevronRight, { className: "w-4 h-4" }) }), _jsx("button", { onClick: function () { return handlePageChange(totalPages); }, disabled: !hasNextPage || isLoading, className: "p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors", title: "Last page", children: _jsx(ChevronsRight, { className: "w-4 h-4" }) })] })] }), isLoading && (_jsx("div", { className: "mt-4 flex items-center justify-center", children: _jsxs("div", { className: "flex items-center space-x-2 text-sm text-gray-600", children: [_jsx("div", { className: "animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600" }), _jsx("span", { children: "Loading..." })] }) }))] }));
};
