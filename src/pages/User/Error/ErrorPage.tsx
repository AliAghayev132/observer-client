// React
import React from 'react';
// React Router
import { Link } from 'react-router';
// Styles
import styles from './ErrorPage.module.css';

interface ErrorPageProps {
    statusCode?: number;
    title?: string;
    message?: string;
    showHomeButton?: boolean;
}

export const ErrorPage: React.FC<ErrorPageProps> = ({
    statusCode = 404,
    title,
    message,
    showHomeButton = true
}) => {
    // Default error handling without useRouteError
    const errorStatusCode = statusCode;
    let errorTitle = title || 'Page Not Found';
    let errorMessage = message || 'The page you are looking for does not exist.';

    // Set default messages based on status code
    if (!title || !message) {
        switch (statusCode) {
            case 404:
                errorTitle = title || 'Page Not Found';
                errorMessage = message || 'The page you are looking for does not exist.';
                break;
            case 403:
                errorTitle = title || 'Access Forbidden';
                errorMessage = message || 'You do not have permission to access this page.';
                break;
            case 500:
                errorTitle = title || 'Server Error';
                errorMessage = message || 'Internal server error occurred. Please try again later.';
                break;
            default:
                errorTitle = title || 'Something went wrong';
                errorMessage = message || 'An unexpected error occurred';
        }
    }

    const handleGoBack = () => {
        if (window.history.length > 1) {
            window.history.back();
        } else {
            window.location.href = '/';
        }
    };

    const handleRefresh = () => {
        window.location.reload();
    };

    return (
        <div className={styles.main}>
            <div className={styles.error__container}>
                <div className={styles.error__content}>
                    <div className={styles.error__icon}>
                        <div className={styles.error__code}>{errorStatusCode}</div>
                    </div>

                    <div className={styles.error__text}>
                        <h1 className={styles.error__title}>{errorTitle}</h1>
                        <p className={styles.error__message}>{errorMessage}</p>
                    </div>

                    <div className={styles.error__actions}>
                        {showHomeButton && (
                            <Link to="/" className={styles.error__button}>
                                <svg className={styles.button__icon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                                    <polyline points="9,22 9,12 15,12 15,22" />
                                </svg>
                                Go Home
                            </Link>
                        )}

                        <button
                            onClick={handleGoBack}
                            className={`${styles.error__button} ${styles.error__button__secondary}`}
                        >
                            <svg className={styles.button__icon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <polyline points="15,18 9,12 15,6" />
                            </svg>
                            Go Back
                        </button>

                        <button
                            onClick={handleRefresh}
                            className={`${styles.error__button} ${styles.error__button__secondary}`}
                        >
                            <svg className={styles.button__icon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <polyline points="23,4 23,10 17,10" />
                                <path d="M20.49,15a9,9,0,1,1-2.12-9.36L23,10" />
                            </svg>
                            Refresh
                        </button>
                    </div>

                    <div className={styles.error__help}>
                        <p>If the problem persists, please contact our support team.</p>
                        <Link to="/contact" className={styles.error__link}>
                            Contact Support
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Specific error components for common use cases
export const NotFoundPage: React.FC = () => (
    <ErrorPage
        statusCode={404}
        title="Page Not Found"
        message="The page you are looking for does not exist or has been moved."
    />
);

export const ForbiddenPage: React.FC = () => (
    <ErrorPage
        statusCode={403}
        title="Access Forbidden"
        message="You do not have permission to access this page."
    />
);

export const ServerErrorPage: React.FC = () => (
    <ErrorPage
        statusCode={500}
        title="Server Error"
        message="Something went wrong on our end. Please try again later."
    />
);

// Default 404 component for catch-all route
export const DefaultErrorPage: React.FC = () => (
    <ErrorPage
        statusCode={404}
        title="Page Not Found"
        message="The page you are looking for does not exist."
    />
);
