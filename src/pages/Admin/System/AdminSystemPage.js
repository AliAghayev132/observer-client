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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Pages/Admin/AdminSystemPage.tsx
import { useState } from 'react';
import { Cpu, Zap, Clock, Monitor, Activity, HardDrive, Database, BarChart3, RefreshCw, AlertTriangle } from 'lucide-react';
import { useGetSystemInfoQuery } from '@/redux/admin/system/adminSystemApi';
export var AdminSystemPage = function () {
    var _a = useState(true), autoRefresh = _a[0], setAutoRefresh = _a[1];
    var _b = useGetSystemInfoQuery(undefined, {
        pollingInterval: autoRefresh ? 30000 : 0,
        refetchOnMountOrArgChange: true,
    }), data = _b.data, error = _b.error, isLoading = _b.isLoading, isFetching = _b.isFetching, refetch = _b.refetch;
    // Utility functions
    var calculatePercentage = function (used, total) {
        var usedNum = parseFloat(used);
        var totalNum = parseFloat(total);
        if (totalNum === 0)
            return 0;
        return Math.round((usedNum / totalNum) * 100);
    };
    var formatMB = function (mb, decimals) {
        if (decimals === void 0) { decimals = 2; }
        var mbNum = parseFloat(mb);
        if (mbNum === 0)
            return '0 MB';
        if (mbNum >= 1024) {
            return "".concat((mbNum / 1024).toFixed(decimals), " GB");
        }
        return "".concat(mbNum.toFixed(decimals), " MB");
    };
    var formatUptime = function (seconds) {
        var totalSeconds = typeof seconds === 'string' ? parseInt(seconds) : seconds;
        var days = Math.floor(totalSeconds / 86400);
        var hours = Math.floor((totalSeconds % 86400) / 3600);
        var minutes = Math.floor((totalSeconds % 3600) / 60);
        if (days > 0) {
            return "".concat(days, "d ").concat(hours, "h ").concat(minutes, "m");
        }
        else if (hours > 0) {
            return "".concat(hours, "h ").concat(minutes, "m");
        }
        else {
            return "".concat(minutes, "m");
        }
    };
    var getUsageColor = function (percentage) {
        if (percentage < 50)
            return 'bg-green-500';
        if (percentage < 80)
            return 'bg-yellow-500';
        return 'bg-red-500';
    };
    var getUsageTextColor = function (percentage) {
        if (percentage < 50)
            return 'text-green-600';
        if (percentage < 80)
            return 'text-yellow-600';
        return 'text-red-600';
    };
    var handleManualRefresh = function () { return __awaiter(void 0, void 0, void 0, function () {
        var error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, refetch()];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.error('Failed to refresh system info:', error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    // Loading state
    if (isLoading) {
        return (_jsx("div", { className: "min-h-screen bg-gray-50 flex items-center justify-center", children: _jsxs("div", { className: "bg-white rounded-lg shadow-lg p-8 text-center", children: [_jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4" }), _jsx("p", { className: "text-gray-600", children: "Loading system information..." })] }) }));
    }
    // Error state
    if (error) {
        return (_jsx("div", { className: "min-h-screen bg-gray-50 flex items-center justify-center p-4", children: _jsxs("div", { className: "bg-white rounded-lg shadow-lg p-8 text-center max-w-md", children: [_jsx("div", { className: "w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4", children: _jsx(AlertTriangle, { className: "w-8 h-8 text-red-500" }) }), _jsx("h2", { className: "text-xl font-semibold text-gray-900 mb-2", children: "Failed to Load System Info" }), _jsx("p", { className: "text-gray-600 mb-4", children: "Unable to retrieve system information from the server." }), _jsx("button", { onClick: handleManualRefresh, className: "bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors", children: "Try Again" })] }) }));
    }
    var systemInfo = data === null || data === void 0 ? void 0 : data.data;
    if (!systemInfo) {
        return (_jsx("div", { className: "min-h-screen bg-gray-50 flex items-center justify-center", children: _jsx("div", { className: "bg-white rounded-lg shadow-lg p-8 text-center", children: _jsx("p", { className: "text-gray-600", children: "No system data available" }) }) }));
    }
    var ramUsagePercent = calculatePercentage(systemInfo.usedRAMMB, systemInfo.totalRAMMB);
    var diskUsagePercent = calculatePercentage(systemInfo.diskInfo.usedDiskMB, systemInfo.diskInfo.totalDiskMB);
    return (_jsx("div", { className: "min-h-screen bg-gray-50 p-6", children: _jsxs("div", { className: "max-w-7xl mx-auto", children: [_jsx("div", { className: "bg-white rounded-xl shadow-sm p-6 mb-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: "w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center", children: _jsx(Monitor, { className: "w-6 h-6 text-blue-600" }) }), _jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold text-gray-900", children: "System Information" }), _jsx("p", { className: "text-gray-600", children: "Real-time server monitoring and statistics" })] })] }), _jsxs("div", { className: "flex items-center space-x-4", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("span", { className: "text-sm text-gray-600", children: "Auto Refresh" }), _jsx("button", { onClick: function () { return setAutoRefresh(!autoRefresh); }, className: "relative inline-flex h-6 w-11 items-center rounded-full transition-colors ".concat(autoRefresh ? 'bg-blue-600' : 'bg-gray-300'), children: _jsx("span", { className: "inline-block h-4 w-4 transform rounded-full bg-white transition-transform ".concat(autoRefresh ? 'translate-x-6' : 'translate-x-1') }) })] }), _jsxs("button", { onClick: handleManualRefresh, disabled: isFetching, className: "flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white px-4 py-2 rounded-lg transition-colors", children: [_jsx(RefreshCw, { className: "w-4 h-4 ".concat(isFetching ? 'animate-spin' : '') }), _jsx("span", { children: "Refresh" })] })] })] }) }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6", children: [_jsxs("div", { className: "bg-white rounded-lg shadow-sm p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsx("div", { className: "w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center", children: _jsx(Cpu, { className: "w-5 h-5 text-purple-600" }) }), _jsx("span", { className: "text-2xl font-bold text-gray-900", children: systemInfo.cpuCount })] }), _jsx("h3", { className: "font-semibold text-gray-900 mb-1", children: "CPU Cores" }), _jsx("p", { className: "text-sm text-gray-600 truncate", title: systemInfo.cpuModel, children: systemInfo.cpuModel })] }), _jsxs("div", { className: "bg-white rounded-lg shadow-sm p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsx("div", { className: "w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center", children: _jsx(Activity, { className: "w-5 h-5 text-green-600" }) }), _jsxs("span", { className: "text-2xl font-bold ".concat(getUsageTextColor(ramUsagePercent)), children: [ramUsagePercent, "%"] })] }), _jsx("h3", { className: "font-semibold text-gray-900 mb-2", children: "RAM Usage" }), _jsx("div", { className: "w-full bg-gray-200 rounded-full h-2 mb-2", children: _jsx("div", { className: "h-2 rounded-full transition-all duration-300 ".concat(getUsageColor(ramUsagePercent)), style: { width: "".concat(ramUsagePercent, "%") } }) }), _jsxs("p", { className: "text-sm text-gray-600", children: [formatMB(systemInfo.usedRAMMB), " / ", formatMB(systemInfo.totalRAMMB)] })] }), _jsxs("div", { className: "bg-white rounded-lg shadow-sm p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsx("div", { className: "w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center", children: _jsx(HardDrive, { className: "w-5 h-5 text-orange-600" }) }), _jsxs("span", { className: "text-2xl font-bold ".concat(getUsageTextColor(diskUsagePercent)), children: [diskUsagePercent, "%"] })] }), _jsx("h3", { className: "font-semibold text-gray-900 mb-2", children: "Disk Usage" }), _jsx("div", { className: "w-full bg-gray-200 rounded-full h-2 mb-2", children: _jsx("div", { className: "h-2 rounded-full transition-all duration-300 ".concat(getUsageColor(diskUsagePercent)), style: { width: "".concat(diskUsagePercent, "%") } }) }), _jsxs("p", { className: "text-sm text-gray-600", children: [formatMB(systemInfo.diskInfo.usedDiskMB), " / ", formatMB(systemInfo.diskInfo.totalDiskMB)] })] }), _jsxs("div", { className: "bg-white rounded-lg shadow-sm p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsx("div", { className: "w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center", children: _jsx(Clock, { className: "w-5 h-5 text-blue-600" }) }), _jsx(Zap, { className: "w-6 h-6 text-green-500" })] }), _jsx("h3", { className: "font-semibold text-gray-900 mb-1", children: "Server Uptime" }), _jsx("p", { className: "text-2xl font-bold text-gray-900", children: formatUptime(systemInfo.processUptimeSeconds) })] })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [_jsxs("div", { className: "bg-white rounded-lg shadow-sm p-6", children: [_jsxs("div", { className: "flex items-center space-x-3 mb-6", children: [_jsx("div", { className: "w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center", children: _jsx(Database, { className: "w-5 h-5 text-indigo-600" }) }), _jsx("h2", { className: "text-xl font-semibold text-gray-900", children: "Memory Details" })] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex justify-between items-center p-3 bg-gray-50 rounded-lg", children: [_jsx("span", { className: "font-medium text-gray-700", children: "Total RAM" }), _jsx("span", { className: "text-gray-900 font-semibold", children: formatMB(systemInfo.totalRAMMB) })] }), _jsxs("div", { className: "flex justify-between items-center p-3 bg-gray-50 rounded-lg", children: [_jsx("span", { className: "font-medium text-gray-700", children: "Used RAM" }), _jsx("span", { className: "text-gray-900 font-semibold", children: formatMB(systemInfo.usedRAMMB) })] }), _jsxs("div", { className: "flex justify-between items-center p-3 bg-gray-50 rounded-lg", children: [_jsx("span", { className: "font-medium text-gray-700", children: "Free RAM" }), _jsx("span", { className: "text-gray-900 font-semibold", children: formatMB(systemInfo.freeRAMMB) })] })] })] }), _jsxs("div", { className: "bg-white rounded-lg shadow-sm p-6", children: [_jsxs("div", { className: "flex items-center space-x-3 mb-6", children: [_jsx("div", { className: "w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center", children: _jsx(BarChart3, { className: "w-5 h-5 text-emerald-600" }) }), _jsx("h2", { className: "text-xl font-semibold text-gray-900", children: "Process Memory" })] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex justify-between items-center p-3 bg-gray-50 rounded-lg", children: [_jsx("span", { className: "font-medium text-gray-700", children: "RSS Memory" }), _jsx("span", { className: "text-gray-900 font-semibold", children: formatMB(systemInfo.processMemoryUsage.rssMB) })] }), _jsxs("div", { className: "flex justify-between items-center p-3 bg-gray-50 rounded-lg", children: [_jsx("span", { className: "font-medium text-gray-700", children: "Heap Total" }), _jsx("span", { className: "text-gray-900 font-semibold", children: formatMB(systemInfo.processMemoryUsage.heapTotalMB) })] }), _jsxs("div", { className: "flex justify-between items-center p-3 bg-gray-50 rounded-lg", children: [_jsx("span", { className: "font-medium text-gray-700", children: "Heap Used" }), _jsx("span", { className: "text-gray-900 font-semibold", children: formatMB(systemInfo.processMemoryUsage.heapUsedMB) })] })] })] })] }), _jsxs("div", { className: "mt-6 bg-white rounded-lg shadow-sm p-6", children: [_jsx("h2", { className: "text-xl font-semibold text-gray-900 mb-4", children: "System Status Summary" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: "w-3 h-3 rounded-full ".concat(ramUsagePercent < 80 ? 'bg-green-500' : ramUsagePercent < 90 ? 'bg-yellow-500' : 'bg-red-500') }), _jsxs("span", { className: "text-sm text-gray-600", children: ["Memory: ", ramUsagePercent < 80 ? 'Healthy' : ramUsagePercent < 90 ? 'Warning' : 'Critical'] })] }), _jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: "w-3 h-3 rounded-full ".concat(diskUsagePercent < 80 ? 'bg-green-500' : diskUsagePercent < 90 ? 'bg-yellow-500' : 'bg-red-500') }), _jsxs("span", { className: "text-sm text-gray-600", children: ["Disk: ", diskUsagePercent < 80 ? 'Healthy' : diskUsagePercent < 90 ? 'Warning' : 'Critical'] })] }), _jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: "w-3 h-3 rounded-full bg-green-500" }), _jsx("span", { className: "text-sm text-gray-600", children: "Server: Online" })] })] })] }), _jsx("div", { className: "mt-6 text-center", children: _jsxs("p", { className: "text-sm text-gray-500", children: ["Last updated: ", new Date().toLocaleString(), autoRefresh && " • Auto-refreshing every 30 seconds", isFetching && " • Updating..."] }) })] }) }));
};
