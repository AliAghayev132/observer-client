// pages/admin/AdminUsersPage.tsx
// React
import { useState } from 'react';
// Components
import { UsersTable } from './UsersTable';
import { UsersHeader } from './UsersHeader';
import { LoadingSpinner } from '@/components/LoadingSpinner/LoadingSpinner';
// RTK
import {
    GetUsersParams,
    useGetUsersQuery,
} from '@/redux/admin/users/adminUsersApi';

export const AdminUsersPage = () => {
    const [filters] = useState<GetUsersParams>({
        page: 1,
        limit: 10,
        isBlocked: undefined,
        isDeleted: undefined,
        gender: undefined,
        sortBy: 'createdAt',
        sortOrder: 'desc'
    });

    const { data, isLoading, isFetching, error } = useGetUsersQuery(filters);

    // Error message helper
    const getErrorMessage = (error): string => {
        if (!error) return '';

        // RTK Query error structure
        if ('status' in error) {
            // FetchBaseQueryError
            if ('data' in error && error.data) {
                if (typeof error.data === 'string') return error.data;
                if (typeof error.data === 'object' && 'message' in error.data) {
                    return error.data.message as string;
                }
            }
            return `Error ${error.status}: Failed to load users`;
        }

        // SerializedError
        if ('message' in error) {
            return error.message || 'Failed to load users';
        }

        return 'An unexpected error occurred';
    };

    if (isLoading || isFetching) {
        return <LoadingSpinner text="Loading users..." />;
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header */}
                <UsersHeader
                    totalUsers={data?.pagination.totalUsers || 0}
                />

                {/* Table */}
                <UsersTable
                    users={data?.data || []}
                    isLoading={isLoading}
                    error={getErrorMessage(error)}
                    searchTerm={filters.email || filters.firstName || filters.secondName}
                />
            </div>
        </div>
    );
};
