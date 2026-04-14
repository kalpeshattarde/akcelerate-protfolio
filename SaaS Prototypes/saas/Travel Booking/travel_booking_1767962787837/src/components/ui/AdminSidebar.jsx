import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const AdminSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    analytics: true,
    management: false,
    configuration: false,
  });
  const location = useLocation();

  const navigationSections = [
    {
      id: 'analytics',
      title: 'Analytics',
      icon: 'BarChart3',
      items: [
        { name: 'Dashboard Overview', path: '/admin-portal-analytics', icon: 'Home' },
        { name: 'Booking Analytics', path: '/admin-portal-analytics', icon: 'TrendingUp' },
        { name: 'Revenue Reports', path: '/admin-portal-analytics', icon: 'DollarSign' },
        { name: 'User Insights', path: '/admin-portal-analytics', icon: 'Users' },
      ]
    },
    {
      id: 'management',
      title: 'Management',
      icon: 'Settings',
      items: [
        { name: 'Pricing Management', path: '/admin-portal-analytics', icon: 'Tag' },
        { name: 'Inventory Control', path: '/admin-portal-analytics', icon: 'Package' },
        { name: 'Partner Management', path: '/admin-portal-analytics', icon: 'Handshake' },
        { name: 'Content Management', path: '/admin-portal-analytics', icon: 'FileText' },
      ]
    },
    {
      id: 'configuration',
      title: 'Configuration',
      icon: 'Cog',
      items: [
        { name: 'White-label Settings', path: '/admin-portal-analytics', icon: 'Palette' },
        { name: 'API Configuration', path: '/admin-portal-analytics', icon: 'Code' },
        { name: 'System Settings', path: '/admin-portal-analytics', icon: 'Server' },
        { name: 'User Permissions', path: '/admin-portal-analytics', icon: 'Shield' },
      ]
    }
  ];

  const isActivePath = (path) => location.pathname === path;

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className={`fixed left-0 top-0 h-full bg-surface border-r border-border z-navigation transition-all duration-300 ease-out ${
        isCollapsed ? 'w-16' : 'w-64'
      } hidden lg:block`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            {!isCollapsed && (
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name="Shield" size={20} color="white" />
                </div>
                <span className="text-lg font-heading-semibold text-text-primary">
                  Admin Portal
                </span>
              </div>
            )}
            <button
              onClick={toggleCollapse}
              className="p-2 rounded-md text-text-secondary hover:text-primary hover:bg-secondary-100 transition-all duration-200 ease-out"
            >
              <Icon name={isCollapsed ? "ChevronRight" : "ChevronLeft"} size={20} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4">
            <div className="space-y-2">
              {navigationSections.map((section) => (
                <div key={section.id} className="px-3">
                  <button
                    onClick={() => !isCollapsed && toggleSection(section.id)}
                    className={`flex items-center w-full p-2 rounded-md text-sm font-body-medium transition-all duration-200 ease-out ${
                      isCollapsed 
                        ? 'justify-center' 
                        : 'justify-between'
                    } text-text-secondary hover:text-primary hover:bg-secondary-100`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon name={section.icon} size={20} />
                      {!isCollapsed && <span>{section.title}</span>}
                    </div>
                    {!isCollapsed && (
                      <Icon 
                        name="ChevronDown" 
                        size={16} 
                        className={`transition-transform duration-200 ${
                          expandedSections[section.id] ? 'rotate-180' : ''
                        }`}
                      />
                    )}
                  </button>

                  {!isCollapsed && expandedSections[section.id] && (
                    <div className="mt-2 space-y-1 animation-slide-up">
                      {section.items.map((item) => (
                        <Link
                          key={item.name}
                          to={item.path}
                          className={`flex items-center space-x-3 pl-6 pr-3 py-2 rounded-md text-sm transition-all duration-200 ease-out ${
                            isActivePath(item.path)
                              ? 'text-primary bg-primary-50 font-body-medium' :'text-text-secondary hover:text-primary hover:bg-secondary-100'
                          }`}
                        >
                          <Icon name={item.icon} size={16} />
                          <span>{item.name}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-border">
            <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'}`}>
              <div className="w-8 h-8 bg-secondary-200 rounded-full flex items-center justify-center">
                <Icon name="User" size={16} />
              </div>
              {!isCollapsed && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-body-medium text-text-primary truncate">
                    Admin User
                  </p>
                  <p className="text-xs text-text-secondary truncate">
                    admin@travelbook.com
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      <div className="lg:hidden">
        {/* Mobile menu button would be handled by parent component */}
      </div>
    </>
  );
};

export default AdminSidebar;