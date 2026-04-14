'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Icon from '@/components/ui/AppIcon';

interface HeaderProps {
  className?: string;
}

const Header = ({ className = '' }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    { name: 'Home', path: '/homepage' },
    { name: 'Courses', path: '/course-catalog' },
    { name: 'Dashboard', path: '/student-dashboard' },
    { name: 'Community', path: '/community' },
    { name: 'Pricing', path: '/pricing' },
  ];

  const isActivePath = (path: string) => pathname === path;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-card shadow-md' : 'bg-card'
      } ${className}`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-20 px-6 lg:px-8">
          <Link href="/homepage" className="flex items-center space-x-3 group">
            <div className="relative">
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="transition-transform duration-300 group-hover:scale-105"
              >
                <circle cx="20" cy="20" r="18" fill="#6B8E6B" opacity="0.1" />
                <path
                  d="M20 8C13.373 8 8 13.373 8 20C8 26.627 13.373 32 20 32C26.627 32 32 26.627 32 20C32 13.373 26.627 8 20 8ZM20 10C25.514 10 30 14.486 30 20C30 25.514 25.514 30 20 30C14.486 30 10 25.514 10 20C10 14.486 14.486 10 20 10Z"
                  fill="#6B8E6B"
                />
                <path
                  d="M20 14C16.686 14 14 16.686 14 20C14 23.314 16.686 26 20 26C23.314 26 26 23.314 26 20C26 16.686 23.314 14 20 14ZM20 16C22.209 16 24 17.791 24 20C24 22.209 22.209 24 20 24C17.791 24 16 22.209 16 20C16 17.791 17.791 16 20 16Z"
                  fill="#6B8E6B"
                />
                <circle cx="20" cy="20" r="3" fill="#D4A574" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-headline font-semibold text-foreground tracking-tight">
                EduZen Academy
              </span>
              <span className="text-xs font-body text-muted-foreground -mt-1">
                Mindful Learning
              </span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`relative px-4 py-2 font-body font-medium text-sm transition-colors duration-300 rounded-lg group ${
                  isActivePath(item.path)
                    ? 'text-primary' :'text-foreground hover:text-primary'
                }`}
              >
                {item.name}
                <span
                  className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-primary transition-all duration-300 ease-out ${
                    isActivePath(item.path)
                      ? 'w-8' :'w-0 group-hover:w-8'
                  }`}
                />
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center space-x-4">
            <Link
              href="/student-dashboard"
              className="px-6 py-2.5 font-cta font-medium text-sm text-primary border border-primary rounded-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:-translate-y-0.5"
            >
              Sign In
            </Link>
            <Link
              href="/pricing"
              className="px-6 py-2.5 font-cta font-semibold text-sm text-primary-foreground bg-primary rounded-lg hover:shadow-cta transition-all duration-300 hover:-translate-y-0.5"
            >
              Get Started
            </Link>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-foreground hover:text-primary transition-colors duration-300"
            aria-label="Toggle mobile menu"
          >
            <Icon
              name={isMobileMenuOpen ? 'XMarkIcon' : 'Bars3Icon'}
              size={24}
            />
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden bg-card border-t border-border">
          <nav className="px-6 py-4 space-y-1">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-4 py-3 font-body font-medium text-sm rounded-lg transition-colors duration-300 ${
                  isActivePath(item.path)
                    ? 'text-primary bg-primary/5' :'text-foreground hover:text-primary hover:bg-muted'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 space-y-2 border-t border-border mt-4">
              <Link
                href="/student-dashboard"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full px-4 py-3 font-cta font-medium text-sm text-center text-primary border border-primary rounded-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                Sign In
              </Link>
              <Link
                href="/pricing"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full px-4 py-3 font-cta font-semibold text-sm text-center text-primary-foreground bg-primary rounded-lg hover:shadow-cta transition-all duration-300"
              >
                Get Started
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;