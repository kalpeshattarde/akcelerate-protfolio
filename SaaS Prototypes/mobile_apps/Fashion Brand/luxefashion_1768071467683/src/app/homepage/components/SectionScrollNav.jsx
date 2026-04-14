'use client';

import { useState, useEffect } from 'react';


const SectionScrollNav = () => {
  const [activeSection, setActiveSection] = useState('hero');

  const sections = [
    { id: 'hero', label: 'Home', icon: '🏠' },
    { id: 'products', label: 'Products', icon: '👕' },
    { id: 'editorial', label: 'Editorial', icon: '📸' },
    { id: 'features', label: 'Features', icon: '⭐' },
    { id: 'testimonials', label: 'Reviews', icon: '💬' },
    { id: 'blog', label: 'Blog', icon: '📝' },
    { id: 'newsletter', label: 'Newsletter', icon: '📧' },
    { id: 'footer', label: 'Contact', icon: '📞' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      
      for (const section of sections) {
        const element = document.getElementById(section?.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section?.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <nav className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50 hidden lg:block">
      <div className="flex flex-col space-y-2 bg-white/90 backdrop-blur-md rounded-full p-3 shadow-elevation-2">
        {sections?.map((section) => (
          <button
            key={section?.id}
            onClick={() => scrollToSection(section?.id)}
            className={`group relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110
              ${activeSection === section?.id 
                ? 'bg-accent text-accent-foreground shadow-elevation-1' 
                : 'bg-transparent hover:bg-gray-100 text-gray-600 hover:text-gray-900'
              }`}
            aria-label={`Go to ${section?.label} section`}
          >
            <span className="text-sm font-medium">
              {section?.icon}
            </span>
            
            {/* Tooltip */}
            <div className="absolute right-full mr-3 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
              {section?.label}
            </div>
          </button>
        ))}
      </div>
    </nav>
  );
};

SectionScrollNav.propTypes = {};

export default SectionScrollNav;