'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up');
  const [lastScrollY, setLastScrollY] = useState(0);

  const navigationItems = [
    { label: 'Work', href: '/work-portfolio' },
    { label: 'About', href: '/about' },
    { label: 'Capabilities', href: '/capabilities' },
    { label: 'Insights', href: '/insights' },
  ];

  const moreMenuItems = [
    { label: 'Recognition', href: '/recognition' },
    { label: 'Team', href: '/team' },
    { label: 'Contact', href: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setScrollDirection('down');
      } else {
        setScrollDirection('up');
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ease-confident ${
        scrollDirection === 'down' && !isMobileMenuOpen ? '-translate-y-full' : 'translate-y-0'
      } ${
        isScrolled
          ? 'bg-background/80 backdrop-blur-[20px] shadow-subtle'
          : 'bg-transparent'
      }`}
    >
      <div className="w-full">
        <div className="flex items-center justify-between h-20 px-6 lg:px-12">
          {/* Logo */}
          <Link 
            href="/homepage" 
            className="flex items-center group transition-opacity duration-300 hover:opacity-80"
          >
            <svg
              width="180"
              height="40"
              viewBox="0 0 180 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="transition-transform duration-300 group-hover:scale-105"
            >
              <text
                x="0"
                y="28"
                fontFamily="Playfair Display"
                fontSize="24"
                fontWeight="700"
                fill="var(--color-primary)"
                letterSpacing="0.05em"
              >
                ATELIER
              </text>
              <text
                x="0"
                y="38"
                fontFamily="JetBrains Mono"
                fontSize="10"
                fontWeight="400"
                fill="var(--color-text-secondary)"
                letterSpacing="0.2em"
              >
                STUDIO
              </text>
            </svg>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navigationItems?.map((item) => (
              <Link
                key={item?.href}
                href={item?.href}
                className="font-cta font-medium text-sm text-foreground/80 hover:text-primary transition-colors duration-300 relative group"
              >
                {item?.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}

            {/* More Dropdown */}
            <div className="relative group">
              <button className="font-cta font-medium text-sm text-foreground/80 hover:text-primary transition-colors duration-300 flex items-center gap-1">
                More
                <Icon name="ChevronDownIcon" size={16} className="transition-transform duration-300 group-hover:rotate-180" />
              </button>
              
              <div className="absolute top-full right-0 mt-2 w-48 bg-surface/95 backdrop-blur-[20px] border border-border rounded-md shadow-dramatic opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                {moreMenuItems?.map((item) => (
                  <Link
                    key={item?.href}
                    href={item?.href}
                    className="block px-4 py-3 font-cta text-sm text-foreground/80 hover:text-primary hover:bg-muted/50 transition-colors duration-300 first:rounded-t-md last:rounded-b-md"
                  >
                    {item?.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <Link
              href="/contact"
              className="px-6 py-2.5 bg-accent text-accent-foreground font-cta font-semibold text-sm rounded-md hover:bg-accent/90 hover:-translate-y-0.5 hover:shadow-dramatic transition-all duration-300"
            >
              Start Conversation
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-foreground hover:text-primary transition-colors duration-300"
            aria-label="Toggle menu"
          >
            <Icon 
              name={isMobileMenuOpen ? 'XMarkIcon' : 'Bars3Icon'} 
              size={24} 
            />
          </button>
        </div>
      </div>
      {/* Mobile Menu Overlay */}
      <div
        className={`lg:hidden fixed inset-0 top-20 bg-background/95 backdrop-blur-[20px] transition-all duration-400 ease-confident ${
          isMobileMenuOpen
            ? 'opacity-100 visible' :'opacity-0 invisible'
        }`}
      >
        <nav className="flex flex-col p-6 gap-1">
          {navigationItems?.map((item, index) => (
            <Link
              key={item?.href}
              href={item?.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-4 px-4 font-cta font-medium text-base text-foreground/80 hover:text-primary hover:bg-muted/50 rounded-md transition-all duration-300"
              style={{
                animation: isMobileMenuOpen ? `slideIn 0.3s ease-out ${index * 0.1}s both` : 'none'
              }}
            >
              {item?.label}
            </Link>
          ))}

          <div className="h-px bg-border my-2" />

          {moreMenuItems?.map((item, index) => (
            <Link
              key={item?.href}
              href={item?.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-4 px-4 font-cta font-medium text-base text-foreground/80 hover:text-primary hover:bg-muted/50 rounded-md transition-all duration-300"
              style={{
                animation: isMobileMenuOpen ? `slideIn 0.3s ease-out ${(navigationItems?.length + index) * 0.1}s both` : 'none'
              }}
            >
              {item?.label}
            </Link>
          ))}

          <Link
            href="/contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className="mt-4 py-4 px-6 bg-accent text-accent-foreground font-cta font-semibold text-base rounded-md hover:bg-accent/90 transition-all duration-300 text-center"
            style={{
              animation: isMobileMenuOpen ? `slideIn 0.3s ease-out ${(navigationItems?.length + moreMenuItems?.length) * 0.1}s both` : 'none'
            }}
          >
            Start Conversation
          </Link>
        </nav>
      </div>
      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </header>
  );
};

export default Header;