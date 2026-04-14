import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const Sidebar = ({ userRole = 'procurement' }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const navigationItems = [
    {
      section: 'Dashboard',
      items: [
        {
          label: 'Kanban Dashboard',
          path: '/procurement-kanban-dashboard',
          icon: 'LayoutDashboard',
          roles: ['procurement', 'finance', 'admin']
        }
      ]
    },
    {
      section: 'Purchase Orders',
      items: [
        {
          label: 'Order Details',
          path: '/purchase-order-detail-view',
          icon: 'FileText',
          roles: ['procurement', 'finance', 'admin']
        },
        {
          label: 'Create New Order',
          path: '/new-purchase-order-creation',
          icon: 'Plus',
          roles: ['procurement', 'admin']
        }
      ]
    },
    {
      section: 'Management',
      items: [
        {
          label: 'Analytics & Reporting',
          path: '/analytics-and-reporting-dashboard',
          icon: 'BarChart3',
          roles: ['finance', 'admin']
        },
        {
          label: 'Supplier Management',
          path: '/supplier-management-interface',
          icon: 'Users',
          roles: ['procurement', 'admin']
        },
        {
          label: 'Approval Workflow',
          path: '/approval-workflow-queue',
          icon: 'CheckCircle',
          roles: ['finance', 'admin']
        }
      ]
    },
    {
      section: 'Compliance',
      items: [
        {
          label: 'System Administration',
          path: '/system-administration-panel',
          icon: 'Settings',
          roles: ['admin']
        },
        {
          label: 'Audit Trail',
          path: '/audit-trail-and-compliance-viewer',
          icon: 'Shield',
          roles: ['finance', 'admin']
        }
      ]
    }
  ];

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  const hasAccess = (roles) => {
    return roles.includes(userRole);
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <aside className={`lg:fixed left-0 top-0 h-full bg-surface border-r border-border z-navigation transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-60'
    } lg:translate-x-0 transform ${isCollapsed ? '' : 'shadow-elevation-md'}`}>
      {/* Logo Section */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        {!isCollapsed && (
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Package" size={20} color="white" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-heading-semibold text-text-primary">ProcureFlow</span>
              <span className="text-xs text-text-secondary">Enterprise</span>
            </div>
          </div>
        )}
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-button hover:bg-secondary-100 transition-smooth lg:block hidden"
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <Icon name={isCollapsed ? 'ChevronRight' : 'ChevronLeft'} size={16} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
        {navigationItems.map((section, sectionIndex) => {
          const visibleItems = section.items.filter(item => hasAccess(item.roles));
          
          if (visibleItems.length === 0) return null;

          return (
            <div key={sectionIndex} className="mb-6">
              {!isCollapsed && (
                <h3 className="px-4 mb-2 text-xs font-heading-medium text-text-secondary uppercase tracking-wider">
                  {section.section}
                </h3>
              )}
              <ul className="space-y-1 px-2">
                {visibleItems.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    <Link
                      to={item.path}
                      className={`flex items-center px-3 py-2.5 rounded-button transition-smooth group ${
                        isActiveRoute(item.path)
                          ? 'bg-primary-100 text-primary border-l-2 border-primary' :'text-text-secondary hover:bg-secondary-100 hover:text-text-primary'
                      }`}
                      title={isCollapsed ? item.label : ''}
                    >
                      <Icon 
                        name={item.icon} 
                        size={20} 
                        className={`${isCollapsed ? 'mx-auto' : 'mr-3'} ${
                          isActiveRoute(item.path) ? 'text-primary' : ''
                        }`}
                      />
                      {!isCollapsed && (
                        <span className="font-body-normal text-sm">{item.label}</span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </nav>

      {/* User Role Indicator */}
      {!isCollapsed && (
        <div className="p-4 border-t border-border">
          <div className="flex items-center space-x-3">
            <div className={`w-2 h-2 rounded-full ${
              userRole === 'admin' ? 'bg-error' : 
              userRole === 'finance' ? 'bg-warning' : 'bg-success'
            }`}></div>
            <div className="flex flex-col">
              <span className="text-sm font-body-medium text-text-primary capitalize">
                {userRole} User
              </span>
              <span className="text-xs text-text-secondary">
                {userRole === 'admin' ? 'Full Access' : 
                 userRole === 'finance' ? 'Finance & Oversight' : 'Procurement Operations'}
              </span>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;