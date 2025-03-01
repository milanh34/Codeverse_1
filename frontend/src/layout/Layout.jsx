import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../pages/ngouser/components/Sidebar";

function Layout() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  // Use ResizeObserver to automatically detect sidebar width changes
  useEffect(() => {
    const sidebar = document.querySelector('[class*="md:w-72"], [class*="md:w-20"]');
    if (!sidebar) return;
    
    const observer = new ResizeObserver(entries => {
      for (const entry of entries) {
        // Check if width is close to collapsed width (80px) or expanded width (288px)
        const width = entry.contentRect.width;
        setIsCollapsed(width < 100); // If width is less than 100px, consider it collapsed
      }
    });
    
    observer.observe(sidebar);
    return () => observer.disconnect();
  }, []);
  
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      
      <main 
        className={`
          flex-1 
          overflow-auto 
          transition-all 
          duration-500 
          ease-in-out
          ${isCollapsed ? "md:ml-20" : "md:ml-72"}
        `}
      >
        <div className="container mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default Layout;