import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    { name: 'Home', path: '/homepage', icon: 'Home' },
    { name: 'About', path: '/about', icon: 'Users' },
    { name: 'Services', path: '/services', icon: 'Briefcase' },
    { name: 'Portfolio', path: '/portfolio', icon: 'FolderOpen' },
    { name: 'Insights', path: '/insights', icon: 'BookOpen' }
  ];

  const secondaryItems = [
    { name: 'Contact', path: '/contact', icon: 'Mail' },
    { name: 'Careers', path: '/careers', icon: 'Users' }
  ];

  const isActivePath = (path) => {
    return location?.pathname === path || (path === '/homepage' && location?.pathname === '/');
  };

  const Logo = () => (
    <Link to="/homepage" className="flex items-center space-x-3 group">
      <div className="relative">
        <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center organic-shape transition-all duration-500 group-hover:shadow-glow">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className="text-white"
          >
            <path
              d="M12 2L2 7L12 12L22 7L12 2Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2 17L12 22L22 17"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2 12L12 17L22 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
      </div>
      <div className="hidden sm:block">
        <h1 className="text-xl font-semibold text-text-primary group-hover:text-primary transition-colors duration-300">
          FlowTech Studio
        </h1>
        <p className="text-xs text-text-secondary font-medium tracking-wide">
          Technology with Soul
        </p>
      </div>
    </Link>
  );

  const NavLink = ({ item, isMobile = false }) => (
    <Link
      to={item?.path}
      className={`
        group relative flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300
        ${isMobile ? 'w-full justify-start' : ''}
        ${isActivePath(item?.path) 
          ? 'text-primary bg-primary/5' :'text-text-secondary hover:text-primary hover:bg-primary/5'
        }
      `}
      onClick={() => isMobile && setIsMobileMenuOpen(false)}
    >
      <Icon 
        name={item?.icon} 
        size={16} 
        className={`transition-colors duration-300 ${
          isActivePath(item?.path) ? 'text-primary' : 'text-text-secondary group-hover:text-primary'
        }`}
      />
      <span className="font-medium text-sm">{item?.name}</span>
      {isActivePath(item?.path) && (
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full"></div>
      )}
    </Link>
  );

  const MoreDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-1 px-3 py-2 text-text-secondary hover:text-primary transition-colors duration-300 rounded-lg hover:bg-primary/5"
        >
          <Icon name="MoreHorizontal" size={16} />
          <span className="font-medium text-sm">More</span>
        </button>
        {isOpen && (
          <>
            <div 
              className="fixed inset-0 z-40" 
              onClick={() => setIsOpen(false)}
            ></div>
            <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-lg shadow-strong z-50 py-2">
              {secondaryItems?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  className={`
                    flex items-center space-x-3 px-4 py-2 text-sm transition-colors duration-200
                    ${isActivePath(item?.path) 
                      ? 'text-primary bg-primary/5' :'text-text-secondary hover:text-primary hover:bg-primary/5'
                    }
                  `}
                  onClick={() => setIsOpen(false)}
                >
                  <Icon name={item?.icon} size={16} />
                  <span>{item?.name}</span>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <header 
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-400 organic
        ${isScrolled 
          ? 'bg-background/95 backdrop-blur-md shadow-medium border-b border-border' 
          : 'bg-transparent'
        }
      `}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems?.map((item) => (
              <NavLink key={item?.path} item={item} />
            ))}
            <MoreDropdown />
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              className="btn-magnetic"
            >
              <Icon name="Calendar" size={16} className="mr-2" />
              Schedule Call
            </Button>
            <Button
              variant="default"
              size="sm"
              className="btn-magnetic animate-breathe"
            >
              Start Project
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-text-secondary hover:text-primary transition-colors duration-300 rounded-lg hover:bg-primary/5"
          >
            <Icon 
              name={isMobileMenuOpen ? "X" : "Menu"} 
              size={24} 
            />
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <>
          <div 
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>
          <div className="fixed top-16 left-0 right-0 bg-background border-b border-border shadow-strong z-50 lg:hidden">
            <nav className="px-4 py-6 space-y-2">
              {navigationItems?.map((item) => (
                <NavLink key={item?.path} item={item} isMobile />
              ))}
              <div className="border-t border-border pt-4 mt-4 space-y-2">
                {secondaryItems?.map((item) => (
                  <NavLink key={item?.path} item={item} isMobile />
                ))}
              </div>
              <div className="border-t border-border pt-4 mt-4 space-y-3">
                <Button
                  variant="outline"
                  fullWidth
                  className="justify-center"
                >
                  <Icon name="Calendar" size={16} className="mr-2" />
                  Schedule Call
                </Button>
                <Button
                  variant="default"
                  fullWidth
                  className="justify-center animate-breathe"
                >
                  Start Project
                </Button>
              </div>
            </nav>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;