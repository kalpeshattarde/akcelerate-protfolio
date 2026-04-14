import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const Header = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    {
      label: 'Operations',
      items: [
        {
          label: 'Real-Time Monitor',
          path: '/real-time-operations-monitor',
          icon: 'Activity',
          description: 'Live operational monitoring'
        },
        {
          label: 'Inventory Overview',
          path: '/pharmacy-inventory-overview-dashboard',
          icon: 'Package',
          description: 'Comprehensive inventory dashboard'
        }
      ]
    },
    {
      label: 'Compliance',
      items: [
        {
          label: 'Expiry Management',
          path: '/expiry-management-compliance-dashboard',
          icon: 'Calendar',
          description: 'Regulatory compliance tracking'
        }
      ]
    },
    {
      label: 'Analytics',
      items: [
        {
          label: 'Supply Chain',
          path: '/supply-chain-analytics-dashboard',
          icon: 'TrendingUp',
          description: 'Strategic procurement insights'
        }
      ]
    }
  ];

  const isActiveSection = (sectionItems) => {
    return sectionItems.some(item => location.pathname === item.path);
  };

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-surface border-b border-border z-navigation">
      <div className="px-lg py-md">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
              <Icon name="Cross" size={20} color="white" strokeWidth={2.5} />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-semibold text-text-primary font-heading">
                MedInventory
              </span>
              <span className="text-xs text-text-secondary font-caption">
                Healthcare Solutions
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((section, sectionIndex) => (
              <div key={sectionIndex} className="relative group">
                <button className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-smooth font-medium ${
                  isActiveSection(section.items)
                    ? 'text-primary bg-primary/10' :'text-text-secondary hover:text-primary hover:bg-primary/5'
                }`}>
                  <span>{section.label}</span>
                  <Icon name="ChevronDown" size={16} />
                </button>
                
                {/* Dropdown Menu */}
                <div className="absolute top-full left-0 mt-1 w-64 bg-surface border border-border rounded-md shadow-modal opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-smooth z-dropdown">
                  <div className="py-2">
                    {section.items.map((item, itemIndex) => (
                      <Link
                        key={itemIndex}
                        to={item.path}
                        className={`flex items-center space-x-3 px-4 py-3 transition-smooth ${
                          isActivePath(item.path)
                            ? 'text-primary bg-primary/10 border-r-2 border-primary' :'text-text-primary hover:text-primary hover:bg-primary/5'
                        }`}
                      >
                        <Icon name={item.icon} size={18} />
                        <div className="flex-1">
                          <div className="font-medium">{item.label}</div>
                          <div className="text-xs text-text-secondary">{item.description}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </nav>

          {/* User Context Panel */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-text-secondary">
              <Icon name="MapPin" size={16} />
              <span>Main Pharmacy</span>
            </div>
            <div className="relative group">
              <button className="flex items-center space-x-2 px-3 py-2 rounded-md border border-border hover:bg-background transition-smooth">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <Icon name="User" size={16} color="currentColor" />
                </div>
                <div className="text-left">
                  <div className="text-sm font-medium text-text-primary">Dr. Smith</div>
                  <div className="text-xs text-text-secondary">Pharmacy Manager</div>
                </div>
                <Icon name="ChevronDown" size={16} />
              </button>
              
              {/* User Dropdown */}
              <div className="absolute top-full right-0 mt-1 w-48 bg-surface border border-border rounded-md shadow-modal opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-smooth z-dropdown">
                <div className="py-2">
                  <button className="flex items-center space-x-2 w-full px-4 py-2 text-left text-text-primary hover:bg-background transition-smooth">
                    <Icon name="Settings" size={16} />
                    <span>Settings</span>
                  </button>
                  <button className="flex items-center space-x-2 w-full px-4 py-2 text-left text-text-primary hover:bg-background transition-smooth">
                    <Icon name="Phone" size={16} />
                    <span>Emergency Contacts</span>
                  </button>
                  <hr className="my-1 border-border" />
                  <button className="flex items-center space-x-2 w-full px-4 py-2 text-left text-error hover:bg-error/5 transition-smooth">
                    <Icon name="LogOut" size={16} />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 rounded-md border border-border hover:bg-background transition-smooth"
          >
            <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-border">
            <div className="pt-4 space-y-2">
              {navigationItems.map((section, sectionIndex) => (
                <div key={sectionIndex} className="space-y-1">
                  <div className="px-2 py-1 text-sm font-medium text-text-secondary">
                    {section.label}
                  </div>
                  {section.items.map((item, itemIndex) => (
                    <Link
                      key={itemIndex}
                      to={item.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-md transition-smooth ${
                        isActivePath(item.path)
                          ? 'text-primary bg-primary/10' :'text-text-primary hover:text-primary hover:bg-primary/5'
                      }`}
                    >
                      <Icon name={item.icon} size={18} />
                      <div className="flex-1">
                        <div className="font-medium">{item.label}</div>
                        <div className="text-xs text-text-secondary">{item.description}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              ))}
              
              {/* Mobile User Info */}
              <div className="pt-4 mt-4 border-t border-border">
                <div className="flex items-center space-x-3 px-4 py-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Icon name="User" size={20} />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-text-primary">Dr. Smith</div>
                    <div className="text-sm text-text-secondary">Main Pharmacy • Manager</div>
                  </div>
                </div>
                <div className="px-4 space-y-1">
                  <button className="flex items-center space-x-2 w-full px-2 py-2 text-left text-text-primary hover:bg-background rounded-md transition-smooth">
                    <Icon name="Settings" size={16} />
                    <span>Settings</span>
                  </button>
                  <button className="flex items-center space-x-2 w-full px-2 py-2 text-left text-text-primary hover:bg-background rounded-md transition-smooth">
                    <Icon name="Phone" size={16} />
                    <span>Emergency Contacts</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;