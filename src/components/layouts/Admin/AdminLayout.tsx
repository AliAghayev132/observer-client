// React
import { useState } from 'react';
// React Router
import { Outlet } from "react-router";
// Components
import { Sidebar } from "./Sidebar/Sidebar";

export const AdminLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleSidebarToggle = () => {
        setSidebarOpen(!sidebarOpen);
    };


    return (
        <div className="flex h-screen bg-gray-50 font-inter">
            <Sidebar
                isOpen={sidebarOpen}
                onToggle={handleSidebarToggle}
            />

            <div className="flex-1 overflow-hidden">
                <main className="h-full overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};
