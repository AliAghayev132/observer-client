// React
import { useState } from 'react';
// React Router
import { Outlet } from "react-router";
// Components
import { Sidebar } from "./Sidebar/Sidebar";

export const AdminLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [activeItem, setActiveItem] = useState('category');

    const handleSidebarToggle = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const handleItemClick = (item) => {
        setActiveItem(item.id);

        if (item.id === 'logout') {
            console.log('Logging out...');
            return;
        }

        console.log('Navigating to:', item.path);

        if (window.innerWidth < 1024) {
            setSidebarOpen(false);
        }
    };

    return (
        <div className="flex h-screen bg-gray-50 font-inter">
            <Sidebar
                isOpen={sidebarOpen}
                onToggle={handleSidebarToggle}
                activeItem={activeItem}
                onItemClick={handleItemClick}
            />

            <div className="flex-1 overflow-hidden">
                <main className="h-full overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};
