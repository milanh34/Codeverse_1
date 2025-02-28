import React, { useState, useEffect } from "react";
import { Bell, Search, Menu, X, Heart, ChevronDown, Globe } from "lucide-react";

export default function NGONavbar() {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [scrolled, setScrolled] = useState(false);

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

  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  const navItems = [
    { 
      name: "Home", 
      hasDropdown: false 
    },
    { 
      name: "Our Causes", 
      hasDropdown: true,
      dropdownItems: ["Education", "Clean Water", "Health", "Environment", "Women Empowerment"]
    },
    { 
      name: "Projects", 
      hasDropdown: true,
      dropdownItems: ["Current Initiatives", "Success Stories", "Upcoming Projects", "Impact Reports"]
    },
    { 
      name: "Get Involved", 
      hasDropdown: true,
      dropdownItems: ["Volunteer", "Donate", "Fundraise", "Partner With Us"]
    },
    {
      name: "About Us",
      hasDropdown: false
    }
  ];

  return (
    <div className="w-full fixed top-0 left-0 z-50">
      {/* Main Navbar */}
      <nav className={`relative flex items-center justify-between px-6 py-4 w-full transition-all duration-300 ${
        scrolled 
          ? "bg-white shadow-md" 
          : "bg-[#e6f4f2]"
      }`}>
        {/* Left - Logo */}
        <div className="flex items-center space-x-2 cursor-pointer">
          <Heart className="text-teal-600" size={24} />
          <span className="text-xl font-bold text-teal-700">ImpactNow</span>
        </div>
        
        {/* Center - Search Bar (desktop) */}
        <div className="relative w-64 hidden lg:block">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="text-gray-500" size={18} />
          </div>
          <input
            type="text"
            placeholder="Search causes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-4 py-2 rounded-full w-full bg-white shadow-sm text-gray-800 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all"
          />
        </div>
        
        {/* Right - Links & Icons (desktop) */}
        <div className="hidden lg:flex items-center space-x-6">
          <nav className="flex space-x-6 text-gray-700 font-medium">
            {navItems.map((item, index) => (
              <div key={index} className="relative group">
                <div 
                  className="flex items-center space-x-1 cursor-pointer py-2"
                  onClick={() => item.hasDropdown && toggleDropdown(index)}
                >
                  <span className="hover:text-teal-700 transition-all">{item.name}</span>
                  {item.hasDropdown && (
                    <ChevronDown size={16} className={`transition-transform ${activeDropdown === index ? 'rotate-180 text-teal-700' : ''}`} />
                  )}
                </div>
                
                {/* Dropdown Menu */}
                {item.hasDropdown && activeDropdown === index && (
                  <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-md shadow-lg z-10 py-1 border border-gray-100">
                    {item.dropdownItems.map((dropdownItem, dropIdx) => (
                      <a
                        key={dropIdx}
                        href="#"
                        className="block px-4 py-3 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-700 transition-colors"
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
            {/* Donation Button */}
            <button className="bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-4 rounded-full transition-all shadow-sm">
              Donate Now
            </button>
            
            {/* Notification Icon */}
            <div className="relative cursor-pointer p-2 hover:bg-teal-100 rounded-full transition-all">
              <Bell className="text-gray-600 hover:text-teal-700" size={20} />
              <span className="absolute top-0 right-0 bg-red-500 rounded-full w-4 h-4 flex items-center justify-center text-white text-xs">2</span>
            </div>
            
            {/* Language Selector */}
            <div className="flex items-center space-x-1 cursor-pointer hover:bg-teal-100 rounded-full p-2 transition-all">
              <Globe size={18} className="text-gray-600" />
              <span className="text-sm font-medium text-gray-700">EN</span>
            </div>
          </div>
        </div>
        
        {/* Mobile menu button */}
        <div className="lg:hidden flex items-center space-x-4">
          <button className="bg-teal-600 hover:bg-teal-700 text-white font-medium py-1.5 px-3 rounded-full transition-all shadow-sm text-sm">
            Donate
          </button>
          
          <button 
            className="text-gray-700 p-2 hover:bg-teal-100 rounded-md transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>
      
      {/* Mobile menu */}
      {isOpen && (
        <div className="lg:hidden bg-white shadow-lg max-h-screen overflow-y-auto">
          <div className="px-4 pt-4 pb-6">
            {/* Mobile Search */}
            <div className="relative w-full mb-6">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="text-gray-500" size={18} />
              </div>
              <input
                type="text"
                placeholder="Search causes..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-lg w-full bg-gray-50 text-gray-800 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all"
              />
            </div>
            
            {/* Mobile Navigation */}
            <nav className="space-y-1 divide-y divide-gray-100">
              {navItems.map((item, index) => (
                <div key={index} className="py-2">
                  <div 
                    className="flex items-center justify-between px-2 py-3 rounded-md hover:bg-teal-50 cursor-pointer"
                    onClick={() => item.hasDropdown && toggleDropdown(index)}
                  >
                    <span className="font-medium text-gray-800">{item.name}</span>
                    {item.hasDropdown && (
                      <ChevronDown 
                        size={16} 
                        className={`text-gray-500 transition-transform ${activeDropdown === index ? 'rotate-180 text-teal-600' : ''}`} 
                      />
                    )}
                  </div>
                  
                  {/* Mobile Dropdown */}
                  {item.hasDropdown && activeDropdown === index && (
                    <div className="mt-1 mb-2 space-y-1 bg-gray-50 rounded-md overflow-hidden">
                      {item.dropdownItems.map((dropdownItem, dropIdx) => (
                        <a
                          key={dropIdx}
                          href="#"
                          className="block px-8 py-3 text-sm text-gray-600 hover:bg-teal-100 hover:text-teal-700 transition-colors"
                        >
                          {dropdownItem}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
            
            {/* Mobile Footer */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              {/* Language Selector */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Globe size={18} className="text-gray-600" />
                  <span className="text-sm font-medium text-gray-700">Choose Language</span>
                </div>
                <select className="bg-gray-50 border border-gray-200 rounded-md text-sm py-1 px-2">
                  <option>English</option>
                  <option>Español</option>
                  <option>Français</option>
                </select>
              </div>
              
              {/* Social Impact Stats */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-teal-50 p-3 rounded-lg text-center">
                  <div className="text-teal-700 font-bold text-xl">1.2M</div>
                  <div className="text-xs text-gray-600">Lives Impacted</div>
                </div>
                <div className="bg-teal-50 p-3 rounded-lg text-center">
                  <div className="text-teal-700 font-bold text-xl">43</div>
                  <div className="text-xs text-gray-600">Countries</div>
                </div>
              </div>
              
              {/* CTA Button */}
              <button className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 px-4 rounded-md transition-all shadow-sm">
                Support Our Mission
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}