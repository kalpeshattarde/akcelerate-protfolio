'use client';

import React, { useState, useEffect } from 'react';

interface Milestone {
  id: number;
  year: string;
  title: string;
  description: string;
}

interface TimelineSectionProps {
  milestones: Milestone[];
}

const TimelineSection: React.FC<TimelineSectionProps> = ({ milestones }) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [activeId, setActiveId] = useState<number | null>(null);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const handleMilestoneClick = (id: number) => {
    if (!isHydrated) return;
    setActiveId(activeId === id ? null : id);
  };

  return (
    <section className="px-6 lg:px-12 py-24 bg-surface">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-primary mb-4">
            Our Journey
          </p>
          <h2 className="font-headline text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
            Milestones That Shaped Us
          </h2>
          <p className="font-body text-lg text-text-secondary leading-relaxed max-w-2xl mx-auto">
            Every milestone represents a moment of growth, learning, and evolution in our pursuit of creative excellence.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-accent to-primary transform md:-translate-x-1/2" />

          {/* Milestones */}
          <div className="space-y-16">
            {milestones.map((milestone, index) => (
              <div
                key={milestone.id}
                className={`relative flex flex-col md:flex-row items-start md:items-center gap-8 ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.15}s both`
                }}
              >
                {/* Content */}
                <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <button
                    onClick={() => handleMilestoneClick(milestone.id)}
                    className="group w-full text-left md:text-inherit"
                  >
                    <span className="inline-block font-mono text-sm tracking-wider text-primary mb-2">
                      {milestone.year}
                    </span>
                    <h3 className="font-headline text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                      {milestone.title}
                    </h3>
                    <p
                      className={`font-body text-base text-text-secondary leading-relaxed transition-all duration-500 ${
                        isHydrated && activeId === milestone.id
                          ? 'max-h-96 opacity-100' :'max-h-0 md:max-h-96 opacity-0 md:opacity-100 overflow-hidden'
                      }`}
                    >
                      {milestone.description}
                    </p>
                  </button>
                </div>

                {/* Center Dot */}
                <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-surface shadow-lg" />

                {/* Spacer for alignment */}
                <div className="flex-1 hidden md:block" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default TimelineSection;