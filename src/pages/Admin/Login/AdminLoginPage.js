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
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
// React
import { useEffect, useState } from 'react';
// React Router
import { useNavigate } from 'react-router';
// Icons
import { Eye, EyeOff, Lock, User, Shield } from 'lucide-react';
// Components
import { LoadingSpinner } from '@/components/LoadingSpinner/LoadingSpinner';
// Utils
import { showErrorToast, showSuccessToast, } from "@/utils/toastConfig";
import { getMessageByCode } from '@/utils/getMessageByCode';
// Packages
import { Toaster } from 'react-hot-toast';
// Redux
import { useSelector } from 'react-redux';
import { useAdminLoginMutation, useAdminRefreshTokenMutation } from '@/redux/admin/auth/adminAuthApi';
export var AdminLoginPage = function () {
    var _a = useState({
        username: '',
        password: ''
    }), formData = _a[0], setFormData = _a[1];
    var _b = useState(false), showPassword = _b[0], setShowPassword = _b[1];
    var _c = useState(false), isLoading = _c[0], setIsLoading = _c[1];
    var _d = useState(null), focusedField = _d[0], setFocusedField = _d[1];
    var _e = useState(true), isCheckingAuth = _e[0], setIsCheckingAuth = _e[1];
    var _f = useSelector(function (state) { return state.adminAuth; }), isAuthenticated = _f.isAuthenticated, accessToken = _f.accessToken;
    var login = useAdminLoginMutation()[0];
    var refreshToken = useAdminRefreshTokenMutation()[0];
    var navigate = useNavigate();
    // Check authentication status on component mount
    useEffect(function () {
        var checkAuthStatus = function () { return __awaiter(void 0, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // If already authenticated with valid token, redirect immediately
                        if (isAuthenticated && accessToken) {
                            navigate('/admin/system', { replace: true });
                            return [2 /*return*/];
                        }
                        if (!!isAuthenticated) return [3 /*break*/, 6];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        return [4 /*yield*/, refreshToken().unwrap()];
                    case 2:
                        _a.sent();
                        // If refresh successful, user will be authenticated and useEffect will run again
                        console.log("Token refreshed successfully");
                        return [3 /*break*/, 5];
                    case 3:
                        error_1 = _a.sent();
                        console.log("No valid refresh token found", error_1);
                        return [3 /*break*/, 5];
                    case 4:
                        setIsCheckingAuth(false);
                        return [7 /*endfinally*/];
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        setIsCheckingAuth(false);
                        _a.label = 7;
                    case 7: return [2 /*return*/];
                }
            });
        }); };
        checkAuthStatus();
    }, [isAuthenticated, accessToken, navigate, refreshToken]);
    // Redirect when authentication state changes
    useEffect(function () {
        if (isAuthenticated && !isCheckingAuth) {
            navigate('/admin/system', { replace: true });
        }
    }, [isAuthenticated, isCheckingAuth, navigate]);
    var handleInputChange = function (e) {
        var _a = e.target, name = _a.name, value = _a.value;
        setFormData(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[name] = value, _a)));
        });
    };
    var handleFocus = function (fieldName) {
        setFocusedField(fieldName);
    };
    var handleBlur = function () {
        setFocusedField(null);
    };
    var validateForm = function () {
        if (!formData.username) {
            showErrorToast('Username is required');
            return false;
        }
        if (formData.username.length < 3) {
            showErrorToast('Username must be at least 3 characters');
            return false;
        }
        if (!formData.password) {
            showErrorToast('Password is required');
            return false;
        }
        if (formData.password.length < 6) {
            showErrorToast('Password must be at least 6 characters');
            return false;
        }
        return true;
    };
    var handleSubmit = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var error_2, errorCode, message;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    e.preventDefault();
                    if (!validateForm())
                        return [2 /*return*/];
                    setIsLoading(true);
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, login({
                            username: formData.username,
                            password: formData.password,
                        }).unwrap()];
                case 2:
                    _c.sent();
                    showSuccessToast('Welcome back, Admin!', {
                        icon: '👋',
                    });
                    return [3 /*break*/, 5];
                case 3:
                    error_2 = _c.sent();
                    errorCode = ((_a = error_2 === null || error_2 === void 0 ? void 0 : error_2.data) === null || _a === void 0 ? void 0 : _a.code) || ((_b = error_2 === null || error_2 === void 0 ? void 0 : error_2.data) === null || _b === void 0 ? void 0 : _b.errorCode) || "E500";
                    message = getMessageByCode(errorCode);
                    showErrorToast(message);
                    console.error('Login error:', error_2);
                    return [3 /*break*/, 5];
                case 4:
                    setIsLoading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var togglePasswordVisibility = function () { return setShowPassword(!showPassword); };
    // Show loading spinner while checking authentication
    if (isCheckingAuth) {
        return _jsx(LoadingSpinner, { text: "Checking authentication..." });
    }
    return (_jsxs(_Fragment, { children: [_jsx(Toaster, { position: "top-center" }), _jsxs("div", { className: "min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4 font-inter", children: [isLoading && _jsx(LoadingSpinner, { text: "Authenticating..." }), _jsxs("div", { className: "w-full max-w-md", children: [_jsxs("div", { className: "text-center mb-8", children: [_jsx("div", { className: "inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl mb-6 shadow-lg", children: _jsx(Shield, { className: "w-10 h-10 text-white" }) }), _jsx("h1", { className: "text-4xl font-bold text-gray-900 mb-3", children: "Admin Portal" }), _jsx("p", { className: "text-gray-600 text-lg", children: "Secure access to your dashboard" })] }), _jsx("div", { className: "bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20", children: _jsxs("form", { onSubmit: handleSubmit, className: "space-y-8", children: [_jsxs("div", { className: "space-y-2", children: [_jsx("label", { htmlFor: "username", className: "block text-sm font-semibold text-gray-700 mb-3", children: "Username" }), _jsxs("div", { className: "relative group", children: [_jsx("div", { className: "absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-200 ".concat(focusedField === 'username' || formData.username
                                                                ? 'text-indigo-500'
                                                                : 'text-gray-400'), children: _jsx(User, { className: "w-5 h-5" }) }), _jsx("input", { type: "text", id: "username", name: "username", value: formData.username, onChange: handleInputChange, onFocus: function () { return handleFocus('username'); }, onBlur: handleBlur, className: "w-full pl-12 pr-4 py-4 bg-gray-50/50 border-2 rounded-xl transition-all duration-200 text-gray-900 placeholder-gray-400 ".concat(focusedField === 'username'
                                                                ? 'border-indigo-500 bg-white shadow-lg shadow-indigo-100'
                                                                : 'border-gray-200 hover:border-gray-300', " focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"), placeholder: "Enter your username", disabled: isLoading }), _jsx("div", { className: "absolute inset-0 rounded-xl transition-all duration-200 pointer-events-none ".concat(focusedField === 'username'
                                                                ? 'ring-4 ring-indigo-100'
                                                                : '') })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("label", { htmlFor: "password", className: "block text-sm font-semibold text-gray-700 mb-3", children: "Password" }), _jsxs("div", { className: "relative group", children: [_jsx("div", { className: "absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-200 ".concat(focusedField === 'password' || formData.password
                                                                ? 'text-indigo-500'
                                                                : 'text-gray-400'), children: _jsx(Lock, { className: "w-5 h-5" }) }), _jsx("input", { type: showPassword ? 'text' : 'password', id: "password", name: "password", value: formData.password, onChange: handleInputChange, onFocus: function () { return handleFocus('password'); }, onBlur: handleBlur, className: "w-full pl-12 pr-14 py-4 bg-gray-50/50 border-2 rounded-xl transition-all duration-200 text-gray-900 placeholder-gray-400 ".concat(focusedField === 'password'
                                                                ? 'border-indigo-500 bg-white shadow-lg shadow-indigo-100'
                                                                : 'border-gray-200 hover:border-gray-300', " focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"), placeholder: "Enter your password", disabled: isLoading }), _jsx("button", { type: "button", onClick: togglePasswordVisibility, className: "absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-indigo-500 transition-colors duration-200 p-1", disabled: isLoading, children: showPassword ? _jsx(EyeOff, { className: "w-5 h-5" }) : _jsx(Eye, { className: "w-5 h-5" }) }), _jsx("div", { className: "absolute inset-0 rounded-xl transition-all duration-200 pointer-events-none ".concat(focusedField === 'password'
                                                                ? 'ring-4 ring-indigo-100'
                                                                : '') })] })] }), _jsx("button", { type: "submit", disabled: isLoading, className: "w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white py-4 px-6 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:shadow-lg", children: isLoading ? (_jsxs("div", { className: "flex items-center justify-center space-x-2", children: [_jsx("div", { className: "w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" }), _jsx("span", { children: "Signing in..." })] })) : ('Sign In') })] }) }), _jsx("div", { className: "text-center mt-8", children: _jsx("p", { className: "text-sm text-gray-500", children: "\u00A9 2024 Core Studio. All rights reserved." }) })] })] })] }));
};
