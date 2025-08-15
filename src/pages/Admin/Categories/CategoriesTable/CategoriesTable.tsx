// components/admin/categories/CategoriesTable.tsx
import React, { useState } from 'react';
// Icons
import { Eye, Image as ImageIcon, Calendar, Trash2, RotateCcw, Edit3 } from 'lucide-react';
// Api
import {
    Category,
    useDeleteCategoryMutation,
    useRestoreCategoryMutation,
} from '@/redux/admin/categories/adminCategoriesApi';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
// Utils
import { getCategoryImageUrl } from '@/utils/imageHandler';
// Components
import { CategoryViewModal } from '../CategoryViewModal/CategoryViewModal';
import { CategoryEditModal } from '../CategoryEditModal/CategoryEditModal';
// Toast
import { showLoadingToast, showSuccessToast, showErrorToast } from '@/utils/toastConfig';
import toast from 'react-hot-toast';
// SweetAlert2
import Swal from 'sweetalert2';

interface CategoriesTableProps {
    categories: Category[];
    isLoading: boolean;
    error: FetchBaseQueryError | SerializedError | undefined;
    searchTerm?: string;
}

export const CategoriesTable: React.FC<CategoriesTableProps> = ({
    categories,
    isLoading,
    error,
    searchTerm
}) => {
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    // RTK Mutations
    const [deleteCategory, { isLoading: isDeleting }] = useDeleteCategoryMutation();
    const [restoreCategory, { isLoading: isRestoring }] = useRestoreCategoryMutation();

    const handleViewCategory = (category: Category) => {
        setSelectedCategory(category);
        setIsViewModalOpen(true);
    };

    const handleEditCategory = (category: Category) => {
        setSelectedCategory(category);
        setIsEditModalOpen(true);
    };

    const handleCloseViewModal = () => {
        setIsViewModalOpen(false);
        setSelectedCategory(null);
    };

    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
        setSelectedCategory(null);
    };

    const handleDeleteCategory = async (category: Category) => {
        try {
            const result = await Swal.fire({
                title: 'Delete Category?',
                html: `
                    <div class="text-center">
                        <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                            <svg class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </div>
                        <p class="text-sm text-gray-600 mb-2">Are you sure you want to delete</p>
                        <p class="font-semibold text-gray-900 mb-4">"${category.name}"?</p>
                        <div class="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                            <p class="text-xs text-red-700">
                                <strong>Warning:</strong> This action will soft delete the category.
                            </p>
                        </div>
                    </div>
                `,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#EF4444',
                cancelButtonColor: '#6B7280',
                confirmButtonText: 'Yes, Delete',
                cancelButtonText: 'Cancel',
                reverseButtons: true,
                customClass: {
                    popup: 'rounded-2xl shadow-2xl',
                    title: 'text-xl font-semibold text-gray-900',
                    confirmButton: 'px-6 py-2.5 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200',
                    cancelButton: 'px-6 py-2.5 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200',
                },
                buttonsStyling: true,
                focusConfirm: false,
                focusCancel: true,
            });

            if (result.isConfirmed) {
                const loadingToastId = showLoadingToast(`Deleting "${category.name}"...`);

                try {
                    await deleteCategory(category._id).unwrap();

                    toast.dismiss(loadingToastId as string);
                    showSuccessToast(`Category "${category.name}" deleted successfully!`);

                    // Show success animation
                    await Swal.fire({
                        title: 'Deleted!',
                        text: `Category "${category.name}" has been deleted.`,
                        icon: 'success',
                        timer: 2000,
                        showConfirmButton: false,
                        customClass: {
                            popup: 'rounded-2xl',
                        },
                    });

                } catch (error) {
                    toast.dismiss(loadingToastId as string);
                    const errorMessage =
                        error?.data?.message ||
                        error?.message ||
                        'Failed to delete category. Please try again.';

                    showErrorToast(errorMessage);

                    // Show error animation
                    await Swal.fire({
                        title: 'Error!',
                        text: errorMessage,
                        icon: 'error',
                        confirmButtonColor: '#EF4444',
                        customClass: {
                            popup: 'rounded-2xl',
                            confirmButton: 'px-6 py-2.5 rounded-lg font-medium',
                        },
                    });
                }
            }
        } catch (error) {
            console.error('Error in delete confirmation:', error);
            showErrorToast('An unexpected error occurred');
        }
    };

    const handleRestoreCategory = async (category: Category) => {
        try {
            const result = await Swal.fire({
                title: 'Restore Category?',
                html: `
                    <div class="text-center">
                        <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                            <svg class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <p class="text-sm text-gray-600 mb-2">Are you sure you want to restore</p>
                        <p class="font-semibold text-gray-900">"${category.name}"?</p>
                        <div class="bg-green-50 border border-green-200 rounded-lg p-3 mt-4">
                            <p class="text-xs text-green-700">
                                This will make the category active and available again.
                            </p>
                        </div>
                    </div>
                `,
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#10B981',
                cancelButtonColor: '#6B7280',
                confirmButtonText: 'Yes, Restore',
                cancelButtonText: 'Cancel',
                reverseButtons: true,
                customClass: {
                    popup: 'rounded-2xl shadow-2xl',
                    title: 'text-xl font-semibold text-gray-900',
                    confirmButton: 'px-6 py-2.5 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200',
                    cancelButton: 'px-6 py-2.5 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200',
                },
                buttonsStyling: true,
            });

            if (result.isConfirmed) {
                const loadingToastId = showLoadingToast(`Restoring "${category.name}"...`);

                try {
                    await restoreCategory(category._id).unwrap();

                    toast.dismiss(loadingToastId as string);
                    showSuccessToast(`Category "${category.name}" restored successfully!`);

                    // Show success animation
                    await Swal.fire({
                        title: 'Restored!',
                        text: `Category "${category.name}" has been restored.`,
                        icon: 'success',
                        timer: 2000,
                        showConfirmButton: false,
                        customClass: {
                            popup: 'rounded-2xl',
                        },
                    });

                } catch (error) {
                    toast.dismiss(loadingToastId as string);
                    const errorMessage =
                        error?.data?.message ||
                        error?.message ||
                        'Failed to restore category. Please try again.';

                    showErrorToast(errorMessage);

                    // Show error animation
                    await Swal.fire({
                        title: 'Error!',
                        text: errorMessage,
                        icon: 'error',
                        confirmButtonColor: '#EF4444',
                        customClass: {
                            popup: 'rounded-2xl',
                            confirmButton: 'px-6 py-2.5 rounded-lg font-medium',
                        },
                    });
                }
            }
        } catch (error) {
            console.error('Error in restore confirmation:', error);
            showErrorToast('An unexpected error occurred');
        }
    };

    if (error) {
        return (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                <div className="text-center">
                    <div className="text-red-500 text-lg font-medium">Error loading categories</div>
                    <p className="text-gray-600 mt-2">Please try again later</p>
                </div>
            </div>
        );
    }

    if (!isLoading && categories.length === 0) {
        return (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                <div className="text-center">
                    <ImageIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <div className="text-gray-500 text-lg font-medium">No categories found</div>
                    <p className="text-gray-400 mt-2">
                        {searchTerm ? 'Try adjusting your search criteria' : 'Create your first category to get started'}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="text-left py-4 px-6 font-semibold text-gray-900">Category</th>
                                <th className="text-left py-4 px-6 font-semibold text-gray-900">Description</th>
                                <th className="text-left py-4 px-6 font-semibold text-gray-900">Status</th>
                                <th className="text-left py-4 px-6 font-semibold text-gray-900">Created</th>
                                <th className="text-left py-4 px-6 font-semibold text-gray-900">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {categories.map((category) => (
                                <tr key={category._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="py-4 px-6">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                                                {category.image ? (
                                                    <img
                                                        src={getCategoryImageUrl(category.image)}
                                                        alt={category.name}
                                                        className="w-full h-full object-cover"
                                                        onError={(e) => {
                                                            const target = e.target as HTMLImageElement;
                                                            target.style.display = 'none';
                                                            target.nextElementSibling?.classList.remove('hidden');
                                                        }}
                                                    />
                                                ) : (
                                                    <ImageIcon className="w-6 h-6 text-gray-400" />
                                                )}
                                                <ImageIcon className="w-6 h-6 text-gray-400 hidden" />
                                            </div>
                                            <div>
                                                <div className="font-medium text-gray-900">{category.name}</div>
                                                <div className="text-sm text-gray-500">{category.slug}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="text-gray-900 max-w-xs truncate">
                                            {category.description || 'No description'}
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${category.isDeleted
                                            ? 'bg-red-100 text-red-800'
                                            : 'bg-green-100 text-green-800'
                                            }`}>
                                            {category.isDeleted ? 'Deleted' : 'Active'}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="flex items-center space-x-1 text-gray-600">
                                            <Calendar className="w-4 h-4" />
                                            <span className="text-sm">{category.formattedCreatedAt}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="flex items-center space-x-2">
                                            {/* View Button */}
                                            <button
                                                onClick={() => handleViewCategory(category)}
                                                className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 hover:border-blue-300 transition-colors"
                                                title="View Details"
                                            >
                                                <Eye className="w-3.5 h-3.5 mr-1" />
                                                View
                                            </button>

                                            {/* Edit Button - Only show for active categories */}
                                            {!category.isDeleted && (
                                                <button
                                                    onClick={() => handleEditCategory(category)}
                                                    className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-amber-700 bg-amber-50 border border-amber-200 rounded-lg hover:bg-amber-100 hover:border-amber-300 transition-colors"
                                                    title="Edit Category"
                                                >
                                                    <Edit3 className="w-3.5 h-3.5 mr-1" />
                                                    Edit
                                                </button>
                                            )}

                                            {/* Delete/Restore Button */}
                                            {category.isDeleted ? (
                                                <button
                                                    onClick={() => handleRestoreCategory(category)}
                                                    disabled={isRestoring}
                                                    className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-green-700 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 hover:border-green-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                    title="Restore Category"
                                                >
                                                    <RotateCcw className="w-3.5 h-3.5 mr-1" />
                                                    {isRestoring ? 'Restoring...' : 'Restore'}
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => handleDeleteCategory(category)}
                                                    disabled={isDeleting}
                                                    className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-red-700 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 hover:border-red-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                    title="Delete Category"
                                                >
                                                    <Trash2 className="w-3.5 h-3.5 mr-1" />
                                                    {isDeleting ? 'Deleting...' : 'Delete'}
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Loading Overlay */}
                {(isDeleting || isRestoring) && (
                    <div className="absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center">
                        <div className="flex items-center space-x-2">
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                            <span className="text-sm text-gray-600">
                                {isDeleting ? 'Deleting...' : 'Restoring...'}
                            </span>
                        </div>
                    </div>
                )}
            </div>

            {/* View Modal */}
            <CategoryViewModal
                category={selectedCategory}
                isOpen={isViewModalOpen}
                onClose={handleCloseViewModal}
            />

            {/* Edit Modal */}
            <CategoryEditModal
                category={selectedCategory}
                isOpen={isEditModalOpen}
                onClose={handleCloseEditModal}
            />
        </>
    );
};
