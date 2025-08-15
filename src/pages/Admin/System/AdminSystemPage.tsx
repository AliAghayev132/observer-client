// Pages/Admin/AdminSystemPage.tsx
import React, { useState } from 'react';
import {
    Cpu,
    Zap,
    Clock,
    Monitor,
    Activity,
    HardDrive,
    Database,
    BarChart3,
    RefreshCw,
    AlertTriangle
} from 'lucide-react';

import { useGetSystemInfoQuery } from '@/redux/admin/system/adminSystemApi';

export const AdminSystemPage = () => {
    const [autoRefresh, setAutoRefresh] = useState(true);

    const {
        data,
        error,
        isLoading,
        isFetching,
        refetch
    } = useGetSystemInfoQuery(undefined, {
        pollingInterval: autoRefresh ? 30000 : 0,
        refetchOnMountOrArgChange: true,
    });

    // Utility functions
    const calculatePercentage = (used: string, total: string): number => {
        const usedNum = parseFloat(used);
        const totalNum = parseFloat(total);
        if (totalNum === 0) return 0;
        return Math.round((usedNum / totalNum) * 100);
    };

    const formatMB = (mb: string, decimals: number = 2): string => {
        const mbNum = parseFloat(mb);
        if (mbNum === 0) return '0 MB';

        if (mbNum >= 1024) {
            return `${(mbNum / 1024).toFixed(decimals)} GB`;
        }
        return `${mbNum.toFixed(decimals)} MB`;
    };

    const formatUptime = (seconds: string | number): string => {
        const totalSeconds = typeof seconds === 'string' ? parseInt(seconds) : seconds;
        const days = Math.floor(totalSeconds / 86400);
        const hours = Math.floor((totalSeconds % 86400) / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);

        if (days > 0) {
            return `${days}d ${hours}h ${minutes}m`;
        } else if (hours > 0) {
            return `${hours}h ${minutes}m`;
        } else {
            return `${minutes}m`;
        }
    };

    const getUsageColor = (percentage: number): string => {
        if (percentage < 50) return 'bg-green-500';
        if (percentage < 80) return 'bg-yellow-500';
        return 'bg-red-500';
    };

    const getUsageTextColor = (percentage: number): string => {
        if (percentage < 50) return 'text-green-600';
        if (percentage < 80) return 'text-yellow-600';
        return 'text-red-600';
    };

    const handleManualRefresh = async () => {
        try {
            await refetch();
        } catch (error) {
            console.error('Failed to refresh system info:', error);
        }
    };

    // Loading state
    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading system information...</p>
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-lg shadow-lg p-8 text-center max-w-md">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <AlertTriangle className="w-8 h-8 text-red-500" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                        Failed to Load System Info
                    </h2>
                    <p className="text-gray-600 mb-4">
                        Unable to retrieve system information from the server.
                    </p>
                    <button
                        onClick={handleManualRefresh}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    const systemInfo = data?.data;
    if (!systemInfo) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                    <p className="text-gray-600">No system data available</p>
                </div>
            </div>
        );
    }

    const ramUsagePercent = calculatePercentage(systemInfo.usedRAMMB, systemInfo.totalRAMMB);
    const diskUsagePercent = calculatePercentage(systemInfo.diskInfo.usedDiskMB, systemInfo.diskInfo.totalDiskMB);

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                <Monitor className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">System Information</h1>
                                <p className="text-gray-600">Real-time server monitoring and statistics</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            {/* Auto Refresh Toggle */}
                            <div className="flex items-center space-x-2">
                                <span className="text-sm text-gray-600">Auto Refresh</span>
                                <button
                                    onClick={() => setAutoRefresh(!autoRefresh)}
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${autoRefresh ? 'bg-blue-600' : 'bg-gray-300'
                                        }`}
                                >
                                    <span
                                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${autoRefresh ? 'translate-x-6' : 'translate-x-1'
                                            }`}
                                    />
                                </button>
                            </div>

                            {/* Manual Refresh Button */}
                            <button
                                onClick={handleManualRefresh}
                                disabled={isFetching}
                                className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white px-4 py-2 rounded-lg transition-colors"
                            >
                                <RefreshCw className={`w-4 h-4 ${isFetching ? 'animate-spin' : ''}`} />
                                <span>Refresh</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* System Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                    {/* CPU Info */}
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                <Cpu className="w-5 h-5 text-purple-600" />
                            </div>
                            <span className="text-2xl font-bold text-gray-900">{systemInfo.cpuCount}</span>
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-1">CPU Cores</h3>
                        <p className="text-sm text-gray-600 truncate" title={systemInfo.cpuModel}>
                            {systemInfo.cpuModel}
                        </p>
                    </div>

                    {/* RAM Usage */}
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                <Activity className="w-5 h-5 text-green-600" />
                            </div>
                            <span className={`text-2xl font-bold ${getUsageTextColor(ramUsagePercent)}`}>
                                {ramUsagePercent}%
                            </span>
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">RAM Usage</h3>
                        <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                            <div
                                className={`h-2 rounded-full transition-all duration-300 ${getUsageColor(ramUsagePercent)}`}
                                style={{ width: `${ramUsagePercent}%` }}
                            />
                        </div>
                        <p className="text-sm text-gray-600">
                            {formatMB(systemInfo.usedRAMMB)} / {formatMB(systemInfo.totalRAMMB)}
                        </p>
                    </div>

                    {/* Disk Usage */}
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                                <HardDrive className="w-5 h-5 text-orange-600" />
                            </div>
                            <span className={`text-2xl font-bold ${getUsageTextColor(diskUsagePercent)}`}>
                                {diskUsagePercent}%
                            </span>
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">Disk Usage</h3>
                        <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                            <div
                                className={`h-2 rounded-full transition-all duration-300 ${getUsageColor(diskUsagePercent)}`}
                                style={{ width: `${diskUsagePercent}%` }}
                            />
                        </div>
                        <p className="text-sm text-gray-600">
                            {formatMB(systemInfo.diskInfo.usedDiskMB)} / {formatMB(systemInfo.diskInfo.totalDiskMB)}
                        </p>
                    </div>

                    {/* Uptime */}
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                <Clock className="w-5 h-5 text-blue-600" />
                            </div>
                            <Zap className="w-6 h-6 text-green-500" />
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-1">Server Uptime</h3>
                        <p className="text-2xl font-bold text-gray-900">
                            {formatUptime(systemInfo.processUptimeSeconds)}
                        </p>
                    </div>
                </div>

                {/* Detailed Information */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Memory Details */}
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                                <Database className="w-5 h-5 text-indigo-600" />
                            </div>
                            <h2 className="text-xl font-semibold text-gray-900">Memory Details</h2>
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                <span className="font-medium text-gray-700">Total RAM</span>
                                <span className="text-gray-900 font-semibold">
                                    {formatMB(systemInfo.totalRAMMB)}
                                </span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                <span className="font-medium text-gray-700">Used RAM</span>
                                <span className="text-gray-900 font-semibold">
                                    {formatMB(systemInfo.usedRAMMB)}
                                </span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                <span className="font-medium text-gray-700">Free RAM</span>
                                <span className="text-gray-900 font-semibold">
                                    {formatMB(systemInfo.freeRAMMB)}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Process Memory */}
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                                <BarChart3 className="w-5 h-5 text-emerald-600" />
                            </div>
                            <h2 className="text-xl font-semibold text-gray-900">Process Memory</h2>
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                <span className="font-medium text-gray-700">RSS Memory</span>
                                <span className="text-gray-900 font-semibold">
                                    {formatMB(systemInfo.processMemoryUsage.rssMB)}
                                </span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                <span className="font-medium text-gray-700">Heap Total</span>
                                <span className="text-gray-900 font-semibold">
                                    {formatMB(systemInfo.processMemoryUsage.heapTotalMB)}
                                </span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                <span className="font-medium text-gray-700">Heap Used</span>
                                <span className="text-gray-900 font-semibold">
                                    {formatMB(systemInfo.processMemoryUsage.heapUsedMB)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* System Status Summary */}
                <div className="mt-6 bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">System Status Summary</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex items-center space-x-3">
                            <div className={`w-3 h-3 rounded-full ${ramUsagePercent < 80 ? 'bg-green-500' : ramUsagePercent < 90 ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
                            <span className="text-sm text-gray-600">
                                Memory: {ramUsagePercent < 80 ? 'Healthy' : ramUsagePercent < 90 ? 'Warning' : 'Critical'}
                            </span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className={`w-3 h-3 rounded-full ${diskUsagePercent < 80 ? 'bg-green-500' : diskUsagePercent < 90 ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
                            <span className="text-sm text-gray-600">
                                Disk: {diskUsagePercent < 80 ? 'Healthy' : diskUsagePercent < 90 ? 'Warning' : 'Critical'}
                            </span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            <span className="text-sm text-gray-600">Server: Online</span>
                        </div>
                    </div>
                </div>

                {/* Last Updated */}
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-500">
                        Last updated: {new Date().toLocaleString()}
                        {autoRefresh && " • Auto-refreshing every 30 seconds"}
                        {isFetching && " • Updating..."}
                    </p>
                </div>
            </div>
        </div>
    );
};
