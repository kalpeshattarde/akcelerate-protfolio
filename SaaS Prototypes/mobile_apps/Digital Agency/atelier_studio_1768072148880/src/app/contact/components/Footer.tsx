'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';


const Footer: React.FC = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [currentYear, setCurrentYear] = useState('2025');

  useEffect(() => {
    setIsHydrated(true);
    setCurrentYear(new Date().getFullYear().toString());
  }, []);

  const footerLinks = {
    studio: [
      { label: 'About', href: '/about' },
      { label: 'Work', href: '/work-portfolio' },
      { label: 'Capabilities', href: '/capabilities' },
      { label: 'Recognition', href: '/recognition' },
    ],
    resources: [
      { label: 'Insights', href: '/insights' },
      { label: 'Team', href: '/team' },
      { label: 'Contact', href: '/contact' },
    ],
  };

  if (!isHydrated) {
    return (
      <footer className="bg-surface border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-muted rounded w-1/4" />
            <div className="h-4 bg-muted rounded w-1/2" />
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-surface border-t border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/homepage" className="inline-block mb-6">
              <svg
                width="180"
                height="40"
                viewBox="0 0 180 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
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
            <p className="font-body text-text-secondary mb-6 max-w-md">
              A creative studio where digital innovation meets timeless craftsmanship. We create exceptional experiences through strategic thinking and meticulous attention to detail.
            </p>
            <div className="flex gap-4">
              {['📷', '💼', '🐦', '🏀'].map((emoji, index) => (
                <a
                  key={index}
                  href="#"
                  className="flex items-center justify-center w-10 h-10 bg-muted rounded-full hover:bg-primary/20 hover:scale-110 transition-all duration-300 text-xl"
                  aria-label={`Social link ${index + 1}`}
                >
                  {emoji}
                </a>
              ))}
            </div>
          </div>

          {/* Studio Links */}
          <div>
            <h3 className="font-cta font-semibold text-foreground mb-4">Studio</h3>
            <ul className="space-y-3">
              {footerLinks.studio.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-text-secondary hover:text-primary transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="font-cta font-semibold text-foreground mb-4">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-text-secondary hover:text-primary transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-body text-sm text-text-secondary">
            &copy; {currentYear} Atelier Studio. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="font-body text-sm text-text-secondary hover:text-primary transition-colors duration-300">
              Privacy Policy
            </a>
            <a href="#" className="font-body text-sm text-text-secondary hover:text-primary transition-colors duration-300">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;