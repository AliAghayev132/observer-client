import {
  X,
  Menu,
  Crown,
  Users,
  LogOut,
  Settings,
  LayoutDashboard,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const sidebarItems = [
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

  const handleItemClick = (path: string, id: string) => {
    if (id === "logout") {
      // TODO: logout mutation çağırabilirsin
      console.log("Logging out...");
      return;
    }

    navigate(path);
    onToggle(); // mobilde sidebar kapanır
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
        fixed lg:static inset-y-0 left-0 z-50 w-72 bg-white border-r border-gray-200 
        transform transition-transform duration-300 ease-in-out lg:translate-x-0
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 bg-primary-500 text-white">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
              <LayoutDashboard size={24} />
            </div>
            <span className="text-xl font-semibold">Admin Panel</span>
          </div>

          <button
            className="lg:hidden p-2 rounded-lg hover:bg-white hover:bg-opacity-10"
            onClick={onToggle}
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {sidebarItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = location.pathname.startsWith(item.path);

              return (
                <li key={item.id}>
                  <button
                    className={`
                      w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left
                      transition-colors duration-200 font-medium
                      ${
                        isActive
                          ? "bg-primary-50 text-primary-700 border-r-4 border-primary-500"
                          : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                      }
                    `}
                    onClick={() => handleItemClick(item.path, item.id)}
                  >
                    <IconComponent
                      size={20}
                      className={isActive ? "text-primary-600" : "text-gray-500"}
                    />
                    <span>{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          <button
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left
                     text-red-600 hover:bg-red-50 transition-colors duration-200 font-medium"
            onClick={() => handleItemClick("", "logout")}
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Toggle Button */}
      <button
        className="fixed top-4 left-4 z-50 lg:hidden bg-primary-500 text-white p-3 rounded-lg shadow-lg"
        onClick={onToggle}
      >
        <Menu size={24} />
      </button>
    </>
  );
};
