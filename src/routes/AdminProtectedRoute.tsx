// React
import { useEffect, useState } from "react";
// React Router
import { Navigate, Outlet, useLocation } from "react-router";
// Redux
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
// RTK Query
import { useAdminRefreshTokenMutation } from "@/redux/admin/auth/adminAuthApi";
// Toast
import { Toaster } from "react-hot-toast";
import { LoadingSpinner } from "@/components/LoadingSpinner/LoadingSpinner";
// Components

export const AdminProtectedRoute = () => {
    const { isAuthenticated, accessToken } = useSelector((state: RootState) => state.adminAuth);
    const location = useLocation();



    const [refreshToken, { isLoading }] = useAdminRefreshTokenMutation();
    const [isInitializing, setIsInitializing] = useState(true);

    useEffect(() => {
        const initializeAuth = async () => {
            if (isAuthenticated && accessToken) {
                setIsInitializing(false);
                return;
            }

            try {
                await refreshToken().unwrap();
                console.log("Token refreshed successfully");
            } catch (error) {
                console.log("Refresh token failed:", error);
            } finally {
                setIsInitializing(false);
            }
        };

        initializeAuth();
    }, [accessToken, isAuthenticated, refreshToken]);



    if (isInitializing || isLoading) {
        return <LoadingSpinner text="Verifying authentication..." />;
    }

    if (!isAuthenticated) {
        return <Navigate to="/admin/login" replace />;
    }

    if (location.pathname === "/admin") {
        return <Navigate to="/admin/system" replace />;
    }


    return (
        <>
            <Toaster
                position="top-center"
                toastOptions={{
                    duration: 4000,
                    style: {
                        background: '#fff',
                        color: '#374151',
                        fontWeight: '500',
                        fontSize: '14px',
                        padding: '12px 16px',
                        borderRadius: '8px',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    },
                }}
            />
            <Outlet />
        </>
    );
};
