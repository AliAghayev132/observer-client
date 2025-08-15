// components/admin/categories/CategoriesPagination.tsx
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationData {
    totalCategories: number;
    totalPages: number;
    currentPage: number;
    limit: number;
}

interface CategoriesPaginationProps {
    pagination: PaginationData;
    onPageChange: (page: number) => void;
}

export const CategoriesPagination: React.FC<CategoriesPaginationProps> = ({
    pagination,
    onPageChange
}) => {
    const { totalCategories, totalPages, currentPage, limit } = pagination;

    const startItem = (currentPage - 1) * limit + 1;
    const endItem = Math.min(currentPage * limit, totalCategories);

    const getPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;
        
        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
        
        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }
        
        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }
        
        return pages;
    };

    if (totalPages <= 1) return null;

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                    Showing {startItem} to {endItem} of {totalCategories} categories
                </div>
                
                <div className="flex items-center space-x-2">
                    {/* Previous Button */}
                    <button
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="flex items-center space-x-1 px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <ChevronLeft className="w-4 h-4" />
                        <span>Previous</span>
                    </button>

                    {/* Page Numbers */}
                    <div className="flex items-center space-x-1">
                        {getPageNumbers().map((page) => (
                            <button
                                key={page}
                                onClick={() => onPageChange(page)}
                                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                                    page === currentPage
                                        ? 'bg-blue-600 text-white'
                                        : 'text-gray-700 hover:bg-gray-100'
                                }`}
                            >
                                {page}
                            </button>
                        ))}
                    </div>

                    {/* Next Button */}
                    <button
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="flex items-center space-x-1 px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <span>Next</span>
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};
