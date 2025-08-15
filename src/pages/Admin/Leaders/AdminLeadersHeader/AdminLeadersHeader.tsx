// AdminLeadersHeader/AdminLeadersHeader.tsx
import React from 'react';
import { Plus, Users } from 'lucide-react';

interface AdminLeadersHeaderProps {
    totalLeaders: number;
    onAddLeader?: () => void; // Add this prop
}

export const AdminLeadersHeader: React.FC<AdminLeadersHeaderProps> = ({
    totalLeaders,
    onAddLeader
}) => {
    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                {/* Title and Stats */}
                <div className="flex items-center space-x-4">
                    <div className="p-3 bg-blue-100 rounded-lg">
                        <Users className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Leaders Management</h1>
                        <p className="text-gray-600 mt-1">
                            Manage and organize your leaders ({totalLeaders} total)
                        </p>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-3">
                    <button
                        onClick={onAddLeader}
                        className="flex items-center space-x-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-sm hover:shadow-md"
                    >
                        <Plus className="w-4 h-4" />
                        <span>Add New Leader</span>
                    </button>
                </div>
            </div>
        </div>
    );
};
