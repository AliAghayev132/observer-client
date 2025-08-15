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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// components/admin/users/UsersFilter/UsersFilter.tsx
import { useState, useEffect } from 'react';
import { Search, Filter, X, Calendar, Users, UserCheck, UserX, Shield } from 'lucide-react';
export var UsersFilter = function (_a) {
    var filters = _a.filters, onFiltersChange = _a.onFiltersChange, totalUsers = _a.totalUsers, filteredUsers = _a.filteredUsers, _b = _a.isLoading, isLoading = _b === void 0 ? false : _b;
    var _c = useState(false), isAdvancedOpen = _c[0], setIsAdvancedOpen = _c[1];
    var _d = useState(filters), localFilters = _d[0], setLocalFilters = _d[1];
    // Update local filters when props change
    useEffect(function () {
        setLocalFilters(filters);
    }, [filters]);
    // Apply filters with debounce for search
    useEffect(function () {
        var timeoutId = setTimeout(function () {
            if (localFilters.search !== filters.search) {
                onFiltersChange(localFilters);
            }
        }, 300);
        return function () { return clearTimeout(timeoutId); };
    }, [localFilters.search]);
    // Apply other filters immediately
    useEffect(function () {
        var search = localFilters.search, otherFilters = __rest(localFilters, ["search"]);
        var currentSearch = filters.search, currentOtherFilters = __rest(filters, ["search"]);
        if (JSON.stringify(otherFilters) !== JSON.stringify(currentOtherFilters)) {
            onFiltersChange(localFilters);
        }
    }, [localFilters.status, localFilters.emailVerified, localFilters.gender, localFilters.dateRange, localFilters.sortBy, localFilters.sortOrder]);
    var handleFilterChange = function (key, value) {
        setLocalFilters(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[key] = value, _a)));
        });
    };
    var handleDateRangeChange = function (type, value) {
        setLocalFilters(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), { dateRange: __assign(__assign({}, prev.dateRange), (_a = {}, _a[type] = value, _a)) }));
        });
    };
    var resetFilters = function () {
        var defaultFilters = {
            search: '',
            status: 'all',
            emailVerified: 'all',
            gender: 'all',
            dateRange: { from: '', to: '' },
            sortBy: 'createdAt',
            sortOrder: 'desc'
        };
        setLocalFilters(defaultFilters);
        onFiltersChange(defaultFilters);
        setIsAdvancedOpen(false);
    };
    var hasActiveFilters = function () {
        return (localFilters.search !== '' ||
            localFilters.status !== 'all' ||
            localFilters.emailVerified !== 'all' ||
            localFilters.gender !== 'all' ||
            localFilters.dateRange.from !== '' ||
            localFilters.dateRange.to !== '' ||
            localFilters.sortBy !== 'createdAt' ||
            localFilters.sortOrder !== 'desc');
    };
    var getStatusIcon = function (status) {
        switch (status) {
            case 'active': return _jsx(UserCheck, { className: "w-4 h-4" });
            case 'blocked': return _jsx(Shield, { className: "w-4 h-4" });
            case 'deleted': return _jsx(UserX, { className: "w-4 h-4" });
            default: return _jsx(Users, { className: "w-4 h-4" });
        }
    };
    return (_jsxs("div", { className: "bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-4", children: [_jsx("h3", { className: "text-lg font-semibold text-gray-900", children: "Filter Users" }), _jsxs("div", { className: "text-sm text-gray-600", children: ["Showing ", filteredUsers, " of ", totalUsers, " users"] })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [hasActiveFilters() && (_jsxs("button", { onClick: resetFilters, className: "inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors", children: [_jsx(X, { className: "w-4 h-4 mr-1" }), "Clear All"] })), _jsxs("button", { onClick: function () { return setIsAdvancedOpen(!isAdvancedOpen); }, className: "inline-flex items-center px-3 py-1.5 text-sm font-medium border rounded-lg transition-colors ".concat(isAdvancedOpen
                                    ? 'text-blue-700 bg-blue-50 border-blue-200'
                                    : 'text-gray-700 bg-white border-gray-300 hover:bg-gray-50'), children: [_jsx(Filter, { className: "w-4 h-4 mr-1" }), "Advanced"] })] })] }), _jsxs("div", { className: "relative", children: [_jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" }), _jsx("input", { type: "text", placeholder: "Search by name, email, or phone...", value: localFilters.search, onChange: function (e) { return handleFilterChange('search', e.target.value); }, className: "w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500", disabled: isLoading }), localFilters.search && (_jsx("button", { onClick: function () { return handleFilterChange('search', ''); }, className: "absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600", children: _jsx(X, { className: "w-4 h-4" }) }))] }), _jsxs("div", { className: "flex flex-wrap gap-2", children: [_jsxs("div", { className: "flex items-center space-x-1", children: [_jsx("span", { className: "text-sm font-medium text-gray-700", children: "Status:" }), _jsxs("select", { value: localFilters.status, onChange: function (e) { return handleFilterChange('status', e.target.value); }, className: "text-sm border border-gray-300 rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500", disabled: isLoading, children: [_jsx("option", { value: "all", children: "All Status" }), _jsx("option", { value: "active", children: "Active" }), _jsx("option", { value: "blocked", children: "Blocked" }), _jsx("option", { value: "deleted", children: "Deleted" })] })] }), _jsxs("div", { className: "flex items-center space-x-1", children: [_jsx("span", { className: "text-sm font-medium text-gray-700", children: "Email:" }), _jsxs("select", { value: localFilters.emailVerified, onChange: function (e) { return handleFilterChange('emailVerified', e.target.value); }, className: "text-sm border border-gray-300 rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500", disabled: isLoading, children: [_jsx("option", { value: "all", children: "All" }), _jsx("option", { value: "verified", children: "Verified" }), _jsx("option", { value: "unverified", children: "Unverified" })] })] }), _jsxs("div", { className: "flex items-center space-x-1", children: [_jsx("span", { className: "text-sm font-medium text-gray-700", children: "Sort:" }), _jsxs("select", { value: "".concat(localFilters.sortBy, "-").concat(localFilters.sortOrder), onChange: function (e) {
                                    var _a = e.target.value.split('-'), sortBy = _a[0], sortOrder = _a[1];
                                    handleFilterChange('sortBy', sortBy);
                                    handleFilterChange('sortOrder', sortOrder);
                                }, className: "text-sm border border-gray-300 rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500", disabled: isLoading, children: [_jsx("option", { value: "createdAt-desc", children: "Newest First" }), _jsx("option", { value: "createdAt-asc", children: "Oldest First" }), _jsx("option", { value: "firstName-asc", children: "Name A-Z" }), _jsx("option", { value: "firstName-desc", children: "Name Z-A" }), _jsx("option", { value: "email-asc", children: "Email A-Z" }), _jsx("option", { value: "email-desc", children: "Email Z-A" })] })] })] }), isAdvancedOpen && (_jsx("div", { className: "border-t border-gray-200 pt-4 space-y-4", children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Gender" }), _jsxs("select", { value: localFilters.gender, onChange: function (e) { return handleFilterChange('gender', e.target.value); }, className: "w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500", disabled: isLoading, children: [_jsx("option", { value: "all", children: "All Genders" }), _jsx("option", { value: "male", children: "Male" }), _jsx("option", { value: "female", children: "Female" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Created From" }), _jsx("input", { type: "date", value: localFilters.dateRange.from, onChange: function (e) { return handleDateRangeChange('from', e.target.value); }, className: "w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500", disabled: isLoading })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Created To" }), _jsx("input", { type: "date", value: localFilters.dateRange.to, onChange: function (e) { return handleDateRangeChange('to', e.target.value); }, className: "w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500", disabled: isLoading })] })] }) })), hasActiveFilters() && (_jsxs("div", { className: "flex flex-wrap gap-2 pt-2 border-t border-gray-100", children: [_jsx("span", { className: "text-sm font-medium text-gray-700", children: "Active filters:" }), localFilters.search && (_jsxs("span", { className: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800", children: ["Search: \"", localFilters.search, "\"", _jsx("button", { onClick: function () { return handleFilterChange('search', ''); }, className: "ml-1 hover:text-blue-600", children: _jsx(X, { className: "w-3 h-3" }) })] })), localFilters.status !== 'all' && (_jsxs("span", { className: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800", children: [getStatusIcon(localFilters.status), _jsxs("span", { className: "ml-1", children: ["Status: ", localFilters.status] }), _jsx("button", { onClick: function () { return handleFilterChange('status', 'all'); }, className: "ml-1 hover:text-green-600", children: _jsx(X, { className: "w-3 h-3" }) })] })), localFilters.emailVerified !== 'all' && (_jsxs("span", { className: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800", children: ["Email: ", localFilters.emailVerified, _jsx("button", { onClick: function () { return handleFilterChange('emailVerified', 'all'); }, className: "ml-1 hover:text-purple-600", children: _jsx(X, { className: "w-3 h-3" }) })] })), localFilters.gender !== 'all' && (_jsxs("span", { className: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-pink-100 text-pink-800", children: ["Gender: ", localFilters.gender, _jsx("button", { onClick: function () { return handleFilterChange('gender', 'all'); }, className: "ml-1 hover:text-pink-600", children: _jsx(X, { className: "w-3 h-3" }) })] })), (localFilters.dateRange.from || localFilters.dateRange.to) && (_jsxs("span", { className: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800", children: [_jsx(Calendar, { className: "w-3 h-3 mr-1" }), "Date Range", _jsx("button", { onClick: function () { return handleFilterChange('dateRange', { from: '', to: '' }); }, className: "ml-1 hover:text-orange-600", children: _jsx(X, { className: "w-3 h-3" }) })] }))] }))] }));
};
