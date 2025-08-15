import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// React Router
import { Link } from 'react-router';
// Styles
import styles from './ErrorPage.module.css';
export var ErrorPage = function (_a) {
    var _b = _a.statusCode, statusCode = _b === void 0 ? 404 : _b, title = _a.title, message = _a.message, _c = _a.showHomeButton, showHomeButton = _c === void 0 ? true : _c;
    // Default error handling without useRouteError
    var errorStatusCode = statusCode;
    var errorTitle = title || 'Page Not Found';
    var errorMessage = message || 'The page you are looking for does not exist.';
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
    var handleGoBack = function () {
        if (window.history.length > 1) {
            window.history.back();
        }
        else {
            window.location.href = '/';
        }
    };
    var handleRefresh = function () {
        window.location.reload();
    };
    return (_jsx("div", { className: styles.main, children: _jsx("div", { className: styles.error__container, children: _jsxs("div", { className: styles.error__content, children: [_jsx("div", { className: styles.error__icon, children: _jsx("div", { className: styles.error__code, children: errorStatusCode }) }), _jsxs("div", { className: styles.error__text, children: [_jsx("h1", { className: styles.error__title, children: errorTitle }), _jsx("p", { className: styles.error__message, children: errorMessage })] }), _jsxs("div", { className: styles.error__actions, children: [showHomeButton && (_jsxs(Link, { to: "/", className: styles.error__button, children: [_jsxs("svg", { className: styles.button__icon, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", children: [_jsx("path", { d: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" }), _jsx("polyline", { points: "9,22 9,12 15,12 15,22" })] }), "Go Home"] })), _jsxs("button", { onClick: handleGoBack, className: "".concat(styles.error__button, " ").concat(styles.error__button__secondary), children: [_jsx("svg", { className: styles.button__icon, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", children: _jsx("polyline", { points: "15,18 9,12 15,6" }) }), "Go Back"] }), _jsxs("button", { onClick: handleRefresh, className: "".concat(styles.error__button, " ").concat(styles.error__button__secondary), children: [_jsxs("svg", { className: styles.button__icon, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", children: [_jsx("polyline", { points: "23,4 23,10 17,10" }), _jsx("path", { d: "M20.49,15a9,9,0,1,1-2.12-9.36L23,10" })] }), "Refresh"] })] }), _jsxs("div", { className: styles.error__help, children: [_jsx("p", { children: "If the problem persists, please contact our support team." }), _jsx(Link, { to: "/contact", className: styles.error__link, children: "Contact Support" })] })] }) }) }));
};
// Specific error components for common use cases
export var NotFoundPage = function () { return (_jsx(ErrorPage, { statusCode: 404, title: "Page Not Found", message: "The page you are looking for does not exist or has been moved." })); };
export var ForbiddenPage = function () { return (_jsx(ErrorPage, { statusCode: 403, title: "Access Forbidden", message: "You do not have permission to access this page." })); };
export var ServerErrorPage = function () { return (_jsx(ErrorPage, { statusCode: 500, title: "Server Error", message: "Something went wrong on our end. Please try again later." })); };
// Default 404 component for catch-all route
export var DefaultErrorPage = function () { return (_jsx(ErrorPage, { statusCode: 404, title: "Page Not Found", message: "The page you are looking for does not exist." })); };
