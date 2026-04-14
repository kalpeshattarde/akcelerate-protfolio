'use client';

import React, { useState, useEffect } from 'react';

interface ManifestoItem {
  id: number;
  statement: string;
}

interface ManifestoSectionProps {
  manifestoItems: ManifestoItem[];
}

const ManifestoSection: React.FC<ManifestoSectionProps> = ({ manifestoItems }) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % manifestoItems.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isHydrated, manifestoItems.length]);

  if (!isHydrated) {
    return (
      <section className="px-6 lg:px-12 py-32 bg-gradient-to-br from-primary/10 via-background to-accent/10">
        <div className="max-w-5xl mx-auto text-center">
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-primary mb-8">
            Our Manifesto
          </p>
          <blockquote className="font-headline text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
            {manifestoItems[0].statement}
          </blockquote>
        </div>
      </section>
    );
  }

  return (
    <section className="px-6 lg:px-12 py-32 bg-gradient-to-br from-primary/10 via-background to-accent/10 relative overflow-hidden">
      {/* Ambient Glow */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent pointer-events-none" />
      
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <p className="font-mono text-xs tracking-[0.2em] uppercase text-primary mb-8">
          Our Manifesto
        </p>

        {/* Rotating Statements */}
        <div className="relative min-h-[200px] md:min-h-[250px] flex items-center justify-center">
          {manifestoItems.map((item, index) => (
            <blockquote
              key={item.id}
              className={`absolute inset-0 flex items-center justify-center font-headline text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight transition-all duration-1000 ${
                index === activeIndex
                  ? 'opacity-100 translate-y-0' :'opacity-0 translate-y-8 pointer-events-none'
              }`}
            >
              {item.statement}
            </blockquote>
          ))}
        </div>

        {/* Progress Indicators */}
        <div className="flex justify-center gap-2 mt-12">
          {manifestoItems.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? 'bg-primary w-8' :'bg-border hover:bg-primary/50'
              }`}
              aria-label={`Go to statement ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ManifestoSection;