import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Sidebar = ({ isOpen = false, onClose }) => {
  const [activeItem, setActiveItem] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: 'LayoutDashboard',
      path: '/contract-dashboard',
      description: 'Overview and metrics'
    },
    {
      id: 'contracts',
      label: 'Contracts',
      icon: 'FileText',
      children: [
        {
          id: 'repository',
          label: 'Repository',
          icon: 'Database',
          path: '/contract-repository',
          description: 'Browse all contracts'
        },
        {
          id: 'editor',
          label: 'Editor',
          icon: 'Edit3',
          path: '/contract-editor',
          description: 'Create and edit contracts'
        }
      ]
    },
    {
      id: 'workflows',
      label: 'Workflows',
      icon: 'GitBranch',
      children: [
        {
          id: 'approvals',
          label: 'Approvals',
          icon: 'CheckCircle',
          path: '/approval-workflows',
          description: 'Manage approval processes'
        },
        {
          id: 'compliance',
          label: 'Compliance',
          icon: 'Shield',
          path: '/compliance-center',
          description: 'Compliance monitoring'
        }
      ]
    },
    {
      id: 'vendors',
      label: 'Vendors',
      icon: 'Building2',
      path: '/vendor-management',
      description: 'Supplier relationships'
    },
    {
      id: 'finance',
      label: 'Finance',
      icon: 'DollarSign',
      path: '/financial-tracking',
      description: 'Financial oversight'
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: 'BarChart3',
      path: '/analytics-reporting',
      description: 'Reports and insights'
    },
    {
      id: 'administration',
      label: 'Administration',
      icon: 'Settings',
      path: '/system-administration',
      description: 'System configuration'
    }
  ];

  useEffect(() => {
    const currentPath = location?.pathname;
    const findActiveItem = (items) => {
      for (const item of items) {
        if (item?.path === currentPath) {
          return item?.id;
        }
        if (item?.children) {
          const childActive = findActiveItem(item?.children);
          if (childActive) return childActive;
        }
      }
      return null;
    };
    
    const active = findActiveItem(navigationItems);
    if (active) {
      setActiveItem(active);
    }
  }, [location?.pathname]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event?.altKey && event?.key >= '1' && event?.key <= '9') {
        event?.preventDefault();
        const index = parseInt(event?.key) - 1;
        const flatItems = navigationItems?.reduce((acc, item) => {
          if (item?.path) {
            acc?.push(item);
          } else if (item?.children) {
            acc?.push(...item?.children);
          }
          return acc;
        }, []);
        
        if (flatItems?.[index]) {
          navigate(flatItems?.[index]?.path);
          if (onClose) onClose();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [navigate, onClose]);

  const handleNavigation = (path) => {
    navigate(path);
    if (onClose) onClose();
  };

  const renderNavigationItem = (item, level = 0) => {
    const isActive = activeItem === item?.id;
    const hasChildren = item?.children && item?.children?.length > 0;
    
    if (hasChildren) {
      return (
        <div key={item?.id} className="mb-2">
          <div className="px-3 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
            <div className="flex items-center space-x-2">
              <Icon name={item?.icon} size={14} />
              <span>{item?.label}</span>
            </div>
          </div>
          <div className="ml-2 space-y-1">
            {item?.children?.map(child => renderNavigationItem(child, level + 1))}
          </div>
        </div>
      );
    }

    return (
      <button
        key={item?.id}
        onClick={() => handleNavigation(item?.path)}
        className={`w-full flex items-center space-x-3 px-3 py-2.5 text-sm rounded-lg transition-smooth group ${
          isActive 
            ? 'bg-primary text-primary-foreground shadow-soft' 
            : 'text-text-primary hover:bg-muted hover:text-text-primary'
        } ${level > 0 ? 'ml-4' : ''}`}
      >
        <Icon 
          name={item?.icon} 
          size={18} 
          className={`${isActive ? 'text-primary-foreground' : 'text-muted-foreground group-hover:text-text-primary'}`}
        />
        <div className="flex-1 text-left">
          <div className="font-medium">{item?.label}</div>
          {item?.description && (
            <div className={`text-xs mt-0.5 ${
              isActive ? 'text-primary-foreground/80' : 'text-muted-foreground'
            }`}>
              {item?.description}
            </div>
          )}
        </div>
        {isActive && (
          <div className="w-2 h-2 bg-primary-foreground rounded-full" />
        )}
      </button>
    );
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-200 transition-opacity"
          onClick={onClose}
        />
      )}
      {/* Sidebar */}
      <aside className={`
        fixed top-16 left-0 h-[calc(100vh-4rem)] w-60 bg-surface border-r border-border z-200
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        lg:fixed lg:z-100
      `}>
        <div className="flex flex-col h-full">
          {/* Navigation Header */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-text-primary">Navigation</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="lg:hidden h-6 w-6"
              >
                <Icon name="X" size={14} />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Use Alt+1-9 for quick access
            </p>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {navigationItems?.map(item => renderNavigationItem(item))}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-border">
            <div className="text-xs text-muted-foreground">
              <div className="flex items-center justify-between mb-2">
                <span>ContractFlow Pro</span>
                <span className="px-2 py-1 bg-muted rounded text-xs">v2.1.0</span>
              </div>
              <div className="flex items-center space-x-4 text-xs">
                <button className="hover:text-text-primary transition-smooth">
                  Help
                </button>
                <button className="hover:text-text-primary transition-smooth">
                  Support
                </button>
                <button className="hover:text-text-primary transition-smooth">
                  Updates
                </button>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;