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
      description: 'Military-grade security'
    },
    {
      icon: 'Award',
      title: 'Certified by Health Experts',
      description: 'Endorsed by wellness professionals'
    }
  ];

  const testimonials = [
    {
      name: 'Dr. Sarah Johnson',
      title: 'Wellness Expert',
      quote: 'VitalTracker provides the most comprehensive health tracking I\'ve seen.',
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=64&h=64&fit=crop&crop=face'
    },
    {
      name: 'Michael Chen',
      title: 'Fitness Coach',
      quote: 'My clients love the intuitive interface and detailed analytics.',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Trust Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {trustBadges?.map((badge, index) => (
          <div key={index} className="text-center p-4 bg-card rounded-xl border border-border/40">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Icon name={badge?.icon} size={24} className="text-primary" />
            </div>
            <h4 className="font-medium text-foreground text-sm mb-1">{badge?.title}</h4>
            <p className="text-xs text-muted-foreground">{badge?.description}</p>
          </div>
        ))}
      </div>
      {/* Expert Endorsements */}
      <div className="space-y-4">
        <h4 className="text-center text-sm font-medium text-foreground">Trusted by Health Professionals</h4>
        <div className="space-y-3">
          {testimonials?.map((testimonial, index) => (
            <div key={index} className="bg-card rounded-lg p-4 border border-border/40">
              <div className="flex items-start space-x-3">
                <img
                  src={testimonial?.avatar}
                  alt={testimonial?.name}
                  className="w-10 h-10 rounded-full object-cover"
                  onError={(e) => {
                    e.target.src = '/assets/images/no_image.png';
                  }}
                />
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground italic mb-2">"{testimonial?.quote}"</p>
                  <div>
                    <p className="text-sm font-medium text-foreground">{testimonial?.name}</p>
                    <p className="text-xs text-muted-foreground">{testimonial?.title}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Security Notice */}
      <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={20} className="text-primary mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-foreground mb-1">Your Privacy Matters</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              We never share your personal health data with third parties. All information is encrypted and stored securely in compliance with healthcare privacy standards.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustSignals;