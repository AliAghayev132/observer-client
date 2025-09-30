// React Router
import {
    Route,
    Routes,
    BrowserRouter,
} from "react-router";

// User Pages
import { LoginPage } from "@/pages/User/Login/LoginPage";
import { NotFoundPage } from "@/pages/User/Error/ErrorPage";
import { ProfilePage } from "@/pages/User/Profile/ProfilePage";
import { RegisterStepOnePage } from "@/pages/User/RegisterStepOne/RegisterStepOnePage";
import { RegisterStepTwoPage } from "@/pages/User/RegisterStepTwo/RegisterStepTwoPage";
import { RegisterStepThreePage } from "@/pages/User/RegisterStepThree/RegisterStepThreePage";

// Admin Pages
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
import { AdminLoginPage } from "@/pages/Admin/Login/AdminLoginPage";
import { HomePage } from "@/pages/User/Home/HomePage";
import { ExplorePage } from "@/pages/User/Explore/ExplorePage";
import { ContactPage } from "@/pages/User/Contact/ContactPage";

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<UserLayout />}>
                    <Route index element={<HomePage />} />
                    <Route path="login" element={<LoginPage />} />
                    <Route path="profile" element={<ProfilePage />} />
                    <Route path="explore" element={<ExplorePage />} />
                    <Route path="contact" element={<ContactPage />} />
                    <Route path="register-step-one" element={<RegisterStepOnePage />} />
                    <Route path="register-step-two" element={<RegisterStepTwoPage />} />
                    <Route path="register-step-three" element={<RegisterStepThreePage />} />
                </Route>

                <Route path="admin/login" element={<AdminLoginPage />} />

                <Route element={<AdminProtectedRoute />}>
                    <Route path="admin" element={<AdminLayout />}>
                        <Route path="users" element={<AdminUsersPage />} />
                        <Route path="system" element={<AdminSystemPage />} />
                        <Route path="leaders" element={<AdminLeadersPage />} />
                        <Route path="settings" element={<AdminSettingsPage />} />
                        <Route path="categories" element={<AdminCategoriesPage />} />
                    </Route>
                </Route>

                {/* 404 Catch-all route */}
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
    )
}
