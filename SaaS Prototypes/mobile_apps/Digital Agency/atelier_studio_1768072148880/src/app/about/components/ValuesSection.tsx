import React from 'react';

interface Value {
  id: number;
  title: string;
  description: string;
}

interface ValuesSectionProps {
  values: Value[];
}

const ValuesSection: React.FC<ValuesSectionProps> = ({ values }) => {
  return (
    <section className="px-6 lg:px-12 py-24 bg-surface">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-primary mb-4">
            Our Values
          </p>
          <h2 className="font-headline text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
            What We Stand For
          </h2>
          <p className="font-body text-lg text-text-secondary leading-relaxed">
            These values are not just words on a page—they are the compass that guides every decision, every interaction, and every pixel we craft.
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {values.map((value, index) => (
            <div
              key={value.id}
              className="group relative p-10 bg-background border border-border rounded-lg hover:border-primary/50 transition-all duration-500"
              style={{
                animation: `fadeIn 0.6s ease-out ${index * 0.15}s both`
              }}
            >
              {/* Decorative Element */}
              <div className="absolute top-0 left-0 w-16 h-1 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <h3 className="font-headline text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                {value.title}
              </h3>
              <p className="font-body text-base text-text-secondary leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </section>
  );
};

export default ValuesSection;