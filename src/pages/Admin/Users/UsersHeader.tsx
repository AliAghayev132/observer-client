// components/admin/users/UsersHeader/UsersHeader.tsx
// React
import React from 'react';
// Icons
import {
    Users,
    Filter,
    Download,
} from 'lucide-react';

interface UsersHeaderProps {
    totalUsers: number;
}

export const UsersHeader: React.FC<UsersHeaderProps> = ({
    totalUsers
}) => {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                {/* Title and Stats */}
                <div className="flex items-center space-x-4">
                    <div className="p-3 bg-blue-100 rounded-xl">
                        <Users className="w-8 h-8 text-blue-600" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Users Management</h1>
                        <p className="text-gray-600 mt-1">
                            Manage and monitor user accounts
                        </p>
                        <div className="flex items-center space-x-4 mt-2">
                            <div className="flex items-center space-x-2 text-sm">
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                <span className="text-gray-600">Total Users:</span>
                                <span className="font-semibold text-gray-900">{totalUsers.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-3">
                    <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200">
                        <Download className="w-4 h-4 mr-2" />
                        Export
                    </button>

                    <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200">
                        <Filter className="w-4 h-4 mr-2" />
                        Advanced Filter
                    </button>
                </div>
            </div>
        </div>
    );
};
