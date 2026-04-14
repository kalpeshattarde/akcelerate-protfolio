import React from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface AthleteSpotlight {
  id: number;
  name: string;
  achievement: string;
  image: string;
  alt: string;
  stats: {
    label: string;
    value: string;
  }[];
}

interface HeroSectionProps {
  currentSpotlight: AthleteSpotlight;
}

const HeroSection = ({ currentSpotlight }: HeroSectionProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-deep-charcoal to-background">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent transform -skew-y-12"></div>
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-accent/10 to-transparent transform skew-y-12"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            <div className="inline-flex items-center space-x-2 px-3 sm:px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary text-xs sm:text-sm font-medium mb-4 sm:mb-6">
              <Icon name="BoltIcon" size={16} />
              <span className="whitespace-nowrap">Elite Performance Laboratory</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground mb-4 sm:mb-6 leading-tight">
              <span className="block">Elevate Your</span>
              <span className="block text-transparent bg-gradient-to-r from-primary to-accent bg-clip-text">
                Standard
              </span>
            </h1>
            
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto lg:mx-0">
              Where science meets strength. Transform your body and mind through elite training protocols designed for peak human performance.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start mb-8 sm:mb-12">
              <Link
                href="/membership"
                className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-primary text-primary-foreground rounded-lg font-semibold text-base sm:text-lg overflow-hidden transition-all duration-300 shadow-cta hover:shadow-neon focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background active:scale-95 touch-manipulation"
                aria-label="Start your elite fitness journey with membership"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Start Elite Journey
                  <Icon name="ArrowRightIcon" size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 bg-primary/90 group-hover:bg-primary/80 transition-colors duration-300"></div>
              </Link>
              <Link
                href="/facility"
                className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-transparent border-2 border-primary text-primary rounded-lg font-semibold text-base sm:text-lg overflow-hidden transition-all duration-300 hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background active:scale-95 touch-manipulation"
                aria-label="Take a virtual tour of our elite facility"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Virtual Tour
                  <Icon name="EyeIcon" size={16} className="group-hover:scale-110 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6 max-w-sm sm:max-w-md mx-auto lg:mx-0">
              <div className="text-center lg:text-left">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary">500+</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Elite Members</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-accent">15+</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Expert Trainers</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-error">98%</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Success Rate</div>
              </div>
            </div>
          </div>
          
          {/* Right Content - Athlete Spotlight */}
          <div className="relative order-1 lg:order-2 max-w-md mx-auto lg:max-w-none">
            <div className="relative bg-card/50 backdrop-blur-10 border border-primary/20 rounded-2xl p-6 sm:p-8 glass-morphism">
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Icon name="StarIcon" size={16} className="text-primary-foreground" />
              </div>
              
              <div className="text-center mb-6">
                <div className="relative w-24 sm:w-32 h-24 sm:h-32 mx-auto mb-4">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-full opacity-20 blur-lg"></div>
                  <AppImage
                    src={currentSpotlight.image}
                    alt={currentSpotlight.alt}
                    className="relative w-full h-full object-cover rounded-full border-2 border-primary/30"
                  />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2 break-words">{currentSpotlight.name}</h3>
                <p className="text-primary font-medium text-sm sm:text-base break-words">{currentSpotlight.achievement}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {currentSpotlight.stats.map((stat, index) => (
                  <div key={index} className="text-center p-2 sm:p-3 bg-muted/30 rounded-lg">
                    <div className="text-sm sm:text-lg font-bold text-foreground break-words">{stat.value}</div>
                    <div className="text-xs text-muted-foreground break-words">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-6 -left-6 w-12 h-12 bg-accent/20 rounded-lg rotate-12 animate-pulse"></div>
            <div className="absolute -bottom-6 -right-6 w-16 h-16 bg-primary/20 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex flex-col items-center space-y-2 text-muted-foreground">
          <span className="text-xs sm:text-sm font-medium">Discover More</span>
          <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;