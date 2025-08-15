// pages/admin/AdminCategoriesPage.tsx
// React
import { useState } from 'react';
// Components
import { CategoriesTable } from './CategoriesTable/CategoriesTable';
import { CategoriesHeader } from './CategoriesHeader/CategoriesHeader';
import { CategoriesFilters } from './CategoriesFilters/CategoriesFilters';
import { CategoriesPagination } from './CategoriesPagination/CategoriesPagination';
import { AddCategoryModal, CategoryFormData } from './AddCategoryModal/AddCategoryModal';
// Components
import { LoadingSpinner } from '@/components/LoadingSpinner/LoadingSpinner';
// RTK
import {
    GetCategoriesParams,
    useGetCategoriesQuery,
    useCreateCategoryMutation,
} from '@/redux/admin/categories/adminCategoriesApi';
// Toast
import { showLoadingToast, showSuccessToast, showErrorToast } from '@/utils/toastConfig';
import toast from 'react-hot-toast';

export const AdminCategoriesPage = () => {
    const [filters, setFilters] = useState<GetCategoriesParams>({
        page: 1,
        limit: 10,
        status: 'active',
        sortBy: 'createdAt',
        sortOrder: 'desc'
    });

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const { data, isLoading, isFetching, error } = useGetCategoriesQuery(filters);
    const [createCategory, { isLoading: isCreating }] = useCreateCategoryMutation();

    const handleFilterChange = (newFilters: Partial<GetCategoriesParams>) => {
        setFilters(prev => ({
            ...prev,
            ...newFilters,
            page: newFilters.page || 1 // Reset to page 1 when filters change (except pagination)
        }));
    };

    const handlePageChange = (page: number) => {
        setFilters(prev => ({ ...prev, page }));
    };

    const handleAddCategory = async (categoryData: CategoryFormData) => {
        const loadingToastId = showLoadingToast('Creating category...');

        try {
            // Create FormData for file upload
            const formData = new FormData();
            formData.append('name', categoryData.name.trim());
            formData.append('description', categoryData.description.trim());
            if (categoryData.image) {
                formData.append('image', categoryData.image);
            }

            // Call the RTK mutation
            const result = await createCategory(formData as any).unwrap();

            // Dismiss loading toast
            toast.dismiss(loadingToastId as string);

            // Show success toast
            showSuccessToast(`Category "${categoryData.name}" created successfully!`);

            // Close modal
            setIsAddModalOpen(false);

            // Optionally refresh the first page to show the new category
            if (filters.page !== 1) {
                setFilters(prev => ({ ...prev, page: 1 }));
            }

            return result;
        } catch (error) {
            // Dismiss loading toast
            toast.dismiss(loadingToastId as string);

            // Extract error message
            const errorMessage =
                error?.data?.message ||
                error?.message ||
                'Failed to create category. Please try again.';

            // Show error toast
            showErrorToast(errorMessage);

            // Re-throw error so modal can handle it
            throw new Error(errorMessage);
        }
    };

    const handleOpenAddModal = () => {
        setIsAddModalOpen(true);
    };

    const handleCloseAddModal = () => {
        setIsAddModalOpen(false);
    };

    if (isLoading || isFetching) {
        return <LoadingSpinner text="Loading categories..." />;
    }

    return (
        <>
            <div className="min-h-screen bg-gray-50 p-6">
                <div className="max-w-7xl mx-auto space-y-6">
                    {/* Header */}
                    <CategoriesHeader
                        totalCategories={data?.pagination.totalCategories || 0}
                        onAddCategory={handleOpenAddModal}
                    />

                    {/* Filters */}
                    <CategoriesFilters
                        filters={filters}
                        onFilterChange={handleFilterChange}
                    />

                    {/* Table */}
                    <CategoriesTable
                        categories={data?.data || []}
                        isLoading={isLoading}
                        error={error}
                        searchTerm={filters.name}
                    />

                    {/* Pagination */}
                    {data?.pagination && (
                        <CategoriesPagination
                            pagination={data.pagination}
                            onPageChange={handlePageChange}
                        />
                    )}
                </div>
            </div>

            {/* Add Category Modal */}
            <AddCategoryModal
                isOpen={isAddModalOpen}
                onClose={handleCloseAddModal}
                onSubmit={handleAddCategory}
                isLoading={isCreating}
            />
        </>
    );
};
