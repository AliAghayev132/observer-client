var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Pages/Admin/AdminLeadersPage.tsx
import { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import Swal from 'sweetalert2';
// RTK
import { useGetLeadersQuery, useCreateLeaderMutation } from '@/redux/admin/leaders/adminLeadersApi';
import { useGetCategoriesQuery } from '@/redux/admin/categories/adminCategoriesApi';
// Components
import { LeaderViewModal } from './LeaderViewModal/LeaderViewModal';
import { AdminLeadersTable } from './AdminLeadersTable/AdminLeadersTable';
import { AdminLeadersHeader } from './AdminLeadersHeader/AdminLeadersHeader';
import { AddLeaderModal } from './AddLeaderModal/AddLeaderModal';
export var AdminLeadersPage = function () {
    var _a;
    var _b = useState(null), selectedLeader = _b[0], setSelectedLeader = _b[1];
    var _c = useState(false), showViewModal = _c[0], setShowViewModal = _c[1];
    var _d = useState(false), showAddModal = _d[0], setShowAddModal = _d[1];
    // Get all leaders
    var _e = useGetLeadersQuery(undefined), data = _e.data, error = _e.error, isLoading = _e.isLoading, refetch = _e.refetch;
    // Get categories for the modal
    var categoriesData = useGetCategoriesQuery(undefined).data;
    // Create leader mutation
    var _f = useCreateLeaderMutation(), createLeader = _f[0], isCreating = _f[1].isLoading;
    var handleViewLeader = function (leader) {
        setSelectedLeader(leader);
        setShowViewModal(true);
    };
    var handleAddLeader = function () {
        setShowAddModal(true);
    };
    var handleCreateLeader = function (leaderData) { return __awaiter(void 0, void 0, void 0, function () {
        var createData, nameParts, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 5]);
                    createData = {
                        firstName: leaderData.firstName || '',
                        lastName: leaderData.lastName || '',
                        category: leaderData.categoryId,
                        description: leaderData.description,
                        image: leaderData.image
                    };
                    // Eğer fullName varsa ve firstName/lastName yoksa, split et
                    if (leaderData.fullName && !leaderData.firstName && !leaderData.lastName) {
                        nameParts = leaderData.fullName.trim().split(' ');
                        createData.firstName = nameParts[0] || '';
                        createData.lastName = nameParts.slice(1).join(' ') || '';
                    }
                    return [4 /*yield*/, createLeader(createData).unwrap()];
                case 1:
                    _a.sent();
                    // Success message
                    return [4 /*yield*/, Swal.fire({
                            icon: 'success',
                            title: 'Success!',
                            text: 'Leader created successfully',
                            confirmButtonColor: '#10B981',
                            timer: 2000,
                            timerProgressBar: true
                        })];
                case 2:
                    // Success message
                    _a.sent();
                    setShowAddModal(false);
                    return [3 /*break*/, 5];
                case 3:
                    error_1 = _a.sent();
                    console.error('Create leader error:', error_1);
                    // Error message
                    return [4 /*yield*/, Swal.fire({
                            icon: 'error',
                            title: 'Error!',
                            text: 'Failed to create leader. Please try again.',
                            confirmButtonColor: '#EF4444'
                        })];
                case 4:
                    // Error message
                    _a.sent();
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var closeViewModal = function () {
        setShowViewModal(false);
        setSelectedLeader(null);
    };
    var closeAddModal = function () {
        setShowAddModal(false);
    };
    // Loading state
    if (isLoading) {
        return (_jsx("div", { className: "min-h-screen bg-gray-50 flex items-center justify-center", children: _jsxs("div", { className: "bg-white rounded-lg shadow-lg p-8 text-center", children: [_jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4" }), _jsx("p", { className: "text-gray-600", children: "Loading leaders..." })] }) }));
    }
    // Error state
    if (error) {
        return (_jsx("div", { className: "min-h-screen bg-gray-50 flex items-center justify-center p-4", children: _jsxs("div", { className: "bg-white rounded-lg shadow-lg p-8 text-center max-w-md", children: [_jsx("div", { className: "w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4", children: _jsx(AlertTriangle, { className: "w-8 h-8 text-red-500" }) }), _jsx("h2", { className: "text-xl font-semibold text-gray-900 mb-2", children: "Failed to Load Leaders" }), _jsx("p", { className: "text-gray-600 mb-4", children: "Unable to retrieve leaders from the server." }), _jsx("button", { onClick: function () { return refetch(); }, className: "px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors", children: "Try Again" })] }) }));
    }
    var leaders = (data === null || data === void 0 ? void 0 : data.data) || [];
    var categories = ((_a = categoriesData === null || categoriesData === void 0 ? void 0 : categoriesData.data) === null || _a === void 0 ? void 0 : _a.filter(function (cat) { return !cat.isDeleted; })) || [];
    return (_jsx("div", { className: "min-h-screen bg-gray-50 p-6", children: _jsxs("div", { className: "max-w-7xl mx-auto", children: [_jsx(AdminLeadersHeader, { totalLeaders: leaders.length, onAddLeader: handleAddLeader }), _jsx(AdminLeadersTable, { leaders: leaders, onViewLeader: handleViewLeader }), _jsx(AddLeaderModal, { isOpen: showAddModal, onClose: closeAddModal, onSubmit: handleCreateLeader, isLoading: isCreating, categories: categories }), _jsx(LeaderViewModal, { leader: selectedLeader, isOpen: showViewModal, onClose: closeViewModal })] }) }));
};
