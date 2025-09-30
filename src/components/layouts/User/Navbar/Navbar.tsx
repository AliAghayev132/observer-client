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
import { RootState } from "@/redux/store";
// RTK Query
import { useUserLogoutMutation } from "@/redux/user/auth/userAuthApi";
// Toast
import toast from "react-hot-toast";
// Utils
import { getUserProfilePictureUrl } from "@/utils/imageHandler";

export const Navbar = () => {
    const user = useUser();
    const { isAuthenticated } = useSelector((state: RootState) => state.userAuth);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [userLogout] = useUserLogoutMutation();
    const navigate = useNavigate();
    const location = useLocation();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleLogout = async () => {
        try {
            await userLogout().unwrap();
            toast.success("Logged out successfully");
            navigate("/");
            setIsMenuOpen(false);
        } catch (error) {
            console.error("Logout failed:", error);
            toast.error("Logout failed");
        }
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const getProfileImageSrc = () => {
        return getUserProfilePictureUrl(user?.profilePicture);
    };

    const hasProfilePicture = () => {
        return user?.profilePicture && user.profilePicture !== 'no-image';
    };

    const getUserDisplayName = () => {
        if (user) {
            return `${user.firstName} ${user.secondName}`;
        }
        return 'User';
    };

    const isActiveLink = (path: string) => {
        return location.pathname === path ? styles.active : '';
    };

    return (
        <nav className={styles.navbar}>
            <div className={styles.navbarInner}>
                <div
                    className={`${styles.navbarMobileToggle} ${isMenuOpen ? styles.active : ''}`}
                    onClick={toggleMenu}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </div>

                <ul className={`${styles.navbarLinks} ${isMenuOpen ? styles.show : ''}`}>
                    <li>
                        <Link
                            to="/"
                            className={`${styles.navLink} ${isActiveLink('/')}`}
                            onClick={closeMenu}
                        >
                            Main Page
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/explore"
                            className={`${styles.navLink} ${isActiveLink('/explore')}`}
                            onClick={closeMenu}
                        >
                            Explore Leaders & Categories
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/contact"
                            className={`${styles.navLink} ${isActiveLink('/contact')}`}
                            onClick={closeMenu}
                        >
                            Contact
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/chat"
                            className={`${styles.navLink} ${isActiveLink('/chat')}`}
                            onClick={closeMenu}
                        >
                            Chat With AI
                        </Link>
                    </li>

                    {/* Conditional rendering based on authentication */}
                    {isAuthenticated && user ? (
                        // Authenticated user menu
                        <>
                            <li className={styles.navbarProfile}>
                                <Link
                                    to="/profile"
                                    className={styles.profileLink}
                                    onClick={closeMenu}
                                    title={`Profile - ${getUserDisplayName()}`}
                                >
                                    <div className={styles.profileContainer}>
                                        {hasProfilePicture() ? (
                                            <img
                                                src={getProfileImageSrc()}
                                                alt="Profile"
                                                className={styles.profileIcon}
                                                onError={(e) => {
                                                    // Fallback to default avatar if image fails to load
                                                    e.currentTarget.src = getUserProfilePictureUrl('no-image');
                                                }}
                                            />
                                        ) : (
                                            <div className={styles.profileIconPlaceholder}>
                                                <ProfileIcon width={24} height={24} />
                                            </div>
                                        )}
                                        <span className={styles.profileName}>
                                            {getUserDisplayName()}
                                        </span>
                                    </div>
                                </Link>
                            </li>
                            <li className={styles.navbarAuth}>
                                <button
                                    onClick={handleLogout}
                                    className={styles.logoutButton}
                                >
                                    Logout
                                </button>
                            </li>
                        </>
                    ) : (
                        // Guest user menu
                        <>
                            <li className={styles.navbarProfile}>
                                <Link
                                    to="/login"
                                    className={styles.profileLink}
                                    onClick={closeMenu}
                                >
                                    <ProfileIcon width={24} height={24} />
                                </Link>
                            </li>
                            <li className={styles.navbarAuth}>
                                <Link
                                    to="/login"
                                    className={styles.authLink}
                                    onClick={closeMenu}
                                >
                                    Sign In
                                </Link>
                            </li>
                            {/* <li className={styles.navbarAuth}>
                                <Link
                                    to="/register-step-one"
                                    className={styles.authLink}
                                    onClick={closeMenu}
                                >
                                    Register
                                </Link>
                            </li> */}
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
};
