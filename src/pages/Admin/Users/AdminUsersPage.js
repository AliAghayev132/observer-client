import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// pages/admin/AdminUsersPage.tsx
// React
import { useState } from 'react';
// Components
import { UsersTable } from './UsersTable';
import { UsersHeader } from './UsersHeader';
import { LoadingSpinner } from '@/components/LoadingSpinner/LoadingSpinner';
// RTK
import { useGetUsersQuery, } from '@/redux/admin/users/adminUsersApi';
export var AdminUsersPage = function () {
    var filters = useState({
        page: 1,
        limit: 10,
        isBlocked: undefined,
        isDeleted: undefined,
        gender: undefined,
        sortBy: 'createdAt',
        sortOrder: 'desc'
    })[0];
    var _a = useGetUsersQuery(filters), data = _a.data, isLoading = _a.isLoading, isFetching = _a.isFetching, error = _a.error;
    // Error message helper
    var getErrorMessage = function (error) {
        if (!error)
            return '';
        // RTK Query error structure
        if ('status' in error) {
            // FetchBaseQueryError
            if ('data' in error && error.data) {
                if (typeof error.data === 'string')
                    return error.data;
                if (typeof error.data === 'object' && 'message' in error.data) {
                    return error.data.message;
                }
            }
            return "Error ".concat(error.status, ": Failed to load users");
        }
        // SerializedError
        if ('message' in error) {
            return error.message || 'Failed to load users';
        }
        return 'An unexpected error occurred';
    };
    if (isLoading || isFetching) {
        return _jsx(LoadingSpinner, { text: "Loading users..." });
    }
    return (_jsx("div", { className: "min-h-screen bg-gray-50 p-6", children: _jsxs("div", { className: "max-w-7xl mx-auto space-y-6", children: [_jsx(UsersHeader, { totalUsers: (data === null || data === void 0 ? void 0 : data.pagination.totalUsers) || 0 }), _jsx(UsersTable, { users: (data === null || data === void 0 ? void 0 : data.data) || [], isLoading: isLoading, error: getErrorMessage(error), searchTerm: filters.email || filters.firstName || filters.secondName })] }) }));
};
