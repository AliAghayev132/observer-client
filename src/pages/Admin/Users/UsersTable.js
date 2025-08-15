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
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
// components/admin/users/UsersTable/UsersTable.tsx
// React
import { useState, useRef, useEffect } from 'react';
// Icons
import { Eye, Edit3, Shield, ShieldOff, Trash2, RotateCcw, UserX, Mail, Calendar, Image as ImageIcon, AlertCircle, Users, MoreVertical, } from 'lucide-react';
// Components
import { UserViewModal } from './UserViewModal';
import { UserEditModal } from './UserEditModal';
// Utils
import { getUserProfilePictureUrl } from '@/utils/imageHandler';
// Hooks
import { useUserActions } from '@/hooks/admin/useUserActions';
// Dropdown Menu Component
// Dropdown Menu Component
var ActionDropdown = function (_a) {
    var _b, _c, _d, _e, _f;
    var user = _a.user, onView = _a.onView, onEdit = _a.onEdit, onBlock = _a.onBlock, onUnblock = _a.onUnblock, onDelete = _a.onDelete, onRestore = _a.onRestore, onDeleteForever = _a.onDeleteForever, onDeletePhoto = _a.onDeletePhoto, loadingStates = _a.loadingStates;
    var _g = useState(false), isOpen = _g[0], setIsOpen = _g[1];
    var dropdownRef = useRef(null);
    // Close dropdown when clicking outside
    useEffect(function () {
        var handleClickOutside = function (event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            return function () { return document.removeEventListener('mousedown', handleClickOutside); };
        }
    }, [isOpen]);
    var handleAction = function (action) {
        action();
        setIsOpen(false);
    };
    return (_jsxs("div", { className: "relative inline-block text-left", ref: dropdownRef, children: [_jsx("button", { onClick: function (e) {
                    e.stopPropagation();
                    setIsOpen(!isOpen);
                }, className: "inline-flex items-center justify-center w-8 h-8 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500", title: "More actions", type: "button", children: _jsx(MoreVertical, { className: "w-4 h-4" }) }), isOpen && (_jsxs(_Fragment, { children: [_jsx("div", { className: "fixed inset-0 z-40", onClick: function () { return setIsOpen(false); } }), _jsxs("div", { className: "absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50 transform opacity-100 scale-100", children: [_jsxs("button", { onClick: function () { return handleAction(onView); }, className: "w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors", type: "button", children: [_jsx(Eye, { className: "w-4 h-4 mr-3 text-blue-500" }), "View Details"] }), !((_b = user.delete) === null || _b === void 0 ? void 0 : _b.isDeleted) && (_jsxs("button", { onClick: function () { return handleAction(onEdit); }, className: "w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors", type: "button", children: [_jsx(Edit3, { className: "w-4 h-4 mr-3 text-amber-500" }), "Edit User"] })), _jsx("div", { className: "border-t border-gray-100 my-1" }), !((_c = user.delete) === null || _c === void 0 ? void 0 : _c.isDeleted) && (((_d = user.block) === null || _d === void 0 ? void 0 : _d.isBlocked) ? (_jsxs("button", { onClick: function () { return handleAction(onUnblock); }, disabled: loadingStates.unblocking, className: "w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed", type: "button", children: [_jsx(Shield, { className: "w-4 h-4 mr-3 text-green-500" }), loadingStates.unblocking ? 'Unblocking...' : 'Unblock User'] })) : (_jsxs("button", { onClick: function () { return handleAction(onBlock); }, disabled: loadingStates.blocking, className: "w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed", type: "button", children: [_jsx(ShieldOff, { className: "w-4 h-4 mr-3 text-orange-500" }), loadingStates.blocking ? 'Blocking...' : 'Block User'] }))), !((_e = user.delete) === null || _e === void 0 ? void 0 : _e.isDeleted) && user.profilePicture && (_jsxs("button", { onClick: function () { return handleAction(onDeletePhoto); }, disabled: loadingStates.deletingPhoto, className: "w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed", type: "button", children: [_jsx(ImageIcon, { className: "w-4 h-4 mr-3 text-purple-500" }), loadingStates.deletingPhoto ? 'Deleting...' : 'Delete Photo'] })), _jsx("div", { className: "border-t border-gray-100 my-1" }), ((_f = user.delete) === null || _f === void 0 ? void 0 : _f.isDeleted) ? (_jsxs(_Fragment, { children: [_jsxs("button", { onClick: function () { return handleAction(onRestore); }, disabled: loadingStates.restoring, className: "w-full flex items-center px-4 py-2 text-sm text-green-700 hover:bg-green-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed", type: "button", children: [_jsx(RotateCcw, { className: "w-4 h-4 mr-3 text-green-500" }), loadingStates.restoring ? 'Restoring...' : 'Restore User'] }), _jsxs("button", { onClick: function () { return handleAction(onDeleteForever); }, disabled: loadingStates.permanentDeleting, className: "w-full flex items-center px-4 py-2 text-sm text-red-700 hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed", type: "button", children: [_jsx(UserX, { className: "w-4 h-4 mr-3 text-red-500" }), loadingStates.permanentDeleting ? 'Deleting...' : 'Delete Forever'] })] })) : (_jsxs("button", { onClick: function () { return handleAction(onDelete); }, disabled: loadingStates.deleting, className: "w-full flex items-center px-4 py-2 text-sm text-red-700 hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed", type: "button", children: [_jsx(Trash2, { className: "w-4 h-4 mr-3 text-red-500" }), loadingStates.deleting ? 'Deleting...' : 'Delete User'] }))] })] }))] }));
};
export var UsersTable = function (_a) {
    var users = _a.users, isLoading = _a.isLoading, error = _a.error, searchTerm = _a.searchTerm;
    var _b = useState(false), isViewModalOpen = _b[0], setIsViewModalOpen = _b[1];
    var _c = useState(false), isEditModalOpen = _c[0], setIsEditModalOpen = _c[1];
    var _d = useState(null), selectedUser = _d[0], setSelectedUser = _d[1];
    var _e = useUserActions(), handleBlockUser = _e.handleBlockUser, handleUnblockUser = _e.handleUnblockUser, handleDeleteUser = _e.handleDeleteUser, handleRestoreUser = _e.handleRestoreUser, handlePermanentDeleteUser = _e.handlePermanentDeleteUser, handleDeleteUserProfilePhoto = _e.handleDeleteUserProfilePhoto, handleUpdateUser = _e.handleUpdateUser, loadingStates = _e.loadingStates;
    // Get user initials for placeholder
    var getUserInitials = function (firstName, secondName) {
        return "".concat(firstName.charAt(0)).concat(secondName.charAt(0)).toUpperCase();
    };
    // Format date helper
    var formatDate = function (dateString) {
        try {
            var date = new Date(dateString);
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
        }
        catch (error) {
            console.log(error);
            return 'Invalid Date';
        }
    };
    // Get user status
    var getUserStatus = function (user) {
        var _a, _b;
        if ((_a = user.delete) === null || _a === void 0 ? void 0 : _a.isDeleted)
            return 'Deleted';
        if ((_b = user.block) === null || _b === void 0 ? void 0 : _b.isBlocked)
            return 'Blocked';
        return 'Active';
    };
    // Modal handlers
    var handleViewUser = function (user) {
        setSelectedUser(user);
        setIsViewModalOpen(true);
    };
    var handleEditUser = function (user) {
        setSelectedUser(user);
        setIsEditModalOpen(true);
    };
    var handleCloseViewModal = function () {
        setIsViewModalOpen(false);
        setSelectedUser(null);
    };
    var handleCloseEditModal = function () {
        setIsEditModalOpen(false);
        setSelectedUser(null);
    };
    // Action handlers
    var onBlockUser = function (user) { return __awaiter(void 0, void 0, void 0, function () {
        var error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, handleBlockUser(user)];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.error('Failed to block user:', error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var onUnBlockUser = function (user) { return __awaiter(void 0, void 0, void 0, function () {
        var error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, handleUnblockUser(user)];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    console.error('Failed to unblock user:', error_2);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var onDeleteUser = function (user) { return __awaiter(void 0, void 0, void 0, function () {
        var error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, handleDeleteUser(user)];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _a.sent();
                    console.error('Failed to delete user:', error_3);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var onRestoreUser = function (user) { return __awaiter(void 0, void 0, void 0, function () {
        var error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, handleRestoreUser(user)];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    error_4 = _a.sent();
                    console.error('Failed to restore user:', error_4);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var onDeleteUserForever = function (user) { return __awaiter(void 0, void 0, void 0, function () {
        var error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, handlePermanentDeleteUser(user)];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    error_5 = _a.sent();
                    console.error('Failed to permanently delete user:', error_5);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var onDeleteProfilePhoto = function (user) { return __awaiter(void 0, void 0, void 0, function () {
        var error_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, handleDeleteUserProfilePhoto(user)];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    error_6 = _a.sent();
                    console.error('Failed to delete profile photo:', error_6);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    // Update user handler for modal
    var onUpdateUser = function (user, data) { return __awaiter(void 0, void 0, void 0, function () {
        var error_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, handleUpdateUser(user, data)];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    error_7 = _a.sent();
                    console.error('Failed to update user:', error_7);
                    throw error_7;
                case 3: return [2 /*return*/];
            }
        });
    }); };
    // Error state
    if (error) {
        return (_jsx("div", { className: "bg-white rounded-lg xs:rounded-xl shadow-sm border border-gray-200 p-4 xs:p-6 sm:p-8", children: _jsxs("div", { className: "text-center", children: [_jsx(AlertCircle, { className: "w-10 h-10 xs:w-12 xs:h-12 text-red-500 mx-auto mb-4" }), _jsx("h3", { className: "text-base xs:text-lg font-semibold text-gray-900 mb-2", children: "Error Loading Users" }), _jsx("p", { className: "text-sm xs:text-base text-gray-600 mb-4", children: error || 'Failed to load users. Please try again.' }), _jsx("button", { onClick: function () { return window.location.reload(); }, className: "inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm xs:text-base", children: "Try Again" })] }) }));
    }
    // Empty state
    if (!isLoading && users.length === 0) {
        return (_jsx("div", { className: "bg-white rounded-lg xs:rounded-xl shadow-sm border border-gray-200 p-4 xs:p-6 sm:p-8", children: _jsxs("div", { className: "text-center", children: [_jsx(Users, { className: "w-12 h-12 xs:w-16 xs:h-16 text-gray-400 mx-auto mb-4" }), _jsx("h3", { className: "text-base xs:text-lg font-semibold text-gray-900 mb-2", children: "No Users Found" }), _jsx("p", { className: "text-sm xs:text-base text-gray-600 mb-4", children: searchTerm
                            ? "No users found matching \"".concat(searchTerm, "\". Try adjusting your search criteria.")
                            : 'No users found. Users will appear here once they are added to the system.' })] }) }));
    }
    return (_jsxs("div", { className: "relative", children: [_jsx("div", { className: "block xl:hidden space-y-3 xs:space-y-4", children: users.map(function (user) {
                    var _a, _b, _c, _d, _e, _f;
                    return (_jsxs("div", { className: "bg-white rounded-lg xs:rounded-xl shadow-sm border border-gray-200 p-3 xs:p-4 relative", children: [_jsxs("div", { className: "flex items-start justify-between mb-3", children: [_jsxs("div", { className: "flex items-center space-x-3 min-w-0 flex-1", children: [_jsx("div", { className: "w-10 h-10 xs:w-12 xs:h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-centerS flex-shrink-0", children: user.profilePicture ? (_jsx("img", { src: getUserProfilePictureUrl(user.profilePicture), alt: "".concat(user.firstName, " ").concat(user.secondName), className: "w-full h-full object-cover" })) : (_jsx("span", { className: "text-white font-medium text-xs xs:text-sm", children: getUserInitials(user.firstName, user.secondName) })) }), _jsxs("div", { className: "min-w-0 flex-1", children: [_jsxs("div", { className: "font-medium text-gray-900 text-sm xs:text-base truncate", children: [user.firstName, " ", user.secondName] }), _jsxs("div", { className: "text-xs text-gray-500 truncate", children: ["ID: ", user._id] })] })] }), _jsxs("div", { className: "flex items-center space-x-2 flex-shrink-0", children: [_jsx("span", { className: "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ".concat(((_a = user.delete) === null || _a === void 0 ? void 0 : _a.isDeleted)
                                                    ? 'bg-red-100 text-red-800'
                                                    : ((_b = user.block) === null || _b === void 0 ? void 0 : _b.isBlocked)
                                                        ? 'bg-yellow-100 text-yellow-800'
                                                        : 'bg-green-100 text-green-800'), children: getUserStatus(user) }), _jsx(ActionDropdown, { user: user, onView: function () { return handleViewUser(user); }, onEdit: function () { return handleEditUser(user); }, onBlock: function () { return onBlockUser(user); }, onUnblock: function () { return onUnBlockUser(user); }, onDelete: function () { return onDeleteUser(user); }, onRestore: function () { return onRestoreUser(user); }, onDeleteForever: function () { return onDeleteUserForever(user); }, onDeletePhoto: function () { return onDeleteProfilePhoto(user); }, loadingStates: loadingStates })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex items-center text-xs xs:text-sm text-gray-600", children: [_jsx(Mail, { className: "h-3 w-3 xs:h-4 xs:w-4 text-gray-400 mr-2 flex-shrink-0" }), _jsx("span", { className: "truncate", children: user.email })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center text-xs xs:text-sm text-gray-600", children: [_jsx(Calendar, { className: "w-3 h-3 xs:w-4 xs:h-4 mr-2 flex-shrink-0" }), _jsx("span", { children: formatDate(user.createdAt) })] }), _jsx("span", { className: "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ".concat(user.gender === 'male'
                                                    ? 'bg-blue-100 text-blue-800'
                                                    : user.gender === 'female'
                                                        ? 'bg-pink-100 text-pink-800'
                                                        : 'bg-gray-100 text-gray-800'), children: user.gender ? user.gender.charAt(0).toUpperCase() + user.gender.slice(1) : 'Not specified' })] }), _jsxs("div", { className: "text-xs text-gray-500", children: ["Born: ", formatDate(user.birthDate)] }), ((_c = user.block) === null || _c === void 0 ? void 0 : _c.isBlocked) && ((_d = user.block) === null || _d === void 0 ? void 0 : _d.reason) && (_jsxs("div", { className: "text-xs text-yellow-600 bg-yellow-50 p-2 rounded border-l-2 border-yellow-200", children: [_jsx("strong", { children: "Block reason:" }), " ", user.block.reason] })), ((_e = user.delete) === null || _e === void 0 ? void 0 : _e.isDeleted) && ((_f = user.delete) === null || _f === void 0 ? void 0 : _f.reason) && (_jsxs("div", { className: "text-xs text-red-600 bg-red-50 p-2 rounded border-l-2 border-red-200", children: [_jsx("strong", { children: "Delete reason:" }), " ", user.delete.reason] }))] })] }, user._id));
                }) }), _jsx("div", { className: "hidden xl:block bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden", children: _jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full", children: [_jsx("thead", { className: "bg-gray-50 border-b border-gray-200", children: _jsxs("tr", { children: [_jsx("th", { className: "text-left py-4 px-6 font-semibold text-gray-900 text-sm", children: "User" }), _jsx("th", { className: "text-left py-4 px-6 font-semibold text-gray-900 text-sm", children: "Contact" }), _jsx("th", { className: "text-left py-4 px-6 font-semibold text-gray-900 text-sm", children: "Gender" }), _jsx("th", { className: "text-left py-4 px-6 font-semibold text-gray-900 text-sm", children: "Status" }), _jsx("th", { className: "text-left py-4 px-6 font-semibold text-gray-900 text-sm", children: "Created" }), _jsx("th", { className: "text-left py-4 px-6 font-semibold text-gray-900 text-sm", children: "Actions" })] }) }), _jsx("tbody", { className: "divide-y divide-gray-200", children: users.map(function (user) {
                                    var _a, _b, _c, _d, _e, _f;
                                    return (_jsxs("tr", { className: "hover:bg-gray-50 transition-colors", children: [_jsx("td", { className: "py-4 px-6", children: _jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: "w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center overflow-hidden flex-shrink-0", children: user.profilePicture ? (_jsx("img", { src: getUserProfilePictureUrl(user.profilePicture), alt: "".concat(user.firstName, " ").concat(user.secondName), className: "w-full h-full object-cover" })) : (_jsx("span", { className: "text-white font-medium text-sm", children: getUserInitials(user.firstName, user.secondName) })) }), _jsxs("div", { className: "min-w-0 flex-1", children: [_jsxs("p", { className: "text-sm font-semibold text-gray-900 truncate", children: [user.firstName, " ", user.secondName] }), _jsxs("p", { className: "text-xs text-gray-500 truncate", children: ["ID: ", user._id] })] })] }) }), _jsx("td", { className: "py-4 px-6", children: _jsxs("div", { className: "space-y-1", children: [_jsxs("div", { className: "flex items-center space-x-2 text-sm text-gray-900", children: [_jsx(Mail, { className: "w-4 h-4 text-gray-400" }), _jsx("span", { className: "truncate max-w-xs", children: user.email })] }), _jsxs("div", { className: "text-xs text-gray-500", children: ["Born: ", formatDate(user.birthDate)] })] }) }), _jsx("td", { className: "py-4 px-6", children: _jsx("span", { className: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ".concat(user.gender === 'male'
                                                        ? 'bg-blue-100 text-blue-800'
                                                        : user.gender === 'female'
                                                            ? 'bg-pink-100 text-pink-800'
                                                            : 'bg-gray-100 text-gray-800'), children: user.gender ? user.gender.charAt(0).toUpperCase() + user.gender.slice(1) : 'Not specified' }) }), _jsx("td", { className: "py-4 px-6", children: _jsxs("div", { className: "space-y-1", children: [_jsx("span", { className: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ".concat(((_a = user.delete) === null || _a === void 0 ? void 0 : _a.isDeleted)
                                                                ? 'bg-red-100 text-red-800'
                                                                : ((_b = user.block) === null || _b === void 0 ? void 0 : _b.isBlocked)
                                                                    ? 'bg-yellow-100 text-yellow-800'
                                                                    : 'bg-green-100 text-green-800'), children: getUserStatus(user) }), ((_c = user.block) === null || _c === void 0 ? void 0 : _c.isBlocked) && ((_d = user.block) === null || _d === void 0 ? void 0 : _d.reason) && (_jsxs("div", { className: "text-xs text-yellow-600 truncate max-w-xs", title: user.block.reason, children: ["Reason: ", user.block.reason] })), ((_e = user.delete) === null || _e === void 0 ? void 0 : _e.isDeleted) && ((_f = user.delete) === null || _f === void 0 ? void 0 : _f.reason) && (_jsxs("div", { className: "text-xs text-red-600 truncate max-w-xs", title: user.delete.reason, children: ["Reason: ", user.delete.reason] }))] }) }), _jsx("td", { className: "py-4 px-6", children: _jsxs("div", { className: "flex items-center space-x-1 text-gray-600", children: [_jsx(Calendar, { className: "w-4 h-4" }), _jsx("span", { className: "text-sm", children: formatDate(user.createdAt) })] }) }), _jsx("td", { className: "py-4 px-6", children: _jsx("div", { className: "flex items-center justify-end", children: _jsx(ActionDropdown, { user: user, onView: function () { return handleViewUser(user); }, onEdit: function () { return handleEditUser(user); }, onBlock: function () { return onBlockUser(user); }, onUnblock: function () { return onUnBlockUser(user); }, onDelete: function () { return onDeleteUser(user); }, onRestore: function () { return onRestoreUser(user); }, onDeleteForever: function () { return onDeleteUserForever(user); }, onDeletePhoto: function () { return onDeleteProfilePhoto(user); }, loadingStates: loadingStates }) }) })] }, user._id));
                                }) })] }) }) }), Object.values(loadingStates).some(function (state) { return state; }) && (_jsx("div", { className: "absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-40", children: _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("div", { className: "animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600" }), _jsx("span", { className: "text-sm text-gray-600", children: "Processing..." })] }) })), selectedUser && (_jsxs(_Fragment, { children: [_jsx(UserViewModal, { isOpen: isViewModalOpen, onClose: handleCloseViewModal, user: selectedUser }), _jsx(UserEditModal, { isOpen: isEditModalOpen, onClose: handleCloseEditModal, user: selectedUser, onUpdate: onUpdateUser })] }))] }));
};
