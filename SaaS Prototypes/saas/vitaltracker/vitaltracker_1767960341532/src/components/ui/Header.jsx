import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Mock user data - in a real app, this would come from auth context
  const userData = {
    name: "Sarah Johnson",
    avatar: "/assets/images/sarah_johnson_member_profile.png",
    email: "sarah.johnson@example.com",
    initials: "SJ"
  };

  const navigationItems = [
    { 
      label: 'Dashboard', 
      path: '/dashboard', 
      icon: 'LayoutDashboard', 
      tooltip: 'Overview of your wellness metrics',
      description: 'Your health at a glance'
    },
    { 
      label: 'Activity', 
      path: '/activity-tracking', 
      icon: 'Activity', 
      tooltip: 'Track your physical activities and steps',
      description: 'Movement & exercise tracking'
    },
    { 
      label: 'Nutrition', 
      path: '/nutrition-tracking', 
      icon: 'Apple', 
      tooltip: 'Monitor your calorie intake and meals',
      description: 'Food & hydration logging'
    },
    { 
      label: 'Sleep', 
      path: '/sleep-analysis', 
      icon: 'Moon', 
      tooltip: 'Analyze your sleep patterns and quality',
      description: 'Rest & recovery insights'
    },
    { 
      label: 'Reports', 
      path: '/progress-reports', 
      icon: 'TrendingUp', 
      tooltip: 'View your long-term progress analytics',
      description: 'Progress & trends analysis'
    }
  ];

  const secondaryItems = [
    { 
      label: 'Profile', 
      path: '/profile-settings', 
      icon: 'Settings', 
      tooltip: 'Manage your account and preferences',
      description: 'Account & preferences'
    }
  ];

  const isActive = (path) => location?.pathname === path;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleProfileClick = () => {
    // Navigate to profile settings or show profile menu
    window.location.href = '/profile-settings';
  };

  return (
    <motion.header 
      className="sticky top-0 z-50 w-full bg-card/95 border-b border-border/40 wellness-blur supports-[backdrop-filter]:bg-card/95"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="flex h-16 items-center px-4 lg:px-6">
        {/* Enhanced Logo */}
        <Link 
          to="/dashboard" 
          className="flex items-center space-x-3 mr-8 group focus-wellness"
        >
          <motion.div 
            className="flex items-center justify-center w-9 h-9 wellness-gradient-primary rounded-xl wellness-elevation-1"
            whileHover={{ scale: 1.05, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <Icon name="Heart" size={20} color="white" />
          </motion.div>
          <div className="hidden sm:block">
            <span className="font-bold text-xl text-foreground tracking-tight">VitalTracker</span>
            <div className="text-xs text-muted-foreground -mt-1">Health & Wellness</div>
          </div>
        </Link>

        {/* Desktop Navigation - Enhanced */}
        <nav className="hidden md:flex items-center space-x-1 flex-1">
          {navigationItems?.map((item) => (
            <Link
              key={item?.path}
              to={item?.path}
              className={`
                group relative flex items-center space-x-2 px-4 py-2.5 rounded-xl text-sm font-medium 
                transition-all duration-200 touch-target focus-wellness
                ${isActive(item?.path) 
                  ? 'bg-primary text-primary-foreground wellness-elevation-1' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }
              `}
              title={item?.tooltip}
            >
              <Icon name={item?.icon} size={18} />
              <span className="text-constrained">{item?.label}</span>
              
              {/* Active indicator */}
              {isActive(item?.path) && (
                <motion.div
                  className="absolute -bottom-1 left-1/2 w-1 h-1 bg-primary-foreground rounded-full"
                  layoutId="activeIndicator"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  style={{ translateX: '-50%' }}
                />
              )}
              
              {/* Hover tooltip */}
              <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
                <div className="bg-foreground text-background text-xs px-2 py-1 rounded-md whitespace-nowrap">
                  {item?.tooltip}
                  <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-foreground rotate-45" />
                </div>
              </div>
            </Link>
          ))}
        </nav>

        {/* Enhanced Desktop User Profile Section */}
        <div className="hidden md:flex items-center space-x-4 ml-4 h-full">
          {/* Wellness Score Indicator */}
          <div className="flex items-center space-x-2 px-3 py-1.5 bg-gradient-to-r from-success/15 to-success/10 rounded-lg border border-success/30 backdrop-blur-sm">
            <Icon name="Target" size={14} color="#48BB78" />
            <span className="text-xs font-medium text-success whitespace-nowrap">85% Wellness</span>
          </div>

          {/* User Profile Button - Enhanced for strict text containment and darker colors */}
          <motion.button
            onClick={handleProfileClick}
            className="flex items-center space-x-2 px-3 py-2 rounded-xl text-sm font-medium h-12
                     bg-gradient-to-r from-white to-slate-50 dark:from-slate-900 dark:to-slate-800
                     shadow-lg
                     hover:from-slate-50 hover:to-slate-100 dark:hover:from-slate-800 dark:hover:to-slate-700
                     hover:shadow-xl
                     focus:outline-none focus:ring-2 focus:ring-primary/40 focus:ring-offset-2 focus:ring-offset-background
                     transition-all duration-300 touch-target group
                     w-[170px] min-w-[170px] max-w-[170px] overflow-hidden"
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            title={`Signed in as ${userData?.name}`}
            aria-label={`User profile menu for ${userData?.name}`}
          >
            {/* Avatar with enhanced styling */}
            <div className="relative flex-shrink-0">
              <div className="w-8 h-8 rounded-lg overflow-hidden bg-primary/15 border-2 border-primary/40 group-hover:border-primary/60 transition-all duration-300 shadow-md">
                {userData?.avatar ? (
                  <img 
                    src={userData?.avatar}
                    alt={userData?.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-primary text-primary-foreground text-xs font-bold">
                    {userData?.initials}
                  </div>
                )}
              </div>
              {/* Enhanced online indicator */}
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-success border border-white dark:border-slate-800 rounded-full shadow-sm"></div>
            </div>

            {/* User Info with enhanced dark text and strict overflow prevention */}
            <div className="flex-1 min-w-0 text-left overflow-hidden max-w-[90px]">
              <div className="text-slate-900 dark:text-slate-50 font-bold leading-tight text-sm overflow-hidden text-ellipsis whitespace-nowrap">
                {userData?.name?.length > 8 ? `${userData?.name?.substring(0, 8)}...` : userData?.name}
              </div>
              <div className="text-xs text-slate-800 dark:text-slate-100 font-semibold leading-tight overflow-hidden text-ellipsis whitespace-nowrap">
                Member
              </div>
            </div>

            {/* Enhanced Dropdown Arrow */}
            <Icon 
              name="ChevronDown" 
              size={14} 
              className="flex-shrink-0 text-slate-900 dark:text-slate-100 group-hover:text-primary transition-all duration-300 group-hover:rotate-180" 
            />
          </motion.button>

          {/* Settings Quick Access with better contrast */}
          <Link
            to="/profile-settings"
            className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-600
                     text-slate-600 dark:text-slate-400 hover:text-primary hover:bg-slate-100 dark:hover:bg-slate-700
                     hover:border-primary/30 shadow-sm hover:shadow-md
                     focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2 focus:ring-offset-background
                     transition-all duration-300 touch-target h-12 flex items-center justify-center"
            title="Profile Settings"
            aria-label="Go to profile settings"
          >
            <Icon name="Settings" size={18} />
          </Link>
        </div>

        {/* Enhanced Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden ml-auto rounded-xl focus-wellness"
          onClick={toggleMobileMenu}
          aria-label="Toggle navigation menu"
        >
          <motion.div
            animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <Icon name={isMobileMenuOpen ? 'X' : 'Menu'} size={20} />
          </motion.div>
        </Button>
      </div>
      {/* Enhanced Mobile Navigation Menu */}
      <motion.div
        className="md:hidden border-t border-border/40 bg-card/95 wellness-blur"
        initial={{ opacity: 0, height: 0 }}
        animate={{ 
          opacity: isMobileMenuOpen ? 1 : 0,
          height: isMobileMenuOpen ? 'auto' : 0 
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        style={{ overflow: 'hidden' }}
      >
        {isMobileMenuOpen && (
          <nav className="wellness-fade-in">
            {/* Mobile User Profile Section */}
            <div className="wellness-spacing-md border-b border-border/40">
              <motion.button
                onClick={handleProfileClick}
                className="flex items-center space-x-4 w-full wellness-spacing-sm rounded-xl text-sm font-medium
                         bg-card/80 border border-border/60 shadow-sm
                         hover:bg-accent/50 hover:border-accent/80
                         focus:outline-none focus:ring-2 focus:ring-primary/20
                         transition-all duration-200 touch-target"
                whileTap={{ scale: 0.98 }}
              >
                {/* Avatar */}
                <div className="relative flex-shrink-0">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-primary/10 border-2 border-primary/20">
                    {userData?.avatar ? (
                      <img 
                        src={userData?.avatar}
                        alt={userData?.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-primary text-primary-foreground text-sm font-medium">
                        {userData?.initials}
                      </div>
                    )}
                  </div>
                  {/* Online indicator */}
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success border-2 border-background rounded-full"></div>
                </div>

                {/* User Info */}
                <div className="flex-1 min-w-0 text-left">
                  <div className="font-medium text-foreground truncate">
                    {userData?.name}
                  </div>
                  <div className="text-xs text-muted-foreground truncate">
                    {userData?.email}
                  </div>
                  <div className="text-xs text-success mt-1">
                    View Profile Settings
                  </div>
                </div>

                {/* Arrow */}
                <Icon name="ChevronRight" size={16} className="flex-shrink-0 text-muted-foreground" />
              </motion.button>
            </div>

            {/* Primary Navigation */}
            <div className="wellness-spacing-md space-y-2">
              <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
                Navigation
              </div>
              {navigationItems?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`
                    flex items-center space-x-4 wellness-spacing-sm rounded-xl text-sm font-medium 
                    transition-all duration-200 touch-target focus-wellness
                    ${isActive(item?.path) 
                      ? 'bg-primary text-primary-foreground wellness-elevation-1' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    }
                  `}
                >
                  <div 
                    className={`flex items-center justify-center w-10 h-10 rounded-lg ${
                      isActive(item?.path) ? 'bg-primary-foreground/20' : 'bg-muted/30'
                    }`}
                  >
                    <Icon name={item?.icon} size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-constrained">{item?.label}</div>
                    <div className={`text-xs opacity-75 text-constrained ${
                      isActive(item?.path) ? 'text-primary-foreground' : 'text-muted-foreground'
                    }`}>
                      {item?.description}
                    </div>
                  </div>
                  {isActive(item?.path) && (
                    <div className="w-2 h-2 bg-primary-foreground rounded-full" />
                  )}
                </Link>
              ))}
            </div>
            
            {/* Secondary Navigation */}
            <div className="border-t border-border/40 wellness-spacing-md">
              <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
                Account
              </div>
              {secondaryItems?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`
                    flex items-center space-x-4 wellness-spacing-sm rounded-xl text-sm font-medium 
                    transition-all duration-200 touch-target focus-wellness
                    ${isActive(item?.path) 
                      ? 'bg-accent text-accent-foreground wellness-elevation-1' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    }
                  `}
                >
                  <div 
                    className={`flex items-center justify-center w-10 h-10 rounded-lg ${
                      isActive(item?.path) ? 'bg-accent-foreground/20' : 'bg-muted/30'
                    }`}
                  >
                    <Icon name={item?.icon} size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-constrained">{item?.label}</div>
                    <div className={`text-xs opacity-75 text-constrained ${
                      isActive(item?.path) ? 'text-accent-foreground' : 'text-muted-foreground'
                    }`}>
                      {item?.description}
                    </div>
                  </div>
                  {isActive(item?.path) && (
                    <div className="w-2 h-2 bg-accent-foreground rounded-full" />
                  )}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </motion.div>
    </motion.header>
  );
};

export default Header;