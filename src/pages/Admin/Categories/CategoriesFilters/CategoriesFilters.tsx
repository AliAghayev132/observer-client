// React
import React, { useEffect, useState } from "react";
// Icons
import { Search, Filter, SortAsc, SortDesc } from "lucide-react";
// Api
import { GetCategoriesParams } from "@/redux/admin/categories/adminCategoriesApi";

interface CategoriesFiltersProps {
    filters: GetCategoriesParams;
    onFilterChange: (filters: Partial<GetCategoriesParams>) => void;
}

export const CategoriesFilters: React.FC<CategoriesFiltersProps> = ({
    filters,
    onFilterChange,
}) => {
    const [searchTerm, setSearchTerm] = useState(filters.name || "");

    // Debounce search input
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            onFilterChange({
                name: searchTerm || undefined,
                page: 1,
            });
        }, 500); // 500ms debounce

        return () => clearTimeout(timeoutId);
    }, [searchTerm, onFilterChange]);

    const handleStatusChange = (status: "active" | "deleted" | "all") => {
        onFilterChange({ status, page: 1 });
    };

    const handleSortChange = (sortBy: "name" | "createdAt") => {
        const newSortOrder =
            filters.sortBy === sortBy && filters.sortOrder === "desc" ? "asc" : "desc";
        onFilterChange({ sortBy, sortOrder: newSortOrder });
    };

    const handleLimitChange = (limit: number) => {
        onFilterChange({ limit, page: 1 });
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
                {/* Search */}
                <div className="flex-1 max-w-md">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search categories..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                    {/* Status Filter */}
                    <div className="flex items-center space-x-2">
                        <Filter className="w-5 h-5 text-gray-400" />
                        <select
                            value={filters.status}
                            onChange={(e) =>
                                handleStatusChange(
                                    e.target.value as "active" | "deleted" | "all"
                                )
                            }
                            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="active">Active</option>
                            <option value="deleted">Deleted</option>
                            <option value="all">All</option>
                        </select>
                    </div>

                    {/* Sort */}
                    <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">Sort by:</span>
                        <button
                            onClick={() => handleSortChange("name")}
                            className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${filters.sortBy === "name"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                }`}
                        >
                            <span>Name</span>
                            {filters.sortBy === "name" &&
                                (filters.sortOrder === "asc" ? (
                                    <SortAsc className="w-4 h-4" />
                                ) : (
                                    <SortDesc className="w-4 h-4" />
                                ))}
                        </button>
                        <button
                            onClick={() => handleSortChange("createdAt")}
                            className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${filters.sortBy === "createdAt"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                }`}
                        >
                            <span>Date</span>
                            {filters.sortBy === "createdAt" &&
                                (filters.sortOrder === "asc" ? (
                                    <SortAsc className="w-4 h-4" />
                                ) : (
                                    <SortDesc className="w-4 h-4" />
                                ))}
                        </button>
                    </div>

                    {/* Items per page */}
                    <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">Show:</span>
                        <select
                            value={filters.limit}
                            onChange={(e) => handleLimitChange(Number(e.target.value))}
                            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={25}>25</option>
                            <option value={50}>50</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
};
