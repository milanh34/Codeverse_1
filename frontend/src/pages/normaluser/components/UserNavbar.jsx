import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Bell,
  Search,
  Menu,
  X,
  Heart,
  ChevronDown,
  Globe,
  Users,
  BarChart3,
  Leaf,
  LogOut,
  Settings,
  History,
  User,
} from "lucide-react";

export default function UserProfileNavbar() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const notificationRef = useRef(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Don't close if clicking inside the dropdown
      if (dropdownRef.current && dropdownRef.current.contains(event.target)) {
        return;
      }
      // Don't close if clicking inside the notification panel
      if (notificationRef.current && notificationRef.current.contains(event.target)) {
        return;
      }
      setActiveDropdown(null);
      setNotificationsOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = (index, e) => {
    e.stopPropagation();
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  const toggleNotifications = (e) => {
    e.stopPropagation();
    setNotificationsOpen(!notificationsOpen);
    setActiveDropdown(null);
  };

  const navItems = [
    {
      name: "Home",
      hasDropdown: false,
      icon: <Leaf size={18} />,
      path: "/user",
    },
    {
      name: "Projects",
      hasDropdown: false,
      icon: <BarChart3 size={18} />,
      path: "/user/projects",
    },
    {
      name: "Social",
      hasDropdown: false,
      icon: <Globe size={18} />,
      path: "/user/social",
    },
    {
      name: "Volunteer",
      hasDropdown: false,
      icon: <Users size={18} />,
      path: "/user/volunteer",
    },
  ];

  // Modified navigation handler
  const handleNavigation = (path, e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation(); // Prevent dropdown from closing before navigation
    }
    navigate(path);
    setIsOpen(false);
    setActiveDropdown(null);
  };

  // Direct link handler - this is what we're adding
  const handleLinkClick = (path) => {
    navigate(path);
    setActiveDropdown(null);
  };
  

  return (
    <div className="w-full fixed top-0 left-0 z-50">
      {/* Main Navbar */}
      <nav
        className={`relative flex items-center justify-between px-6 py-4 w-full transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-sm shadow-md border-b border-[#8df1e2]/30"
            : "bg-gradient-to-r from-[#8df1e2]/10 to-white/90 backdrop-blur-sm"
        }`}
      >
        {/* Left - Logo */}
        <div className="flex items-center space-x-2 cursor-pointer">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2L4 6V18L12 22L20 18V6L12 2Z"
              fill="#8df1e2"
              stroke="#166856"
              strokeWidth="1.5"
            />
            <path
              d="M12 6V16M12 16L16 14M12 16L8 14"
              stroke="#0d3320"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          <span className="text-xl font-bold text-[#166856]">
            Eco<span className="text-[#0d3320]">Impact</span>
          </span>
        </div>

        {/* Center - Search Bar (desktop) */}
        <div className="relative w-64 hidden lg:block">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="text-[#166856]/60" size={18} />
          </div>
          <input
            type="text"
            placeholder="Search initiatives..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-4 py-2 rounded-full w-full bg-white shadow-sm text-[#0d3320] border border-[#8df1e2]/50 focus:outline-none focus:ring-2 focus:ring-[#166856]/60 transition-all"
          />
        </div>

        {/* Right - Links & Icons (desktop) */}
        <div className="hidden lg:flex items-center space-x-6">
          <nav className="flex space-x-6 text-[#0d3320] font-medium">
            {navItems.map((item, index) => (
              <div key={index} className="relative group">
                <div
                  className="flex items-center space-x-1 cursor-pointer py-2"
                  onClick={(e) =>
                    item.hasDropdown
                      ? toggleDropdown(index, e)
                      : handleNavigation(item.path, e)
                  }
                >
                  <span className="hover:text-[#166856] transition-all">
                    {item.name}
                  </span>
                  {item.hasDropdown && (
                    <ChevronDown
                      size={16}
                      className={`transition-transform duration-300 ${activeDropdown === index ? "rotate-180 text-[#166856]" : ""}`}
                    />
                  )}
                </div>

                {/* Dropdown Menu */}
                {item.hasDropdown && activeDropdown === index && (
                  <div className="absolute top-full left-0 mt-1 w-56 bg-white/95 backdrop-blur-sm rounded-md shadow-lg z-10 py-1 border border-[#8df1e2]/50 animate-in fade-in-80 zoom-in-95">
                    {item.dropdownItems.map((dropdownItem, dropIdx) => (
                      <a
                        key={dropIdx}
                        href="#"
                        onClick={(e) => e.stopPropagation()}
                        className="block px-4 py-3 text-sm text-[#0d3320] hover:bg-[#8df1e2]/10 hover:text-[#166856] transition-colors"
                      >
                        {dropdownItem}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            {/* Notification Icon */}
            <div className="relative" onClick={toggleNotifications}>
              <div className="cursor-pointer p-2 hover:bg-[#8df1e2]/20 rounded-full transition-all">
                <Bell
                  className="text-[#0d3320] hover:text-[#166856]"
                  size={20}
                />
                <span className="absolute top-0 right-0 bg-red-500 rounded-full w-4 h-4 flex items-center justify-center text-white text-xs">
                  2
                </span>
              </div>

              {/* Notifications Dropdown */}
              {notificationsOpen && (
                <div 
                  ref={notificationRef}
                  className="absolute right-0 mt-2 w-80 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg z-10 border border-[#8df1e2]/50 animate-in fade-in-80 zoom-in-95"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between p-3 border-b border-[#8df1e2]/30">
                    <h3 className="font-medium text-[#0d3320]">
                      Notifications
                    </h3>
                    <button className="text-xs text-[#166856] hover:text-[#166856]/80 transition-colors">
                      Mark all as read
                    </button>
                  </div>
                  <div className="max-h-60 overflow-y-auto">
                    <div className="p-3 border-b border-[#8df1e2]/30 hover:bg-[#8df1e2]/10 transition-colors cursor-pointer">
                      <div className="flex items-start">
                        <div className="h-8 w-8 rounded-full bg-[#8df1e2]/20 flex items-center justify-center mr-3">
                          <Leaf className="h-4 w-4 text-[#166856]" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-[#0d3320]">
                            New reforestation project launched
                          </p>
                          <p className="text-xs text-[#166856]/70 mt-1">
                            15 minutes ago
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 hover:bg-[#8df1e2]/10 transition-colors cursor-pointer">
                      <div className="flex items-start">
                        <div className="h-8 w-8 rounded-full bg-[#8df1e2]/20 flex items-center justify-center mr-3">
                          <Heart className="h-4 w-4 text-[#166856]" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-[#0d3320]">
                            Your donation has been processed
                          </p>
                          <p className="text-xs text-[#166856]/70 mt-1">
                            Yesterday
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 border-t border-[#8df1e2]/30">
                    <button className="w-full text-center text-sm text-[#166856] hover:text-[#166856]/80 transition-colors">
                      View all notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* User Profile Dropdown */}
            <div className="relative">
              <div
                className="flex items-center space-x-2 cursor-pointer hover:bg-[#8df1e2]/20 rounded-full p-1.5 transition-all"
                onClick={(e) => toggleDropdown("profile", e)}
              >
                <div className="h-8 w-8 bg-[#166856] text-white rounded-full flex items-center justify-center overflow-hidden">
                  <User size={16} />
                </div>
                <ChevronDown
                  size={16}
                  className={`text-[#0d3320] transition-transform duration-300 ${activeDropdown === "profile" ? "rotate-180 text-[#166856]" : ""}`}
                />
              </div>

              {/* Profile Dropdown */}
              {activeDropdown === "profile" && (
                <div 
                  ref={dropdownRef}
                  className="absolute right-0 mt-2 w-56 bg-white/95 backdrop-blur-sm rounded-md shadow-lg z-10 py-1 border border-[#8df1e2]/50 animate-in fade-in-80 zoom-in-95"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="px-4 py-3 border-b border-[#8df1e2]/30">
                    <p className="text-sm font-medium text-[#0d3320]">
                      Sarah Johnson
                    </p>
                    <p className="text-xs text-[#166856]/70 mt-1">
                      sarah.j@example.com
                    </p>
                  </div>
                  
                  <div 
                    className="flex items-center px-4 py-3 text-sm text-[#0d3320] hover:bg-[#8df1e2]/10 hover:text-[#166856] transition-colors cursor-pointer"
                    onClick={() => handleLinkClick('/user/settings')}
                  >
                    <Settings size={16} className="mr-2" />
                    Account Settings
                  </div>
                  
                  <div 
                    className="flex items-center px-4 py-3 text-sm text-[#0d3320] hover:bg-[#8df1e2]/10 hover:text-[#166856] transition-colors cursor-pointer"
                    onClick={() => handleLinkClick('/user/donationhistory')}
                  >
                    <History size={16} className="mr-2" />
                    Donation History
                  </div>
                  
                  <div 
                    className="flex items-center px-4 py-3 text-sm text-[#0d3320] hover:bg-[#8df1e2]/10 hover:text-[#166856] transition-colors cursor-pointer"
                    onClick={() => handleLinkClick('/user/volunteerhistory')}
                  >
                    <Users size={16} className="mr-2" />
                    Volunteer History
                  </div>
                  
                  <div className="border-t border-[#8df1e2]/30 mt-1">
                    <div 
                      className="flex items-center px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                      onClick={() => handleLinkClick('/')}
                    >
                      <LogOut size={16} className="mr-2" />
                      Logout
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile menu button */}
        <div className="lg:hidden flex items-center space-x-4">
          {/* Mobile notification icon */}
          <div className="relative" onClick={toggleNotifications}>
            <div className="cursor-pointer p-2 hover:bg-[#8df1e2]/20 rounded-full transition-all">
              <Bell className="text-[#0d3320]" size={18} />
              <span className="absolute top-0 right-0 bg-red-500 rounded-full w-3 h-3 flex items-center justify-center text-white text-xs">
                2
              </span>
            </div>
          </div>

          {/* Mobile profile icon */}
          <div className="h-8 w-8 bg-[#166856] text-white rounded-full flex items-center justify-center">
            <User size={16} />
          </div>

          <button
            className="text-[#0d3320] p-2 hover:bg-[#8df1e2]/20 rounded-md transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {isOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-sm shadow-lg max-h-screen overflow-y-auto animate-in slide-in-from-top-5">
          <div className="px-4 pt-4 pb-6">
            {/* Mobile Search */}
            <div className="relative w-full mb-6">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="text-[#166856]/60" size={18} />
              </div>
              <input
                type="text"
                placeholder="Search initiatives..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-lg w-full bg-[#8df1e2]/5 text-[#0d3320] border border-[#8df1e2]/30 focus:outline-none focus:ring-2 focus:ring-[#166856]/60 transition-all"
              />
            </div>

            {/* User Profile Card (Mobile) */}
            <div className="bg-[#8df1e2]/10 rounded-lg p-4 mb-4 flex items-center">
              <div className="h-12 w-12 bg-[#166856] text-white rounded-full flex items-center justify-center mr-3">
                <User size={24} />
              </div>
              <div>
                <p className="font-medium text-[#0d3320]">Sarah Johnson</p>
                <p className="text-xs text-[#166856]/70">sarah.j@example.com</p>
              </div>
            </div>

            {/* Mobile Navigation */}
            <nav className="space-y-1 divide-y divide-[#8df1e2]/30">
              {navItems.map((item, index) => (
                <div key={index} className="py-2">
                  <div
                    className="flex items-center justify-between px-2 py-3 rounded-md hover:bg-[#8df1e2]/10 cursor-pointer"
                    onClick={() => handleLinkClick(item.path)}
                  >
                    <div className="flex items-center gap-2">
                      {item.icon}
                      <span className="font-medium text-[#0d3320]">
                        {item.name}
                      </span>
                    </div>
                    {item.hasDropdown && (
                      <ChevronDown
                        size={16}
                        className={`text-[#166856]/70 transition-transform duration-300 ${activeDropdown === index ? "rotate-180 text-[#166856]" : ""}`}
                      />
                    )}
                  </div>

                  {/* Mobile Dropdown */}
                  {item.hasDropdown && activeDropdown === index && (
                    <div className="mt-1 mb-2 space-y-1 bg-[#8df1e2]/5 rounded-md overflow-hidden">
                      {item.dropdownItems.map((dropdownItem, dropIdx) => (
                        <a
                          key={dropIdx}
                          href="#"
                          className="block px-8 py-3 text-sm text-[#0d3320] hover:bg-[#8df1e2]/20 hover:text-[#166856] transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {dropdownItem}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Profile Options (Mobile) */}
            <div className="mt-6 pt-4 border-t border-[#8df1e2]/30 space-y-1">
              <h3 className="text-sm font-medium text-[#0d3320] px-2 mb-2">
                Profile
              </h3>
              
              <div 
                className="flex items-center px-2 py-3 rounded-md hover:bg-[#8df1e2]/10 text-sm text-[#0d3320] cursor-pointer"
                onClick={() => handleLinkClick('/user/settings')}
              >
                <Settings size={16} className="mr-2 text-[#166856]" />
                Account Settings
              </div>
              
              <div 
                className="flex items-center px-2 py-3 rounded-md hover:bg-[#8df1e2]/10 text-sm text-[#0d3320] cursor-pointer"
                onClick={() => handleLinkClick('/user/donationhistory')}
              >
                <History size={16} className="mr-2 text-[#166856]" />
                Donation History
              </div>
              
              <div 
                className="flex items-center px-2 py-3 rounded-md hover:bg-[#8df1e2]/10 text-sm text-[#0d3320] cursor-pointer"
                onClick={() => handleLinkClick('/user/volunteerhistory')}
              >
                <Users size={16} className="mr-2 text-[#166856]" />
                Volunteer History
              </div>

              <div className="pt-4 mt-4 border-t border-[#8df1e2]/30">
                <div 
                  className="flex items-center px-2 py-3 rounded-md hover:bg-red-50 text-sm text-red-600 cursor-pointer"
                  onClick={() => handleLinkClick('/')}
                >
                  <LogOut size={16} className="mr-2" />
                  Logout
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}