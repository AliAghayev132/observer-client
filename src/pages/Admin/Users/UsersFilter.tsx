// components/admin/users/UsersFilter/UsersFilter.tsx
import React, { useState, useEffect } from 'react';
import { Search, Filter, X, Calendar, Users, UserCheck, UserX, Shield } from 'lucide-react';

export interface FilterOptions {
    search: string;
    status: 'all' | 'active' | 'blocked' | 'deleted';
    emailVerified: 'all' | 'verified' | 'unverified';
    gender: 'all' | 'male' | 'female';
    dateRange: {
        from: string;
        to: string;
    };
    sortBy: 'createdAt' | 'firstName' | 'email';
    sortOrder: 'asc' | 'desc';
}

interface UsersFilterProps {
    filters: FilterOptions;
    onFiltersChange: (filters: FilterOptions) => void;
    totalUsers: number;
    filteredUsers: number;
    isLoading?: boolean;
}

export const UsersFilter: React.FC<UsersFilterProps> = ({
    filters,
    onFiltersChange,
    totalUsers,
    filteredUsers,
    isLoading = false
}) => {
    const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
    const [localFilters, setLocalFilters] = useState<FilterOptions>(filters);

    // Update local filters when props change
    useEffect(() => {
        setLocalFilters(filters);
    }, [filters]);

    // Apply filters with debounce for search
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (localFilters.search !== filters.search) {
                onFiltersChange(localFilters);
            }
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [localFilters.search]);

    // Apply other filters immediately
    useEffect(() => {
        const { search, ...otherFilters } = localFilters;
        const { search: currentSearch, ...currentOtherFilters } = filters;

        if (JSON.stringify(otherFilters) !== JSON.stringify(currentOtherFilters)) {
            onFiltersChange(localFilters);
        }
    }, [localFilters.status, localFilters.emailVerified, localFilters.gender, localFilters.dateRange, localFilters.sortBy, localFilters.sortOrder]);

    const handleFilterChange = (key: keyof FilterOptions, value: any) => {
        setLocalFilters(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const handleDateRangeChange = (type: 'from' | 'to', value: string) => {
        setLocalFilters(prev => ({
            ...prev,
            dateRange: {
                ...prev.dateRange,
                [type]: value
            }
        }));
    };

    const resetFilters = () => {
        const defaultFilters: FilterOptions = {
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

    const hasActiveFilters = () => {
        return (
            localFilters.search !== '' ||
            localFilters.status !== 'all' ||
            localFilters.emailVerified !== 'all' ||
            localFilters.gender !== 'all' ||
            localFilters.dateRange.from !== '' ||
            localFilters.dateRange.to !== '' ||
            localFilters.sortBy !== 'createdAt' ||
            localFilters.sortOrder !== 'desc'
        );
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'active': return <UserCheck className="w-4 h-4" />;
            case 'blocked': return <Shield className="w-4 h-4" />;
            case 'deleted': return <UserX className="w-4 h-4" />;
            default: return <Users className="w-4 h-4" />;
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <h3 className="text-lg font-semibold text-gray-900">Filter Users</h3>
                    <div className="text-sm text-gray-600">
                        Showing {filteredUsers} of {totalUsers} users
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    {hasActiveFilters() && (
                        <button
                            onClick={resetFilters}
                            className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                            <X className="w-4 h-4 mr-1" />
                            Clear All
                        </button>
                    )}
                    <button
                        onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
                        className={`inline-flex items-center px-3 py-1.5 text-sm font-medium border rounded-lg transition-colors ${isAdvancedOpen
                            ? 'text-blue-700 bg-blue-50 border-blue-200'
                            : 'text-gray-700 bg-white border-gray-300 hover:bg-gray-50'
                            }`}
                    >
                        <Filter className="w-4 h-4 mr-1" />
                        Advanced
                    </button>
                </div>
            </div>

            {/* Search Bar */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                    type="text"
                    placeholder="Search by name, email, or phone..."
                    value={localFilters.search}
                    onChange={(e) => handleFilterChange('search', e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    disabled={isLoading}
                />
                {localFilters.search && (
                    <button
                        onClick={() => handleFilterChange('search', '')}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                        <X className="w-4 h-4" />
                    </button>
                )}
            </div>

            {/* Quick Filters */}
            <div className="flex flex-wrap gap-2">
                {/* Status Filter */}
                <div className="flex items-center space-x-1">
                    <span className="text-sm font-medium text-gray-700">Status:</span>
                    <select
                        value={localFilters.status}
                        onChange={(e) => handleFilterChange('status', e.target.value)}
                        className="text-sm border border-gray-300 rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        disabled={isLoading}
                    >
                        <option value="all">All Status</option>
                        <option value="active">Active</option>
                        <option value="blocked">Blocked</option>
                        <option value="deleted">Deleted</option>
                    </select>
                </div>

                {/* Email Verification Filter */}
                <div className="flex items-center space-x-1">
                    <span className="text-sm font-medium text-gray-700">Email:</span>
                    <select
                        value={localFilters.emailVerified}
                        onChange={(e) => handleFilterChange('emailVerified', e.target.value)}
                        className="text-sm border border-gray-300 rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        disabled={isLoading}
                    >
                        <option value="all">All</option>
                        <option value="verified">Verified</option>
                        <option value="unverified">Unverified</option>
                    </select>
                </div>

                {/* Sort */}
                <div className="flex items-center space-x-1">
                    <span className="text-sm font-medium text-gray-700">Sort:</span>
                    <select
                        value={`${localFilters.sortBy}-${localFilters.sortOrder}`}
                        onChange={(e) => {
                            const [sortBy, sortOrder] = e.target.value.split('-');
                            handleFilterChange('sortBy', sortBy);
                            handleFilterChange('sortOrder', sortOrder);
                        }}
                        className="text-sm border border-gray-300 rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        disabled={isLoading}
                    >
                        <option value="createdAt-desc">Newest First</option>
                        <option value="createdAt-asc">Oldest First</option>
                        <option value="firstName-asc">Name A-Z</option>
                        <option value="firstName-desc">Name Z-A</option>
                        <option value="email-asc">Email A-Z</option>
                        <option value="email-desc">Email Z-A</option>
                    </select>
                </div>
            </div>

            {/* Advanced Filters */}
            {isAdvancedOpen && (
                <div className="border-t border-gray-200 pt-4 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Gender Filter */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Gender
                            </label>
                            <select
                                value={localFilters.gender}
                                onChange={(e) => handleFilterChange('gender', e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                disabled={isLoading}
                            >
                                <option value="all">All Genders</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>

                        {/* Date Range From */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Created From
                            </label>
                            <input
                                type="date"
                                value={localFilters.dateRange.from}
                                onChange={(e) => handleDateRangeChange('from', e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                disabled={isLoading}
                            />
                        </div>

                        {/* Date Range To */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Created To
                            </label>
                            <input
                                type="date"
                                value={localFilters.dateRange.to}
                                onChange={(e) => handleDateRangeChange('to', e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                disabled={isLoading}
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* Active Filters Display */}
            {hasActiveFilters() && (
                <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-100">
                    <span className="text-sm font-medium text-gray-700">Active filters:</span>

                    {localFilters.search && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            Search: "{localFilters.search}"
                            <button
                                onClick={() => handleFilterChange('search', '')}
                                className="ml-1 hover:text-blue-600"
                            >
                                <X className="w-3 h-3" />
                            </button>
                        </span>
                    )}

                    {localFilters.status !== 'all' && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {getStatusIcon(localFilters.status)}
                            <span className="ml-1">Status: {localFilters.status}</span>
                            <button
                                onClick={() => handleFilterChange('status', 'all')}
                                className="ml-1 hover:text-green-600"
                            >
                                <X className="w-3 h-3" />
                            </button>
                        </span>
                    )}

                    {localFilters.emailVerified !== 'all' && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                            Email: {localFilters.emailVerified}
                            <button
                                onClick={() => handleFilterChange('emailVerified', 'all')}
                                className="ml-1 hover:text-purple-600"
                            >
                                <X className="w-3 h-3" />
                            </button>
                        </span>
                    )}

                    {localFilters.gender !== 'all' && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-pink-100 text-pink-800">
                            Gender: {localFilters.gender}
                            <button
                                onClick={() => handleFilterChange('gender', 'all')}
                                className="ml-1 hover:text-pink-600"
                            >
                                <X className="w-3 h-3" />
                            </button>
                        </span>
                    )}

                    {(localFilters.dateRange.from || localFilters.dateRange.to) && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                            <Calendar className="w-3 h-3 mr-1" />
                            Date Range
                            <button
                                onClick={() => handleFilterChange('dateRange', { from: '', to: '' })}
                                className="ml-1 hover:text-orange-600"
                            >
                                <X className="w-3 h-3" />
                            </button>
                        </span>
                    )}
                </div>
            )}
        </div>
    );
};
