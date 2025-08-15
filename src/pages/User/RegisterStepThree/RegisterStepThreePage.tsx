// React
import React, { useState, useEffect } from 'react';
// React Router
import { Link, useLocation, useNavigate } from 'react-router';
// Packages
import Swal from 'sweetalert2';
// Styles
import styles from './RegisterStepThreePage.module.css';
// RTK
import { useUserRegisterStepThreeMutation } from '@/redux/user/auth/userAuthApi';

export const RegisterStepThreePage: React.FC = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        secondName: '',
        gender: 'male' as 'male' | 'female',
        birthDate: '',
        password: '',
        confirmPassword: ''
    });

    const [userRegisterStepThree, { isLoading }] = useUserRegisterStepThreeMutation();
    const location = useLocation();
    const navigate = useNavigate();

    // Get token and email from location state or redirect to step 1
    const token = location.state?.token;
    const email = location.state?.email;

    useEffect(() => {
        if (!token || !email) {
            navigate('/register-step-one');
        }
    }, [token, email, navigate]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validate password confirmation
        if (formData.password !== formData.confirmPassword) {
            Swal.fire({
                icon: 'error',
                title: 'Password Mismatch',
                text: 'Passwords do not match. Please try again.',
                confirmButtonColor: '#9CA982',
            });
            return;
        }

        // Validate age (must be at least 13 years old)
        const birthDate = new Date(formData.birthDate);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        if (age < 13) {
            Swal.fire({
                icon: 'error',
                title: 'Age Restriction',
                text: 'You must be at least 13 years old to register.',
                confirmButtonColor: '#9CA982',
            });
            return;
        }

        try {
            await userRegisterStepThree({
                firstName: formData.firstName,
                secondName: formData.secondName,
                gender: formData.gender,
                birthDate: formData.birthDate,
                password: formData.password,
                token: token!
            }).unwrap();

            // Success alert
            await Swal.fire({
                icon: 'success',
                title: 'Registration Complete!',
                text: 'Your account has been created successfully. You can now login.',
                confirmButtonText: 'Go to Login',
                confirmButtonColor: '#9CA982',
            });

            // Navigate to login page
            navigate('/login');

        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Registration Failed',
                text: err?.data?.messages?.message || 'Something went wrong. Please try again.',
                confirmButtonText: 'Try Again',
                confirmButtonColor: '#9CA982',
            });
        }
    };

    if (!token || !email) {
        return null; // Will redirect in useEffect
    }

    return (
        <div className={styles.main}>
            <div className={styles.auth__container}>
                <div className={styles.auth__image}>
                    <img src="/src/assets/images/image.png" alt="Welcome" />
                </div>
                <section className={styles.auth__section}>
                    <h2 className={styles.auth__title}>Complete Registration</h2>
                    <p className={styles.auth__subtitle}>
                        Fill in your details to finish creating your account
                    </p>
                    <form className={styles.auth__form} onSubmit={handleSubmit}>
                        <div className={styles.form__row}>
                            <input
                                type="text"
                                name="firstName"
                                placeholder="First Name"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <input
                            type="text"
                            name="secondName"
                            placeholder="Last Name"
                            value={formData.secondName}
                            onChange={handleInputChange}
                            required
                        />

                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleInputChange}
                            className={styles.form__select}
                            required
                        >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>

                        <input
                            type="date"
                            name="birthDate"
                            value={formData.birthDate}
                            onChange={handleInputChange}
                            max={new Date(new Date().setFullYear(new Date().getFullYear() - 13)).toISOString().split('T')[0]}
                            required
                        />

                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleInputChange}
                            minLength={6}
                            required
                        />

                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            minLength={6}
                            required
                        />

                        <button type="submit" disabled={isLoading}>
                            {isLoading ? 'Creating Account...' : 'Complete Registration'}
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
