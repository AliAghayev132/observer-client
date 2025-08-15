// React
import { useEffect, useState } from "react";
// React Router
import { Outlet } from "react-router";
// Redux
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
// RTK Query
import { useLazyGetUserQuery } from "@/redux/user/account/userAccountApi";
import { useUserRefreshTokenMutation } from "@/redux/user/auth/userAuthApi";
// Components
import { Footer } from "./Footer/Footer";
import { Navbar } from "./Navbar/Navbar";
import { LoadingSpinner } from "@/components/LoadingSpinner/LoadingSpinner";
// Hooks
import { useUser } from "@/hooks/useUser";

export const UserLayout = () => {
    const { isAuthenticated, accessToken } = useSelector((state: RootState) => state.userAuth);
    const user = useUser();

    const [refreshToken, { isLoading: isRefreshLoading }] = useUserRefreshTokenMutation();
    const [getUser, { isLoading: isGetUserLoading }] = useLazyGetUserQuery();
    const [isInitializing, setIsInitializing] = useState(true);

    useEffect(() => {
        const initializeAuth = async () => {
            // If already authenticated and user exists, no need to refresh
            if (isAuthenticated && accessToken && user) {
                setIsInitializing(false);
                return;
            }

            try {
                await refreshToken().unwrap();
                await getUser(undefined).unwrap();
            } catch (error) {
                console.log("Authentication initialization failed:", error);
            } finally {
                setIsInitializing(false);
            }
        };

        initializeAuth();
    }, [accessToken, isAuthenticated, user, refreshToken, getUser]);

    const isLoading = isInitializing || isRefreshLoading || isGetUserLoading;

    if (isLoading) {
        return <LoadingSpinner text="Loading..." />;
    }

    return (
        <>
            <Navbar />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    );
};
