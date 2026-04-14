import React from 'react';
import Icon from '@/components/ui/AppIcon';

interface TrustSignal {
  icon: string;
  title: string;
  description: string;
}

interface TrustSignalsProps {
  signals: TrustSignal[];
}

const TrustSignals = ({ signals }: TrustSignalsProps) => {
  return (
    <section className="bg-muted/30 rounded-2xl p-8 lg:p-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="font-headline text-2xl lg:text-3xl font-semibold text-foreground mb-3">
            Your Trust, Our Priority
          </h2>
          <p className="font-body text-muted-foreground">
            Industry-leading security and compliance standards
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {signals.map((signal, index) => (
            <div
              key={index}
              className="bg-card rounded-xl p-6 text-center border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon
                  name={signal.icon as any}
                  variant="outline"
                  size={28}
                  className="text-primary"
                />
              </div>
              <h3 className="font-headline text-base font-semibold text-foreground mb-2">
                {signal.title}
              </h3>
              <p className="font-body text-xs text-muted-foreground leading-relaxed">
                {signal.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSignals;