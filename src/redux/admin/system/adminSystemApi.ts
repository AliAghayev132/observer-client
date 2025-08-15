// redux/slices/admin/adminSystemApi.ts
import { createApi } from "@reduxjs/toolkit/query/react";

import { adminBaseQueryWithReauth } from "../api/adminBaseQueryWithReauth";

// System Info Types (matching your backend response)
export interface ProcessMemoryUsage {
  rssMB: string;
  heapTotalMB: string;
  heapUsedMB: string;
}

export interface DiskInfo {
  totalDiskMB: string;
  freeDiskMB: string;
  usedDiskMB: string;
}

export interface SystemInfo {
  cpuCount: number;
  cpuModel: string;
  totalRAMMB: string;
  freeRAMMB: string;
  usedRAMMB: string;
  processUptimeSeconds: string;
  processMemoryUsage: ProcessMemoryUsage;
  diskInfo: DiskInfo;
}

export interface SystemInfoResponse {
  success: boolean;
  data: SystemInfo;
  messages: string;
}

// API Error Response
export interface SystemApiError {
  success: boolean;
  message?: string;
  error?: string;
}

export const adminSystemApi = createApi({
  reducerPath: "adminSystemApi",
  baseQuery: adminBaseQueryWithReauth, // Uses automatic token refresh
  tagTypes: ["SystemInfo"],
  endpoints: (build) => ({
    // Get system information - matches your backend route
    getSystemInfo: build.query<SystemInfoResponse, void>({
      query: () => ({
        url: "/admin/system-info",
        method: "GET",
      }),
    }),
  }),
});

// Export hooks
export const { useGetSystemInfoQuery } = adminSystemApi;
