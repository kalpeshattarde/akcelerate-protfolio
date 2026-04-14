import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import NavBar from './NavBar';

const Header = () => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isQuickActionsOpen, setIsQuickActionsOpen] = useState(false);
  const [notifications] = useState([
    { id: 1, title: 'Contract Review Required', message: 'Vendor Agreement #2024-001 needs approval', time: '5 min ago', type: 'approval', unread: true },
    { id: 2, title: 'Compliance Alert', message: 'Contract expiring in 30 days', time: '1 hour ago', type: 'warning', unread: true },
    { id: 3, title: 'Payment Processed', message: 'Invoice #INV-2024-156 completed', time: '2 hours ago', type: 'success', unread: false },
  ]);

  const notificationRef = useRef(null);
  const userMenuRef = useRef(null);
  const quickActionsRef = useRef(null);
  const location = useLocation();

  const unreadCount = notifications?.filter(n => n?.unread)?.length;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef?.current && !notificationRef?.current?.contains(event?.target)) {
        setIsNotificationOpen(false);
      }
      if (userMenuRef?.current && !userMenuRef?.current?.contains(event?.target)) {
        setIsUserMenuOpen(false);
      }
      if (quickActionsRef?.current && !quickActionsRef?.current?.contains(event?.target)) {
        setIsQuickActionsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNotificationClick = (notification) => {
    console.log('Notification clicked:', notification);
  };

  const handleQuickAction = (action) => {
    console.log('Quick action:', action);
    setIsQuickActionsOpen(false);
  };

  const quickActions = [
    { id: 'new-contract', label: 'New Contract', icon: 'FileText', shortcut: 'Ctrl+N' },
    { id: 'upload-document', label: 'Upload Document', icon: 'Upload', shortcut: 'Ctrl+U' },
    { id: 'create-workflow', label: 'Create Workflow', icon: 'GitBranch', shortcut: 'Ctrl+W' },
    { id: 'generate-report', label: 'Generate Report', icon: 'BarChart3', shortcut: 'Ctrl+R' },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-100 bg-surface shadow-soft">
      <header className="border-b border-border">
        <div className="flex items-center justify-between h-16 px-6">
          {/* Left Section - Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="FileContract" size={20} color="white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-semibold text-text-primary">ContractFlow</h1>
            </div>
          </div>

          {/* Center Section - Main Navigation (Medium screens and up) */}
          <div className="hidden md:flex items-center space-x-1 flex-1 justify-center max-w-4xl mx-8">
            <div className="flex items-center space-x-1 overflow-x-auto scrollbar-hide">
              {[
                { id: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard', path: '/contract-dashboard' },
                { id: 'repository', label: 'Repository', icon: 'Database', path: '/contract-repository' },
                { id: 'editor', label: 'Editor', icon: 'Edit3', path: '/contract-editor' },
                { id: 'approvals', label: 'Approvals', icon: 'CheckCircle', path: '/approval-workflows' },
                { id: 'vendors', label: 'Vendors', icon: 'Building2', path: '/vendor-management' },
                { id: 'finance', label: 'Finance', icon: 'DollarSign', path: '/financial-tracking' },
                { id: 'analytics', label: 'Analytics', icon: 'BarChart3', path: '/analytics-reporting' },
                { id: 'compliance', label: 'Compliance', icon: 'Shield', path: '/compliance-center' },
                { id: 'administration', label: 'Admin', icon: 'Settings', path: '/system-administration' }
              ]?.map((item) => {
                const isActive = location?.pathname === item?.path;
                return (
                  <button
                    key={item?.id}
                    onClick={() => window.location.href = item?.path}
                    className={`flex items-center space-x-1 px-2.5 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-smooth flex-shrink-0 ${
                      isActive
                        ? 'bg-primary text-primary-foreground shadow-soft'
                        : 'text-muted-foreground hover:text-text-primary hover:bg-muted'
                    }`}
                  >
                    <Icon 
                      name={item?.icon} 
                      size={14} 
                      className={isActive ? 'text-primary-foreground' : 'text-muted-foreground'}
                    />
                    <span className="hidden lg:inline">{item?.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Section - Actions & User */}
          <div className="flex items-center space-x-2">
            {/* Quick Actions */}
            <div className="relative" ref={quickActionsRef}>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsQuickActionsOpen(!isQuickActionsOpen)}
                className="hidden lg:flex"
              >
                <Icon name="Plus" size={20} />
              </Button>
              
              {isQuickActionsOpen && (
                <div className="absolute right-0 top-12 w-64 bg-popover border border-border rounded-lg shadow-elevated z-300">
                  <div className="p-2">
                    <div className="px-3 py-2 text-sm font-medium text-muted-foreground border-b border-border mb-2">
                      Quick Actions
                    </div>
                    {quickActions?.map((action) => (
                      <button
                        key={action?.id}
                        onClick={() => handleQuickAction(action)}
                        className="w-full flex items-center justify-between px-3 py-2 text-sm text-text-primary hover:bg-muted rounded-md transition-smooth"
                      >
                        <div className="flex items-center space-x-3">
                          <Icon name={action?.icon} size={16} />
                          <span>{action?.label}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">{action?.shortcut}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Notifications */}
            <div className="relative" ref={notificationRef}>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                className="relative"
              >
                <Icon name="Bell" size={20} />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 bg-error text-error-foreground text-xs rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </Button>
              
              {isNotificationOpen && (
                <div className="absolute right-0 top-12 w-80 bg-popover border border-border rounded-lg shadow-elevated z-300">
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-medium text-text-primary">Notifications</h3>
                      <Button variant="ghost" size="sm" className="text-xs">
                        Mark all read
                      </Button>
                    </div>
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {notifications?.map((notification) => (
                        <div
                          key={notification?.id}
                          onClick={() => handleNotificationClick(notification)}
                          className={`p-3 rounded-lg cursor-pointer transition-smooth ${
                            notification?.unread ? 'bg-accent/10 border border-accent/20' : 'hover:bg-muted'
                          }`}
                        >
                          <div className="flex items-start space-x-3">
                            <div className={`w-2 h-2 rounded-full mt-2 ${
                              notification?.type === 'approval' ? 'bg-warning' :
                              notification?.type === 'warning'? 'bg-error' : 'bg-success'
                            }`} />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-text-primary truncate">
                                {notification?.title}
                              </p>
                              <p className="text-sm text-muted-foreground mt-1">
                                {notification?.message}
                              </p>
                              <p className="text-xs text-muted-foreground mt-2">
                                {notification?.time}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* User Menu */}
            <div className="relative" ref={userMenuRef}>
              <Button
                variant="ghost"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-2 px-3"
              >
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-primary-foreground">JD</span>
                </div>
                <div className="hidden lg:block text-left">
                  <p className="text-sm font-medium text-text-primary">John Doe</p>
                  <p className="text-xs text-muted-foreground">Contract Admin</p>
                </div>
                <Icon name="ChevronDown" size={16} className="hidden lg:block" />
              </Button>
              
              {isUserMenuOpen && (
                <div className="absolute right-0 top-12 w-56 bg-popover border border-border rounded-lg shadow-elevated z-300">
                  <div className="p-2">
                    <div className="px-3 py-2 border-b border-border mb-2">
                      <p className="text-sm font-medium text-text-primary">John Doe</p>
                      <p className="text-xs text-muted-foreground">john.doe@company.com</p>
                      <p className="text-xs text-muted-foreground">Contract Administrator</p>
                    </div>
                    
                    <button className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-text-primary hover:bg-muted rounded-md transition-smooth">
                      <Icon name="User" size={16} />
                      <span>Profile Settings</span>
                    </button>
                    
                    <button className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-text-primary hover:bg-muted rounded-md transition-smooth">
                      <Icon name="Settings" size={16} />
                      <span>Preferences</span>
                    </button>
                    
                    <button className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-text-primary hover:bg-muted rounded-md transition-smooth">
                      <Icon name="FileContract" size={16} />
                      <span>Help & Support</span>
                    </button>
                    
                    <div className="border-t border-border mt-2 pt-2">
                      <button className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-error hover:bg-muted rounded-md transition-smooth">
                        <Icon name="LogOut" size={16} />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
      
      {/* Mobile Navigation Bar (Small screens only) */}
      <div className="md:hidden">
        <NavBar />
      </div>
    </div>
  );
};

export default Header;