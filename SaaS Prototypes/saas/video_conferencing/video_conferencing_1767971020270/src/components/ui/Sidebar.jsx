import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Sidebar = ({ 
  isCollapsed = false, 
  onToggle,
  userRole = 'user' // 'user', 'admin', 'moderator'
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [expandedSections, setExpandedSections] = useState(['meetings']);

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      path: '/dashboard',
      icon: 'LayoutDashboard',
      requiredRole: null
    },
    {
      id: 'meetings',
      label: 'Meetings',
      icon: 'Video',
      requiredRole: null,
      children: [
        {
          id: 'meeting-room',
          label: 'Meeting Room',
          path: '/meeting-room',
          icon: 'VideoIcon'
        },
        {
          id: 'schedule-meeting',
          label: 'Schedule Meeting',
          path: '/schedule-meeting',
          icon: 'Calendar'
        }
      ]
    },
    {
      id: 'recordings',
      label: 'Recordings',
      path: '/recordings-library',
      icon: 'PlayCircle',
      requiredRole: null
    },
    {
      id: 'administration',
      label: 'Administration',
      icon: 'Settings',
      requiredRole: 'admin',
      children: [
        {
          id: 'user-management',
          label: 'User Management',
          path: '/user-management',
          icon: 'Users'
        },
        {
          id: 'analytics',
          label: 'Analytics',
          path: '/analytics-dashboard',
          icon: 'BarChart3'
        }
      ]
    }
  ];

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => 
      prev?.includes(sectionId) 
        ? prev?.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const handleNavigation = (path) => {
    if (path) {
      navigate(path);
    }
  };

  const isActive = (path) => {
    return location?.pathname === path;
  };

  const isParentActive = (children) => {
    return children?.some(child => isActive(child?.path));
  };

  const hasPermission = (requiredRole) => {
    if (!requiredRole) return true;
    if (userRole === 'admin') return true;
    return userRole === requiredRole;
  };

  const filteredMenuItems = menuItems?.filter(item => hasPermission(item?.requiredRole));

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-surface border-r border-border z-90 transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-60'
      } hidden lg:block`}>
        <div className="flex flex-col h-full">
          {/* Sidebar Toggle */}
          <div className="flex items-center justify-end p-4 border-b border-border">
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggle}
              className="w-8 h-8"
            >
              <Icon name={isCollapsed ? "ChevronRight" : "ChevronLeft"} size={16} />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4">
            <div className="space-y-2 px-3">
              {filteredMenuItems?.map((item) => (
                <div key={item?.id}>
                  {/* Main Menu Item */}
                  <div
                    className={`flex items-center justify-between rounded-md transition-micro ${
                      item?.children 
                        ? 'cursor-pointer hover:bg-muted' 
                        : `cursor-pointer hover:bg-muted ${isActive(item?.path) ? 'bg-primary text-primary-foreground' : ''}`
                    }`}
                    onClick={() => {
                      if (item?.children) {
                        if (!isCollapsed) {
                          toggleSection(item?.id);
                        }
                      } else {
                        handleNavigation(item?.path);
                      }
                    }}
                  >
                    <div className="flex items-center px-3 py-2 flex-1">
                      <Icon 
                        name={item?.icon} 
                        size={20} 
                        className={`flex-shrink-0 ${
                          item?.children && isParentActive(item?.children) ? 'text-primary' : ''
                        }`}
                      />
                      {!isCollapsed && (
                        <span className={`ml-3 text-sm font-medium ${
                          item?.children && isParentActive(item?.children) ? 'text-primary' : 'text-foreground'
                        }`}>
                          {item?.label}
                        </span>
                      )}
                    </div>
                    {!isCollapsed && item?.children && (
                      <div className="px-3">
                        <Icon 
                          name="ChevronDown" 
                          size={16} 
                          className={`transition-transform ${
                            expandedSections?.includes(item?.id) ? 'rotate-180' : ''
                          }`}
                        />
                      </div>
                    )}
                  </div>

                  {/* Submenu Items */}
                  {!isCollapsed && item?.children && expandedSections?.includes(item?.id) && (
                    <div className="ml-6 mt-2 space-y-1">
                      {item?.children?.map((child) => (
                        <div
                          key={child?.id}
                          className={`flex items-center px-3 py-2 rounded-md cursor-pointer transition-micro ${
                            isActive(child?.path) 
                              ? 'bg-primary text-primary-foreground' 
                              : 'hover:bg-muted text-foreground'
                          }`}
                          onClick={() => handleNavigation(child?.path)}
                        >
                          <Icon name={child?.icon} size={16} className="flex-shrink-0" />
                          <span className="ml-3 text-sm">{child?.label}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </nav>

          {/* Bottom Section */}
          {!isCollapsed && (
            <div className="p-4 border-t border-border">
              <div className="bg-muted rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="Zap" size={16} className="text-accent" />
                  <span className="text-sm font-medium text-foreground">Pro Tip</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Use Ctrl+K to quickly start a new meeting from anywhere.
                </p>
              </div>
            </div>
          )}
        </div>
      </aside>
      {/* Mobile Sidebar Overlay */}
      <div className={`lg:hidden fixed inset-0 z-90 ${isCollapsed ? 'pointer-events-none' : ''}`}>
        {/* Backdrop */}
        {!isCollapsed && (
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onToggle}
          />
        )}
        
        {/* Mobile Sidebar */}
        <aside className={`absolute left-0 top-0 h-full w-64 bg-surface border-r border-border transform transition-transform duration-300 ${
          isCollapsed ? '-translate-x-full' : 'translate-x-0'
        }`}>
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-md">
                  <Icon name="Video" size={20} color="white" />
                </div>
                <h1 className="text-lg font-semibold text-foreground">VideoConf</h1>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onToggle}
                className="w-8 h-8"
              >
                <Icon name="X" size={16} />
              </Button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto py-4">
              <div className="space-y-2 px-3">
                {filteredMenuItems?.map((item) => (
                  <div key={item?.id}>
                    {/* Main Menu Item */}
                    <div
                      className={`flex items-center justify-between rounded-md transition-micro ${
                        item?.children 
                          ? 'cursor-pointer hover:bg-muted' 
                          : `cursor-pointer hover:bg-muted ${isActive(item?.path) ? 'bg-primary text-primary-foreground' : ''}`
                      }`}
                      onClick={() => {
                        if (item?.children) {
                          toggleSection(item?.id);
                        } else {
                          handleNavigation(item?.path);
                          onToggle(); // Close mobile menu after navigation
                        }
                      }}
                    >
                      <div className="flex items-center px-3 py-2 flex-1">
                        <Icon 
                          name={item?.icon} 
                          size={20} 
                          className={`flex-shrink-0 ${
                            item?.children && isParentActive(item?.children) ? 'text-primary' : ''
                          }`}
                        />
                        <span className={`ml-3 text-sm font-medium ${
                          item?.children && isParentActive(item?.children) ? 'text-primary' : 'text-foreground'
                        }`}>
                          {item?.label}
                        </span>
                      </div>
                      {item?.children && (
                        <div className="px-3">
                          <Icon 
                            name="ChevronDown" 
                            size={16} 
                            className={`transition-transform ${
                              expandedSections?.includes(item?.id) ? 'rotate-180' : ''
                            }`}
                          />
                        </div>
                      )}
                    </div>

                    {/* Submenu Items */}
                    {item?.children && expandedSections?.includes(item?.id) && (
                      <div className="ml-6 mt-2 space-y-1">
                        {item?.children?.map((child) => (
                          <div
                            key={child?.id}
                            className={`flex items-center px-3 py-2 rounded-md cursor-pointer transition-micro ${
                              isActive(child?.path) 
                                ? 'bg-primary text-primary-foreground' 
                                : 'hover:bg-muted text-foreground'
                            }`}
                            onClick={() => {
                              handleNavigation(child?.path);
                              onToggle(); // Close mobile menu after navigation
                            }}
                          >
                            <Icon name={child?.icon} size={16} className="flex-shrink-0" />
                            <span className="ml-3 text-sm">{child?.label}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </nav>
          </div>
        </aside>
      </div>
    </>
  );
};

export default Sidebar;