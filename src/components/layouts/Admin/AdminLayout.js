import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// React
import { useState } from 'react';
// React Router
import { Outlet } from "react-router";
// Components
import { Sidebar } from "./Sidebar/Sidebar";
export var AdminLayout = function () {
    var _a = useState(false), sidebarOpen = _a[0], setSidebarOpen = _a[1];
    var handleSidebarToggle = function () {
        setSidebarOpen(!sidebarOpen);
    };
    return (_jsxs("div", { className: "flex h-screen bg-gray-50 font-inter", children: [_jsx(Sidebar, { isOpen: sidebarOpen, onToggle: handleSidebarToggle }), _jsx("div", { className: "flex-1 overflow-hidden", children: _jsx("main", { className: "h-full overflow-y-auto", children: _jsx(Outlet, {}) }) })] }));
};
