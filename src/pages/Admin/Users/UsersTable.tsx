// components/admin/users/UsersTable/UsersTable.tsx
// React
import React, { useState, useRef, useEffect } from 'react';
// Icons
import {
    Eye,
    Edit3,
    Shield,
    ShieldOff,
    Trash2,
    RotateCcw,
    UserX,
    Mail,
    Calendar,
    Image as ImageIcon,
    AlertCircle,
    Users,
    MoreVertical,
} from 'lucide-react';
// Components
import { UserViewModal } from './UserViewModal';
import { UserEditModal } from './UserEditModal';
// Types
import { User, UpdateUserData } from '@/redux/admin/users/adminUsersApi';
// Utils
import { getUserProfilePictureUrl } from '@/utils/imageHandler';
// Hooks
import { useUserActions } from '@/hooks/admin/useUserActions';

interface UsersTableProps {
    error: string | null;
    users: User[];
    isLoading: boolean;
    searchTerm?: string;
}

// Loading states interface
interface LoadingStates {
    blocking: boolean;
    unblocking: boolean;
    deleting: boolean;
    restoring: boolean;
    permanentDeleting: boolean;
    deletingPhoto: boolean;
}

// Dropdown Menu Component
// Dropdown Menu Component
const ActionDropdown: React.FC<{
    user: User;
    onView: () => void;
    onEdit: () => void;
    onBlock: () => void;
    onUnblock: () => void;
    onDelete: () => void;
    onRestore: () => void;
    onDeleteForever: () => void;
    onDeletePhoto: () => void;
    loadingStates: LoadingStates;
}> = ({
    user,
    onView,
    onEdit,
    onBlock,
    onUnblock,
    onDelete,
    onRestore,
    onDeleteForever,
    onDeletePhoto,
    loadingStates
}) => {
        const [isOpen, setIsOpen] = useState(false);
        const dropdownRef = useRef<HTMLDivElement>(null);

        // Close dropdown when clicking outside
        useEffect(() => {
            const handleClickOutside = (event: MouseEvent) => {
                if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                    setIsOpen(false);
                }
            };

            if (isOpen) {
                document.addEventListener('mousedown', handleClickOutside);
                return () => document.removeEventListener('mousedown', handleClickOutside);
            }
        }, [isOpen]);

        const handleAction = (action: () => void) => {
            action();
            setIsOpen(false);
        };

        return (
            <div className="relative inline-block text-left" ref={dropdownRef}>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsOpen(!isOpen);
                    }}
                    className="inline-flex items-center justify-center w-8 h-8 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                    title="More actions"
                    type="button"
                >
                    <MoreVertical className="w-4 h-4" />
                </button>

                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <div
                            className="fixed inset-0 z-40"
                            onClick={() => setIsOpen(false)}
                        />

                        {/* Dropdown Menu */}
                        <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50 transform opacity-100 scale-100">
                            {/* View */}
                            <button
                                onClick={() => handleAction(onView)}
                                className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                type="button"
                            >
                                <Eye className="w-4 h-4 mr-3 text-blue-500" />
                                View Details
                            </button>

                            {/* Edit - Only for non-deleted users */}
                            {!user.delete?.isDeleted && (
                                <button
                                    onClick={() => handleAction(onEdit)}
                                    className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                    type="button"
                                >
                                    <Edit3 className="w-4 h-4 mr-3 text-amber-500" />
                                    Edit User
                                </button>
                            )}

                            {/* Divider */}
                            <div className="border-t border-gray-100 my-1" />

                            {/* Block/Unblock - Only for non-deleted users */}
                            {!user.delete?.isDeleted && (
                                user.block?.isBlocked ? (
                                    <button
                                        onClick={() => handleAction(onUnblock)}
                                        disabled={loadingStates.unblocking}
                                        className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        type="button"
                                    >
                                        <Shield className="w-4 h-4 mr-3 text-green-500" />
                                        {loadingStates.unblocking ? 'Unblocking...' : 'Unblock User'}
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => handleAction(onBlock)}
                                        disabled={loadingStates.blocking}
                                        className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        type="button"
                                    >
                                        <ShieldOff className="w-4 h-4 mr-3 text-orange-500" />
                                        {loadingStates.blocking ? 'Blocking...' : 'Block User'}
                                    </button>
                                )
                            )}

                            {/* Delete Profile Photo - Only if user has photo and is not deleted */}
                            {!user.delete?.isDeleted && user.profilePicture && (
                                <button
                                    onClick={() => handleAction(onDeletePhoto)}
                                    disabled={loadingStates.deletingPhoto}
                                    className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    type="button"
                                >
                                    <ImageIcon className="w-4 h-4 mr-3 text-purple-500" />
                                    {loadingStates.deletingPhoto ? 'Deleting...' : 'Delete Photo'}
                                </button>
                            )}

                            {/* Divider */}
                            <div className="border-t border-gray-100 my-1" />

                            {/* Delete/Restore Actions */}
                            {user.delete?.isDeleted ? (
                                <>
                                    <button
                                        onClick={() => handleAction(onRestore)}
                                        disabled={loadingStates.restoring}
                                        className="w-full flex items-center px-4 py-2 text-sm text-green-700 hover:bg-green-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        type="button"
                                    >
                                        <RotateCcw className="w-4 h-4 mr-3 text-green-500" />
                                        {loadingStates.restoring ? 'Restoring...' : 'Restore User'}
                                    </button>
                                    <button
                                        onClick={() => handleAction(onDeleteForever)}
                                        disabled={loadingStates.permanentDeleting}
                                        className="w-full flex items-center px-4 py-2 text-sm text-red-700 hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        type="button"
                                    >
                                        <UserX className="w-4 h-4 mr-3 text-red-500" />
                                        {loadingStates.permanentDeleting ? 'Deleting...' : 'Delete Forever'}
                                    </button>
                                </>
                            ) : (
                                <button
                                    onClick={() => handleAction(onDelete)}
                                    disabled={loadingStates.deleting}
                                    className="w-full flex items-center px-4 py-2 text-sm text-red-700 hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    type="button"
                                >
                                    <Trash2 className="w-4 h-4 mr-3 text-red-500" />
                                    {loadingStates.deleting ? 'Deleting...' : 'Delete User'}
                                </button>
                            )}
                        </div>
                    </>
                )}
            </div>
        );
    };

