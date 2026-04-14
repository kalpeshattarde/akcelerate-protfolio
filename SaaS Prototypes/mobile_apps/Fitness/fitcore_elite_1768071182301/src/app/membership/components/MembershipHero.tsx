import React from 'react';
import Icon from '@/components/ui/AppIcon';

interface MembershipHeroProps {
  onScrollToPlans: () => void;
}

const MembershipHero = ({ onScrollToPlans }: MembershipHeroProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-deep-charcoal to-background">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent/10"></div>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 lg:w-96 lg:h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 lg:w-96 lg:h-96 bg-accent/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-6 sm:space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 px-3 py-2 sm:px-4 bg-primary/10 border border-primary/20 rounded-full text-primary text-xs sm:text-sm font-medium">
            <Icon name="StarIcon" size={16} variant="solid" />
            <span className="whitespace-nowrap">Elite Performance Memberships</span>
          </div>

          {/* Main Heading */}
          <div className="space-y-3 sm:space-y-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-foreground leading-tight">
              Elevate Your
              <span className="block text-transparent bg-gradient-to-r from-primary to-accent bg-clip-text">
                Standard
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4">
              Choose your path to elite performance. From foundational fitness to championship-level training, 
              find the membership tier that matches your ambition.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 max-w-4xl mx-auto px-4">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary font-mono">500+</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Elite Members</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-accent font-mono">24/7</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Access Available</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary font-mono">15+</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Expert Trainers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-accent font-mono">98%</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Success Rate</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-6 sm:pt-8 px-4">
            <button
              onClick={onScrollToPlans}
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-primary text-primary-foreground rounded-lg font-semibold text-base sm:text-lg hover:bg-primary/90 hover:scale-105 transition-all duration-300 shadow-cta hover:shadow-neon flex items-center justify-center space-x-2"
            >
              <span>View Membership Plans</span>
              <Icon name="ArrowDownIcon" size={20} />
            </button>
            <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border border-border text-foreground rounded-lg font-semibold text-base sm:text-lg hover:bg-muted/50 hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2">
              <Icon name="PlayIcon" size={20} />
              <span>Take Virtual Tour</span>
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="pt-8 sm:pt-12 border-t border-border/50 px-4">
            <p className="text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6">Trusted by elite athletes and fitness professionals</p>
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 lg:gap-8 opacity-60">
              <div className="text-xs font-mono whitespace-nowrap">ACSM CERTIFIED</div>
              <div className="w-1 h-1 bg-muted-foreground rounded-full hidden sm:block"></div>
              <div className="text-xs font-mono whitespace-nowrap">NASM APPROVED</div>
              <div className="w-1 h-1 bg-muted-foreground rounded-full hidden sm:block"></div>
              <div className="text-xs font-mono whitespace-nowrap">ISO 9001:2015</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <Icon name="ChevronDownIcon" size={24} className="text-muted-foreground" />
      </div>
    </section>
  );
};

export default MembershipHero;