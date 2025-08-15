// pages/admin/AdminCategoriesPage.tsx
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
    CreateCategoryFormData, // ✅ Doğru interface'i import edin
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
            page: newFilters.page || 1
        }));
    };

    const handlePageChange = (page: number) => {
        setFilters(prev => ({ ...prev, page }));
    };

    // ✅ Return tipini Promise<void> yapın
    const handleAddCategory = async (categoryData: CategoryFormData): Promise<void> => {
        const loadingToastId = showLoadingToast('Creating category...');

        try {
            // ✅ CreateCategoryFormData tipinde obje oluşturun
            const createData: CreateCategoryFormData = {
                name: categoryData.name.trim(),
                description: categoryData.description.trim(),
                image: categoryData.image || undefined, // null yerine undefined
            };

            // ✅ Direkt createData'yı gönderin (API FormData'ya çevirecek)
            await createCategory(createData).unwrap();

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

            // ✅ void return - hiçbir şey döndürmeyin
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
                onSubmit={handleAddCategory} // ✅ Artık tip uyumlu
                isLoading={isCreating}
            />
        </>
    );
};
