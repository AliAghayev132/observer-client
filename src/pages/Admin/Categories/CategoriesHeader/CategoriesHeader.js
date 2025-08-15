import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Icons
import { Plus, FolderOpen } from 'lucide-react';
export var CategoriesHeader = function (_a) {
    var onAddCategory = _a.onAddCategory, totalCategories = _a.totalCategories;
    return (_jsx("div", { className: "bg-white rounded-xl shadow-sm border border-gray-200 p-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-4", children: [_jsx("div", { className: "w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center", children: _jsx(FolderOpen, { className: "w-6 h-6 text-blue-600" }) }), _jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold text-gray-900", children: "Categories" }), _jsxs("p", { className: "text-gray-600 mt-1", children: ["Manage your product categories (", totalCategories, " total)"] })] })] }), _jsxs("button", { onClick: onAddCategory, className: "flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200", children: [_jsx(Plus, { className: "w-5 h-5" }), _jsx("span", { children: "Add Category" })] })] }) }));
};
