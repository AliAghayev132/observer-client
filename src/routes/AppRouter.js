import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// React Router
import { Route, Routes, BrowserRouter, } from "react-router";
// User Pages
import { HomePage } from "@/pages/User/Home/HomePage";
import { LoginPage } from "@/pages/User/Login/LoginPage";
import { NotFoundPage } from "@/pages/User/Error/ErrorPage";
import { ExplorePage } from "@/pages/User/Explore/ExplorePage";
import { ContactPage } from "@/pages/User/Contact/ContactPage";
import { ProfilePage } from "@/pages/User/Profile/ProfilePage";
import { RegisterStepOnePage } from "@/pages/User/RegisterStepOne/RegisterStepOnePage";
import { RegisterStepTwoPage } from "@/pages/User/RegisterStepTwo/RegisterStepTwoPage";
import { RegisterStepThreePage } from "@/pages/User/RegisterStepThree/RegisterStepThreePage";
// Admin Pages
import { AdminLoginPage } from "@/pages/Admin/Login/AdminLoginPage";
import { AdminUsersPage } from "@/pages/Admin/Users/AdminUsersPage";
import { AdminSystemPage } from "@/pages/Admin/System/AdminSystemPage";
import { AdminLeadersPage } from "@/pages/Admin/Leaders/AdminLeadersPage";
import { AdminSettingsPage } from "@/pages/Admin/Settings/AdminSettingsPage";
import { AdminCategoriesPage } from "@/pages/Admin/Categories/AdminCategoriesPage";
// Layouts
import { UserLayout } from "@/components/layouts/User/UserLayout";
import { AdminLayout } from "@/components/layouts/Admin/AdminLayout";
// Routes
import { AdminProtectedRoute } from "./AdminProtectedRoute";
export var AppRouter = function () {
    return (_jsx(BrowserRouter, { children: _jsxs(Routes, { children: [_jsxs(Route, { path: "/", element: _jsx(UserLayout, {}), children: [_jsx(Route, { index: true, element: _jsx(HomePage, {}) }), _jsx(Route, { path: "login", element: _jsx(LoginPage, {}) }), _jsx(Route, { path: "profile", element: _jsx(ProfilePage, {}) }), _jsx(Route, { path: "explore", element: _jsx(ExplorePage, {}) }), _jsx(Route, { path: "contact", element: _jsx(ContactPage, {}) }), _jsx(Route, { path: "register-step-one", element: _jsx(RegisterStepOnePage, {}) }), _jsx(Route, { path: "register-step-two", element: _jsx(RegisterStepTwoPage, {}) }), _jsx(Route, { path: "register-step-three", element: _jsx(RegisterStepThreePage, {}) })] }), _jsx(Route, { path: "admin/login", element: _jsx(AdminLoginPage, {}) }), _jsx(Route, { element: _jsx(AdminProtectedRoute, {}), children: _jsxs(Route, { path: "admin", element: _jsx(AdminLayout, {}), children: [_jsx(Route, { path: "users", element: _jsx(AdminUsersPage, {}) }), _jsx(Route, { path: "system", element: _jsx(AdminSystemPage, {}) }), _jsx(Route, { path: "leaders", element: _jsx(AdminLeadersPage, {}) }), _jsx(Route, { path: "settings", element: _jsx(AdminSettingsPage, {}) }), _jsx(Route, { path: "categories", element: _jsx(AdminCategoriesPage, {}) })] }) }), _jsx(Route, { path: "*", element: _jsx(NotFoundPage, {}) })] }) }));
};
