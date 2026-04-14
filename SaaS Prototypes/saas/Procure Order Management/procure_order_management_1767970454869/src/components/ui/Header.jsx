import React, { useState } from 'react';
import Icon from '../AppIcon';

const Header = ({ userRole = 'procurement', userName = 'John Doe', notificationCount = 3 }) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const handleSearchFocus = () => setIsSearchFocused(true);
  const handleSearchBlur = () => setIsSearchFocused(false);
  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  const toggleProfileMenu = () => setIsProfileMenuOpen(!isProfileMenuOpen);
  const toggleNotifications = () => setIsNotificationOpen(!isNotificationOpen);

  const notifications = [
    {
      id: 1,
      type: 'approval',
      message: 'Purchase Order #PO-2024-001 requires approval',
      time: '5 minutes ago',
      unread: true
    },
    {
      id: 2,
      type: 'update',
      message: 'Supplier ABC Corp updated their profile',
      time: '1 hour ago',
      unread: true
    },
    {
      id: 3,
      type: 'system',
      message: 'System maintenance scheduled for tonight',
      time: '2 hours ago',
      unread: false
    }
  ];

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'approval': return 'CheckCircle';
      case 'update': return 'Info';
      case 'system': return 'Settings';
      default: return 'Bell';
    }
  };

  return (
    <header className="lg:fixed lg:left-60 right-0 top-0 bg-surface border-b border-border z-dropdown">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Mobile Menu Button */}
        <button className="lg:hidden p-2 rounded-button hover:bg-secondary-100 transition-smooth">
          <Icon name="Menu" size={20} />
        </button>

        {/* Search Bar */}
        <div className="flex-1 max-w-md mx-4">
          <div className={`relative transition-smooth ${isSearchFocused ? 'transform scale-105' : ''}`}>
            <Icon 
              name="Search" 
              size={20} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary"
            />
            <input
              type="text"
              placeholder="Search purchase orders, suppliers..."
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={handleSearchFocus}
              onBlur={handleSearchBlur}
              className="w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-button focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-smooth text-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-text-primary transition-smooth"
              >
                <Icon name="X" size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Quick Actions */}
          <div className="hidden md:flex items-center space-x-2">
            <button className="p-2 rounded-button hover:bg-secondary-100 transition-smooth" title="Create New Order">
              <Icon name="Plus" size={20} className="text-text-secondary" />
            </button>
            <button className="p-2 rounded-button hover:bg-secondary-100 transition-smooth" title="Export Data">
              <Icon name="Download" size={20} className="text-text-secondary" />
            </button>
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={toggleNotifications}
              className="relative p-2 rounded-button hover:bg-secondary-100 transition-smooth"
              title="Notifications"
            >
              <Icon name="Bell" size={20} className="text-text-secondary" />
              {notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-error text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse-slow">
                  {notificationCount}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {isNotificationOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-surface border border-border rounded-card shadow-elevation-lg z-dropdown">
                <div className="p-4 border-b border-border">
                  <h3 className="font-heading-medium text-text-primary">Notifications</h3>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 border-b border-border hover:bg-secondary-50 transition-smooth ${
                        notification.unread ? 'bg-primary-50' : ''
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <Icon 
                          name={getNotificationIcon(notification.type)} 
                          size={16} 
                          className={`mt-1 ${
                            notification.type === 'approval' ? 'text-success' :
                            notification.type === 'update' ? 'text-primary' : 'text-warning'
                          }`}
                        />
                        <div className="flex-1">
                          <p className="text-sm text-text-primary">{notification.message}</p>
                          <p className="text-xs text-text-secondary mt-1">{notification.time}</p>
                        </div>
                        {notification.unread && (
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 border-t border-border">
                  <button className="w-full text-center text-sm text-primary hover:text-primary-700 transition-smooth">
                    View All Notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User Profile */}
          <div className="relative">
            <button
              onClick={toggleProfileMenu}
              className="flex items-center space-x-3 p-2 rounded-button hover:bg-secondary-100 transition-smooth"
            >
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-heading-medium">
                  {userName.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-body-medium text-text-primary">{userName}</p>
                <p className="text-xs text-text-secondary capitalize">{userRole}</p>
              </div>
              <Icon name="ChevronDown" size={16} className="text-text-secondary" />
            </button>

            {/* Profile Dropdown */}
            {isProfileMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-surface border border-border rounded-card shadow-elevation-lg z-dropdown">
                <div className="p-2">
                  <button className="w-full flex items-center space-x-2 px-3 py-2 text-left hover:bg-secondary-100 rounded-button transition-smooth">
                    <Icon name="User" size={16} className="text-text-secondary" />
                    <span className="text-sm text-text-primary">Profile</span>
                  </button>
                  <button className="w-full flex items-center space-x-2 px-3 py-2 text-left hover:bg-secondary-100 rounded-button transition-smooth">
                    <Icon name="Settings" size={16} className="text-text-secondary" />
                    <span className="text-sm text-text-primary">Settings</span>
                  </button>
                  <button className="w-full flex items-center space-x-2 px-3 py-2 text-left hover:bg-secondary-100 rounded-button transition-smooth">
                    <Icon name="HelpCircle" size={16} className="text-text-secondary" />
                    <span className="text-sm text-text-primary">Help</span>
                  </button>
                  <hr className="my-2 border-border" />
                  <button className="w-full flex items-center space-x-2 px-3 py-2 text-left hover:bg-error-50 rounded-button transition-smooth">
                    <Icon name="LogOut" size={16} className="text-error" />
                    <span className="text-sm text-error">Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;