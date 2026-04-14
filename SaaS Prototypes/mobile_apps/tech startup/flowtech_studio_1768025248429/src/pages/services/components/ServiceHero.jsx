import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ServiceHero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-card to-muted overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-accent/10 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-trust/20 rounded-full blur-lg animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8 animate-breathe">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
            <Icon name="Sparkles" size={16} />
            <span>Technology with Soul</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-text-primary leading-tight">
            We Don't Just Build
            <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Technology
            </span>
            <span className="block text-3xl md:text-5xl lg:text-6xl font-normal text-text-secondary mt-2">
              We Craft Digital Experiences That Matter
            </span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            Where technical excellence meets creative vision. Our services transcend traditional development by creating immersive, emotionally-driven digital journeys that feel like stepping into the future.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Button
              variant="default"
              size="lg"
              className="btn-magnetic animate-breathe"
              iconName="ArrowRight"
              iconPosition="right"
            >
              Explore Our Solutions
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="btn-magnetic"
              iconName="Calendar"
              iconPosition="left"
            >
              Schedule Consultation
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="pt-12 border-t border-border/50 mt-16">
            <p className="text-sm text-text-secondary mb-6">Trusted by Innovation Leaders</p>
            
            {/* Statistics Box Container */}
            <div className="bg-card/50 backdrop-blur-sm border border-border/20 rounded-2xl p-8 shadow-medium max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Projects Delivered */}
                <div className="text-center space-y-2">
                  <div className="text-4xl md:text-5xl font-bold text-primary">50+</div>
                  <div className="text-sm text-text-secondary font-medium">Projects Delivered</div>
                </div>
                
                {/* Client Satisfaction */}
                <div className="text-center space-y-2">
                  <div className="text-4xl md:text-5xl font-bold text-accent">98%</div>
                  <div className="text-sm text-text-secondary font-medium">Client Satisfaction</div>
                </div>
                
                {/* Support Available */}
                <div className="text-center space-y-2">
                  <div className="text-4xl md:text-5xl font-bold text-trust">24/7</div>
                  <div className="text-sm text-text-secondary font-medium">Support Available</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <Icon name="ChevronDown" size={24} className="text-text-secondary" />
      </div>
    </section>
  );
};

export default ServiceHero;