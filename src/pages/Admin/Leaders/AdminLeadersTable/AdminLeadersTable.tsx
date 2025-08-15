// components/Admin/Leaders/AdminLeadersTable.tsx
// React
import React from 'react';
// Icons
import {
    Users,
    Eye,
    Image as ImageIcon,
    Calendar,
    Tag,
    Edit3,
    Trash2,
    RotateCcw,
} from 'lucide-react';

import type { Leader } from '@/redux/admin/leaders/adminLeadersApi';
import {
    useDeleteLeaderMutation,
    useRestoreLeaderMutation,
} from '@/redux/admin/leaders/adminLeadersApi';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

// Utils
import { getLeaderImage } from '@/utils/imageHandler';
// Toast
import toast from 'react-hot-toast';
import { showLoadingToast, showSuccessToast, showErrorToast } from '@/utils/toastConfig';
// SweetAlert2
import Swal from 'sweetalert2';

interface AdminLeadersTableProps {
    leaders: Leader[];
    onViewLeader: (leader: Leader) => void;
    onEditLeader?: (leader: Leader) => void;
    isLoading?: boolean;
    error?: FetchBaseQueryError | SerializedError | undefined;
    searchTerm?: string;
}

export const AdminLeadersTable: React.FC<AdminLeadersTableProps> = ({
    leaders,
    onViewLeader,
    onEditLeader,
    isLoading = false,
    error,
    searchTerm
}) => {
    // RTK Mutations
    const [deleteLeader, { isLoading: isDeleting }] = useDeleteLeaderMutation();
    const [restoreLeader, { isLoading: isRestoring }] = useRestoreLeaderMutation();

    const getStatusText = (leader: Leader) => {
        return leader.isDeleted ? 'Deleted' : 'Active';
    };

    const formatDate = (dateString: string) => {
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
        } catch (err) {
            console.log(err);
            return 'Invalid Date';
        }
    };

    const handleDeleteLeader = async (leader: Leader) => {
        try {
            const result = await Swal.fire({
                title: 'Delete Leader?',
                html: `
                    <div class="text-center">
                        <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                            <svg class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </div>
                        <p class="text-sm text-gray-600 mb-2">Are you sure you want to delete</p>
                        <p class="font-semibold text-gray-900 mb-4">"${leader.fullName}"?</p>
                        <div class="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                            <p class="text-xs text-red-700">
                                <strong>Warning:</strong> This action will soft delete the leader.
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
                const loadingToastId = showLoadingToast(`Deleting "${leader.fullName}"...`);

                try {
                    await deleteLeader(leader._id).unwrap();

                    toast.dismiss(loadingToastId as string);
                    showSuccessToast(`Leader "${leader.fullName}" deleted successfully!`);

                    // Show success animation
                    await Swal.fire({
                        title: 'Deleted!',
                        text: `Leader "${leader.fullName}" has been deleted.`,
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
                        'Failed to delete leader. Please try again.';

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

    const handleRestoreLeader = async (leader: Leader) => {
        try {
            const result = await Swal.fire({
                title: 'Restore Leader?',
                html: `
                    <div class="text-center">
                        <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                            <svg class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <p class="text-sm text-gray-600 mb-2">Are you sure you want to restore</p>
                        <p class="font-semibold text-gray-900">"${leader.fullName}"?</p>
                        <div class="bg-green-50 border border-green-200 rounded-lg p-3 mt-4">
                            <p class="text-xs text-green-700">
                                This will make the leader active and available again.
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
                const loadingToastId = showLoadingToast(`Restoring "${leader.fullName}"...`);

                try {
                    await restoreLeader(leader._id).unwrap();

                    toast.dismiss(loadingToastId as string);
                    showSuccessToast(`Leader "${leader.fullName}" restored successfully!`);

                    // Show success animation
                    await Swal.fire({
                        title: 'Restored!',
                        text: `Leader "${leader.fullName}" has been restored.`,
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
                        'Failed to restore leader. Please try again.';

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
            <div className="bg-white rounded-lg xs:rounded-xl shadow-sm border border-gray-200 p-4 xs:p-6 sm:p-8">
                <div className="text-center">
                    <div className="text-red-500 text-base xs:text-lg font-medium">Error loading leaders</div>
                    <p className="text-gray-600 mt-2 text-sm xs:text-base">Please try again later</p>
                </div>
            </div>
        );
    }

    if (!isLoading && leaders.length === 0) {
        return (
            <div className="bg-white rounded-lg xs:rounded-xl shadow-sm border border-gray-200 p-4 xs:p-6 sm:p-8">
                <div className="text-center">
                    <Users className="w-12 h-12 xs:w-16 xs:h-16 text-gray-300 mx-auto mb-4" />
                    <div className="text-gray-500 text-base xs:text-lg font-medium">No leaders found</div>
                    <p className="text-gray-400 mt-2 text-sm xs:text-base">
                        {searchTerm ? 'Try adjusting your search criteria' : 'Create your first leader to get started'}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <>
            {/* Mobile Card View */}
            <div className="block lg:hidden space-y-3 xs:space-y-4">
                {leaders.map((leader) => (
                    <div key={leader._id} className="bg-white rounded-lg xs:rounded-xl shadow-sm border border-gray-200 p-3 xs:p-4">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 xs:w-12 xs:h-12 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
                                    {leader.image ? (
                                        <img
                                            src={getLeaderImage(leader.image)}
                                            alt={leader.fullName}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                const target = e.target as HTMLImageElement;
                                                target.style.display = 'none';
                                                target.nextElementSibling?.classList.remove('hidden');
                                            }}
                                        />
                                    ) : (
                                        <ImageIcon className="w-5 h-5 xs:w-6 xs:h-6 text-gray-400" />
                                    )}
                                    <ImageIcon className="w-5 h-5 xs:w-6 xs:h-6 text-gray-400 hidden" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <div className="font-medium text-gray-900 text-sm xs:text-base truncate">{leader.fullName}</div>
                                    <div className="text-xs xs:text-sm text-gray-500 truncate">{leader.slug}</div>
                                </div>
                            </div>
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium flex-shrink-0 ${leader.isDeleted
                                ? 'bg-red-100 text-red-800'
                                : 'bg-green-100 text-green-800'
                                }`}>
                                {getStatusText(leader)}
                            </span>
                        </div>

                        {/* Details */}
                        <div className="space-y-2 mb-3">
                            <div className="flex items-center text-xs xs:text-sm text-gray-600">
                                <Tag className="h-3 w-3 xs:h-4 xs:w-4 text-gray-400 mr-2 flex-shrink-0" />
                                <span className="truncate">{leader.category.name}</span>
                            </div>
                            <div className="flex items-center text-xs xs:text-sm text-gray-600">
                                <Calendar className="w-3 h-3 xs:w-4 xs:h-4 mr-2 flex-shrink-0" />
                                <span>{formatDate(leader.createdAt)}</span>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-wrap gap-2">
                            {/* View Button */}
                            <button
                                onClick={() => onViewLeader(leader)}
                                className="flex-1 xs:flex-none inline-flex items-center justify-center px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 hover:border-blue-300 transition-colors"
                                title="View Details"
                            >
                                <Eye className="w-3 h-3 xs:w-3.5 xs:h-3.5 mr-1" />
                                View
                            </button>

                            {/* Edit Button - Only show for active leaders */}
                            {!leader.isDeleted && onEditLeader && (
                                <button
                                    onClick={() => onEditLeader(leader)}
                                    className="flex-1 xs:flex-none inline-flex items-center justify-center px-3 py-1.5 text-xs font-medium text-amber-700 bg-amber-50 border border-amber-200 rounded-lg hover:bg-amber-100 hover:border-amber-300 transition-colors"
                                    title="Edit Leader"
                                >
                                    <Edit3 className="w-3 h-3 xs:w-3.5 xs:h-3.5 mr-1" />
                                    Edit
                                </button>
                            )}

                            {/* Delete/Restore Button */}
                            {leader.isDeleted ? (
                                <button
                                    onClick={() => handleRestoreLeader(leader)}
                                    disabled={isRestoring}
                                    className="flex-1 xs:flex-none inline-flex items-center justify-center px-3 py-1.5 text-xs font-medium text-green-700 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 hover:border-green-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    title="Restore Leader"
                                >
                                    <RotateCcw className="w-3 h-3 xs:w-3.5 xs:h-3.5 mr-1" />
                                    {isRestoring ? 'Restoring...' : 'Restore'}
                                </button>
                            ) : (
                                <button
                                    onClick={() => handleDeleteLeader(leader)}
                                    disabled={isDeleting}
                                    className="flex-1 xs:flex-none inline-flex items-center justify-center px-3 py-1.5 text-xs font-medium text-red-700 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 hover:border-red-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    title="Delete Leader"
                                >
                                    <Trash2 className="w-3 h-3 xs:w-3.5 xs:h-3.5 mr-1" />
                                    {isDeleting ? 'Deleting...' : 'Delete'}
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Desktop Table View */}
            <div className="hidden lg:block bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden relative">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="text-left py-4 px-6 font-semibold text-gray-900">Leader</th>
                                <th className="text-left py-4 px-6 font-semibold text-gray-900">Category</th>
                                <th className="text-left py-4 px-6 font-semibold text-gray-900">Status</th>
                                <th className="text-left py-4 px-6 font-semibold text-gray-900">Created</th>
                                <th className="text-left py-4 px-6 font-semibold text-gray-900">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {leaders.map((leader) => (
                                <tr key={leader._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="py-4 px-6">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                                                {leader.image ? (
                                                    <img
                                                        src={getLeaderImage(leader.image)}
                                                        alt={leader.fullName}
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
                                                <div className="font-medium text-gray-900">{leader.fullName}</div>
                                                <div className="text-sm text-gray-500">{leader.slug}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="flex items-center">
                                            <Tag className="h-4 w-4 text-gray-400 mr-2" />
                                            <span className="text-sm text-gray-900">
                                                {leader.category.name}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${leader.isDeleted
                                            ? 'bg-red-100 text-red-800'
                                            : 'bg-green-100 text-green-800'
                                            }`}>
                                            {getStatusText(leader)}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="flex items-center space-x-1 text-gray-600">
                                            <Calendar className="w-4 h-4" />
                                            <span className="text-sm">{formatDate(leader.createdAt)}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="flex items-center space-x-2">
                                            {/* View Button */}
                                            <button
                                                onClick={() => onViewLeader(leader)}
                                                className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 hover:border-blue-300 transition-colors"
                                                title="View Details"
                                            >
                                                <Eye className="w-3.5 h-3.5 mr-1" />
                                                View
                                            </button>

                                            {/* Edit Button - Only show for active leaders */}
                                            {!leader.isDeleted && onEditLeader && (
                                                <button
                                                    onClick={() => onEditLeader(leader)}
                                                    className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-amber-700 bg-amber-50 border border-amber-200 rounded-lg hover:bg-amber-100 hover:border-amber-300 transition-colors"
                                                    title="Edit Leader"
                                                >
                                                    <Edit3 className="w-3.5 h-3.5 mr-1" />
                                                    Edit
                                                </button>
                                            )}

                                            {/* Delete/Restore Button */}
                                            {leader.isDeleted ? (
                                                <button
                                                    onClick={() => handleRestoreLeader(leader)}
                                                    disabled={isRestoring}
                                                    className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-green-700 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 hover:border-green-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                    title="Restore Leader"
                                                >
                                                    <RotateCcw className="w-3.5 h-3.5 mr-1" />
                                                    {isRestoring ? 'Restoring...' : 'Restore'}
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => handleDeleteLeader(leader)}
                                                    disabled={isDeleting}
                                                    className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-red-700 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 hover:border-red-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                    title="Delete Leader"
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
        </>
    );
};
