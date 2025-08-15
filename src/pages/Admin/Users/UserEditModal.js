var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
// components/admin/users/UserEditModal/UserEditModal.tsx
import { useState, useEffect } from 'react';
import { X, Save, User as UserIcon, Mail } from 'lucide-react';
export var UserEditModal = function (_a) {
    var isOpen = _a.isOpen, onClose = _a.onClose, user = _a.user, onUpdate = _a.onUpdate;
    var _b = useState({
        firstName: '',
        secondName: '',
        email: '',
        phoneNumber: '',
        gender: undefined,
        birthDate: ''
    }), formData = _b[0], setFormData = _b[1];
    var _c = useState(false), isSubmitting = _c[0], setIsSubmitting = _c[1];
    var _d = useState({}), errors = _d[0], setErrors = _d[1];
    // Initialize form data when user changes
    useEffect(function () {
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
    if (!isOpen)
        return null;
    var validateForm = function () {
        var _a, _b, _c, _d;
        var newErrors = {};
        if (!((_a = formData.firstName) === null || _a === void 0 ? void 0 : _a.trim())) {
            newErrors.firstName = 'First name is required';
        }
        if (!((_b = formData.secondName) === null || _b === void 0 ? void 0 : _b.trim())) {
            newErrors.secondName = 'Second name is required';
        }
        if (!((_c = formData.email) === null || _c === void 0 ? void 0 : _c.trim())) {
            newErrors.email = 'Email is required';
        }
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }
        if (!((_d = formData.phoneNumber) === null || _d === void 0 ? void 0 : _d.trim())) {
            newErrors.phoneNumber = 'Phone number is required';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    var handleSubmit = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var updateData, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    if (!validateForm()) {
                        return [2 /*return*/];
                    }
                    setIsSubmitting(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    updateData = {};
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
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, onUpdate(user, updateData)];
                case 2:
                    _a.sent();
                    onClose();
                    return [3 /*break*/, 5];
                case 3:
                    error_1 = _a.sent();
                    console.error('Failed to update user:', error_1);
                    return [3 /*break*/, 5];
                case 4:
                    setIsSubmitting(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var handleInputChange = function (field, value) {
        setFormData(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[field] = value, _a)));
        });
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(function (prev) {
                var _a;
                return (__assign(__assign({}, prev), (_a = {}, _a[field] = '', _a)));
            });
        }
    };
    return (_jsx("div", { className: "fixed inset-0 modal-overlay flex items-center justify-center p-4 z-50", children: _jsxs("div", { className: "bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto", children: [_jsxs("div", { className: "flex items-center justify-between p-6 border-b border-gray-200", children: [_jsx("h2", { className: "text-xl font-semibold text-gray-900", children: "Edit User" }), _jsx("button", { onClick: onClose, className: "p-2 hover:bg-gray-100 rounded-lg transition-colors", disabled: isSubmitting, children: _jsx(X, { className: "w-5 h-5 text-gray-500" }) })] }), _jsxs("form", { onSubmit: handleSubmit, className: "p-6 space-y-6", children: [_jsxs("div", { className: "space-y-4", children: [_jsxs("h3", { className: "text-lg font-medium text-gray-900 flex items-center", children: [_jsx(UserIcon, { className: "w-5 h-5 mr-2" }), "Personal Information"] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "First Name *" }), _jsx("input", { type: "text", value: formData.firstName || '', onChange: function (e) { return handleInputChange('firstName', e.target.value); }, className: "w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ".concat(errors.firstName ? 'border-red-300' : 'border-gray-300'), placeholder: "Enter first name", disabled: isSubmitting }), errors.firstName && (_jsx("p", { className: "mt-1 text-sm text-red-600", children: errors.firstName }))] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Second Name *" }), _jsx("input", { type: "text", value: formData.secondName || '', onChange: function (e) { return handleInputChange('secondName', e.target.value); }, className: "w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ".concat(errors.secondName ? 'border-red-300' : 'border-gray-300'), placeholder: "Enter second name", disabled: isSubmitting }), errors.secondName && (_jsx("p", { className: "mt-1 text-sm text-red-600", children: errors.secondName }))] })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Gender" }), _jsxs("select", { value: formData.gender || '', onChange: function (e) { return handleInputChange('gender', e.target.value); }, className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500", disabled: isSubmitting, children: [_jsx("option", { value: "", children: "Select gender" }), _jsx("option", { value: "male", children: "Male" }), _jsx("option", { value: "female", children: "Female" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Birth Date" }), _jsx("input", { type: "date", value: formData.birthDate || '', onChange: function (e) { return handleInputChange('birthDate', e.target.value); }, className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500", disabled: isSubmitting })] })] })] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("h3", { className: "text-lg font-medium text-gray-900 flex items-center", children: [_jsx(Mail, { className: "w-5 h-5 mr-2" }), "Contact Information"] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Email *" }), _jsx("input", { type: "email", value: formData.email || '', onChange: function (e) { return handleInputChange('email', e.target.value); }, className: "w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ".concat(errors.email ? 'border-red-300' : 'border-gray-300'), placeholder: "Enter email address", disabled: isSubmitting }), errors.email && (_jsx("p", { className: "mt-1 text-sm text-red-600", children: errors.email }))] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Phone Number *" }), _jsx("input", { type: "tel", value: formData.phoneNumber || '', onChange: function (e) { return handleInputChange('phoneNumber', e.target.value); }, className: "w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ".concat(errors.phoneNumber ? 'border-red-300' : 'border-gray-300'), placeholder: "Enter phone number", disabled: isSubmitting }), errors.phoneNumber && (_jsx("p", { className: "mt-1 text-sm text-red-600", children: errors.phoneNumber }))] })] })] }), _jsxs("div", { className: "flex justify-end space-x-3 pt-6 border-t border-gray-200", children: [_jsx("button", { type: "button", onClick: onClose, className: "px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors", disabled: isSubmitting, children: "Cancel" }), _jsxs("button", { type: "submit", className: "inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed", disabled: isSubmitting, children: [_jsx(Save, { className: "w-4 h-4 mr-2" }), isSubmitting ? 'Updating...' : 'Update User'] })] })] })] }) }));
};
