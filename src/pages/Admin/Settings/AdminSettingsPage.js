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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
// pages/admin/AdminSettingsPage.tsx
import { useState } from 'react';
import { Settings, CreditCard, Bot, Globe, UserCheck, AlertTriangle, Save, RotateCcw, MessageSquare } from 'lucide-react';
export var AdminSettingsPage = function () {
    var _a = useState([
        // Sistem Ayarları
        {
            id: 'site_enabled',
            title: 'Site Aktif',
            description: 'Sitenin genel erişimini kontrol eder',
            enabled: true,
            icon: _jsx(Globe, { className: "w-5 h-5" }),
            category: 'system',
            critical: true
        },
        {
            id: 'maintenance_mode',
            title: 'Bakım Modu',
            description: 'Site bakım modunda olduğunda sadece adminler erişebilir',
            enabled: false,
            icon: _jsx(Settings, { className: "w-5 h-5" }),
            category: 'system',
            critical: true
        },
        {
            id: 'user_registration',
            title: 'Kullanıcı Kaydı',
            description: 'Yeni kullanıcıların kayıt olmasına izin verir',
            enabled: true,
            icon: _jsx(UserCheck, { className: "w-5 h-5" }),
            category: 'system'
        },
        // Ödeme Ayarları
        {
            id: 'stripe_enabled',
            title: 'Stripe Ödemeleri',
            description: 'Stripe ile ödeme almayı aktif/pasif yapar',
            enabled: true,
            icon: _jsx(CreditCard, { className: "w-5 h-5" }),
            category: 'payment'
        },
        // AI Ayarları
        {
            id: 'ai_chat',
            title: 'AI Sohbet',
            description: 'Kullanıcıların AI ile sohbet etmesine izin verir',
            enabled: true,
            icon: _jsx(MessageSquare, { className: "w-5 h-5" }),
            category: 'ai'
        }
    ]), settings = _a[0], setSettings = _a[1];
    var _b = useState(false), hasChanges = _b[0], setHasChanges = _b[1];
    var _c = useState(false), saving = _c[0], setSaving = _c[1];
    var categories = [
        { id: 'system', name: 'Sistem Ayarları', icon: _jsx(Settings, { className: "w-5 h-5" }) },
        { id: 'payment', name: 'Ödeme Ayarları', icon: _jsx(CreditCard, { className: "w-5 h-5" }) },
        { id: 'ai', name: 'AI Ayarları', icon: _jsx(Bot, { className: "w-5 h-5" }) }
    ];
    var handleToggle = function (settingId) {
        setSettings(function (prev) { return prev.map(function (setting) {
            return setting.id === settingId
                ? __assign(__assign({}, setting), { enabled: !setting.enabled }) : setting;
        }); });
        setHasChanges(true);
    };
    var handleSave = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setSaving(true);
                    // Simulate API call
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1500); })];
                case 1:
                    // Simulate API call
                    _a.sent();
                    setSaving(false);
                    setHasChanges(false);
                    // Success notification (you can replace with your notification system)
                    alert('Ayarlar başarıyla kaydedildi!');
                    return [2 /*return*/];
            }
        });
    }); };
    var handleReset = function () {
        // Reset to original state (you can implement actual reset logic)
        setHasChanges(false);
        alert('Ayarlar sıfırlandı!');
    };
    var getSettingsByCategory = function (categoryId) {
        return settings.filter(function (setting) { return setting.category === categoryId; });
    };
    return (_jsx("div", { className: "min-h-screen bg-gray-50 p-6", children: _jsxs("div", { className: "max-w-6xl mx-auto space-y-6", children: [_jsxs("div", { className: "bg-white rounded-xl shadow-sm border border-gray-200 p-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: "w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center", children: _jsx(Settings, { className: "w-6 h-6 text-white" }) }), _jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold text-gray-900", children: "Sistem Ayarlar\u0131" }), _jsx("p", { className: "text-gray-600", children: "Uygulaman\u0131n genel ayarlar\u0131n\u0131 y\u00F6netin" })] })] }), _jsxs("div", { className: "flex items-center space-x-3", children: [_jsxs("button", { onClick: handleReset, disabled: !hasChanges || saving, className: "inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors", children: [_jsx(RotateCcw, { className: "w-4 h-4 mr-2" }), "S\u0131f\u0131rla"] }), _jsx("button", { onClick: handleSave, disabled: !hasChanges || saving, className: "inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors", children: saving ? (_jsxs(_Fragment, { children: [_jsx("div", { className: "animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" }), "Kaydediliyor..."] })) : (_jsxs(_Fragment, { children: [_jsx(Save, { className: "w-4 h-4 mr-2" }), "Kaydet"] })) })] })] }), hasChanges && (_jsxs("div", { className: "mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-center", children: [_jsx(AlertTriangle, { className: "w-5 h-5 text-amber-600 mr-2" }), _jsx("span", { className: "text-sm text-amber-800", children: "Kaydedilmemi\u015F de\u011Fi\u015Fiklikleriniz var. De\u011Fi\u015Fiklikleri kaydetmeyi unutmay\u0131n." })] }))] }), _jsx("div", { className: "grid gap-6", children: categories.map(function (category) {
                        var categorySettings = getSettingsByCategory(category.id);
                        return (_jsxs("div", { className: "bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden", children: [_jsx("div", { className: "bg-gray-50 px-6 py-4 border-b border-gray-200", children: _jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: "text-gray-600", children: category.icon }), _jsx("h2", { className: "text-lg font-semibold text-gray-900", children: category.name }), _jsxs("span", { className: "bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs font-medium", children: [categorySettings.length, " ayar"] })] }) }), _jsx("div", { className: "divide-y divide-gray-200", children: categorySettings.map(function (setting) { return (_jsx("div", { className: "p-6 hover:bg-gray-50 transition-colors", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-start space-x-4 flex-1", children: [_jsx("div", { className: "p-2 rounded-lg ".concat(setting.enabled
                                                                ? 'bg-green-100 text-green-600'
                                                                : 'bg-gray-100 text-gray-400'), children: setting.icon }), _jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("h3", { className: "text-sm font-semibold text-gray-900", children: setting.title }), setting.critical && (_jsx("span", { className: "bg-red-100 text-red-800 px-2 py-0.5 rounded-full text-xs font-medium", children: "Kritik" }))] }), _jsx("p", { className: "text-sm text-gray-600 mt-1", children: setting.description })] })] }), _jsxs("div", { className: "flex items-center", children: [_jsx("button", { onClick: function () { return handleToggle(setting.id); }, className: "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ".concat(setting.enabled
                                                                ? 'bg-blue-600'
                                                                : 'bg-gray-200'), children: _jsx("span", { className: "inline-block h-4 w-4 transform rounded-full bg-white transition-transform ".concat(setting.enabled
                                                                    ? 'translate-x-6'
                                                                    : 'translate-x-1') }) }), _jsx("span", { className: "ml-3 text-sm font-medium text-gray-700", children: setting.enabled ? 'Aktif' : 'Pasif' })] })] }) }, setting.id)); }) })] }, category.id));
                    }) }), _jsxs("div", { className: "bg-white rounded-xl shadow-sm border border-gray-200 p-6", children: [_jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-4", children: "Sistem Durumu" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [_jsxs("div", { className: "bg-green-50 border border-green-200 rounded-lg p-4", children: [_jsxs("div", { className: "flex items-center", children: [_jsx("div", { className: "w-3 h-3 bg-green-500 rounded-full mr-3" }), _jsx("span", { className: "text-sm font-medium text-green-800", children: "Site Durumu" })] }), _jsx("p", { className: "text-xs text-green-600 mt-1", children: "\u00C7evrimi\u00E7i ve \u00C7al\u0131\u015F\u0131yor" })] }), _jsxs("div", { className: "bg-blue-50 border border-blue-200 rounded-lg p-4", children: [_jsxs("div", { className: "flex items-center", children: [_jsx("div", { className: "w-3 h-3 bg-blue-500 rounded-full mr-3" }), _jsx("span", { className: "text-sm font-medium text-blue-800", children: "API Durumu" })] }), _jsx("p", { className: "text-xs text-blue-600 mt-1", children: "T\u00FCm Servisler Aktif" })] }), _jsxs("div", { className: "bg-purple-50 border border-purple-200 rounded-lg p-4", children: [_jsxs("div", { className: "flex items-center", children: [_jsx("div", { className: "w-3 h-3 bg-purple-500 rounded-full mr-3" }), _jsx("span", { className: "text-sm font-medium text-purple-800", children: "Veritaban\u0131" })] }), _jsx("p", { className: "text-xs text-purple-600 mt-1", children: "Ba\u011Flant\u0131 Sa\u011Fl\u0131kl\u0131" })] })] })] })] }) }));
};
