// React
import React, { useState, useRef, useEffect } from 'react';
// React Router
import { Link, useLocation, useNavigate } from 'react-router';
// Packages
import Swal from 'sweetalert2';
// Styles
import styles from './RegisterStepTwoPage.module.css';
// RTK
import { useUserRegisterStepTwoMutation, useUserRegisterStepOneMutation } from "@/redux/user/auth/userAuthApi";

export const RegisterStepTwoPage: React.FC = () => {
    const [otp, setOtp] = useState(['', '', '', '']);
    const [userRegisterStepTwo, { isLoading }] = useUserRegisterStepTwoMutation();
    const [userRegisterStepOne, { isLoading: isResending }] = useUserRegisterStepOneMutation();
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const location = useLocation();
    const navigate = useNavigate();

    // Get email from location state or redirect to step 1
    const email = location.state?.email;

    useEffect(() => {
        if (!email) {
            navigate('/register-step-one');
        }
    }, [email, navigate]);

    const handleInputChange = (index: number, value: string) => {
        if (value.length > 1) return; // Prevent multiple characters

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Auto-focus next input
        if (value && index < 3) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        // Handle backspace
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }

        // Handle paste
        if (e.key === 'v' && (e.ctrlKey || e.metaKey)) {
            e.preventDefault();
            navigator.clipboard.readText().then(text => {
                const digits = text.replace(/\D/g, '').slice(0, 4);
                const newOtp = digits.split('').concat(['', '', '', '']).slice(0, 4);
                setOtp(newOtp);

                // Focus the last filled input or next empty one
                const nextIndex = Math.min(digits.length, 3);
                inputRefs.current[nextIndex]?.focus();
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const otpString = otp.join('');
        if (otpString.length !== 4) {
            Swal.fire({
                icon: 'warning',
                title: 'Incomplete Code',
                text: 'Please enter the complete 4-digit verification code.',
                confirmButtonColor: '#9CA982',
            });
            return;
        }

        try {
            const result = await userRegisterStepTwo({
                email: email!,
                otp: otpString
            }).unwrap();

            // Success alert
            await Swal.fire({
                icon: 'success',
                title: 'Verification Successful!',
                text: 'Please complete your registration.',
                confirmButtonText: 'Continue',
                confirmButtonColor: '#9CA982',
            });

            // Navigate to step 3 with token
            navigate('/register-step-three', {
                state: {
                    token: result.token,
                    email: email
                }
            });

        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Verification Failed',
                text: err?.data?.messages?.message || 'Invalid or expired verification code.',
                confirmButtonText: 'Try Again',
                confirmButtonColor: '#9CA982',
            });
        }
    };

    const handleResend = async () => {
        try {
            await userRegisterStepOne({ email: email! }).unwrap();

            Swal.fire({
                icon: 'success',
                title: 'Code Resent!',
                text: 'A new verification code has been sent to your email.',
                confirmButtonColor: '#9CA982',
            });

            // Clear current OTP
            setOtp(['', '', '', '']);
            inputRefs.current[0]?.focus();

        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Resend Failed',
                text: err?.data?.messages?.message || 'Failed to resend code. Please try again.',
                confirmButtonColor: '#9CA982',
            });
        }
    };

    if (!email) {
        return null; // Will redirect in useEffect
    }

    return (
        <div className={styles.main}>
            <div className={styles.auth__container}>
                <div className={styles.auth__image}>
                    <img src="/src/assets/images/image.png" alt="Welcome" />
                </div>
                <section className={styles.auth__section}>
                    <h2 className={styles.auth__title}>Verify Your Account</h2>
                    <p className={styles.auth__subtitle}>
                        Enter the 4-digit verification code sent to {email}
                    </p>
                    <form className={`${styles.auth__form} ${styles.otp__form}`} onSubmit={handleSubmit}>
                        <div className={styles.otp__inputs}>
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    ref={(el) => { inputRefs.current[index] = el; }}
                                    type="text"
                                    maxLength={1}
                                    className={styles.otp__input}
                                    value={digit}
                                    onChange={(e) => handleInputChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    autoFocus={index === 0}
                                />
                            ))}
                        </div>
                        <button style={{ width: "100%" }} type="submit" disabled={isLoading}>
                            {isLoading ? 'Verifying...' : 'Verify'}
                        </button>
                    </form>
                    <p className={styles.auth__link}>
                        Didn't receive a code?{' '}
                        <button
                            type="button"
                            onClick={handleResend}
                            disabled={isResending}
                            className={styles.resend__button}
                        >
                            {isResending ? 'Resending...' : 'Resend'}
                        </button>
                    </p>
                    <p className={styles.auth__link}>
                        <Link to="/login">Back to Login</Link>
                    </p>
                </section>
            </div>
        </div>
    );
};
