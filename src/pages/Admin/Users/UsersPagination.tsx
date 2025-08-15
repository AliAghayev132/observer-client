// components/admin/users/UsersPagination/UsersPagination.tsx
import React from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

export interface PaginationInfo {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
}

interface UsersPaginationProps {
    pagination: PaginationInfo;
    onPageChange: (page: number) => void;
    onItemsPerPageChange: (itemsPerPage: number) => void;
    isLoading?: boolean;
}

export const UsersPagination: React.FC<UsersPaginationProps> = ({
    pagination,
    onPageChange,
    onItemsPerPageChange,
    isLoading = false
}) => {
    const {
        currentPage,
        totalPages,
        totalItems,
        itemsPerPage,
        hasNextPage,
        hasPrevPage
    } = pagination;

    // Calculate visible page numbers
    const getVisiblePages = () => {
        const delta = 2; // Number of pages to show on each side of current page
        const range = [];
        const rangeWithDots = [];

        // Calculate start and end of visible range
        const start = Math.max(1, currentPage - delta);
        const end = Math.min(totalPages, currentPage + delta);

        // Create range array
        for (let i = start; i <= end; i++) {
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
        rangeWithDots.push(...range);

        // Add last page and dots if needed
        if (end < totalPages) {
            if (end < totalPages - 1) {
                rangeWithDots.push('...');
            }
            rangeWithDots.push(totalPages);
        }

        return rangeWithDots;
    };

    const visiblePages = getVisiblePages();

    // Calculate current items range
    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages && page !== currentPage && !isLoading) {
            onPageChange(page);
        }
    };

    const handleItemsPerPageChange = (newItemsPerPage: number) => {
        if (newItemsPerPage !== itemsPerPage && !isLoading) {
            onItemsPerPageChange(newItemsPerPage);
        }
    };

    // Don't render if no items
    if (totalItems === 0) {
        return null;
    }

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 px-6 py-4">
            <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
                {/* Items per page selector */}
                <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-700">Show</span>
                    <select
                        value={itemsPerPage}
                        onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
                        className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        disabled={isLoading}
                    >
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                    </select>
                    <span className="text-sm text-gray-700">per page</span>
                </div>

                {/* Items info */}
                <div className="text-sm text-gray-700">
                    Showing <span className="font-medium">{startItem}</span> to{' '}
                    <span className="font-medium">{endItem}</span> of{' '}
                    <span className="font-medium">{totalItems}</span> results
                </div>

                {/* Pagination controls */}
                <div className="flex items-center space-x-1">
                    {/* First page */}
                    <button
                        onClick={() => handlePageChange(1)}
                        disabled={!hasPrevPage || isLoading}
                        className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        title="First page"
                    >
                        <ChevronsLeft className="w-4 h-4" />
                    </button>

                    {/* Previous page */}
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={!hasPrevPage || isLoading}
                        className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        title="Previous page"
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </button>

                    {/* Page numbers */}
                    <div className="flex items-center space-x-1">
                        {visiblePages.map((page, index) => (
                            <React.Fragment key={index}>
                                {page === '...' ? (
                                    <span className="px-3 py-2 text-gray-500">...</span>
                                ) : (
                                    <button
                                        onClick={() => handlePageChange(page as number)}
                                        disabled={isLoading}
                                        className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${page === currentPage
                                                ? 'bg-blue-600 text-white'
                                                : 'text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed'
                                            }`}
                                    >
                                        {page}
                                    </button>
                                )}
                            </React.Fragment>
                        ))}
                    </div>

                    {/* Next page */}
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={!hasNextPage || isLoading}
                        className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        title="Next page"
                    >
                        <ChevronRight className="w-4 h-4" />
                    </button>

                    {/* Last page */}
                    <button
                        onClick={() => handlePageChange(totalPages)}
                        disabled={!hasNextPage || isLoading}
                        className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        title="Last page"
                    >
                        <ChevronsRight className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Loading indicator */}
            {isLoading && (
                <div className="mt-4 flex items-center justify-center">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                        <span>Loading...</span>
                    </div>
                </div>
            )}
        </div>
    );
};
