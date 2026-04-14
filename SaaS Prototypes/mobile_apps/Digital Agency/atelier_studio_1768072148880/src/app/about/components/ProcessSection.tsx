import React from 'react';

interface ProcessStep {
  id: number;
  number: string;
  title: string;
  description: string;
  details: string[];
}

interface ProcessSectionProps {
  steps: ProcessStep[];
}

const ProcessSection: React.FC<ProcessSectionProps> = ({ steps }) => {
  return (
    <section className="px-6 lg:px-12 py-24 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-20">
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-primary mb-4">
            Our Process
          </p>
          <h2 className="font-headline text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
            From Vision to Reality
          </h2>
          <p className="font-body text-lg text-text-secondary leading-relaxed">
            Our creative process is a carefully orchestrated journey that transforms strategic insights into exceptional digital experiences.
          </p>
        </div>

        {/* Process Steps */}
        <div className="space-y-16">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
              style={{
                animation: `slideInLeft 0.8s ease-out ${index * 0.2}s both`
              }}
            >
              {/* Step Number */}
              <div className="lg:col-span-2">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30">
                  <span className="font-headline text-3xl font-bold text-primary">
                    {step.number}
                  </span>
                </div>
              </div>

              {/* Step Content */}
              <div className="lg:col-span-10">
                <h3 className="font-headline text-3xl font-bold text-foreground mb-4">
                  {step.title}
                </h3>
                <p className="font-body text-lg text-text-secondary mb-6 leading-relaxed">
                  {step.description}
                </p>

                {/* Details List */}
                <ul className="space-y-3">
                  {step.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span className="font-body text-base text-text-secondary">
                        {detail}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </section>
  );
};

export default ProcessSection;