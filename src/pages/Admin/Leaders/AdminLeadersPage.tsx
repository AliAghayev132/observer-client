// Pages/Admin/AdminLeadersPage.tsx
import { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import Swal from 'sweetalert2';

// RTK
import {
    useGetLeadersQuery,
    useCreateLeaderMutation,
    type CreateLeaderData
} from '@/redux/admin/leaders/adminLeadersApi';
import { useGetCategoriesQuery } from '@/redux/admin/categories/adminCategoriesApi';
import type { Leader } from '@/redux/admin/leaders/adminLeadersApi';

// Components
import { LeaderViewModal } from './LeaderViewModal/LeaderViewModal';
import { AdminLeadersTable } from './AdminLeadersTable/AdminLeadersTable';
import { AdminLeadersHeader } from './AdminLeadersHeader/AdminLeadersHeader';
import { AddLeaderModal, type LeaderFormData } from './AddLeaderModal/AddLeaderModal';

export const AdminLeadersPage = () => {
    const [selectedLeader, setSelectedLeader] = useState<Leader | null>(null);
    const [showViewModal, setShowViewModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);

    // Get all leaders
    const {
        data,
        error,
        isLoading,
        refetch
    } = useGetLeadersQuery(undefined);

    // Get categories for the modal
    const { data: categoriesData } = useGetCategoriesQuery(undefined);

    // Create leader mutation
    const [createLeader, { isLoading: isCreating }] = useCreateLeaderMutation();

    const handleViewLeader = (leader: Leader) => {
        setSelectedLeader(leader);
        setShowViewModal(true);
    };

    const handleAddLeader = () => {
        setShowAddModal(true);
    };

    const handleCreateLeader = async (leaderData: LeaderFormData) => {
        try {
            // LeaderFormData'dan CreateLeaderData'ya dönüştür
            const createData: CreateLeaderData = {
                firstName: leaderData.firstName || '',
                lastName: leaderData.lastName || '',
                category: leaderData.categoryId,
                description: leaderData.description,
                image: leaderData.image
            };

            // Eğer fullName varsa ve firstName/lastName yoksa, split et
            if (leaderData.fullName && !leaderData.firstName && !leaderData.lastName) {
                const nameParts = leaderData.fullName.trim().split(' ');
                createData.firstName = nameParts[0] || '';
                createData.lastName = nameParts.slice(1).join(' ') || '';
            }

            await createLeader(createData).unwrap();

            // Success message
            await Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Leader created successfully',
                confirmButtonColor: '#10B981',
                timer: 2000,
                timerProgressBar: true
            });

            setShowAddModal(false);

        } catch (error) {
            console.error('Create leader error:', error);

            // Error message
            await Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Failed to create leader. Please try again.',
                confirmButtonColor: '#EF4444'
            });
        }
    };

    const closeViewModal = () => {
        setShowViewModal(false);
        setSelectedLeader(null);
    };

    const closeAddModal = () => {
        setShowAddModal(false);
    };

    // Loading state
    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading leaders...</p>
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-lg shadow-lg p-8 text-center max-w-md">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <AlertTriangle className="w-8 h-8 text-red-500" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                        Failed to Load Leaders
                    </h2>
                    <p className="text-gray-600 mb-4">
                        Unable to retrieve leaders from the server.
                    </p>
                    <button
                        onClick={() => refetch()}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    const leaders = data?.data || [];
    const categories = categoriesData?.data?.filter(cat => !cat.isDeleted) || [];

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <AdminLeadersHeader
                    totalLeaders={leaders.length}
                    onAddLeader={handleAddLeader}
                />

                <AdminLeadersTable
                    leaders={leaders}
                    onViewLeader={handleViewLeader}
                />

                {/* Add New Leader Modal */}
                <AddLeaderModal
                    isOpen={showAddModal}
                    onClose={closeAddModal}
                    onSubmit={handleCreateLeader}
                    isLoading={isCreating}
                    categories={categories}
                />

                {/* View Leader Modal */}
                <LeaderViewModal
                    leader={selectedLeader}
                    isOpen={showViewModal}
                    onClose={closeViewModal}
                />
            </div>
        </div>
    );
};
