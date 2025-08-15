import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// React
import { useEffect, useState } from "react";
// Icons
import { Search, Filter, SortAsc, SortDesc } from "lucide-react";
export var CategoriesFilters = function (_a) {
    var filters = _a.filters, onFilterChange = _a.onFilterChange;
    var _b = useState(filters.name || ""), searchTerm = _b[0], setSearchTerm = _b[1];
    // Debounce search input
    useEffect(function () {
        var timeoutId = setTimeout(function () {
            onFilterChange({
                name: searchTerm || undefined,
                page: 1,
            });
        }, 500); // 500ms debounce
        return function () { return clearTimeout(timeoutId); };
    }, [searchTerm, onFilterChange]);
    var handleStatusChange = function (status) {
        onFilterChange({ status: status, page: 1 });
    };
    var handleSortChange = function (sortBy) {
        var newSortOrder = filters.sortBy === sortBy && filters.sortOrder === "desc" ? "asc" : "desc";
        onFilterChange({ sortBy: sortBy, sortOrder: newSortOrder });
    };
    var handleLimitChange = function (limit) {
        onFilterChange({ limit: limit, page: 1 });
    };
    return (_jsx("div", { className: "bg-white rounded-xl shadow-sm border border-gray-200 p-6", children: _jsxs("div", { className: "flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4", children: [_jsx("div", { className: "flex-1 max-w-md", children: _jsxs("div", { className: "relative", children: [_jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" }), _jsx("input", { type: "text", placeholder: "Search categories...", className: "w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent", value: searchTerm, onChange: function (e) { return setSearchTerm(e.target.value); } })] }) }), _jsxs("div", { className: "flex flex-wrap items-center gap-4", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Filter, { className: "w-5 h-5 text-gray-400" }), _jsxs("select", { value: filters.status, onChange: function (e) {
                                        return handleStatusChange(e.target.value);
                                    }, className: "border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent", children: [_jsx("option", { value: "active", children: "Active" }), _jsx("option", { value: "deleted", children: "Deleted" }), _jsx("option", { value: "all", children: "All" })] })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("span", { className: "text-sm text-gray-600", children: "Sort by:" }), _jsxs("button", { onClick: function () { return handleSortChange("name"); }, className: "flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ".concat(filters.sortBy === "name"
                                        ? "bg-blue-100 text-blue-700"
                                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"), children: [_jsx("span", { children: "Name" }), filters.sortBy === "name" &&
                                            (filters.sortOrder === "asc" ? (_jsx(SortAsc, { className: "w-4 h-4" })) : (_jsx(SortDesc, { className: "w-4 h-4" })))] }), _jsxs("button", { onClick: function () { return handleSortChange("createdAt"); }, className: "flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ".concat(filters.sortBy === "createdAt"
                                        ? "bg-blue-100 text-blue-700"
                                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"), children: [_jsx("span", { children: "Date" }), filters.sortBy === "createdAt" &&
                                            (filters.sortOrder === "asc" ? (_jsx(SortAsc, { className: "w-4 h-4" })) : (_jsx(SortDesc, { className: "w-4 h-4" })))] })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("span", { className: "text-sm text-gray-600", children: "Show:" }), _jsxs("select", { value: filters.limit, onChange: function (e) { return handleLimitChange(Number(e.target.value)); }, className: "border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent", children: [_jsx("option", { value: 5, children: "5" }), _jsx("option", { value: 10, children: "10" }), _jsx("option", { value: 25, children: "25" }), _jsx("option", { value: 50, children: "50" })] })] })] })] }) }));
};
