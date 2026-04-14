import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Sidebar = ({ 
  isCollapsed = false, 
  onToggle, 
  userRole = 'esg-manager',
  currentDomain = 'operations' 
}) => {
  const location = useLocation();

  // Flattened navigation items without sections
  const navigationItems = [
    { 
      path: '/esg-analytics-dashboard', 
      label: 'Analytics Dashboard', 
      icon: 'BarChart3',
      description: 'Real-time ESG metrics and KPIs'
    },
    { 
      path: '/esg-data-collection-interface', 
      label: 'Data Collection', 
      icon: 'Database',
      description: 'Input and manage ESG data'
    },
    { 
      path: '/materiality-matrix-management', 
      label: 'Materiality Matrix', 
      icon: 'Grid3X3',
      description: 'Assess material ESG topics'
    },
    { 
      path: '/compliance-reporting-center', 
      label: 'Compliance Reports', 
      icon: 'FileText',
      description: 'Generate regulatory reports'
    },
    // Admin items (conditionally shown)
    ...((['admin', 'compliance-officer']?.includes(userRole)) ? [
      { 
        path: '/system-configuration-dashboard', 
        label: 'System Configuration', 
        icon: 'Settings',
        description: 'Configure system settings'
      },
      { 
        path: '/audit-trail-viewer', 
        label: 'Audit Trail', 
        icon: 'Eye',
        description: 'View system audit logs'
      },
      { 
        path: '/data-integration-monitor', 
        label: 'Data Integration', 
        icon: 'Workflow',
        description: 'Monitor data integrations'
      },
    ] : [])
  ];

  const getQuickActions = () => {
    const actions = [
      { icon: 'Plus', label: 'New Report', action: 'create-report' },
      { icon: 'Upload', label: 'Import Data', action: 'import-data' },
      { icon: 'Download', label: 'Export', action: 'export-data' },
    ];

    return actions;
  };

  return (
    <>
      {/* Sidebar */}
      <aside className={`fixed left-0 top-16 bottom-0 z-40 bg-card border-r border-border transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}>
        <div className="flex flex-col h-full">
          {/* Toggle Button */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            {!isCollapsed && (
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              </h2>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggle}
              className="ml-auto"
            >
              <Icon name={isCollapsed ? "ChevronRight" : "ChevronLeft"} size={16} />
            </Button>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 overflow-y-auto py-4">
            <div className="space-y-1 px-3">
              {navigationItems?.map((item) => {
                const isActive = location.pathname === item?.path;
                
                return (
                  <Link
                    key={item?.path}
                    to={item?.path}
                    className={`flex items-center space-x-3 p-3 rounded-lg text-sm transition-all duration-150 group ${
                      isActive
                        ? 'bg-primary text-primary-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                    title={isCollapsed ? item?.label : ''}
                  >
                    <Icon name={item?.icon} size={16} />
                    {!isCollapsed && (
                      <div className="flex-1 min-w-0">
                        <div className="font-medium">{item?.label}</div>
                        <div className="text-xs opacity-75 truncate">
                          {item?.description}
                        </div>
                      </div>
                    )}
                    {isActive && !isCollapsed && (
                      <div className="w-1 h-4 bg-primary-foreground rounded-full" />
                    )}
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Quick Actions */}
          <div className="border-t border-border p-3">
            {!isCollapsed && (
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                Quick Actions
              </h3>
            )}
            <div className="space-y-1">
              {getQuickActions()?.map((action, index) => (
                <button
                  key={index}
                  className="w-full flex items-center space-x-3 p-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-150"
                  title={isCollapsed ? action?.label : ''}
                >
                  <Icon name={action?.icon} size={16} />
                  {!isCollapsed && <span>{action?.label}</span>}
                </button>
              ))}
            </div>
          </div>

          {/* User Info */}
          <div className="border-t border-border p-3">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                <Icon name="User" size={16} color="white" />
              </div>
              {!isCollapsed && (
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-foreground truncate">
                    John Smith
                  </div>
                  <div className="text-xs text-muted-foreground capitalize truncate">
                    {userRole?.replace('-', ' ')}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>
      {/* Overlay for mobile */}
      <div className="lg:hidden fixed inset-0 z-30 bg-background/80 backdrop-blur-sm" />
    </>
  );
};

export default Sidebar;