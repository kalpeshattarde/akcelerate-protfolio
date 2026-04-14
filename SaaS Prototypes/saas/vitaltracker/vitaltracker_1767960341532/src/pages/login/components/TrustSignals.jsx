import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustSignals = () => {
  const trustBadges = [
    {
      icon: 'Shield',
      title: 'HIPAA Compliant',
      description: 'Your health data is protected'
    },
    {
      icon: 'Lock',
      title: 'End-to-End Encrypted',
      description: 'Bank-level security standards'
    },
    {
      icon: 'Award',
      title: 'Certified by Health Experts',
      description: 'Endorsed by wellness professionals'
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto mt-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {trustBadges?.map((badge, index) => (
          <div 
            key={index}
            className="flex flex-col items-center text-center p-4 bg-card/50 rounded-lg border border-border/20"
          >
            <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-3">
              <Icon name={badge?.icon} size={24} className="text-primary" />
            </div>
            <h3 className="font-semibold text-sm text-foreground mb-1">
              {badge?.title}
            </h3>
            <p className="text-xs text-muted-foreground">
              {badge?.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrustSignals;