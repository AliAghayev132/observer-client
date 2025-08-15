// components/admin/users/UserEditModal/UserEditModal.tsx
import React, { useState, useEffect } from 'react';
import { X, Save, User as UserIcon, Mail } from 'lucide-react';
import { User, UpdateUserData } from '@/redux/admin/users/adminUsersApi';

interface UserEditModalProps {
    isOpen: boolean;
    onClose: () => void;
    user: User;
    onUpdate: (user: User, data: UpdateUserData) => Promise<any>;
}

export const UserEditModal: React.FC<UserEditModalProps> = ({
    isOpen,
    onClose,
    user,
    onUpdate
}) => {
    const [formData, setFormData] = useState<UpdateUserData>({
        firstName: '',
        secondName: '',
        email: '',
        phoneNumber: '',
        gender: undefined,
        birthDate: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    // Initialize form data when user changes
    useEffect(() => {
        if (user) {
            setFormData({
                firstName: user.firstName || '',
                secondName: user.secondName || '',
                email: user.email || '',
                phoneNumber: user.phoneNumber || '',
                gender: user.gender || undefined,
                birthDate: user.birthDate ? user.birthDate.split('T')[0] : ''
            });
            setErrors({});
        }
    }, [user]);

    if (!isOpen) return null;

    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};

        if (!formData.firstName?.trim()) {
            newErrors.firstName = 'First name is required';
        }

        if (!formData.secondName?.trim()) {
            newErrors.secondName = 'Second name is required';
        }

        if (!formData.email?.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (!formData.phoneNumber?.trim()) {
            newErrors.phoneNumber = 'Phone number is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            // Only send changed fields
            const updateData: UpdateUserData = {};

            if (formData.firstName !== user.firstName) {
                updateData.firstName = formData.firstName;
            }
            if (formData.secondName !== user.secondName) {
                updateData.secondName = formData.secondName;
            }
            if (formData.email !== user.email) {
                updateData.email = formData.email;
            }
            if (formData.phoneNumber !== user.phoneNumber) {
                updateData.phoneNumber = formData.phoneNumber;
            }
            if (formData.gender !== user.gender) {
                updateData.gender = formData.gender;
            }
            if (formData.birthDate !== (user.birthDate ? user.birthDate.split('T')[0] : '')) {
                updateData.birthDate = formData.birthDate;
            }

            // Only update if there are changes
            if (Object.keys(updateData).length === 0) {
                onClose();
                return;
            }

            await onUpdate(user, updateData);
            onClose();
        } catch (error) {
            console.error('Failed to update user:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleInputChange = (field: keyof UpdateUserData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    return (
        <div className="fixed inset-0 modal-overlay flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900">Edit User</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        disabled={isSubmitting}
                    >
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Personal Information */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium text-gray-900 flex items-center">
                            <UserIcon className="w-5 h-5 mr-2" />
                            Personal Information
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    First Name *
                                </label>
                                <input
                                    type="text"
                                    value={formData.firstName || ''}
                                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.firstName ? 'border-red-300' : 'border-gray-300'
                                        }`}
                                    placeholder="Enter first name"
                                    disabled={isSubmitting}
                                />
                                {errors.firstName && (
                                    <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Second Name *
                                </label>
                                <input
                                    type="text"
                                    value={formData.secondName || ''}
                                    onChange={(e) => handleInputChange('secondName', e.target.value)}
                                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.secondName ? 'border-red-300' : 'border-gray-300'
                                        }`}
                                    placeholder="Enter second name"
                                    disabled={isSubmitting}
                                />
                                {errors.secondName && (
                                    <p className="mt-1 text-sm text-red-600">{errors.secondName}</p>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Gender
                                </label>
                                <select
                                    value={formData.gender || ''}
                                    onChange={(e) => handleInputChange('gender', e.target.value as 'male' | 'female')}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    disabled={isSubmitting}
                                >
                                    <option value="">Select gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Birth Date
                                </label>
                                <input
                                    type="date"
                                    value={formData.birthDate || ''}
                                    onChange={(e) => handleInputChange('birthDate', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    disabled={isSubmitting}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium text-gray-900 flex items-center">
                            <Mail className="w-5 h-5 mr-2" />
                            Contact Information
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Email *
                                </label>
                                <input
                                    type="email"
                                    value={formData.email || ''}
                                    onChange={(e) => handleInputChange('email', e.target.value)}
                                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.email ? 'border-red-300' : 'border-gray-300'
                                        }`}
                                    placeholder="Enter email address"
                                    disabled={isSubmitting}
                                />
                                {errors.email && (
                                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Phone Number *
                                </label>
                                <input
                                    type="tel"
                                    value={formData.phoneNumber || ''}
                                    onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.phoneNumber ? 'border-red-300' : 'border-gray-300'
                                        }`}
                                    placeholder="Enter phone number"
                                    disabled={isSubmitting}
                                />
                                {errors.phoneNumber && (
                                    <p className="mt-1 text-sm text-red-600">{errors.phoneNumber}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors"
                            disabled={isSubmitting}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={isSubmitting}
                        >
                            <Save className="w-4 h-4 mr-2" />
                            {isSubmitting ? 'Updating...' : 'Update User'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
