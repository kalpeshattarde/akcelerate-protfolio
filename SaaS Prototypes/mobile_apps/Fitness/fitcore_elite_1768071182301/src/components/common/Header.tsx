'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Icon from '@/components/ui/AppIcon';

interface HeaderProps {
  isScrolled?: boolean;
}

const Header = ({ isScrolled = false }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(isScrolled);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    { name: 'Home', href: '/homepage', icon: 'HomeIcon' },
    { name: 'Programs', href: '/programs', icon: 'AcademicCapIcon' },
    { name: 'Trainers', href: '/trainers', icon: 'UserGroupIcon' },
    { name: 'Membership', href: '/membership', icon: 'CreditCardIcon' },
    { name: 'Facility', href: '/facility', icon: 'BuildingOfficeIcon' },
  ];

  const secondaryItems = [
    { name: 'Success Stories', href: '/success-stories', icon: 'TrophyIcon' },
    { name: 'Contact', href: '/contact', icon: 'PhoneIcon' },
  ];

  const isActiveRoute = (href: string) => {
    return pathname === href;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
        scrolled 
          ? 'bg-black/75 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/25' 
          : 'bg-transparent backdrop-blur-sm'
      }`}
      style={{
        backdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'blur(8px)',
        WebkitBackdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'blur(8px)',
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-16 lg:h-20 px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/homepage" className="flex items-center space-x-2 sm:space-x-3 group flex-shrink-0">
            <div className="relative">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                <span className="text-background font-bold text-lg sm:text-xl">FC</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-lg opacity-0 group-hover:opacity-20 blur-lg transition-opacity duration-300"></div>
            </div>
            <div className="hidden sm:block">
              <h1 className={`text-lg sm:text-xl lg:text-2xl font-bold transition-colors duration-300 ${
                scrolled ? 'text-white' : 'text-foreground'
              }`}>
                FitCore <span className="text-primary">Elite</span>
              </h1>
              <p className={`text-xs font-mono transition-colors duration-300 ${
                scrolled ? 'text-gray-300' : 'text-muted-foreground'
              }`}>
                Performance Laboratory
              </p>
            </div>
          </Link>

          {/* Desktop Navigation - Optimized for 826px breakpoint */}
          <nav className="hidden lg:flex items-center space-x-1 flex-grow justify-center">
            {navigationItems.slice(0, 4).map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`relative px-3 xl:px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 group ${
                  isActiveRoute(item.href)
                    ? scrolled
                      ? 'text-primary bg-primary/20 shadow-sm shadow-primary/25'
                      : 'text-primary bg-primary/10'
                    : scrolled
                      ? 'text-gray-200 hover:text-white hover:bg-white/10' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                <span className="relative z-10">{item.name}</span>
                {isActiveRoute(item.href) && (
                  <div className={`absolute inset-0 rounded-lg border transition-colors duration-300 ${
                    scrolled ? 'bg-primary/10 border-primary/30' : 'bg-primary/5 border-primary/20'
                  }`}></div>
                )}
              </Link>
            ))}
            
            {/* Facility Link - Special handling for 826px viewport overflow prevention */}
            <Link
              href="/facility"
              className={`relative px-3 xl:px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 group ${
                isActiveRoute('/facility')
                  ? scrolled
                    ? 'text-primary bg-primary/20 shadow-sm shadow-primary/25'
                    : 'text-primary bg-primary/10'
                  : scrolled
                    ? 'text-gray-200 hover:text-white hover:bg-white/10' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              <span className="relative z-10">Facility</span>
              {isActiveRoute('/facility') && (
                <div className={`absolute inset-0 rounded-lg border transition-colors duration-300 ${
                  scrolled ? 'bg-primary/10 border-primary/30' : 'bg-primary/5 border-primary/20'
                }`}></div>
              )}
            </Link>
            
            {/* More Menu - Collapsed for better space usage at 826px */}
            <div className="relative group">
              <button className={`flex items-center space-x-1 px-2 xl:px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                scrolled 
                  ? 'text-gray-200 hover:text-white hover:bg-white/10' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}>
                <span className="hidden xl:inline">More</span>
                <Icon name="EllipsisHorizontalIcon" size={16} />
              </button>
              
              {/* Dropdown */}
              <div className={`absolute top-full right-0 mt-2 w-48 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 ${
                scrolled 
                  ? 'bg-black/90 backdrop-blur-xl border border-white/20' :'bg-popover border border-border shadow-modal'
              }`}>
                <div className="py-2">
                  {secondaryItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`flex items-center space-x-3 px-4 py-2 text-sm transition-colors duration-200 ${
                        isActiveRoute(item.href)
                          ? scrolled
                            ? 'text-primary bg-primary/20' :'text-primary bg-primary/10'
                          : scrolled
                            ? 'text-gray-200 hover:text-white hover:bg-white/10' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                      }`}
                    >
                      <Icon name={item.icon as any} size={16} />
                      <span>{item.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </nav>

          {/* CTA Button - Responsive sizing */}
          <div className="hidden lg:flex items-center space-x-4 flex-shrink-0">
            <Link
              href="/membership"
              className="px-4 xl:px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-semibold text-sm hover:bg-primary/90 hover:scale-105 transition-all duration-300 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 whitespace-nowrap"
            >
              <span className="hidden xl:inline">Start Elite Journey</span>
              <span className="xl:hidden">Join Elite</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className={`lg:hidden p-2 rounded-lg transition-colors duration-200 flex-shrink-0 ${
              scrolled 
                ? 'text-gray-200 hover:text-white hover:bg-white/10' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
            }`}
            aria-label="Toggle mobile menu"
          >
            <Icon 
              name={isMobileMenuOpen ? "XMarkIcon" : "Bars3Icon"} 
              size={24} 
            />
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className={`px-6 py-4 backdrop-blur-xl border-t transition-colors duration-300 ${
            scrolled 
              ? 'bg-black/80 border-white/10' :'bg-card/95 border-border'
          }`}>
            <nav className="space-y-2">
              {[...navigationItems, ...secondaryItems].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActiveRoute(item.href)
                      ? scrolled
                        ? 'text-primary bg-primary/20 border border-primary/30' :'text-primary bg-primary/10 border border-primary/20'
                      : scrolled
                        ? 'text-gray-200 hover:text-white hover:bg-white/10' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  <Icon name={item.icon as any} size={20} />
                  <span>{item.name}</span>
                </Link>
              ))}
            </nav>
            
            <div className="mt-6 pt-4 border-t border-white/10">
              <Link
                href="/membership"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold text-center hover:bg-primary/90 transition-colors duration-300 shadow-lg shadow-primary/25"
              >
                Start Elite Journey
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;