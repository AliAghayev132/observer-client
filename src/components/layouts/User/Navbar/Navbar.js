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
import { useState } from "react";
// Styles
import styles from "./Navbar.module.css";
// Icons
import { ProfileIcon } from "@/components/icons/ProfileIcon";
// React Router
import { Link, useNavigate, useLocation } from "react-router";
// Custom Hooks
import { useUser } from "@/hooks/useUser";
// Redux
import { useSelector } from "react-redux";
// RTK Query
import { useUserLogoutMutation } from "@/redux/user/auth/userAuthApi";
// Toast
import toast from "react-hot-toast";
// Utils
import { getUserProfilePictureUrl } from "@/utils/imageHandler";
export var Navbar = function () {
    var user = useUser();
    var isAuthenticated = useSelector(function (state) { return state.userAuth; }).isAuthenticated;
    var _a = useState(false), isMenuOpen = _a[0], setIsMenuOpen = _a[1];
    var userLogout = useUserLogoutMutation()[0];
    var navigate = useNavigate();
    var location = useLocation();
    var toggleMenu = function () {
        setIsMenuOpen(!isMenuOpen);
    };
    var handleLogout = function () { return __awaiter(void 0, void 0, void 0, function () {
        var error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, userLogout().unwrap()];
                case 1:
                    _a.sent();
                    toast.success("Logged out successfully");
                    navigate("/");
                    setIsMenuOpen(false);
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.error("Logout failed:", error_1);
                    toast.error("Logout failed");
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var closeMenu = function () {
        setIsMenuOpen(false);
    };
    var getProfileImageSrc = function () {
        return getUserProfilePictureUrl(user === null || user === void 0 ? void 0 : user.profilePicture);
    };
    var hasProfilePicture = function () {
        return (user === null || user === void 0 ? void 0 : user.profilePicture) && user.profilePicture !== 'no-image';
    };
    var getUserDisplayName = function () {
        if (user) {
            return "".concat(user.firstName, " ").concat(user.secondName);
        }
        return 'User';
    };
    var isActiveLink = function (path) {
        return location.pathname === path ? styles.active : '';
    };
    return (_jsx("nav", { className: styles.navbar, children: _jsxs("div", { className: styles.navbarInner, children: [_jsxs("div", { className: "".concat(styles.navbarMobileToggle, " ").concat(isMenuOpen ? styles.active : ''), onClick: toggleMenu, children: [_jsx("span", {}), _jsx("span", {}), _jsx("span", {})] }), _jsxs("ul", { className: "".concat(styles.navbarLinks, " ").concat(isMenuOpen ? styles.show : ''), children: [_jsx("li", { children: _jsx(Link, { to: "/", className: "".concat(styles.navLink, " ").concat(isActiveLink('/')), onClick: closeMenu, children: "Main Page" }) }), _jsx("li", { children: _jsx(Link, { to: "/explore", className: "".concat(styles.navLink, " ").concat(isActiveLink('/explore')), onClick: closeMenu, children: "Explore Leaders & Categories" }) }), _jsx("li", { children: _jsx(Link, { to: "/contact", className: "".concat(styles.navLink, " ").concat(isActiveLink('/contact')), onClick: closeMenu, children: "Contact" }) }), _jsx("li", { children: _jsx(Link, { to: "/chat", className: "".concat(styles.navLink, " ").concat(isActiveLink('/chat')), onClick: closeMenu, children: "Chat With AI" }) }), isAuthenticated && user ? (
                        // Authenticated user menu
                        _jsxs(_Fragment, { children: [_jsx("li", { className: styles.navbarProfile, children: _jsx(Link, { to: "/profile", className: styles.profileLink, onClick: closeMenu, title: "Profile - ".concat(getUserDisplayName()), children: _jsxs("div", { className: styles.profileContainer, children: [hasProfilePicture() ? (_jsx("img", { src: getProfileImageSrc(), alt: "Profile", className: styles.profileIcon, onError: function (e) {
                                                        // Fallback to default avatar if image fails to load
                                                        e.currentTarget.src = getUserProfilePictureUrl('no-image');
                                                    } })) : (_jsx("div", { className: styles.profileIconPlaceholder, children: _jsx(ProfileIcon, { width: 24, height: 24 }) })), _jsx("span", { className: styles.profileName, children: getUserDisplayName() })] }) }) }), _jsx("li", { className: styles.navbarAuth, children: _jsx("button", { onClick: handleLogout, className: styles.logoutButton, children: "Logout" }) })] })) : (
                        // Guest user menu
                        _jsxs(_Fragment, { children: [_jsx("li", { className: styles.navbarProfile, children: _jsx(Link, { to: "/login", className: styles.profileLink, onClick: closeMenu, children: _jsx(ProfileIcon, { width: 24, height: 24 }) }) }), _jsx("li", { className: styles.navbarAuth, children: _jsx(Link, { to: "/login", className: styles.authLink, onClick: closeMenu, children: "Login" }) }), _jsx("li", { className: styles.navbarAuth, children: _jsx(Link, { to: "/register-step-one", className: styles.authLink, onClick: closeMenu, children: "Register" }) })] }))] })] }) }));
};
