import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Components/LoadingSpinner/LoadingSpinner.jsx
export var LoadingSpinner = function (_a) {
    var _b = _a.size, size = _b === void 0 ? 'large' : _b, _c = _a.text, text = _c === void 0 ? 'Loading...' : _c, _d = _a.overlay, overlay = _d === void 0 ? true : _d;
    var sizeClasses = {
        small: 'w-6 h-6',
        medium: 'w-10 h-10',
        large: 'w-16 h-16',
        xlarge: 'w-24 h-24'
    };
    var SpinnerContent = function () { return (_jsxs("div", { className: "flex flex-col items-center justify-center space-y-4", children: [_jsx("div", { className: "".concat(sizeClasses[size], " animate-spin"), children: _jsxs("svg", { className: "w-full h-full text-primary-500", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", children: [_jsx("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }), _jsx("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })] }) }), text && (_jsx("p", { className: "text-gray-600 font-medium text-lg animate-pulse", children: text }))] })); };
    if (!overlay) {
        return _jsx(SpinnerContent, {});
    }
    return (_jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-90 backdrop-blur-sm", children: _jsx(SpinnerContent, {}) }));
};
// Alternative with dots animation
export var LoadingDots = function (_a) {
    var _b = _a.text, text = _b === void 0 ? 'Loading' : _b;
    return (_jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-90 backdrop-blur-sm", children: _jsxs("div", { className: "flex flex-col items-center space-y-4", children: [_jsxs("div", { className: "flex space-x-2", children: [_jsx("div", { className: "w-3 h-3 bg-primary-500 rounded-full animate-bounce" }), _jsx("div", { className: "w-3 h-3 bg-primary-500 rounded-full animate-bounce", style: { animationDelay: '0.1s' } }), _jsx("div", { className: "w-3 h-3 bg-primary-500 rounded-full animate-bounce", style: { animationDelay: '0.2s' } })] }), _jsx("p", { className: "text-gray-600 font-medium text-lg", children: text })] }) }));
};
// Pulse animation variant
export var LoadingPulse = function (_a) {
    var _b = _a.text, text = _b === void 0 ? 'Loading...' : _b;
    return (_jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-90 backdrop-blur-sm", children: _jsxs("div", { className: "flex flex-col items-center space-y-4", children: [_jsx("div", { className: "w-16 h-16 bg-primary-500 rounded-full animate-pulse" }), _jsx("p", { className: "text-gray-600 font-medium text-lg animate-pulse", children: text })] }) }));
};
