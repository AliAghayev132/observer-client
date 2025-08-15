// React    
import React, { useEffect, useState } from 'react';
// Icons
import { X, Calendar, Hash, FileText, Image as ImageIcon, Tag } from 'lucide-react';
// Models
import { Category } from '@/redux/admin/categories/adminCategoriesApi';
// Utils
import { getCategoryImageUrl } from '@/utils/imageHandler';

interface CategoryViewModalProps {
    category: Category | null;
    isOpen: boolean;
    onClose: () => void;
}

export const CategoryViewModal: React.FC<CategoryViewModalProps> = ({
    category,
    isOpen,
    onClose
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsAnimating(true);
            // Small delay to trigger the animation
            setTimeout(() => setIsVisible(true), 10);
        } else {
            setIsVisible(false);
            // Wait for animation to complete before hiding
            setTimeout(() => setIsAnimating(false), 300);
        }
    }, [isOpen]);

    // Handle ESC key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEsc);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isAnimating || !category) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            {/* Backdrop with blur effect */}
            <div
                className={`fixed inset-0 backdrop-blur-sm bg-white/30 transition-all duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'
                    }`}
                onClick={onClose}
            />

            {/* Modal */}
            <div className="flex min-h-full items-center justify-center p-2 sm:p-4">
                <div
                    className={`relative bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-3xl max-h-[98vh] sm:max-h-[95vh] overflow-hidden border border-gray-200 transition-all duration-300 transform ${isVisible
                            ? 'opacity-100 scale-100 translate-y-0'
                            : 'opacity-0 scale-95 translate-y-4'
                        }`}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
                        <div className="flex items-center space-x-2 sm:space-x-3">
                            <div className="p-1.5 sm:p-2 bg-blue-100 rounded-lg">
                                <Tag className="w-4 h-4 sm:w-6 sm:h-6 text-blue-600" />
                            </div>
                            <div>
                                <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Category Details</h2>
                                <p className="text-xs sm:text-sm text-gray-500 hidden sm:block">View category information</p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-1.5 sm:p-2 hover:bg-white/50 rounded-lg transition-all duration-200 hover:scale-110"
                        >
                            <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-3 sm:p-4 md:p-6 overflow-y-auto max-h-[calc(98vh-80px)] sm:max-h-[calc(95vh-100px)]">
                        <div className="space-y-4 sm:space-y-6 md:space-y-8">
                            {/* Category Image - Responsive Size */}
                            <div className="text-center">
                                <div className="inline-block">
                                    <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl sm:rounded-3xl flex items-center justify-center overflow-hidden border-2 sm:border-4 border-white shadow-xl sm:shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105">
                                        {category.image ? (
                                            <img
                                                src={getCategoryImageUrl(category.image)}
                                                alt={category.name}
                                                className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                                            />
                                        ) : (
                                            <div className="text-center">
                                                <ImageIcon className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 text-gray-400 mx-auto mb-1 sm:mb-2" />
                                                <p className="text-xs sm:text-sm text-gray-500">No image</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="mt-3 sm:mt-4">
                                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 break-words">{category.name}</h3>
                                    <p className="text-gray-500 mt-1 text-sm sm:text-base">/{category.slug}</p>
                                </div>
                            </div>

                            {/* Basic Information - Responsive Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                                {/* Category Name */}
                                <div className="space-y-2 sm:space-y-3 group">
                                    <label className="flex items-center space-x-2 text-xs sm:text-sm font-medium text-gray-700">
                                        <Tag className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500" />
                                        <span>Category Name</span>
                                    </label>
                                    <div className="p-3 sm:p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg sm:rounded-xl border border-blue-100 group-hover:shadow-md transition-all duration-200">
                                        <p className="text-gray-900 font-medium text-sm sm:text-base break-words">{category.name}</p>
                                    </div>
                                </div>

                                {/* Slug */}
                                <div className="space-y-2 sm:space-y-3 group">
                                    <label className="flex items-center space-x-2 text-xs sm:text-sm font-medium text-gray-700">
                                        <Hash className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
                                        <span>Slug</span>
                                    </label>
                                    <div className="p-3 sm:p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg sm:rounded-xl border border-green-100 group-hover:shadow-md transition-all duration-200">
                                        <p className="text-gray-900 font-mono text-xs sm:text-sm break-all">{category.slug}</p>
                                    </div>
                                </div>

                                {/* Status */}
                                <div className="space-y-2 sm:space-y-3 group">
                                    <label className="text-xs sm:text-sm font-medium text-gray-700">Status</label>
                                    <div className="p-3 sm:p-4 bg-gradient-to-r from-gray-50 to-slate-50 rounded-lg sm:rounded-xl border border-gray-100 group-hover:shadow-md transition-all duration-200">
                                        <span className={`inline-flex items-center px-2 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ${category.isDeleted
                                                ? 'bg-red-100 text-red-800 hover:bg-red-200'
                                                : 'bg-green-100 text-green-800 hover:bg-green-200'
                                            }`}>
                                            {category.isDeleted ? 'Deleted' : 'Active'}
                                        </span>
                                    </div>
                                </div>

                                {/* Created Date */}
                                <div className="space-y-2 sm:space-y-3 group">
                                    <label className="flex items-center space-x-2 text-xs sm:text-sm font-medium text-gray-700">
                                        <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-purple-500" />
                                        <span>Created Date</span>
                                    </label>
                                    <div className="p-3 sm:p-4 bg-gradient-to-r from-purple-50 to-violet-50 rounded-lg sm:rounded-xl border border-purple-100 group-hover:shadow-md transition-all duration-200">
                                        <p className="text-gray-900 text-sm sm:text-base">{category.formattedCreatedAt}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="space-y-2 sm:space-y-3 group">
                                <label className="flex items-center space-x-2 text-xs sm:text-sm font-medium text-gray-700">
                                    <FileText className="w-3 h-3 sm:w-4 sm:h-4 text-orange-500" />
                                    <span>Description</span>
                                </label>
                                <div className="p-4 sm:p-6 bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg sm:rounded-xl border border-orange-100 min-h-[80px] sm:min-h-[120px] group-hover:shadow-md transition-all duration-200">
                                    {category.description ? (
                                        <p className="text-gray-900 leading-relaxed text-sm sm:text-base break-words">{category.description}</p>
                                    ) : (
                                        <p className="text-gray-500 italic flex items-center justify-center h-full text-sm sm:text-base">
                                            No description provided
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Metadata */}
                            <div className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-gray-100 hover:shadow-md transition-all duration-200">
                                <h3 className="text-xs sm:text-sm font-medium text-gray-700 mb-3 sm:mb-4 flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                    <span>Metadata</span>
                                </h3>
                                <div className="grid grid-cols-1 gap-4 sm:gap-6 text-xs sm:text-sm">
                                    <div className="space-y-2">
                                        <span className="text-gray-500 font-medium">Category ID:</span>
                                        <p className="font-mono text-gray-900 break-all bg-white p-2 sm:p-3 rounded-lg border text-xs sm:text-sm">{category._id}</p>
                                    </div>
                                    <div className="space-y-2">
                                        <span className="text-gray-500 font-medium">Last Updated:</span>
                                        <p className="text-gray-900 bg-white p-2 sm:p-3 rounded-lg border text-xs sm:text-sm">
                                            {new Date(category.updatedAt).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
