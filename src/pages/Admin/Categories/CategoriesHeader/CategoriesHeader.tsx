// React
import React from 'react';
// Icons
import { Plus, FolderOpen } from 'lucide-react';

interface CategoriesHeaderProps {
    totalCategories: number;
    onAddCategory: () => void;
}

export const CategoriesHeader: React.FC<CategoriesHeaderProps> = ({
    onAddCategory,
    totalCategories,
}) => {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <FolderOpen className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
                        <p className="text-gray-600 mt-1">
                            Manage your product categories ({totalCategories} total)
                        </p>
                    </div>
                </div>

                <button onClick={onAddCategory} className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200">
                    <Plus className="w-5 h-5" />
                    <span>Add Category</span>
                </button>
            </div>
        </div>
    );
};