export const UsersTable: React.FC<UsersTableProps> = ({
    users,
    isLoading,
    error,
    searchTerm
}) => {
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    const {
        handleBlockUser,
        handleUnblockUser,
        handleDeleteUser,
        handleRestoreUser,
        handlePermanentDeleteUser,
        handleDeleteUserProfilePhoto,
        handleUpdateUser,
        loadingStates
    } = useUserActions();

    // Get user initials for placeholder
    const getUserInitials = (firstName: string, secondName: string) => {
        return `${firstName.charAt(0)}${secondName.charAt(0)}`.toUpperCase();
    };

    // Format date helper
    const formatDate = (dateString: string) => {
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
        } catch (error) {
            console.log(error);
            return 'Invalid Date';
        }
    };

    // Get user status
    const getUserStatus = (user: User) => {
        if (user.delete?.isDeleted) return 'Deleted';
        if (user.block?.isBlocked) return 'Blocked';
        return 'Active';
    };

    // Modal handlers
    const handleViewUser = (user: User) => {
        setSelectedUser(user);
        setIsViewModalOpen(true);
    };

    const handleEditUser = (user: User) => {
        setSelectedUser(user);
        setIsEditModalOpen(true);
    };

    const handleCloseViewModal = () => {
        setIsViewModalOpen(false);
        setSelectedUser(null);
    };

    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
        setSelectedUser(null);
    };

    // Action handlers
    const onBlockUser = async (user: User) => {
        try {
            await handleBlockUser(user);
        } catch (error) {
            console.error('Failed to block user:', error);
        }
    };

    const onUnBlockUser = async (user: User) => {
        try {
            await handleUnblockUser(user);
        } catch (error) {
            console.error('Failed to unblock user:', error);
        }
    };

    const onDeleteUser = async (user: User) => {
        try {
            await handleDeleteUser(user);
        } catch (error) {
            console.error('Failed to delete user:', error);
        }
    };

    const onRestoreUser = async (user: User) => {
        try {
            await handleRestoreUser(user);
        } catch (error) {
            console.error('Failed to restore user:', error);
        }
    };

    const onDeleteUserForever = async (user: User) => {
        try {
            await handlePermanentDeleteUser(user);
        } catch (error) {
            console.error('Failed to permanently delete user:', error);
        }
    };

    const onDeleteProfilePhoto = async (user: User) => {
        try {
            await handleDeleteUserProfilePhoto(user);
        } catch (error) {
            console.error('Failed to delete profile photo:', error);
        }
    };

    // Update user handler for modal
    const onUpdateUser = async (user: User, data: UpdateUserData) => {
        try {
            await handleUpdateUser(user, data);
        } catch (error) {
            console.error('Failed to update user:', error);
            throw error;
        }
    };

    // Error state
    if (error) {
        return (
            <div className="bg-white rounded-lg xs:rounded-xl shadow-sm border border-gray-200 p-4 xs:p-6 sm:p-8">
                <div className="text-center">
                    <AlertCircle className="w-10 h-10 xs:w-12 xs:h-12 text-red-500 mx-auto mb-4" />
                    <h3 className="text-base xs:text-lg font-semibold text-gray-900 mb-2">Error Loading Users</h3>
                    <p className="text-sm xs:text-base text-gray-600 mb-4">
                        {error || 'Failed to load users. Please try again.'}
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm xs:text-base"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    // Empty state
    if (!isLoading && users.length === 0) {
        return (
            <div className="bg-white rounded-lg xs:rounded-xl shadow-sm border border-gray-200 p-4 xs:p-6 sm:p-8">
                <div className="text-center">
                    <Users className="w-12 h-12 xs:w-16 xs:h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-base xs:text-lg font-semibold text-gray-900 mb-2">No Users Found</h3>
                    <p className="text-sm xs:text-base text-gray-600 mb-4">
                        {searchTerm
                            ? `No users found matching "${searchTerm}". Try adjusting your search criteria.`
                            : 'No users found. Users will appear here once they are added to the system.'
                        }
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="relative">
            {/* Mobile Card View (xs to md) */}
            <div className="block xl:hidden space-y-3 xs:space-y-4">
                {users.map((user) => (
                    <div key={user._id} className="bg-white rounded-lg xs:rounded-xl shadow-sm border border-gray-200 p-3 xs:p-4 relative">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center space-x-3 min-w-0 flex-1">
                                <div className="w-10 h-10 xs:w-12 xs:h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-centerS flex-shrink-0">
                                    {user.profilePicture ? (
                                        <img
                                            src={getUserProfilePictureUrl(user.profilePicture)}
                                            alt={`${user.firstName} ${user.secondName}`}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <span className="text-white font-medium text-xs xs:text-sm">
                                            {getUserInitials(user.firstName, user.secondName)}
                                        </span>
                                    )}
                                </div>
                                <div className="min-w-0 flex-1">
                                    <div className="font-medium text-gray-900 text-sm xs:text-base truncate">
                                        {user.firstName} {user.secondName}
                                    </div>
                                    <div className="text-xs text-gray-500 truncate">ID: {user._id}</div>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2 flex-shrink-0">
                                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${user.delete?.isDeleted
                                    ? 'bg-red-100 text-red-800'
                                    : user.block?.isBlocked
                                        ? 'bg-yellow-100 text-yellow-800'
                                        : 'bg-green-100 text-green-800'
                                    }`}>
                                    {getUserStatus(user)}
                                </span>
                                <ActionDropdown
                                    user={user}
                                    onView={() => handleViewUser(user)}
                                    onEdit={() => handleEditUser(user)}
                                    onBlock={() => onBlockUser(user)}
                                    onUnblock={() => onUnBlockUser(user)}
                                    onDelete={() => onDeleteUser(user)}
                                    onRestore={() => onRestoreUser(user)}
                                    onDeleteForever={() => onDeleteUserForever(user)}
                                    onDeletePhoto={() => onDeleteProfilePhoto(user)}
                                    loadingStates={loadingStates}
                                />
                            </div>
                        </div>

                        {/* Details */}
                        <div className="space-y-2">
                            <div className="flex items-center text-xs xs:text-sm text-gray-600">
                                <Mail className="h-3 w-3 xs:h-4 xs:w-4 text-gray-400 mr-2 flex-shrink-0" />
                                <span className="truncate">{user.email}</span>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center text-xs xs:text-sm text-gray-600">
                                    <Calendar className="w-3 h-3 xs:w-4 xs:h-4 mr-2 flex-shrink-0" />
                                    <span>{formatDate(user.createdAt)}</span>
                                </div>
                                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${user.gender === 'male'
                                    ? 'bg-blue-100 text-blue-800'
                                    : user.gender === 'female'
                                        ? 'bg-pink-100 text-pink-800'
                                        : 'bg-gray-100 text-gray-800'
                                    }`}>
                                    {user.gender ? user.gender.charAt(0).toUpperCase() + user.gender.slice(1) : 'Not specified'}
                                </span>
                            </div>

                            {/* Birth Date */}
                            <div className="text-xs text-gray-500">
                                Born: {formatDate(user.birthDate)}
                            </div>

                            {/* Block/Delete Reasons */}
                            {user.block?.isBlocked && user.block?.reason && (
                                <div className="text-xs text-yellow-600 bg-yellow-50 p-2 rounded border-l-2 border-yellow-200">
                                    <strong>Block reason:</strong> {user.block.reason}
                                </div>
                            )}
                            {user.delete?.isDeleted && user.delete?.reason && (
                                <div className="text-xs text-red-600 bg-red-50 p-2 rounded border-l-2 border-red-200">
                                    <strong>Delete reason:</strong> {user.delete.reason}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Desktop Table View (xl and up) */}
            <div className="hidden xl:block bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="text-left py-4 px-6 font-semibold text-gray-900 text-sm">User</th>
                                <th className="text-left py-4 px-6 font-semibold text-gray-900 text-sm">Contact</th>
                                <th className="text-left py-4 px-6 font-semibold text-gray-900 text-sm">Gender</th>
                                <th className="text-left py-4 px-6 font-semibold text-gray-900 text-sm">Status</th>
                                <th className="text-left py-4 px-6 font-semibold text-gray-900 text-sm">Created</th>
                                <th className="text-left py-4 px-6 font-semibold text-gray-900 text-sm">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {users.map((user) => (
                                <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="py-4 px-6">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center overflow-hidden flex-shrink-0">
                                                {user.profilePicture ? (
                                                    <img
                                                        src={getUserProfilePictureUrl(user.profilePicture)}
                                                        alt={`${user.firstName} ${user.secondName}`}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <span className="text-white font-medium text-sm">
                                                        {getUserInitials(user.firstName, user.secondName)}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <p className="text-sm font-semibold text-gray-900 truncate">
                                                    {user.firstName} {user.secondName}
                                                </p>
                                                <p className="text-xs text-gray-500 truncate">ID: {user._id}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="space-y-1">
                                            <div className="flex items-center space-x-2 text-sm text-gray-900">
                                                <Mail className="w-4 h-4 text-gray-400" />
                                                <span className="truncate max-w-xs">{user.email}</span>
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                Born: {formatDate(user.birthDate)}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user.gender === 'male'
                                            ? 'bg-blue-100 text-blue-800'
                                            : user.gender === 'female'
                                                ? 'bg-pink-100 text-pink-800'
                                                : 'bg-gray-100 text-gray-800'
                                            }`}>
                                            {user.gender ? user.gender.charAt(0).toUpperCase() + user.gender.slice(1) : 'Not specified'}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="space-y-1">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user.delete?.isDeleted
                                                ? 'bg-red-100 text-red-800'
                                                : user.block?.isBlocked
                                                    ? 'bg-yellow-100 text-yellow-800'
                                                    : 'bg-green-100 text-green-800'
                                                }`}>
                                                {getUserStatus(user)}
                                            </span>
                                            {user.block?.isBlocked && user.block?.reason && (
                                                <div className="text-xs text-yellow-600 truncate max-w-xs" title={user.block.reason}>
                                                    Reason: {user.block.reason}
                                                </div>
                                            )}
                                            {user.delete?.isDeleted && user.delete?.reason && (
                                                <div className="text-xs text-red-600 truncate max-w-xs" title={user.delete.reason}>
                                                    Reason: {user.delete.reason}
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="flex items-center space-x-1 text-gray-600">
                                            <Calendar className="w-4 h-4" />
                                            <span className="text-sm">{formatDate(user.createdAt)}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="flex items-center justify-end">
                                            <ActionDropdown
                                                user={user}
                                                onView={() => handleViewUser(user)}
                                                onEdit={() => handleEditUser(user)}
                                                onBlock={() => onBlockUser(user)}
                                                onUnblock={() => onUnBlockUser(user)}
                                                onDelete={() => onDeleteUser(user)}
                                                onRestore={() => onRestoreUser(user)}
                                                onDeleteForever={() => onDeleteUserForever(user)}
                                                onDeletePhoto={() => onDeleteProfilePhoto(user)}
                                                loadingStates={loadingStates}
                                            />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Loading Overlay */}
            {Object.values(loadingStates).some(state => state) && (
                <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-40">
                    <div className="flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                        <span className="text-sm text-gray-600">Processing...</span>
                    </div>
                </div>
            )}

            {/* Modals */}
            {selectedUser && (
                <>
                    <UserViewModal
                        isOpen={isViewModalOpen}
                        onClose={handleCloseViewModal}
                        user={selectedUser}
                    />
                    <UserEditModal
                        isOpen={isEditModalOpen}
                        onClose={handleCloseEditModal}
                        user={selectedUser}
                        onUpdate={onUpdateUser}
                    />
                </>
            )}
        </div>
    );
};
