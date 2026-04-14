import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CTASection = () => {
  const contactMethods = [
    {
      title: 'Schedule a Call',
      description: 'Book a 30-minute discovery call to discuss your project',
      icon: 'Calendar',
      action: 'Schedule Now',
      color: 'from-primary to-primary/80'
    },
    {
      title: 'Send a Message',
      description: 'Share your project details and we\'ll get back within 24 hours',
      icon: 'Mail',
      action: 'Send Message',
      color: 'from-accent to-accent/80'
    },
    {
      title: 'Download Guide',
      description: 'Get our comprehensive project planning guide',
      icon: 'Download',
      action: 'Download Free',
      color: 'from-trust to-trust/80'
    }
  ];

  const stats = [
    { number: '50+', label: 'Projects Delivered', icon: 'CheckCircle' },
    { number: '98%', label: 'Client Satisfaction', icon: 'Heart' },
    { number: '24/7', label: 'Support Available', icon: 'Clock' },
    { number: '2-16', label: 'Week Delivery', icon: 'Zap' }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-background via-card to-muted relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-primary/5 rounded-full blur-xl animate-float"></div>
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-accent/5 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-trust/10 rounded-full blur-lg animate-float" style={{ animationDelay: '4s' }}></div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main CTA */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Icon name="Rocket" size={16} />
            <span>Ready to Start?</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold text-text-primary mb-6 leading-tight">
            Let's Build Something
            <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Extraordinary Together
            </span>
          </h2>
          
          <p className="text-lg md:text-xl text-text-secondary max-w-3xl mx-auto mb-12 leading-relaxed">
            Transform your vision into a digital reality that not only meets your goals but exceeds your expectations. 
            Our team is ready to craft your next breakthrough digital experience.
          </p>

          {/* Primary CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Button
              variant="default"
              size="lg"
              className="btn-magnetic animate-breathe"
              iconName="MessageCircle"
              iconPosition="left"
            >
              Start Your Project
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="btn-magnetic"
              iconName="Play"
              iconPosition="left"
            >
              Watch Our Process
            </Button>
          </div>
        </div>

        {/* Contact Methods */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {contactMethods?.map((method, index) => (
            <div
              key={index}
              className="card-elevated p-6 text-center hover:shadow-strong transition-all duration-300 group cursor-pointer"
            >
              <div className={`w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-r ${method?.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                <Icon name={method?.icon} size={32} className="text-white" />
              </div>
              
              <h3 className="text-xl font-semibold text-text-primary mb-2">
                {method?.title}
              </h3>
              
              <p className="text-text-secondary mb-6 leading-relaxed">
                {method?.description}
              </p>
              
              <Button
                variant="ghost"
                className="text-primary hover:text-primary/80 group-hover:bg-primary/5"
                iconName="ArrowRight"
                iconPosition="right"
              >
                {method?.action}
              </Button>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="bg-background rounded-2xl p-8 shadow-medium">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-text-primary mb-2">
              Why Choose FlowTech Studio?
            </h3>
            <p className="text-text-secondary">
              Numbers that speak to our commitment to excellence
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats?.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="w-12 h-12 mx-auto mb-3 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                  <Icon name={stat?.icon} size={24} className="text-primary" />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-text-primary mb-1">
                  {stat?.number}
                </div>
                <div className="text-sm text-text-secondary">
                  {stat?.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center mt-16 p-8 bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl">
          <h3 className="text-2xl font-bold text-text-primary mb-4">
            Ready to Transform Your Digital Presence?
          </h3>
          <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
            Join the growing list of companies who have chosen FlowTech Studio to bring their digital visions to life. 
            Let's create something amazing together.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              variant="default"
              size="lg"
              className="btn-magnetic"
              iconName="Rocket"
              iconPosition="left"
            >
              Get Started Today
            </Button>
            <div className="flex items-center space-x-2 text-text-secondary">
              <Icon name="Clock" size={16} />
              <span className="text-sm">Response within 24 hours</span>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="mt-12 pt-8 border-t border-border text-center">
          <p className="text-text-secondary mb-4">
            Prefer to reach out directly?
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm">
            <div className="flex items-center space-x-2">
              <Icon name="Mail" size={16} className="text-primary" />
              <span className="text-text-primary">hello@flowtechstudio.com</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Phone" size={16} className="text-primary" />
              <span className="text-text-primary">+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="MapPin" size={16} className="text-primary" />
              <span className="text-text-primary">San Francisco, CA</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;