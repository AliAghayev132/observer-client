import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import styles from "./LoginPage.module.css";

// RTK
import { useUserLoginMutation } from "@/redux/user/auth/userAuthApi";
import { useLazyGetUserQuery } from "@/redux/user/account/userAccountApi";

// Utils
import { getMessageByCode } from "@/utils/getMessageByCode";
import { parseLoginError } from "@/utils/parseLoginError";
import { showSuccessToast, showErrorToast } from "@/utils/toastConfig";

export const LoginPage: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const [loginMutation, { isLoading: isUserLoginLoading }] = useUserLoginMutation();
    const [getUser, { isLoading: isGetUserLoading }] = useLazyGetUserQuery();

    const isLoading = isUserLoginLoading || isGetUserLoading;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("saLAM");
        
        
        try {
            await loginMutation({ email, password }).unwrap();
            await getUser(undefined).unwrap();

            showSuccessToast(getMessageByCode("S200")); // başarı mesajı
            navigate("/");
        } catch (err) {
            const { errorCode, errorTitle, errorMessage } = parseLoginError(err);

            console.log({ errorCode, errorTitle, errorMessage });


            const footer =
                errorCode === "E401" || errorCode === "E404"
                    ? "Don't have an account? Register here"
                    : errorCode === "E406"
                        ? "Contact administrator for account confirmation"
                        : undefined;

            showErrorToast(`${errorTitle} - ${errorMessage}`);

            if (footer) {
                setTimeout(() => showErrorToast(footer, { duration: 5000 }), 500);
            }
        }
    };

    return (
        <div className={styles.main}>
            <div className={styles.auth__container}>
                <div className={styles.auth__image}>
                    <img src="/src/assets/images/image.png" alt="Welcome" />
                </div>
                <section className={styles.auth__section}>
                    <h2 className={styles.auth__title}>Login</h2>
                    <form className={styles.auth__form} onSubmit={handleSubmit}>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button type="submit" disabled={isLoading}>
                            {isLoading ? "Logging in..." : "Login"}
                        </button>
                    </form>
                    <p className={styles.auth__forgot}>
                        <Link to="/forgot-password">Forgot your password?</Link>
                    </p>
                    <p className={styles.auth__link}>
                        Don't have an account? <Link to="/register-step-one">Register</Link>
                    </p>
                </section>
            </div>
        </div>
    );
};
