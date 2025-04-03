
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  FolderPlus, 
  Files, 
  FileCheck, 
  Settings, 
  Users,
  ChevronLeft,
  ChevronRight,
  BookOpen
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";

type SidebarItem = {
  title: string;
  path: string;
  icon: React.ReactNode;
  role: 'all' | 'user' | 'admin';
};

const Sidebar = () => {
  const location = useLocation();
  const { user } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth < 1024) {
        setCollapsed(true);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const sidebarItems: SidebarItem[] = [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
      role: 'user',
    },
    {
      title: "Submit Project",
      path: "/submit",
      icon: <FolderPlus className="w-5 h-5" />,
      role: 'user',
    },
    {
      title: "My Projects",
      path: "/projects",
      icon: <Files className="w-5 h-5" />,
      role: 'user',
    },
    {
      title: "Admin Dashboard",
      path: "/admin/dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
      role: 'admin',
    },
    {
      title: "Review Projects",
      path: "/admin/projects",
      icon: <FileCheck className="w-5 h-5" />,
      role: 'admin',
    },
    {
      title: "Manage Classes",
      path: "/admin/classes",
      icon: <BookOpen className="w-5 h-5" />,
      role: 'admin',
    },
    {
      title: "Manage Users",
      path: "/admin/users",
      icon: <Users className="w-5 h-5" />,
      role: 'admin',
    },
    {
      title: "Settings",
      path: "/settings",
      icon: <Settings className="w-5 h-5" />,
      role: 'all',
    },
  ];

  const filteredItems = sidebarItems.filter(
    (item) => item.role === 'all' || (user?.role && item.role === user.role)
  );

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside
      className={cn(
        "fixed left-0 top-16 z-20 h-[calc(100vh-4rem)] bg-sidebar border-r border-gray-200 transition-all duration-300",
        collapsed ? "w-[70px]" : "w-[240px]"
      )}
    >
      <div className="flex flex-col h-full">
        <div className="p-4 flex justify-end">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className="h-8 w-8 text-sidebar-foreground"
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>

        <div className="flex-1 py-4 overflow-y-auto">
          <nav className="px-2 space-y-1">
            {filteredItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center py-2 px-3 rounded-md text-sm font-medium",
                  isActive(item.path)
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  collapsed && "justify-center px-2"
                )}
              >
                <span className="flex-shrink-0">{item.icon}</span>
                {!collapsed && <span className="ml-3">{item.title}</span>}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
