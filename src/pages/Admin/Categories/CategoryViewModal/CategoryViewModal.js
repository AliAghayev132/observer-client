import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// React    
import { useEffect, useState } from 'react';
// Icons
import { X, Calendar, Hash, FileText, Image as ImageIcon, Tag } from 'lucide-react';
// Utils
import { getCategoryImageUrl } from '@/utils/imageHandler';
export var CategoryViewModal = function (_a) {
    var category = _a.category, isOpen = _a.isOpen, onClose = _a.onClose;
    var _b = useState(false), isVisible = _b[0], setIsVisible = _b[1];
    var _c = useState(false), isAnimating = _c[0], setIsAnimating = _c[1];
    useEffect(function () {
        if (isOpen) {
            setIsAnimating(true);
            // Small delay to trigger the animation
            setTimeout(function () { return setIsVisible(true); }, 10);
        }
        else {
            setIsVisible(false);
            // Wait for animation to complete before hiding
            setTimeout(function () { return setIsAnimating(false); }, 300);
        }
    }, [isOpen]);
    // Handle ESC key
    useEffect(function () {
        var handleEsc = function (e) {
            if (e.key === 'Escape')
                onClose();
        };
        if (isOpen) {
            document.addEventListener('keydown', handleEsc);
            document.body.style.overflow = 'hidden';
        }
        return function () {
            document.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);
    if (!isAnimating || !category)
        return null;
    return (_jsxs("div", { className: "fixed inset-0 z-50 overflow-y-auto", children: [_jsx("div", { className: "fixed inset-0 backdrop-blur-sm bg-white/30 transition-all duration-300 ".concat(isVisible ? 'opacity-100' : 'opacity-0'), onClick: onClose }), _jsx("div", { className: "flex min-h-full items-center justify-center p-2 sm:p-4", children: _jsxs("div", { className: "relative bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-3xl max-h-[98vh] sm:max-h-[95vh] overflow-hidden border border-gray-200 transition-all duration-300 transform ".concat(isVisible
                        ? 'opacity-100 scale-100 translate-y-0'
                        : 'opacity-0 scale-95 translate-y-4'), children: [_jsxs("div", { className: "flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50", children: [_jsxs("div", { className: "flex items-center space-x-2 sm:space-x-3", children: [_jsx("div", { className: "p-1.5 sm:p-2 bg-blue-100 rounded-lg", children: _jsx(Tag, { className: "w-4 h-4 sm:w-6 sm:h-6 text-blue-600" }) }), _jsxs("div", { children: [_jsx("h2", { className: "text-lg sm:text-xl font-semibold text-gray-900", children: "Category Details" }), _jsx("p", { className: "text-xs sm:text-sm text-gray-500 hidden sm:block", children: "View category information" })] })] }), _jsx("button", { onClick: onClose, className: "p-1.5 sm:p-2 hover:bg-white/50 rounded-lg transition-all duration-200 hover:scale-110", children: _jsx(X, { className: "w-4 h-4 sm:w-5 sm:h-5 text-gray-500" }) })] }), _jsx("div", { className: "p-3 sm:p-4 md:p-6 overflow-y-auto max-h-[calc(98vh-80px)] sm:max-h-[calc(95vh-100px)]", children: _jsxs("div", { className: "space-y-4 sm:space-y-6 md:space-y-8", children: [_jsxs("div", { className: "text-center", children: [_jsx("div", { className: "inline-block", children: _jsx("div", { className: "w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl sm:rounded-3xl flex items-center justify-center overflow-hidden border-2 sm:border-4 border-white shadow-xl sm:shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105", children: category.image ? (_jsx("img", { src: getCategoryImageUrl(category.image), alt: category.name, className: "w-full h-full object-cover transition-transform duration-300 hover:scale-110" })) : (_jsxs("div", { className: "text-center", children: [_jsx(ImageIcon, { className: "w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 text-gray-400 mx-auto mb-1 sm:mb-2" }), _jsx("p", { className: "text-xs sm:text-sm text-gray-500", children: "No image" })] })) }) }), _jsxs("div", { className: "mt-3 sm:mt-4", children: [_jsx("h3", { className: "text-xl sm:text-2xl font-bold text-gray-900 break-words", children: category.name }), _jsxs("p", { className: "text-gray-500 mt-1 text-sm sm:text-base", children: ["/", category.slug] })] })] }), _jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6", children: [_jsxs("div", { className: "space-y-2 sm:space-y-3 group", children: [_jsxs("label", { className: "flex items-center space-x-2 text-xs sm:text-sm font-medium text-gray-700", children: [_jsx(Tag, { className: "w-3 h-3 sm:w-4 sm:h-4 text-blue-500" }), _jsx("span", { children: "Category Name" })] }), _jsx("div", { className: "p-3 sm:p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg sm:rounded-xl border border-blue-100 group-hover:shadow-md transition-all duration-200", children: _jsx("p", { className: "text-gray-900 font-medium text-sm sm:text-base break-words", children: category.name }) })] }), _jsxs("div", { className: "space-y-2 sm:space-y-3 group", children: [_jsxs("label", { className: "flex items-center space-x-2 text-xs sm:text-sm font-medium text-gray-700", children: [_jsx(Hash, { className: "w-3 h-3 sm:w-4 sm:h-4 text-green-500" }), _jsx("span", { children: "Slug" })] }), _jsx("div", { className: "p-3 sm:p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg sm:rounded-xl border border-green-100 group-hover:shadow-md transition-all duration-200", children: _jsx("p", { className: "text-gray-900 font-mono text-xs sm:text-sm break-all", children: category.slug }) })] }), _jsxs("div", { className: "space-y-2 sm:space-y-3 group", children: [_jsx("label", { className: "text-xs sm:text-sm font-medium text-gray-700", children: "Status" }), _jsx("div", { className: "p-3 sm:p-4 bg-gradient-to-r from-gray-50 to-slate-50 rounded-lg sm:rounded-xl border border-gray-100 group-hover:shadow-md transition-all duration-200", children: _jsx("span", { className: "inline-flex items-center px-2 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ".concat(category.isDeleted
                                                                ? 'bg-red-100 text-red-800 hover:bg-red-200'
                                                                : 'bg-green-100 text-green-800 hover:bg-green-200'), children: category.isDeleted ? 'Deleted' : 'Active' }) })] }), _jsxs("div", { className: "space-y-2 sm:space-y-3 group", children: [_jsxs("label", { className: "flex items-center space-x-2 text-xs sm:text-sm font-medium text-gray-700", children: [_jsx(Calendar, { className: "w-3 h-3 sm:w-4 sm:h-4 text-purple-500" }), _jsx("span", { children: "Created Date" })] }), _jsx("div", { className: "p-3 sm:p-4 bg-gradient-to-r from-purple-50 to-violet-50 rounded-lg sm:rounded-xl border border-purple-100 group-hover:shadow-md transition-all duration-200", children: _jsx("p", { className: "text-gray-900 text-sm sm:text-base", children: category.formattedCreatedAt }) })] })] }), _jsxs("div", { className: "space-y-2 sm:space-y-3 group", children: [_jsxs("label", { className: "flex items-center space-x-2 text-xs sm:text-sm font-medium text-gray-700", children: [_jsx(FileText, { className: "w-3 h-3 sm:w-4 sm:h-4 text-orange-500" }), _jsx("span", { children: "Description" })] }), _jsx("div", { className: "p-4 sm:p-6 bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg sm:rounded-xl border border-orange-100 min-h-[80px] sm:min-h-[120px] group-hover:shadow-md transition-all duration-200", children: category.description ? (_jsx("p", { className: "text-gray-900 leading-relaxed text-sm sm:text-base break-words", children: category.description })) : (_jsx("p", { className: "text-gray-500 italic flex items-center justify-center h-full text-sm sm:text-base", children: "No description provided" })) })] }), _jsxs("div", { className: "bg-gradient-to-r from-gray-50 to-slate-50 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-gray-100 hover:shadow-md transition-all duration-200", children: [_jsxs("h3", { className: "text-xs sm:text-sm font-medium text-gray-700 mb-3 sm:mb-4 flex items-center space-x-2", children: [_jsx("div", { className: "w-2 h-2 bg-blue-500 rounded-full" }), _jsx("span", { children: "Metadata" })] }), _jsxs("div", { className: "grid grid-cols-1 gap-4 sm:gap-6 text-xs sm:text-sm", children: [_jsxs("div", { className: "space-y-2", children: [_jsx("span", { className: "text-gray-500 font-medium", children: "Category ID:" }), _jsx("p", { className: "font-mono text-gray-900 break-all bg-white p-2 sm:p-3 rounded-lg border text-xs sm:text-sm", children: category._id })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("span", { className: "text-gray-500 font-medium", children: "Last Updated:" }), _jsx("p", { className: "text-gray-900 bg-white p-2 sm:p-3 rounded-lg border text-xs sm:text-sm", children: new Date(category.updatedAt).toLocaleDateString('en-US', {
                                                                    year: 'numeric',
                                                                    month: 'long',
                                                                    day: 'numeric',
                                                                    hour: '2-digit',
                                                                    minute: '2-digit'
                                                                }) })] })] })] })] }) })] }) })] }));
};
