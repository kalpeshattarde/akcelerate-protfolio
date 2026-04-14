import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const CustomerHeader = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { name: 'Search Flights', path: '/search-results-dashboard', icon: 'Search' },
    { name: 'My Trips', path: '/user-dashboard-trip-management', icon: 'MapPin' },
    { name: 'Account', path: '/login-register', icon: 'User' },
  ];

  const isActivePath = (path) => location.pathname === path;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-surface border-b border-border z-navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/search-results-dashboard" className="flex items-center">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name="Plane" size={20} color="white" />
                </div>
                <span className="text-xl font-heading-semibold text-text-primary">
                  TravelBook
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-body-medium transition-all duration-200 ease-out ${
                  isActivePath(item.path)
                    ? 'text-primary bg-primary-50' :'text-text-secondary hover:text-primary hover:bg-secondary-100'
                }`}
              >
                <Icon name={item.icon} size={16} />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* Desktop User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => {}}
              className="p-2 text-text-secondary hover:text-primary transition-colors duration-200 ease-out"
            >
              <Icon name="Bell" size={20} />
            </button>
            
            <div className="relative">
              <button
                onClick={toggleUserMenu}
                className="flex items-center space-x-2 p-2 rounded-md text-text-secondary hover:text-primary hover:bg-secondary-100 transition-all duration-200 ease-out"
              >
                <div className="w-8 h-8 bg-secondary-200 rounded-full flex items-center justify-center">
                  <Icon name="User" size={16} />
                </div>
                <Icon name="ChevronDown" size={16} />
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-surface rounded-md shadow-lg border border-border z-dropdown animation-fade-in">
                  <div className="py-1">
                    <Link
                      to="/user-dashboard-trip-management"
                      className="block px-4 py-2 text-sm text-text-secondary hover:bg-secondary-100 hover:text-primary transition-colors duration-200 ease-out"
                    >
                      My Profile
                    </Link>
                    <Link
                      to="/user-dashboard-trip-management"
                      className="block px-4 py-2 text-sm text-text-secondary hover:bg-secondary-100 hover:text-primary transition-colors duration-200 ease-out"
                    >
                      Trip History
                    </Link>
                    <Link
                      to="/booking-review-payment"
                      className="block px-4 py-2 text-sm text-text-secondary hover:bg-secondary-100 hover:text-primary transition-colors duration-200 ease-out"
                    >
                      Saved Bookings
                    </Link>
                    <hr className="my-1 border-border" />
                    <button
                      onClick={() => {}}
                      className="block w-full text-left px-4 py-2 text-sm text-text-secondary hover:bg-secondary-100 hover:text-primary transition-colors duration-200 ease-out"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-md text-text-secondary hover:text-primary hover:bg-secondary-100 transition-all duration-200 ease-out"
            >
              <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-surface border-t border-border animation-slide-up">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center space-x-3 px-3 py-2 rounded-md text-base font-body-medium transition-all duration-200 ease-out ${
                  isActivePath(item.path)
                    ? 'text-primary bg-primary-50' :'text-text-secondary hover:text-primary hover:bg-secondary-100'
                }`}
              >
                <Icon name={item.icon} size={20} />
                <span>{item.name}</span>
              </Link>
            ))}
            
            <hr className="my-2 border-border" />
            
            <button
              onClick={() => {}}
              className="flex items-center space-x-3 w-full px-3 py-2 rounded-md text-base font-body-medium text-text-secondary hover:text-primary hover:bg-secondary-100 transition-all duration-200 ease-out"
            >
              <Icon name="Bell" size={20} />
              <span>Notifications</span>
            </button>
            
            <button
              onClick={() => {}}
              className="flex items-center space-x-3 w-full px-3 py-2 rounded-md text-base font-body-medium text-text-secondary hover:text-primary hover:bg-secondary-100 transition-all duration-200 ease-out"
            >
              <Icon name="User" size={20} />
              <span>My Profile</span>
            </button>
            
            <button
              onClick={() => {}}
              className="flex items-center space-x-3 w-full px-3 py-2 rounded-md text-base font-body-medium text-text-secondary hover:text-primary hover:bg-secondary-100 transition-all duration-200 ease-out"
            >
              <Icon name="LogOut" size={20} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default CustomerHeader;