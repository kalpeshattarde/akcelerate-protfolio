// /home/ubuntu/app/sales_compensation_dashboard/src/components/ui/Sidebar.jsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import useSidebar from 'hooks/useSidebar.jsx';
import Icon from '../AppIcon';

const Sidebar = () => {
  const {
    isCollapsed,
    isMobileOpen,
    toggleCollapse,
    toggleMobileMenu,
    closeMobileMenu,
    getSidebarClasses
  } = useSidebar();
  
  const [systemStatus, setSystemStatus] = useState('healthy');
  const location = useLocation();
  const navigate = useNavigate();

  // Navigation data structure
  const navigationGroups = [
    {
      label: 'Analytics',
      items: [
        {
          path: '/sales-compensation-dashboard',
          label: 'Compensation Dashboard',
          icon: 'BarChart3',
          description: 'Overview of sales compensation metrics'
        },
        {
          path: '/representative-performance-analytics',
          label: 'Performance Analytics',
          icon: 'TrendingUp',
          description: 'Detailed performance analysis'
        }
      ]
    },
    {
      label: 'Scenario Management',
      items: [
        {
          path: '/scenario-management-center',
          label: 'Scenario Center',
          icon: 'GitBranch',
          description: 'Create and compare scenarios'
        },
        {
          path: '/bulk-operations-center',
          label: 'Bulk Operations',
          icon: 'Package',
          description: 'Mass data operations'
        }
      ]
    },
    {
      label: 'Administration',
      items: [
        {
          path: '/commission-structure-configuration',
          label: 'Commission Structure',
          icon: 'Settings',
          description: 'Configure commission rules'
        },
        {
          path: '/audit-trail-viewer',
          label: 'Audit Trail',
          icon: 'FileText',
          description: 'View system audit logs'
        }
      ]
    }
  ];

  // Handle navigation
  const handleNavigation = (path) => {
    navigate(path);
    closeMobileMenu();
  };

  // Check if current path is active
  const isActivePath = (path) => {
    return location.pathname === path;
  };

  // Close mobile menu on route change
  useEffect(() => {
    closeMobileMenu();
  }, [location.pathname, closeMobileMenu]);

  // Simulate system status updates
  useEffect(() => {
    const statusOptions = ['healthy', 'warning', 'error'];
    const interval = setInterval(() => {
      setSystemStatus(statusOptions[Math.floor(Math.random() * statusOptions.length)]);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = () => {
    switch (systemStatus) {
      case 'healthy': return 'text-neon-teal';
      case 'warning': return 'text-yellow-400';
      case 'error': return 'text-red-400';
      default: return 'text-text-muted-dark';
    }
  };

  const getStatusIcon = () => {
    switch (systemStatus) {
      case 'healthy': return 'CheckCircle';
      case 'warning': return 'AlertTriangle';
      case 'error': return 'XCircle';
      default: return 'Circle';
    }
  };

  return (
    <>
      {/* Mobile overlay with glassmorphism */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"
            onClick={closeMobileMenu}
          />
        )}
      </AnimatePresence>

      {/* Floating Sidebar with glassmorphism */}
      <motion.aside 
        className={`
          fixed top-0 left-0 h-full glass-morphism backdrop-blur-xl border-r border-glass-border z-50 transition-all duration-300 glow-indigo animate-float
          ${getSidebarClasses()}
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
        initial={{ x: -300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="flex flex-col h-full">
          {/* Logo and brand with neon glow */}
          <motion.div 
            className="flex items-center justify-between p-4 border-b border-glass-border"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className={`flex items-center transition-all duration-300 ${isCollapsed ? 'justify-center' : 'space-x-3'}`}>
              <motion.div 
                className="w-8 h-8 bg-gradient-neon rounded-xl flex items-center justify-center glow-indigo flex-shrink-0"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon name="DollarSign" size={20} className="text-white" />
              </motion.div>
              <AnimatePresence>
                {!isCollapsed && (
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="transition-all duration-300"
                  >
                    <h1 className="text-lg font-bold font-heading text-transparent bg-gradient-neon bg-clip-text whitespace-nowrap">
                      CompensaFlow
                    </h1>
                    <p className="text-xs text-text-secondary-dark whitespace-nowrap">Sales Compensation</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Collapse toggle - desktop only */}
            <motion.button
              onClick={toggleCollapse}
              className="hidden lg:flex p-2 rounded-full glass-morphism hover:glass-morphism-hover transition-all duration-200 flex-shrink-0 glow-indigo-hover"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon 
                name={isCollapsed ? "ChevronRight" : "ChevronLeft"} 
                size={16} 
                className="text-neon-indigo" 
              />
            </motion.button>

            {/* Close button - mobile only */}
            <motion.button
              onClick={closeMobileMenu}
              className="lg:hidden p-2 rounded-full glass-morphism hover:glass-morphism-hover transition-all duration-200 flex-shrink-0"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon name="X" size={16} className="text-neon-indigo" />
            </motion.button>
          </motion.div>

          {/* User context indicator with avatar glow */}
          <motion.div 
            className="p-4 border-b border-glass-border glass-morphism-elevated"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className={`flex items-center transition-all duration-300 ${isCollapsed ? 'justify-center' : 'space-x-3'}`}>
              <motion.div 
                className="w-8 h-8 bg-gradient-purple-blue rounded-full flex items-center justify-center glow-purple flex-shrink-0"
                whileHover={{ scale: 1.1 }}
              >
                <span className="text-sm font-medium text-white">JD</span>
              </motion.div>
              <AnimatePresence>
                {!isCollapsed && (
                  <motion.div 
                    className="flex-1 min-w-0 transition-all duration-300"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                  >
                    <p className="text-sm font-medium text-text-primary-dark truncate">John Doe</p>
                    <p className="text-xs text-text-secondary-dark truncate">Sales Operations Manager</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Navigation with staggered animations */}
          <nav className="flex-1 overflow-y-auto py-4">
            {navigationGroups.map((group, groupIndex) => (
              <motion.div 
                key={group.label} 
                className="mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + groupIndex * 0.1 }}
              >
                <AnimatePresence>
                  {!isCollapsed && (
                    <motion.h3 
                      className="px-4 mb-2 text-xs font-medium text-text-secondary-dark uppercase tracking-wider transition-all duration-300"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      {group.label}
                    </motion.h3>
                  )}
                </AnimatePresence>
                
                <ul className="space-y-1 px-2">
                  {group.items.map((item, itemIndex) => (
                    <motion.li 
                      key={item.path}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + groupIndex * 0.1 + itemIndex * 0.05 }}
                    >
                      <motion.button
                        onClick={() => handleNavigation(item.path)}
                        className={`
                          w-full flex items-center px-3 py-3 rounded-xl text-sm font-medium transition-all duration-300
                          ${isActivePath(item.path)
                            ? 'bg-gradient-neon text-white glow-indigo' :'text-text-secondary-dark glass-morphism hover:glass-morphism-hover hover:text-text-primary-dark'}
                          ${isCollapsed ? 'justify-center' : 'space-x-3'}
                        `}
                        title={isCollapsed ? item.label : ''}
                        whileHover={{ scale: 1.02, x: isCollapsed ? 0 : 5 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Icon 
                          name={item.icon} 
                          size={20} 
                          className={`flex-shrink-0 transition-all duration-300 ${
                            isActivePath(item.path) ? 'text-white' : 'text-neon-indigo'
                          }`} 
                        />
                        <AnimatePresence>
                          {!isCollapsed && (
                            <motion.span 
                              className="flex-1 text-left truncate transition-all duration-300"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -10 }}
                            >
                              {item.label}
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </motion.button>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </nav>

          {/* System status indicator with pulse animation */}
          <motion.div 
            className="p-4 border-t border-glass-border glass-morphism-elevated"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <div className={`flex items-center transition-all duration-300 ${isCollapsed ? 'justify-center' : 'space-x-3'}`}>
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Icon 
                  name={getStatusIcon()} 
                  size={16} 
                  className={`flex-shrink-0 ${getStatusColor()} transition-all duration-300`} 
                />
              </motion.div>
              <AnimatePresence>
                {!isCollapsed && (
                  <motion.div 
                    className="flex-1 transition-all duration-300"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                  >
                    <p className="text-xs font-medium text-text-primary-dark">System Status</p>
                    <p className={`text-xs capitalize ${getStatusColor()}`}>
                      {systemStatus}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </motion.aside>

      {/* Floating Mobile menu button with glow */}
      <motion.button
        onClick={toggleMobileMenu}
        className="fixed top-4 left-4 z-40 lg:hidden p-3 glass-morphism border border-glass-border rounded-2xl glow-indigo transition-all duration-200 hover:glass-morphism-hover"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Icon name="Menu" size={20} className="text-neon-indigo" />
      </motion.button>
    </>
  );
};

export default Sidebar;