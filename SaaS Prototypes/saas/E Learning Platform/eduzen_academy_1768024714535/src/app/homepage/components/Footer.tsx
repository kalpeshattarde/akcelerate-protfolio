'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

const Footer = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [currentYear, setCurrentYear] = useState('');

  useEffect(() => {
    setIsHydrated(true);
    setCurrentYear(new Date().getFullYear().toString());
  }, []);

  const footerLinks = {
    platform: [
      { name: 'Browse Courses', path: '/course-catalog' },
      { name: 'Pricing Plans', path: '/pricing' },
      { name: 'Student Dashboard', path: '/student-dashboard' },
      { name: 'Community', path: '/community' }
    ],
    company: [
      { name: 'About Us', path: '/homepage' },
      { name: 'Our Philosophy', path: '/homepage' },
      { name: 'Instructors', path: '/course-catalog' },
      { name: 'Careers', path: '/homepage' }
    ],
    resources: [
      { name: 'Help Center', path: '/homepage' },
      { name: 'Learning Blog', path: '/homepage' },
      { name: 'Success Stories', path: '/homepage' },
      { name: 'Accessibility', path: '/homepage' }
    ],
    legal: [
      { name: 'Privacy Policy', path: '/homepage' },
      { name: 'Terms of Service', path: '/homepage' },
      { name: 'Cookie Policy', path: '/homepage' },
      { name: 'Trust Center', path: '/homepage' }
    ]
  };

  const socialLinks = [
    { name: 'Twitter', icon: 'AtSymbolIcon', path: '#' },
    { name: 'LinkedIn', icon: 'BuildingOfficeIcon', path: '#' },
    { name: 'Instagram', icon: 'CameraIcon', path: '#' },
    { name: 'YouTube', icon: 'VideoCameraIcon', path: '#' }
  ];

  if (!isHydrated) {
    return (
      <footer className="bg-card border-t border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          <div className="h-64 bg-muted rounded-lg animate-pulse"></div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-12">
          <div className="lg:col-span-2">
            <Link href="/homepage" className="flex items-center space-x-3 group mb-6">
              <div className="relative">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
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
                <span className="text-xl font-headline font-semibold text-foreground">
                  EduZen Academy
                </span>
                <span className="text-xs font-body text-muted-foreground -mt-1">
                  Mindful Learning
                </span>
              </div>
            </Link>
            <p className="text-muted-foreground font-body leading-relaxed mb-6">
              A sanctuary for mindful learning where knowledge meets wisdom. Education designed for human flourishing.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.path}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                  aria-label={social.name}
                >
                  <Icon name={social.icon as any} size={20} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-headline font-semibold text-foreground mb-4">Platform</h3>
            <ul className="space-y-3">
              {footerLinks.platform.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.path}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300 font-body"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-headline font-semibold text-foreground mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.path}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300 font-body"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-headline font-semibold text-foreground mb-4">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.path}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300 font-body"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-headline font-semibold text-foreground mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.path}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300 font-body"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground font-body">
              &copy; {currentYear} EduZen Academy. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Icon name="ShieldCheckIcon" size={16} variant="solid" className="text-primary" />
                <span>SSL Secured</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="CheckBadgeIcon" size={16} variant="solid" className="text-primary" />
                <span>GDPR Compliant</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;