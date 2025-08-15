// components/admin/users/UserViewModal/UserViewModal.tsx
import React from 'react';
import { X, Mail, Phone, Calendar, User as UserIcon, Shield, AlertCircle } from 'lucide-react';
import { User } from '@/redux/admin/users/adminUsersApi';
import { getUserProfilePictureUrl } from '@/utils/imageHandler';

interface UserViewModalProps {
    isOpen: boolean;
    onClose: () => void;
    user: User;
}

export const UserViewModal: React.FC<UserViewModalProps> = ({
    isOpen,
    onClose,
    user
}) => {
    if (!isOpen) return null;

    const getUserInitials = (firstName: string, secondName: string) => {
        return `${firstName.charAt(0)}${secondName.charAt(0)}`.toUpperCase();
    };

    return (
        <div className="fixed inset-0 modal-overlay flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900">User Details</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    {/* Profile Section */}
                    <div className="flex items-center space-x-4">
                        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center overflow-hidden flex-shrink-0">
                            {user.profilePicture ? (
                                <img
                                    src={getUserProfilePictureUrl(user.profilePicture)}
                                    alt={`${user.firstName} ${user.secondName}`}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <span className="text-white font-medium text-xl">
                                    {getUserInitials(user.firstName, user.secondName)}
                                </span>
                            )}
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900">
                                {user.firstName} {user.secondName}
                            </h3>
                            <p className="text-gray-600">ID: {user._id}</p>
                            <div className="flex items-center space-x-2 mt-2">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                    user.isDeleted
                                        ? 'bg-red-100 text-red-800'
                                        : user.isBlocked
                                        ? 'bg-yellow-100 text-yellow-800'
                                        : 'bg-green-100 text-green-800'
                                }`}>
                                    {user.isDeleted ? 'Deleted' : user.isBlocked ? 'Blocked' : 'Active'}
                                </span>
                                {user.isEmailVerified && (
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                        ✓ Email Verified
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="text-lg font-semibold text-gray-900 mb-3">Contact Information</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-center space-x-3">
                                <Mail className="w-5 h-5 text-gray-400" />
                                <div>
                                    <p className="text-sm text-gray-600">Email</p>
                                    <p className="font-medium text-gray-900">{user.email}</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Phone className="w-5 h-5 text-gray-400" />
                                <div>
                                    <p className="text-sm text-gray-600">Phone</p>
                                    <p className="font-medium text-gray-900">{user.phoneNumber}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Personal Information */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="text-lg font-semibold text-gray-900 mb-3">Personal Information</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-center space-x-3">
                                <UserIcon className="w-5 h-5 text-gray-400" />
                                <div>
                                    <p className="text-sm text-gray-600">Gender</p>
                                    <p className="font-medium text-gray-900">
                                        {user.gender ? user.gender.charAt(0).toUpperCase() + user.gender.slice(1) : 'Not specified'}
                                    </p>
                                </div>
                            </div>
                            {user.birthDate && (
                                <div className="flex items-center space-x-3">
                                    <Calendar className="w-5 h-5 text-gray-400" />
                                    <div>
                                        <p className="text-sm text-gray-600">Birth Date</p>
                                        <p className="font-medium text-gray-900">
                                            {new Date(user.birthDate).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Account Status */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="text-lg font-semibold text-gray-900 mb-3">Account Status</h4>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-gray-600">Account Status</span>
                                <span className={`font-medium ${
                                    user.isDeleted ? 'text-red-600' : user.isBlocked ? 'text-yellow-600' : 'text-green-600'
                                }`}>
                                    {user.isDeleted ? 'Deleted' : user.isBlocked ? 'Blocked' : 'Active'}
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-gray-600">Email Verification</span>
                                <span className={`font-medium ${user.isEmailVerified ? 'text-green-600' : 'text-red-600'}`}>
                                    {user.isEmailVerified ? 'Verified' : 'Not Verified'}
                                </span>
                            </div>
                            {user.blockReason && (
                                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                                    <div className="flex items-start space-x-2">
                                        <Shield className="w-5 h-5 text-yellow-600 mt-0.5" />
                                        <div>
                                            <p className="text-sm font-medium text-yellow-800">Block Reason</p>
                                            <p className="text-sm text-yellow-700">{user.blockReason}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {user.deleteReason && (
                                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                                    <div className="flex items-start space-x-2">
                                        <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                                        <div>
                                            <p className="text-sm font-medium text-red-800">Delete Reason</p>
                                            <p className="text-sm text-red-700">{user.deleteReason}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Timestamps */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="text-lg font-semibold text-gray-900 mb-3">Timestamps</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-gray-600">Created At</p>
                                <p className="font-medium text-gray-900">{user.formattedCreatedAt}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Last Updated</p>
                                <p className="font-medium text-gray-900">
                                    {new Date(user.updatedAt).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex justify-end p-6 border-t border-gray-200">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};
