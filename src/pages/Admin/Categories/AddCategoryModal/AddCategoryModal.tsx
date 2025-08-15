// components/admin/categories/AddCategoryModal.tsx
import React, { useState, useRef, useEffect } from 'react';
// Icons
import { X, Tag, FileText, Image as ImageIcon, Upload, Loader2 } from 'lucide-react';
// Toast
import { showSuccessToast, showErrorToast } from '@/utils/toastConfig';

interface AddCategoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (categoryData: CategoryFormData) => Promise<void>;
    isLoading?: boolean;
}

export interface CategoryFormData {
    name: string;
    description: string;
    image: File | null;
}

interface FormErrors {
    name?: string;
    description?: string;
    image?: string;
}

export const AddCategoryModal: React.FC<AddCategoryModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    isLoading = false
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState<CategoryFormData>({
        name: '',
        description: '',
        image: null
    });
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [errors, setErrors] = useState<FormErrors>({});

    const fileInputRef = useRef<HTMLInputElement>(null);

    // Animation effects
    useEffect(() => {
        if (isOpen) {
            setIsAnimating(true);
            setTimeout(() => setIsVisible(true), 10);
        } else {
            setIsVisible(false);
            setTimeout(() => setIsAnimating(false), 300);
        }
    }, [isOpen]);

    // Handle ESC key and body scroll
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && !isSubmitting && !isLoading) onClose();
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEsc);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose, isSubmitting, isLoading]);

    // Reset form when modal opens
    useEffect(() => {
        if (isOpen) {
            setFormData({
                name: '',
                description: '',
                image: null
            });
            setImagePreview(null);
            setErrors({});
            setIsSubmitting(false);
        }
    }, [isOpen]);

    const handleNameChange = (value: string) => {
        setFormData(prev => ({
            ...prev,
            name: value
        }));
        if (errors.name) {
            setErrors(prev => ({ ...prev, name: undefined }));
        }
    };

    const handleDescriptionChange = (value: string) => {
        setFormData(prev => ({ ...prev, description: value }));
        if (errors.description) {
            setErrors(prev => ({ ...prev, description: undefined }));
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Validate file type
            if (!file.type.startsWith('image/')) {
                setErrors(prev => ({ ...prev, image: 'Please select a valid image file' }));
                showErrorToast('Please select a valid image file');
                return;
            }

            // Validate file size (5MB limit)
            if (file.size > 5 * 1024 * 1024) {
                setErrors(prev => ({ ...prev, image: 'Image size should be less than 5MB' }));
                showErrorToast('Image size should be less than 5MB');
                return;
            }

            // Update form data with the file
            setFormData(prev => ({ ...prev, image: file }));

            // Create preview
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target?.result as string);
            };
            reader.readAsDataURL(file);

            // Clear any previous image errors
            if (errors.image) {
                setErrors(prev => ({ ...prev, image: undefined }));
            }

            showSuccessToast('Image uploaded successfully');
        }
    };

    const removeImage = () => {
        setFormData(prev => ({ ...prev, image: null }));
        setImagePreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
        // Clear any image errors
        if (errors.image) {
            setErrors(prev => ({ ...prev, image: undefined }));
        }
        showSuccessToast('Image removed');
    };

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        // Validate name
        if (!formData.name.trim()) {
            newErrors.name = 'Category name is required';
        } else if (formData.name.trim().length < 2) {
            newErrors.name = 'Category name must be at least 2 characters';
        } else if (formData.name.trim().length > 50) {
            newErrors.name = 'Category name must be less than 50 characters';
        }

        // Validate description (optional but with length limit)
        if (formData.description.trim().length > 500) {
            newErrors.description = 'Description must be less than 500 characters';
        }

        setErrors(newErrors);
        
        if (Object.keys(newErrors).length > 0) {
            showErrorToast('Please fix the form errors');
            return false;
        }
        
        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm() || isSubmitting || isLoading) return;

        setIsSubmitting(true);
        
        try {
            await onSubmit(formData);
            showSuccessToast('Category created successfully!');
            onClose();
        } catch (error) {
            console.error('Error creating category:', error);
            showErrorToast(
                error?.message || 
                error?.response?.data?.message || 
                'Failed to create category. Please try again.'
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleClose = () => {
        if (isSubmitting || isLoading) {
            showErrorToast('Please wait for the operation to complete');
            return;
        }
        onClose();
    };

    if (!isAnimating) return null;

    const isDisabled = isSubmitting || isLoading;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            {/* Backdrop */}
            <div
                className={`fixed inset-0 backdrop-blur-sm bg-white/30 transition-all duration-300 ${
                    isVisible ? 'opacity-100' : 'opacity-0'
                }`}
                onClick={!isDisabled ? handleClose : undefined}
            />

            {/* Modal */}
            <div className="flex min-h-full items-center justify-center p-2 sm:p-4">
                <div
                    className={`relative bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl max-h-[98vh] sm:max-h-[95vh] overflow-hidden border border-gray-200 transition-all duration-300 transform ${
                        isVisible
                            ? 'opacity-100 scale-100 translate-y-0'
                            : 'opacity-0 scale-95 translate-y-4'
                    }`}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 bg-gradient-to-r from-green-50 to-emerald-50">
                        <div className="flex items-center space-x-2 sm:space-x-3">
                            <div className="p-1.5 sm:p-2 bg-green-100 rounded-lg">
                                <Tag className="w-4 h-4 sm:w-6 sm:h-6 text-green-600" />
                            </div>
                            <div>
                                <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                                    Add New Category
                                </h2>
                                <p className="text-xs sm:text-sm text-gray-500 hidden sm:block">
                                    Create a new category
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={handleClose}
                            disabled={isDisabled}
                            className="p-1.5 sm:p-2 hover:bg-white/50 rounded-lg transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                        </button>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="p-3 sm:p-4 md:p-6 overflow-y-auto max-h-[calc(98vh-140px)] sm:max-h-[calc(95vh-160px)]">
                        <div className="space-y-4 sm:space-y-6">
                            {/* Image Upload */}
                            <div className="space-y-2 sm:space-y-3">
                                <label className="flex items-center space-x-2 text-xs sm:text-sm font-medium text-gray-700">
                                    <ImageIcon className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500" />
                                    <span>Category Image</span>
                                    <span className="text-gray-400">(Optional)</span>
                                </label>

                                <div className="flex flex-col items-center space-y-3 sm:space-y-4">
                                    {/* Image Preview */}
                                    <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl flex items-center justify-center overflow-hidden border-2 border-dashed border-gray-300">
                                        {imagePreview ? (
                                            <img
                                                src={imagePreview}
                                                alt="Preview"
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="text-center">
                                                <ImageIcon className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400 mx-auto mb-1" />
                                                <p className="text-xs text-gray-500">No image</p>
                                            </div>
                                        )}
                                    </div>

                                    {/* Upload Buttons */}
                                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                                        <button
                                            type="button"
                                            onClick={() => fileInputRef.current?.click()}
                                            disabled={isDisabled}
                                            className="flex items-center space-x-2 px-3 sm:px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                                        >
                                            <Upload className="w-4 h-4" />
                                            <span>Upload Image</span>
                                        </button>

                                        {imagePreview && (
                                            <button
                                                type="button"
                                                onClick={removeImage}
                                                disabled={isDisabled}
                                                className="px-3 sm:px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                                            >
                                                Remove
                                            </button>
                                        )}
                                    </div>

                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="hidden"
                                        disabled={isDisabled}
                                    />

                                    {errors.image && (
                                        <p className="text-red-500 text-xs sm:text-sm">{errors.image}</p>
                                    )}
                                </div>
                            </div>

                            {/* Category Name */}
                            <div className="space-y-2 sm:space-y-3">
                                <label className="flex items-center space-x-2 text-xs sm:text-sm font-medium text-gray-700">
                                    <Tag className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
                                    <span>Category Name *</span>
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => handleNameChange(e.target.value)}
                                    placeholder="Enter category name"
                                    disabled={isDisabled}
                                    className={`w-full p-3 sm:p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg sm:rounded-xl border text-sm sm:text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed ${
                                        errors.name ? 'border-red-300' : 'border-green-100'
                                    }`}
                                />
                                {errors.name && (
                                    <p className="text-red-500 text-xs sm:text-sm">{errors.name}</p>
                                )}
                            </div>

                            {/* Description */}
                            <div className="space-y-2 sm:space-y-3">
                                <label className="flex items-center space-x-2 text-xs sm:text-sm font-medium text-gray-700">
                                    <FileText className="w-3 h-3 sm:w-4 sm:h-4 text-orange-500" />
                                    <span>Description</span>
                                    <span className="text-gray-400">(Optional)</span>
                                </label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => handleDescriptionChange(e.target.value)}
                                    placeholder="Enter category description..."
                                    rows={4}
                                    disabled={isDisabled}
                                    className={`w-full p-3 sm:p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg sm:rounded-xl border text-sm sm:text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed resize-none ${
                                        errors.description ? 'border-red-300' : 'border-orange-100'
                                    }`}
                                />
                                {errors.description && (
                                    <p className="text-red-500 text-xs sm:text-sm">{errors.description}</p>
                                )}
                            </div>
                        </div>
                    </form>

                    {/* Footer */}
                    <div className="flex items-center justify-end space-x-3 p-4 sm:p-6 border-t border-gray-200 bg-gradient-to-r from-gray-50 to-slate-50">
                        <button
                            type="button"
                            onClick={handleClose}
                            disabled={isDisabled}
                            className="px-4 sm:px-6 py-2 sm:py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg sm:rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 hover:scale-105 font-medium disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={isDisabled}
                            className="flex items-center space-x-2 px-4 sm:px-6 py-2 sm:py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg sm:rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                        >
                            {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                            <span>{isSubmitting ? 'Creating...' : 'Create Category'}</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
