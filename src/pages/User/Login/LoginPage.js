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
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import styles from "./LoginPage.module.css";
// RTK
import { useUserLoginMutation } from "@/redux/user/auth/userAuthApi";
import { useLazyGetUserQuery } from "@/redux/user/account/userAccountApi";
// Utils
import { getMessageByCode } from "@/utils/getMessageByCode";
import { parseLoginError } from "@/utils/parseLoginError";
import { showSuccessToast, showErrorToast } from "@/utils/toastConfig";
export var LoginPage = function () {
    var _a = useState(""), email = _a[0], setEmail = _a[1];
    var _b = useState(""), password = _b[0], setPassword = _b[1];
    var navigate = useNavigate();
    var _c = useUserLoginMutation(), loginMutation = _c[0], isUserLoginLoading = _c[1].isLoading;
    var _d = useLazyGetUserQuery(), getUser = _d[0], isGetUserLoading = _d[1].isLoading;
    var isLoading = isUserLoginLoading || isGetUserLoading;
    var handleSubmit = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var err_1, _a, errorCode, errorTitle, errorMessage, footer_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    e.preventDefault();
                    console.log("saLAM");
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, loginMutation({ email: email, password: password }).unwrap()];
                case 2:
                    _b.sent();
                    return [4 /*yield*/, getUser(undefined).unwrap()];
                case 3:
                    _b.sent();
                    showSuccessToast(getMessageByCode("S200")); // başarı mesajı
                    navigate("/");
                    return [3 /*break*/, 5];
                case 4:
                    err_1 = _b.sent();
                    _a = parseLoginError(err_1), errorCode = _a.errorCode, errorTitle = _a.errorTitle, errorMessage = _a.errorMessage;
                    console.log({ errorCode: errorCode, errorTitle: errorTitle, errorMessage: errorMessage });
                    footer_1 = errorCode === "E401" || errorCode === "E404"
                        ? "Don't have an account? Register here"
                        : errorCode === "E406"
                            ? "Contact administrator for account confirmation"
                            : undefined;
                    showErrorToast("".concat(errorTitle, " - ").concat(errorMessage));
                    if (footer_1) {
                        setTimeout(function () { return showErrorToast(footer_1, { duration: 5000 }); }, 500);
                    }
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    return (_jsx("div", { className: styles.main, children: _jsxs("div", { className: styles.auth__container, children: [_jsx("div", { className: styles.auth__image, children: _jsx("img", { src: "/src/assets/images/image.png", alt: "Welcome" }) }), _jsxs("section", { className: styles.auth__section, children: [_jsx("h2", { className: styles.auth__title, children: "Login" }), _jsxs("form", { className: styles.auth__form, onSubmit: handleSubmit, children: [_jsx("input", { type: "email", placeholder: "Email", value: email, onChange: function (e) { return setEmail(e.target.value); }, required: true }), _jsx("input", { type: "password", placeholder: "Password", value: password, onChange: function (e) { return setPassword(e.target.value); }, required: true }), _jsx("button", { type: "submit", disabled: isLoading, children: isLoading ? "Logging in..." : "Login" })] }), _jsx("p", { className: styles.auth__forgot, children: _jsx(Link, { to: "/forgot-password", children: "Forgot your password?" }) }), _jsxs("p", { className: styles.auth__link, children: ["Don't have an account? ", _jsx(Link, { to: "/register-step-one", children: "Register" })] })] })] }) }));
};
