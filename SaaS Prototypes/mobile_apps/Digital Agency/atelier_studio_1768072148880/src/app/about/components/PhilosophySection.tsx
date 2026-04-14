import React from 'react';

interface PhilosophyItem {
  id: number;
  title: string;
  description: string;
  icon: string;
}

interface PhilosophySectionProps {
  philosophies: PhilosophyItem[];
}

const PhilosophySection: React.FC<PhilosophySectionProps> = ({ philosophies }) => {
  return (
    <section className="px-6 lg:px-12 py-24 bg-surface">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-primary mb-4">
            Our Philosophy
          </p>
          <h2 className="font-headline text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
            Core Beliefs That Guide Our Craft
          </h2>
          <p className="font-body text-lg text-text-secondary leading-relaxed">
            These principles form the foundation of every project we undertake, ensuring that our work transcends trends and creates lasting impact.
          </p>
        </div>

        {/* Philosophy Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {philosophies.map((item, index) => (
            <div
              key={item.id}
              className="group relative p-8 bg-background border border-border rounded-lg hover:border-primary/50 transition-all duration-500 hover:shadow-dramatic"
              style={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
              }}
            >
              {/* Icon */}
              <div className="text-6xl mb-6 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                {item.icon}
              </div>
              
              {/* Content */}
              <h3 className="font-headline text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                {item.title}
              </h3>
              <p className="font-body text-base text-text-secondary leading-relaxed">
                {item.description}
              </p>

              {/* Hover Accent */}
              <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-500" />
            </div>
          ))}
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

export default PhilosophySection;