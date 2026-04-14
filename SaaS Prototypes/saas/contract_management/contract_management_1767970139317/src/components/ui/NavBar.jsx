import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const NavBar = () => {
  const [activeItem, setActiveItem] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: 'LayoutDashboard',
      path: '/contract-dashboard',
    },
    {
      id: 'repository',
      label: 'Repository',
      icon: 'Database',
      path: '/contract-repository',
    },
    {
      id: 'editor',
      label: 'Editor',
      icon: 'Edit3',
      path: '/contract-editor',
    },
    {
      id: 'approvals',
      label: 'Approvals',
      icon: 'CheckCircle',
      path: '/approval-workflows',
    },
    {
      id: 'vendors',
      label: 'Vendors',
      icon: 'Building2',
      path: '/vendor-management',
    },
    {
      id: 'finance',
      label: 'Finance',
      icon: 'DollarSign',
      path: '/financial-tracking',
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: 'BarChart3',
      path: '/analytics-reporting',
    },
    {
      id: 'compliance',
      label: 'Compliance',
      icon: 'Shield',
      path: '/compliance-center',
    },
    {
      id: 'administration',
      label: 'Administration',
      icon: 'Settings',
      path: '/system-administration',
    }
  ];

  useEffect(() => {
    const currentPath = location?.pathname;
    const activeItem = navigationItems?.find(item => item?.path === currentPath);
    if (activeItem) {
      setActiveItem(activeItem?.id);
    }
  }, [location?.pathname]);

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <nav className="bg-surface border-b border-border">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-14">
          <div className="flex items-center space-x-1 overflow-x-auto scrollbar-hide w-full">
            {navigationItems?.map((item) => {
              const isActive = activeItem === item?.id;
              return (
                <button
                  key={item?.id}
                  onClick={() => handleNavigation(item?.path)}
                  className={`flex items-center space-x-1.5 px-3 py-2 text-sm font-medium rounded-md whitespace-nowrap transition-smooth flex-shrink-0 ${
                    isActive
                      ? 'bg-primary text-primary-foreground shadow-soft'
                      : 'text-muted-foreground hover:text-text-primary hover:bg-muted'
                  }`}
                >
                  <Icon 
                    name={item?.icon} 
                    size={16} 
                    className={isActive ? 'text-primary-foreground' : 'text-muted-foreground'}
                  />
                  <span className="text-xs lg:text-sm">{item?.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;