// React
import { useEffect, useState } from 'react';
// React Router
import { useNavigate } from 'react-router';
// Icons
import { Eye, EyeOff, Lock, User, Shield } from 'lucide-react';
// Components
// Utils
import {
    showErrorToast,
    showSuccessToast,
} from "@/utils/toastConfig";
import { getMessageByCode } from '@/utils/getMessageByCode';
// Packages
import { Toaster } from 'react-hot-toast';
// Redux
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useAdminLoginMutation, useAdminRefreshTokenMutation } from '@/redux/admin/auth/adminAuthApi';
import { LoadingSpinner } from '@/components/LoadingSpinner/LoadingSpinner';

export const AdminLoginPage = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [focusedField, setFocusedField] = useState<string | null>(null);
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);

    const { isAuthenticated, accessToken } = useSelector((state: RootState) => state.adminAuth);

    const [login] = useAdminLoginMutation();
    const [refreshToken] = useAdminRefreshTokenMutation();

    const navigate = useNavigate();

    // Check authentication status on component mount
    useEffect(() => {
        const checkAuthStatus = async () => {
            // If already authenticated with valid token, redirect immediately
            if (isAuthenticated && accessToken) {
                navigate('/admin/system', { replace: true });
                return;
            }

            // If not authenticated but might have refresh token, try to refresh
            if (!isAuthenticated) {
                try {
                    await refreshToken().unwrap();
                    // If refresh successful, user will be authenticated and useEffect will run again
                    console.log("Token refreshed successfully");
                } catch (error) {
                    console.log("No valid refresh token found", error);
                    // User needs to login manually
                } finally {
                    setIsCheckingAuth(false);
                }
            } else {
                setIsCheckingAuth(false);
            }
        };

        checkAuthStatus();
    }, [isAuthenticated, accessToken, navigate, refreshToken]);

    // Redirect when authentication state changes
    useEffect(() => {
        if (isAuthenticated && !isCheckingAuth) {
            navigate('/admin/system', { replace: true });
        }
    }, [isAuthenticated, isCheckingAuth, navigate]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFocus = (fieldName: string) => {
        setFocusedField(fieldName);
    };

    const handleBlur = () => {
        setFocusedField(null);
    };

    const validateForm = () => {
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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsLoading(true);

        try {
            await login({
                username: formData.username,
                password: formData.password,
            }).unwrap();

            showSuccessToast('Welcome back, Admin!', {
                icon: '👋',
            });
        } catch (error) {
            const errorCode =
                error?.data?.code || error?.data?.errorCode || "E500";

            const message = getMessageByCode(errorCode);
            showErrorToast(message);

            console.error('Login error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    // Show loading spinner while checking authentication
    if (isCheckingAuth) {
        return <LoadingSpinner text="Checking authentication..." />;
    }

    return (
        <>
            <Toaster position="top-center" />
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4 font-inter">
                {/* Loading Spinner Overlay */}
                {isLoading && <LoadingSpinner text="Authenticating..." />}

                <div className="w-full max-w-md">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl mb-6 shadow-lg">
                            <Shield className="w-10 h-10 text-white" />
                        </div>
                        <h1 className="text-4xl font-bold text-gray-900 mb-3">Admin Portal</h1>
                        <p className="text-gray-600 text-lg">Secure access to your dashboard</p>
                    </div>

                    {/* Login Form */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20">
                        <form onSubmit={handleSubmit} className="space-y-8">
                            {/* Username Field */}
                            <div className="space-y-2">
                                <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-3">
                                    Username
                                </label>
                                <div className="relative group">
                                    <div className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-200 ${focusedField === 'username' || formData.username
                                        ? 'text-indigo-500'
                                        : 'text-gray-400'
                                        }`}>
                                        <User className="w-5 h-5" />
                                    </div>
                                    <input
                                        type="text"
                                        id="username"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleInputChange}
                                        onFocus={() => handleFocus('username')}
                                        onBlur={handleBlur}
                                        className={`w-full pl-12 pr-4 py-4 bg-gray-50/50 border-2 rounded-xl transition-all duration-200 text-gray-900 placeholder-gray-400 ${focusedField === 'username'
                                            ? 'border-indigo-500 bg-white shadow-lg shadow-indigo-100'
                                            : 'border-gray-200 hover:border-gray-300'
                                            } focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed`}
                                        placeholder="Enter your username"
                                        disabled={isLoading}
                                    />
                                    <div className={`absolute inset-0 rounded-xl transition-all duration-200 pointer-events-none ${focusedField === 'username'
                                        ? 'ring-4 ring-indigo-100'
                                        : ''
                                        }`} />
                                </div>
                            </div>

                            {/* Password Field */}
                            <div className="space-y-2">
                                <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-3">
                                    Password
                                </label>
                                <div className="relative group">
                                    <div className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-200 ${focusedField === 'password' || formData.password
                                        ? 'text-indigo-500'
                                        : 'text-gray-400'
                                        }`}>
                                        <Lock className="w-5 h-5" />
                                    </div>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        onFocus={() => handleFocus('password')}
                                        onBlur={handleBlur}
                                        className={`w-full pl-12 pr-14 py-4 bg-gray-50/50 border-2 rounded-xl transition-all duration-200 text-gray-900 placeholder-gray-400 ${focusedField === 'password'
                                            ? 'border-indigo-500 bg-white shadow-lg shadow-indigo-100'
                                            : 'border-gray-200 hover:border-gray-300'
                                            } focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed`}
                                        placeholder="Enter your password"
                                        disabled={isLoading}
                                    />
                                    <button
                                        type="button"
                                        onClick={togglePasswordVisibility}
                                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-indigo-500 transition-colors duration-200 p-1"
                                        disabled={isLoading}
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                    <div className={`absolute inset-0 rounded-xl transition-all duration-200 pointer-events-none ${focusedField === 'password'
                                        ? 'ring-4 ring-indigo-100'
                                        : ''
                                        }`} />
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white py-4 px-6 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:shadow-lg"
                            >
                                {isLoading ? (
                                    <div className="flex items-center justify-center space-x-2">
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        <span>Signing in...</span>
                                    </div>
                                ) : (
                                    'Sign In'
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Footer */}
                    <div className="text-center mt-8">
                        <p className="text-sm text-gray-500">
                            © 2024 Core Studio. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};
