// src/hooks/useSidebar.jsx
import { useState, useEffect, createContext, useContext } from 'react';

// Create Sidebar Context
const SidebarContext = createContext();

// Sidebar Provider Component
export const SidebarProvider = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Close mobile menu on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleMobileMenu = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileOpen(false);
  };

  const getSidebarWidth = () => {
    return isCollapsed ? 64 : 240; // 16 * 4 = 64px (w-16), 60 * 4 = 240px (w-60)
  };

  const getSidebarClasses = () => {
    return isCollapsed ? 'w-16' : 'w-60';
  };

  const getMainContentClasses = () => {
    return isCollapsed ? 'lg:ml-16' : 'lg:ml-60';
  };

  const getHeaderClasses = () => {
    const leftPadding = isCollapsed ? 'lg:pl-16' : 'lg:pl-60';
    const width = isCollapsed ? 'lg:w-[calc(100%-4rem)]' : 'lg:w-[calc(100%-15rem)]';
    return `${leftPadding} ${width}`;
  };

  const value = {
    isCollapsed,
    isMobileOpen,
    toggleCollapse,
    toggleMobileMenu,
    closeMobileMenu,
    getSidebarWidth,
    getSidebarClasses,
    getMainContentClasses,
    getHeaderClasses
  };

  return (
    <SidebarContext.Provider value={value}>
      {children}
    </SidebarContext.Provider>
  );
};

// Custom hook to use sidebar context
export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
};

export default useSidebar;