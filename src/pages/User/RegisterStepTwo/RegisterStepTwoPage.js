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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// React
import { useState, useRef, useEffect } from 'react';
// React Router
import { Link, useLocation, useNavigate } from 'react-router';
// Packages
import Swal from 'sweetalert2';
// Styles
import styles from './RegisterStepTwoPage.module.css';
// RTK
import { useUserRegisterStepTwoMutation, useUserRegisterStepOneMutation } from "@/redux/user/auth/userAuthApi";
export var RegisterStepTwoPage = function () {
    var _a;
    var _b = useState(['', '', '', '']), otp = _b[0], setOtp = _b[1];
    var _c = useUserRegisterStepTwoMutation(), userRegisterStepTwo = _c[0], isLoading = _c[1].isLoading;
    var _d = useUserRegisterStepOneMutation(), userRegisterStepOne = _d[0], isResending = _d[1].isLoading;
    var inputRefs = useRef([]);
    var location = useLocation();
    var navigate = useNavigate();
    // Get email from location state or redirect to step 1
    var email = (_a = location.state) === null || _a === void 0 ? void 0 : _a.email;
    useEffect(function () {
        if (!email) {
            navigate('/register-step-one');
        }
    }, [email, navigate]);
    var handleInputChange = function (index, value) {
        var _a;
        if (value.length > 1)
            return; // Prevent multiple characters
        var newOtp = __spreadArray([], otp, true);
        newOtp[index] = value;
        setOtp(newOtp);
        // Auto-focus next input
        if (value && index < 3) {
            (_a = inputRefs.current[index + 1]) === null || _a === void 0 ? void 0 : _a.focus();
        }
    };
    var handleKeyDown = function (index, e) {
        var _a;
        // Handle backspace
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            (_a = inputRefs.current[index - 1]) === null || _a === void 0 ? void 0 : _a.focus();
        }
        // Handle paste
        if (e.key === 'v' && (e.ctrlKey || e.metaKey)) {
            e.preventDefault();
            navigator.clipboard.readText().then(function (text) {
                var _a;
                var digits = text.replace(/\D/g, '').slice(0, 4);
                var newOtp = digits.split('').concat(['', '', '', '']).slice(0, 4);
                setOtp(newOtp);
                // Focus the last filled input or next empty one
                var nextIndex = Math.min(digits.length, 3);
                (_a = inputRefs.current[nextIndex]) === null || _a === void 0 ? void 0 : _a.focus();
            });
        }
    };
    var handleSubmit = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var otpString, result, err_1;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    e.preventDefault();
                    otpString = otp.join('');
                    if (otpString.length !== 4) {
                        Swal.fire({
                            icon: 'warning',
                            title: 'Incomplete Code',
                            text: 'Please enter the complete 4-digit verification code.',
                            confirmButtonColor: '#9CA982',
                        });
                        return [2 /*return*/];
                    }
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, userRegisterStepTwo({
                            email: email,
                            otp: otpString
                        }).unwrap()];
                case 2:
                    result = _c.sent();
                    // Success alert
                    return [4 /*yield*/, Swal.fire({
                            icon: 'success',
                            title: 'Verification Successful!',
                            text: 'Please complete your registration.',
                            confirmButtonText: 'Continue',
                            confirmButtonColor: '#9CA982',
                        })];
                case 3:
                    // Success alert
                    _c.sent();
                    // Navigate to step 3 with token
                    navigate('/register-step-three', {
                        state: {
                            token: result.token,
                            email: email
                        }
                    });
                    return [3 /*break*/, 5];
                case 4:
                    err_1 = _c.sent();
                    Swal.fire({
                        icon: 'error',
                        title: 'Verification Failed',
                        text: ((_b = (_a = err_1 === null || err_1 === void 0 ? void 0 : err_1.data) === null || _a === void 0 ? void 0 : _a.messages) === null || _b === void 0 ? void 0 : _b.message) || 'Invalid or expired verification code.',
                        confirmButtonText: 'Try Again',
                        confirmButtonColor: '#9CA982',
                    });
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var handleResend = function () { return __awaiter(void 0, void 0, void 0, function () {
        var err_2;
        var _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _d.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, userRegisterStepOne({ email: email }).unwrap()];
                case 1:
                    _d.sent();
                    Swal.fire({
                        icon: 'success',
                        title: 'Code Resent!',
                        text: 'A new verification code has been sent to your email.',
                        confirmButtonColor: '#9CA982',
                    });
                    // Clear current OTP
                    setOtp(['', '', '', '']);
                    (_a = inputRefs.current[0]) === null || _a === void 0 ? void 0 : _a.focus();
                    return [3 /*break*/, 3];
                case 2:
                    err_2 = _d.sent();
                    Swal.fire({
                        icon: 'error',
                        title: 'Resend Failed',
                        text: ((_c = (_b = err_2 === null || err_2 === void 0 ? void 0 : err_2.data) === null || _b === void 0 ? void 0 : _b.messages) === null || _c === void 0 ? void 0 : _c.message) || 'Failed to resend code. Please try again.',
                        confirmButtonColor: '#9CA982',
                    });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    if (!email) {
        return null; // Will redirect in useEffect
    }
    return (_jsx("div", { className: styles.main, children: _jsxs("div", { className: styles.auth__container, children: [_jsx("div", { className: styles.auth__image, children: _jsx("img", { src: "/src/assets/images/image.png", alt: "Welcome" }) }), _jsxs("section", { className: styles.auth__section, children: [_jsx("h2", { className: styles.auth__title, children: "Verify Your Account" }), _jsxs("p", { className: styles.auth__subtitle, children: ["Enter the 4-digit verification code sent to ", email] }), _jsxs("form", { className: "".concat(styles.auth__form, " ").concat(styles.otp__form), onSubmit: handleSubmit, children: [_jsx("div", { className: styles.otp__inputs, children: otp.map(function (digit, index) { return (_jsx("input", { ref: function (el) { inputRefs.current[index] = el; }, type: "text", maxLength: 1, className: styles.otp__input, value: digit, onChange: function (e) { return handleInputChange(index, e.target.value); }, onKeyDown: function (e) { return handleKeyDown(index, e); }, autoFocus: index === 0 }, index)); }) }), _jsx("button", { style: { width: "100%" }, type: "submit", disabled: isLoading, children: isLoading ? 'Verifying...' : 'Verify' })] }), _jsxs("p", { className: styles.auth__link, children: ["Didn't receive a code?", ' ', _jsx("button", { type: "button", onClick: handleResend, disabled: isResending, className: styles.resend__button, children: isResending ? 'Resending...' : 'Resend' })] }), _jsx("p", { className: styles.auth__link, children: _jsx(Link, { to: "/login", children: "Back to Login" }) })] })] }) }));
};
