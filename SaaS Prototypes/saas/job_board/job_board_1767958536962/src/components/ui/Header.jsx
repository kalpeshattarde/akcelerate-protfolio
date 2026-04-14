import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const Header = () => {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Mock authentication state
  const [userRole, setUserRole] = useState('job-seeker'); // Mock user role: 'job-seeker', 'recruiter', 'admin'
  
  const searchRef = useRef(null);
  const userMenuRef = useRef(null);
  const location = useLocation();

  const navigationItems = {
    'job-seeker': [
      { label: 'Browse Jobs', path: '/job-search-browse', icon: 'Search' },
      { label: 'Dashboard', path: '/job-seeker-dashboard', icon: 'LayoutDashboard' },
      { label: 'Applications', path: '/job-detail-application', icon: 'FileText' },
    ],
    'recruiter': [
      { label: 'Browse Jobs', path: '/job-search-browse', icon: 'Search' },
      { label: 'Dashboard', path: '/recruiter-dashboard-analytics', icon: 'BarChart3' },
      { label: 'Post Job', path: '/job-posting-creation-management', icon: 'Plus' },
      { label: 'Company', path: '/company-registration-profile-setup', icon: 'Building2' },
    ],
    'admin': [
      { label: 'Browse Jobs', path: '/job-search-browse', icon: 'Search' },
      { label: 'Admin Panel', path: '/admin-moderation-management', icon: 'Shield' },
      { label: 'Analytics', path: '/recruiter-dashboard-analytics', icon: 'BarChart3' },
    ],
    'anonymous': [
      { label: 'Browse Jobs', path: '/job-search-browse', icon: 'Search' },
      { label: 'Sign In', path: '/job-seeker-registration-login', icon: 'LogIn' },
    ]
  };

  const currentNavItems = isAuthenticated ? navigationItems[userRole] : navigationItems['anonymous'];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchExpanded(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Handle search submission
      console.log('Search query:', searchQuery);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  const getUserDisplayName = () => {
    const names = {
      'job-seeker': 'John Doe',
      'recruiter': 'Jane Smith',
      'admin': 'Admin User'
    };
    return names[userRole] || 'User';
  };

  const getUserMenuItems = () => {
    const commonItems = [
      { label: 'Profile', icon: 'User', action: () => console.log('Profile clicked') },
      { label: 'Settings', icon: 'Settings', action: () => console.log('Settings clicked') },
    ];

    const roleSpecificItems = {
      'job-seeker': [
        { label: 'Saved Jobs', icon: 'Bookmark', action: () => console.log('Saved Jobs clicked') },
        { label: 'Application History', icon: 'Clock', action: () => console.log('Application History clicked') },
      ],
      'recruiter': [
        { label: 'Company Profile', icon: 'Building2', action: () => console.log('Company Profile clicked') },
        { label: 'Job Analytics', icon: 'BarChart3', action: () => console.log('Job Analytics clicked') },
      ],
      'admin': [
        { label: 'User Management', icon: 'Users', action: () => console.log('User Management clicked') },
        { label: 'System Settings', icon: 'Cog', action: () => console.log('System Settings clicked') },
      ]
    };

    return [
      ...commonItems,
      ...(roleSpecificItems[userRole] || []),
      { label: 'Sign Out', icon: 'LogOut', action: () => console.log('Sign Out clicked'), className: 'text-error border-t border-border-light pt-2 mt-2' }
    ];
  };

  return (
    <header className="sticky top-0 z-1040 bg-background border-b border-border shadow-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center transition-smooth group-hover:bg-primary-700">
                <Icon name="Briefcase" size={20} color="white" />
              </div>
              <span className="text-xl font-semibold text-text-primary hidden sm:block">JobBoard</span>
            </Link>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8" ref={searchRef}>
            <form onSubmit={handleSearchSubmit} className="w-full">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Icon name="Search" size={20} color="#64748B" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Search jobs, companies, or skills..."
                  className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-smooth bg-surface"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    <Icon name="X" size={16} color="#64748B" />
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {currentNavItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-smooth min-h-touch ${
                  isActivePath(item.path)
                    ? 'bg-primary-50 text-primary-600' :'text-text-secondary hover:text-text-primary hover:bg-surface'
                }`}
              >
                <Icon name={item.icon} size={16} />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* User Menu & Mobile Controls */}
          <div className="flex items-center space-x-2">
            {/* Search Icon - Mobile */}
            <button
              onClick={() => setIsSearchExpanded(!isSearchExpanded)}
              className="md:hidden p-2 rounded-md text-text-secondary hover:text-text-primary hover:bg-surface transition-smooth min-h-touch min-w-touch"
            >
              <Icon name="Search" size={20} />
            </button>

            {/* User Menu */}
            {isAuthenticated && (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={toggleUserMenu}
                  className="flex items-center space-x-2 p-2 rounded-md text-text-secondary hover:text-text-primary hover:bg-surface transition-smooth min-h-touch"
                >
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                    <Icon name="User" size={16} color="#2563EB" />
                  </div>
                  <span className="hidden lg:block text-sm font-medium">{getUserDisplayName()}</span>
                  <Icon name="ChevronDown" size={16} className={`transition-transform duration-200 ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* User Dropdown */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-background rounded-lg shadow-modal border border-border z-1050">
                    <div className="py-2">
                      {getUserMenuItems().map((item, index) => (
                        <button
                          key={index}
                          onClick={item.action}
                          className={`w-full flex items-center space-x-3 px-4 py-2 text-sm text-left hover:bg-surface transition-smooth ${item.className || ''}`}
                        >
                          <Icon name={item.icon} size={16} />
                          <span>{item.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-md text-text-secondary hover:text-text-primary hover:bg-surface transition-smooth min-h-touch min-w-touch"
            >
              <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isSearchExpanded && (
          <div className="md:hidden pb-4" ref={searchRef}>
            <form onSubmit={handleSearchSubmit}>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Icon name="Search" size={20} color="#64748B" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Search jobs, companies, or skills..."
                  className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-smooth bg-surface"
                  autoFocus
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    <Icon name="X" size={16} color="#64748B" />
                  </button>
                )}
              </div>
            </form>
          </div>
        )}

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border">
            <nav className="py-4 space-y-1">
              {currentNavItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-md text-base font-medium transition-smooth min-h-touch ${
                    isActivePath(item.path)
                      ? 'bg-primary-50 text-primary-600' :'text-text-secondary hover:text-text-primary hover:bg-surface'
                  }`}
                >
                  <Icon name={item.icon} size={20} />
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;