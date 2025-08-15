var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// React
import { useState } from 'react';
// Styles
import styles from './ContactPage.module.css';
export var ContactPage = function () {
    var _a = useState({
        name: '',
        email: '',
        message: ''
    }), formData = _a[0], setFormData = _a[1];
    var handleChange = function (e) {
        var _a;
        setFormData(__assign(__assign({}, formData), (_a = {}, _a[e.target.name] = e.target.value, _a)));
    };
    var handleSubmit = function (e) {
        e.preventDefault();
        // Handle form submission here
        console.log('Form submitted:', formData);
    };
    return (_jsx("div", { className: styles.contactPage, children: _jsxs("section", { className: styles.contactSection, children: [_jsx("h2", { className: styles.contactTitle, children: "Contact Us" }), _jsxs("form", { className: styles.contactForm, onSubmit: handleSubmit, children: [_jsx("input", { type: "text", name: "name", placeholder: "Your Name", value: formData.name, onChange: handleChange, required: true }), _jsx("input", { type: "email", name: "email", placeholder: "Your Email", value: formData.email, onChange: handleChange, required: true }), _jsx("textarea", { name: "message", placeholder: "Your Message", value: formData.message, onChange: handleChange, required: true }), _jsx("button", { type: "submit", children: "Send Message" })] }), _jsx("div", { className: styles.contactNote, children: "We'll get back to you within 24 hours." })] }) }));
};
