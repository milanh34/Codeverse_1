import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  LayoutDashboard,
  User,
  FolderPlus,
  IndianRupee,
  Users,
  HandHeart,
  Share2,
  Calendar,
  Menu,
  Sun,
  Moon,
  X,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  // Set default to light mode (false)
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Links with enhanced metadata
  const sidebarLinks = [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      path: "/ngo/",
      description: "Overview of your NGO activities",
    },
    {
      icon: User,
      label: "Profile",
      path: "/ngo/profile",
      description: "Manage your organization profile",
    },
    {
      icon: FolderPlus,
      label: "Projects",
      path: "/ngo/newprojects",
      description: "Create and manage projects",
    },
    // {
    //   icon: IndianRupee,
    //   label: "Funds",
    //   path: "/ngo/funds",
    //   description: "Track donations and expenditures",
    // },
    {
      icon: Users,
      label: "Staff Recruitment",
      path: "/ngo/staffrecruitment",
      description: "Hire new team members",
    },
    {
      icon: HandHeart,
      label: "Volunteer",
      path: "/ngo/volunteer",
      description: "Manage volunteer programs",
    },
    {
      icon: Share2,
      label: "Social",
      path: "/ngo/social",
      description: "Connect with supporters",
    },
    {
      icon: Calendar,
      label: "Post Event",
      path: "/ngo/postevent",
      description: "Schedule and share events",
    },
  ];

  useEffect(() => {
    // Update theme in localStorage
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  // Initial animation effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoad(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Collapse sidebar when navigating to a new page
  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
    setIsCollapsed(true);
  };

  // Check if current path matches link path
  const isActive = (path) => {
    return (
      location.pathname === path ||
      (path !== "/ngo/" && location.pathname.startsWith(path))
    );
  };

  return (
    <>
      {/* Mobile Menu Button with Animation */}
      <Button
        variant="ghost"
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-md transition-all duration-300 hover:shadow-lg border border-gray-200 dark:border-gray-800"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? (
          <X className="h-6 w-6 text-green-600 dark:text-green-400 transition-transform duration-300 rotate-90 hover:rotate-180" />
        ) : (
          <Menu className="h-6 w-6 text-green-600 dark:text-green-400 transition-transform duration-300 hover:rotate-90" />
        )}
      </Button>

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-screen
          bg-white dark:bg-gray-950
          border-r border-gray-200 dark:border-gray-800
          transition-all duration-500 ease-in-out
          shadow-lg dark:shadow-gray-900/30
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          ${isCollapsed ? "md:w-20" : "md:w-72"}
          ${isMobileMenuOpen ? "w-72" : "w-0"}
          z-40 overflow-hidden
          ${isInitialLoad ? "animate-slideInLeft" : ""}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo Area with Animation */}
          <div className={`p-6 border-b border-gray-100 dark:border-gray-800 transition-all duration-300 ${isCollapsed ? "flex justify-center p-4" : ""}`}>
            <div className={`flex items-center ${isCollapsed ? "justify-center" : "space-x-2"}`}>
              <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-green-400 to-green-600 flex items-center justify-center text-white font-bold animate-pulse">
                CV
              </div>
              {!isCollapsed && (
                <h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-500 dark:from-green-400 dark:to-emerald-300 bg-clip-text text-transparent transition-all duration-300">
                  CodeVerse
                </h2>
              )}
            </div>
          </div>

          {/* Collapse Toggle Button */}
          <Button
            variant="ghost"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="absolute top-4 right-2 p-1 h-8 w-8 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 hidden md:flex items-center justify-center transition-all duration-300"
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4 text-green-600 dark:text-green-400" />
            ) : (
              <ChevronLeft className="h-4 w-4 text-green-600 dark:text-green-400" />
            )}
          </Button>

          {/* Navigation Links with Hover Effects */}
          <ScrollArea className={`flex-1 ${isCollapsed ? "px-2" : "px-3"} py-4`}>
            <div className="space-y-2">
              {sidebarLinks.map((link, index) => {
                const active = isActive(link.path);
                const delay = `delay-${index * 100}`;

                return (
                  <div
                    key={index}
                    className={`
                      relative 
                      ${isInitialLoad ? "opacity-0 animate-fadeInSlideUp" : "opacity-100"}
                    `}
                    style={{ animationDelay: `${index * 100}ms` }}
                    onMouseEnter={() => setHoveredItem(index)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <Button
                      variant={active ? "default" : "ghost"}
                      className={`
                        w-full justify-start gap-3
                        transition-all duration-300 ease-in-out
                        group relative overflow-hidden
                        ${isCollapsed ? "p-3" : "py-4 px-4"}
                        ${
                          active
                            ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                            : "hover:bg-green-50 dark:hover:bg-green-950 text-gray-700 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400"
                        }
                      `}
                      onClick={() => handleNavigation(link.path)}
                    >
                      {/* Animated background effect on hover */}
                      <div className={`
                        absolute inset-0 bg-gradient-to-r from-green-500/10 to-green-600/10
                        transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500
                        ${active ? "translate-x-0" : ""}
                      `} />

                      {/* Active indicator */}
                      {active && (
                        <div className="absolute left-0 top-0 w-1 h-full bg-green-600 dark:bg-green-400 rounded-r" />
                      )}

                      <link.icon
                        className={`
                        ${isCollapsed ? "h-6 w-6" : "h-5 w-5"}
                        transition-all duration-300
                        ${
                          active
                            ? "text-green-600 dark:text-green-400"
                            : "text-gray-500 dark:text-gray-400 group-hover:text-green-600 dark:group-hover:text-green-400"
                        }
                        ${active && !isCollapsed ? "animate-bounce" : ""}
                        ${hoveredItem === index ? "scale-110" : "scale-100"}
                      `}
                      />

                      {!isCollapsed && (
                        <div className="flex flex-col items-start flex-1 overflow-hidden">
                          <span className="font-medium truncate whitespace-nowrap">{link.label}</span>

                          {/* Description tooltip on hover */}
                          <span
                            className={`
                            text-xs text-gray-500 dark:text-gray-400
                            transition-all duration-300
                            ${hoveredItem === index ? "opacity-100 max-h-10" : "opacity-0 max-h-0"}
                          `}
                          >
                            {link.description}
                          </span>
                        </div>
                      )}

                      {!isCollapsed && (
                        <ChevronRight
                          className={`
                          h-4 w-4 ml-auto transition-transform duration-300
                          ${active ? "text-green-600 dark:text-green-400" : "text-gray-400"}
                          ${hoveredItem === index ? "translate-x-0 opacity-100 rotate-90" : "-translate-x-4 opacity-0"}
                        `}
                        />
                      )}
                    </Button>

                    {/* Tooltip for collapsed mode */}
                    {isCollapsed && hoveredItem === index && (
                      <div className="absolute left-full top-0 ml-2 bg-gray-900 dark:bg-gray-800 text-white p-2 rounded-md shadow-lg z-50 whitespace-nowrap transform transition-all duration-300 opacity-100 scale-100 origin-left">
                        <div className="font-medium">{link.label}</div>
                        <div className="text-xs text-gray-300">{link.description}</div>
                        <div className="absolute left-0 top-1/2 transform -translate-x-full -translate-y-1/2">
                          <div className="border-8 border-transparent border-r-gray-900 dark:border-r-gray-800" />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </ScrollArea>

          {/* Theme Toggle with Animation */}
          <div className={`transition-all duration-300 ${isCollapsed ? "p-3" : "p-6"} border-t border-gray-200 dark:border-gray-800`}>
            <Button
              variant="outline"
              className={`
                ${isCollapsed ? "w-full p-2 aspect-square flex justify-center" : "w-full justify-between gap-2"}
                transition-all duration-300 hover:bg-green-50 dark:hover:bg-green-950 
                border-green-200 dark:border-green-800
              `}
              onClick={toggleTheme}
            >
              {!isCollapsed && (
                <span className="font-medium">
                  {isDarkMode ? "Light Mode" : "Dark Mode"}
                </span>
              )}
              <div className={`
                ${isCollapsed ? "" : "h-6 w-12"} 
                bg-gray-200 dark:bg-gray-700 rounded-full p-1 relative transition-colors duration-300
              `}>
                <div
                  className={`
                  absolute ${isCollapsed ? "inset-0 flex items-center justify-center" : "top-1 h-4 w-4"} 
                  rounded-full bg-white shadow-md
                  transition-all duration-500 ease-bounce
                  ${isDarkMode && !isCollapsed ? "translate-x-6" : !isDarkMode && !isCollapsed ? "translate-x-0" : ""}
                `}
                >
                  {isDarkMode ? (
                    <Moon className={`
                      ${isCollapsed ? "h-5 w-5" : "h-4 w-4"} 
                      text-blue-900
                      transition-all duration-300 animate-spin
                    `} />
                  ) : (
                    <Sun className={`
                      ${isCollapsed ? "h-5 w-5" : "h-4 w-4"} 
                      text-yellow-500 
                      transition-all duration-300 animate-spin
                    `} />
                  )}
                </div>
              </div>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Overlay with Fade Animation */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 md:hidden animate-fadeIn"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;