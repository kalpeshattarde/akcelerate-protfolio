import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = ({ userRole = 'esg-manager', onDomainSwitch, notifications = [] }) => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentDomain, setCurrentDomain] = useState('operations');
  const location = useLocation();

  const navigationItems = {
    operations: [
      { path: '/esg-analytics-dashboard', label: 'Analytics Dashboard', icon: 'BarChart3' },
      { path: '/esg-data-collection-interface', label: 'Data Collection', icon: 'Database' },
      { path: '/materiality-matrix-management', label: 'Materiality Matrix', icon: 'Grid3X3' },
      { path: '/compliance-reporting-center', label: 'Compliance Reports', icon: 'FileText' }
    ],
    administration: [
      { path: '/system-configuration-dashboard', label: 'System Config', icon: 'Settings' },
      { path: '/audit-trail-viewer', label: 'Audit Trail', icon: 'Eye' },
      { path: '/data-integration-monitor', label: 'Data Integration', icon: 'Workflow' }
    ]
  };

  const hasAdminAccess = ['admin', 'compliance-officer']?.includes(userRole);
  const currentNavItems = navigationItems?.[currentDomain] || navigationItems?.operations;

  const handleDomainSwitch = (domain) => {
    setCurrentDomain(domain);
    if (onDomainSwitch) {
      onDomainSwitch(domain);
    }
  };

  const unreadNotifications = notifications?.filter((n) => !n?.read)?.length;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border backdrop-blur-sm">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/audit-trail-viewer" className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Leaf" size={20} color="white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-semibold text-foreground">ESG Dashboard</h1>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          {hasAdminAccess && (
            <div className="flex items-center bg-muted rounded-lg p-1 mr-4">
              <button
                onClick={() => handleDomainSwitch('administration')}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-150 ${
                  currentDomain === 'administration' ?'bg-primary text-primary-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
                }`}
              >
                Administration
              </button>
            </div>
          )}

          {currentNavItems?.map((item) => (
            <Link
              key={item?.path}
              to={item?.path}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                location?.pathname === item?.path 
                  ? 'bg-primary text-primary-foreground' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <Icon name={item?.icon} size={16} />
              <span>{item?.label}</span>
            </Link>
          ))}
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-3">
          {/* Notifications */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              className="relative"
            >
              <Icon name="Bell" size={20} />
              {unreadNotifications > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-error text-error-foreground text-xs rounded-full flex items-center justify-center">
                  {unreadNotifications > 9 ? '9+' : unreadNotifications}
                </span>
              )}
            </Button>

            {isNotificationOpen && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-popover border border-border rounded-lg shadow-modal z-50">
                <div className="p-4 border-b border-border">
                  <h3 className="font-semibold text-foreground">Notifications</h3>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notifications?.length > 0 ? (
                    notifications?.slice(0, 5)?.map((notification, index) => (
                      <div
                        key={index}
                        className={`p-3 border-b border-border last:border-b-0 ${
                          !notification?.read ? 'bg-muted/50' : ''
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <div className={`w-2 h-2 rounded-full mt-2 ${
                            notification?.type === 'error' ? 'bg-error' :
                            notification?.type === 'warning' ? 'bg-warning' :
                            notification?.type === 'success' ? 'bg-success' : 'bg-primary'
                          }`} />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground">{notification?.title}</p>
                            <p className="text-xs text-muted-foreground mt-1">{notification?.message}</p>
                            <p className="text-xs text-muted-foreground mt-1">{notification?.time}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-muted-foreground">
                      <Icon name="Bell" size={24} className="mx-auto mb-2 opacity-50" />
                      <p className="text-sm">No notifications</p>
                    </div>
                  )}
                </div>
                {notifications?.length > 5 && (
                  <div className="p-3 border-t border-border">
                    <Button variant="ghost" size="sm" className="w-full">
                      View all notifications
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <Icon name="User" size={16} color="white" />
            </div>
            <div className="hidden sm:block text-sm">
              <div className="font-medium text-foreground">John Smith</div>
              <div className="text-xs text-muted-foreground capitalize">{userRole?.replace('-', ' ')}</div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
          </Button>
        </div>
      </div>
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-card border-t border-border">
          <div className="px-4 py-3 space-y-2">
            {hasAdminAccess && (
              <div className="flex space-x-2 mb-4">
                <button
                  onClick={() => handleDomainSwitch('administration')}
                  className={`flex-1 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-150 ${
                    currentDomain === 'administration' ?'bg-primary text-primary-foreground' :'bg-muted text-muted-foreground'
                  }`}
                >
                  Administration
                </button>
              </div>
            )}

            {currentNavItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center space-x-3 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-150 ${
                  location?.pathname === item?.path 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={item?.icon} size={18} />
                <span>{item?.label}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
      {/* Click outside to close notifications */}
      {isNotificationOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsNotificationOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;