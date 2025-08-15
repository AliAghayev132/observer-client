// React
import React, { useState } from 'react';
// React Router
import { Link, useNavigate } from 'react-router';
// Packages
import Swal from 'sweetalert2';
// Styles
import styles from './RegisterStepOnePage.module.css';
// RTK
import { useUserRegisterStepOneMutation } from '@/redux/user/auth/userAuthApi';

export const RegisterStepOnePage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [userRegisterStepOne, { isLoading }] = useUserRegisterStepOneMutation();

    const navigate = useNavigate();


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            await userRegisterStepOne({ email }).unwrap();

            // Success alert
            await Swal.fire({
                icon: 'success',
                title: 'OTP Sent!',
                text: 'Please check your email for the verification code.',
                confirmButtonText: 'Continue',
                confirmButtonColor: '#9CA982',
            });

            // Navigate to step 2 with email
            navigate('/register-step-two', { state: { email } });

        } catch (err) {
            // Error alert
            Swal.fire({
                icon: 'error',
                title: 'Registration Failed',
                text: err?.data?.messages?.message || 'Something went wrong. Please try again.',
                confirmButtonText: 'Try Again',
                confirmButtonColor: '#9CA982',
            });
        }
    };

    return (
        <div className={styles.main}>
            <div className={styles.auth__container}>
                <div className={styles.auth__image}>
                    <img src="/src/assets/images/image.png" alt="Welcome" />
                </div>
                <section className={styles.auth__section}>
                    <h2 className={styles.auth__title}>Create Account</h2>
                    <p className={styles.auth__subtitle}>
                        Enter your email to get started
                    </p>
                    <form className={styles.auth__form} onSubmit={handleSubmit}>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <button type="submit" disabled={isLoading}>
                            {isLoading ? 'Sending OTP...' : 'Send Verification Code'}
                        </button>
                    </form>
                    <p className={styles.auth__link}>
                        Already have an account? <Link to="/login">Login</Link>
                    </p>
                </section>
            </div>
        </div>
    );
};
