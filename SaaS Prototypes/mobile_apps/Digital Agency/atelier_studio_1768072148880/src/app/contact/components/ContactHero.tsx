import React from 'react';

interface ContactHeroProps {
  title: string;
  subtitle: string;
}

const ContactHero: React.FC<ContactHeroProps> = ({ title, subtitle }) => {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-background via-muted to-background">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[120px]" />
      </div>
      
      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-12 text-center">
        <h1 className="font-headline text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
          {title}
        </h1>
        <p className="font-body text-lg md:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      </div>
    </section>
  );
};

export default ContactHero;