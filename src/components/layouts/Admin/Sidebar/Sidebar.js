import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { X, Menu, Crown, Users, LogOut, Settings, LayoutDashboard, } from "lucide-react";
import { useLocation, useNavigate } from "react-router";
export var Sidebar = function (_a) {
    var isOpen = _a.isOpen, onToggle = _a.onToggle;
    var navigate = useNavigate();
    var location = useLocation();
    var sidebarItems = [
        {
            id: "system",
            label: "System",
            icon: Settings,
            path: "/admin/system",
        },
        {
            id: "category",
            label: "Categories",
            icon: LayoutDashboard,
            path: "/admin/categories",
        },
        {
            id: "leaders",
            label: "Leaders",
            icon: Crown,
            path: "/admin/leaders",
        },
        {
            id: "users",
            label: "Users",
            icon: Users,
            path: "/admin/users",
        },
        {
            id: "settings",
            label: "Settings",
            icon: Settings,
            path: "/admin/settings",
        },
    ];
    var handleItemClick = function (path, id) {
        if (id === "logout") {
            // TODO: logout mutation çağırabilirsin
            console.log("Logging out...");
            return;
        }
        navigate(path);
        onToggle(); // mobilde sidebar kapanır
    };
    return (_jsxs(_Fragment, { children: [isOpen && (_jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden", onClick: onToggle })), _jsxs("aside", { className: "\n        fixed lg:static inset-y-0 left-0 z-50 w-72 bg-white border-r border-gray-200 \n        transform transition-transform duration-300 ease-in-out lg:translate-x-0\n        ".concat(isOpen ? "translate-x-0" : "-translate-x-full", "\n      "), children: [_jsxs("div", { className: "flex items-center justify-between p-6 bg-primary-500 text-white", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: "w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center", children: _jsx(LayoutDashboard, { size: 24 }) }), _jsx("span", { className: "text-xl font-semibold", children: "Admin Panel" })] }), _jsx("button", { className: "lg:hidden p-2 rounded-lg hover:bg-white hover:bg-opacity-10", onClick: onToggle, children: _jsx(X, { size: 20 }) })] }), _jsx("nav", { className: "flex-1 p-4", children: _jsx("ul", { className: "space-y-2", children: sidebarItems.map(function (item) {
                                var IconComponent = item.icon;
                                var isActive = location.pathname.startsWith(item.path);
                                return (_jsx("li", { children: _jsxs("button", { className: "\n                      w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left\n                      transition-colors duration-200 font-medium\n                      ".concat(isActive
                                            ? "bg-primary-50 text-primary-700 border-r-4 border-primary-500"
                                            : "text-gray-700 hover:bg-gray-50 hover:text-gray-900", "\n                    "), onClick: function () { return handleItemClick(item.path, item.id); }, children: [_jsx(IconComponent, { size: 20, className: isActive ? "text-primary-600" : "text-gray-500" }), _jsx("span", { children: item.label })] }) }, item.id));
                            }) }) }), _jsx("div", { className: "p-4 border-t border-gray-200", children: _jsxs("button", { className: "w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left\n                     text-red-600 hover:bg-red-50 transition-colors duration-200 font-medium", onClick: function () { return handleItemClick("", "logout"); }, children: [_jsx(LogOut, { size: 20 }), _jsx("span", { children: "Logout" })] }) })] }), _jsx("button", { className: "fixed top-4 left-4 z-50 lg:hidden bg-primary-500 text-white p-3 rounded-lg shadow-lg", onClick: onToggle, children: _jsx(Menu, { size: 24 }) })] }));
};
