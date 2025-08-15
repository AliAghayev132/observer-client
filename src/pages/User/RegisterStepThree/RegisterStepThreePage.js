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
// React
import { useState, useEffect } from 'react';
// React Router
import { Link, useLocation, useNavigate } from 'react-router';
// Packages
import Swal from 'sweetalert2';
// Styles
import styles from './RegisterStepThreePage.module.css';
// RTK
import { useUserRegisterStepThreeMutation } from '@/redux/user/auth/userAuthApi';
export var RegisterStepThreePage = function () {
    var _a, _b;
    var _c = useState({
        firstName: '',
        secondName: '',
        gender: 'male',
        birthDate: '',
        password: '',
        confirmPassword: ''
    }), formData = _c[0], setFormData = _c[1];
    var _d = useUserRegisterStepThreeMutation(), userRegisterStepThree = _d[0], isLoading = _d[1].isLoading;
    var location = useLocation();
    var navigate = useNavigate();
    // Get token and email from location state or redirect to step 1
    var token = (_a = location.state) === null || _a === void 0 ? void 0 : _a.token;
    var email = (_b = location.state) === null || _b === void 0 ? void 0 : _b.email;
    useEffect(function () {
        if (!token || !email) {
            navigate('/register-step-one');
        }
    }, [token, email, navigate]);
    var handleInputChange = function (e) {
        var _a = e.target, name = _a.name, value = _a.value;
        setFormData(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[name] = value, _a)));
        });
    };
    var handleSubmit = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var birthDate, today, age, err_1;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    e.preventDefault();
                    // Validate password confirmation
                    if (formData.password !== formData.confirmPassword) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Password Mismatch',
                            text: 'Passwords do not match. Please try again.',
                            confirmButtonColor: '#9CA982',
                        });
                        return [2 /*return*/];
                    }
                    birthDate = new Date(formData.birthDate);
                    today = new Date();
                    age = today.getFullYear() - birthDate.getFullYear();
                    if (age < 13) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Age Restriction',
                            text: 'You must be at least 13 years old to register.',
                            confirmButtonColor: '#9CA982',
                        });
                        return [2 /*return*/];
                    }
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, userRegisterStepThree({
                            firstName: formData.firstName,
                            secondName: formData.secondName,
                            gender: formData.gender,
                            birthDate: formData.birthDate,
                            password: formData.password,
                            token: token
                        }).unwrap()];
                case 2:
                    _c.sent();
                    // Success alert
                    return [4 /*yield*/, Swal.fire({
                            icon: 'success',
                            title: 'Registration Complete!',
                            text: 'Your account has been created successfully. You can now login.',
                            confirmButtonText: 'Go to Login',
                            confirmButtonColor: '#9CA982',
                        })];
                case 3:
                    // Success alert
                    _c.sent();
                    // Navigate to login page
                    navigate('/login');
                    return [3 /*break*/, 5];
                case 4:
                    err_1 = _c.sent();
                    Swal.fire({
                        icon: 'error',
                        title: 'Registration Failed',
                        text: ((_b = (_a = err_1 === null || err_1 === void 0 ? void 0 : err_1.data) === null || _a === void 0 ? void 0 : _a.messages) === null || _b === void 0 ? void 0 : _b.message) || 'Something went wrong. Please try again.',
                        confirmButtonText: 'Try Again',
                        confirmButtonColor: '#9CA982',
                    });
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    if (!token || !email) {
        return null; // Will redirect in useEffect
    }
    return (_jsx("div", { className: styles.main, children: _jsxs("div", { className: styles.auth__container, children: [_jsx("div", { className: styles.auth__image, children: _jsx("img", { src: "/src/assets/images/image.png", alt: "Welcome" }) }), _jsxs("section", { className: styles.auth__section, children: [_jsx("h2", { className: styles.auth__title, children: "Complete Registration" }), _jsx("p", { className: styles.auth__subtitle, children: "Fill in your details to finish creating your account" }), _jsxs("form", { className: styles.auth__form, onSubmit: handleSubmit, children: [_jsx("div", { className: styles.form__row, children: _jsx("input", { type: "text", name: "firstName", placeholder: "First Name", value: formData.firstName, onChange: handleInputChange, required: true }) }), _jsx("input", { type: "text", name: "secondName", placeholder: "Last Name", value: formData.secondName, onChange: handleInputChange, required: true }), _jsxs("select", { name: "gender", value: formData.gender, onChange: handleInputChange, className: styles.form__select, required: true, children: [_jsx("option", { value: "male", children: "Male" }), _jsx("option", { value: "female", children: "Female" })] }), _jsx("input", { type: "date", name: "birthDate", value: formData.birthDate, onChange: handleInputChange, max: new Date(new Date().setFullYear(new Date().getFullYear() - 13)).toISOString().split('T')[0], required: true }), _jsx("input", { type: "password", name: "password", placeholder: "Password", value: formData.password, onChange: handleInputChange, minLength: 6, required: true }), _jsx("input", { type: "password", name: "confirmPassword", placeholder: "Confirm Password", value: formData.confirmPassword, onChange: handleInputChange, minLength: 6, required: true }), _jsx("button", { type: "submit", disabled: isLoading, children: isLoading ? 'Creating Account...' : 'Complete Registration' })] }), _jsxs("p", { className: styles.auth__link, children: ["Already have an account? ", _jsx(Link, { to: "/login", children: "Login" })] })] })] }) }));
};
