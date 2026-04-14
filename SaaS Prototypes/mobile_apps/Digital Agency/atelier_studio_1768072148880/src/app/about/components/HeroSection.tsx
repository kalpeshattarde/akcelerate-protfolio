import React from 'react';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  description: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ title, subtitle, description }) => {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center px-6 lg:px-12 py-24 overflow-hidden">
      {/* Ambient Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
      
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Overline */}
        <p className="font-mono text-xs tracking-[0.2em] uppercase text-text-secondary mb-6 opacity-80">
          {subtitle}
        </p>
        
        {/* Main Headline */}
        <h1 className="font-headline text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-8 leading-[1.1]">
          {title}
        </h1>
        
        {/* Description */}
        <p className="font-body text-lg md:text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
          {description}
        </p>
      </div>
    </section>
  );
};

export default HeroSection;