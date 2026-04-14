import React from 'react';

interface CommunityHeroProps {
  className?: string;
}

const CommunityHero = ({ className = '' }: CommunityHeroProps) => {
  return (
    <section className={`relative bg-gradient-to-br from-primary/5 via-background to-accent/5 py-20 ${className}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mb-6 leading-tight">
            Community Garden
          </h1>
          <p className="font-body text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
            A sanctuary for mindful learners to connect, share wisdom, and grow together. Join thoughtful conversations that nurture both knowledge and well-being.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="bg-card rounded-xl px-6 py-4 shadow-sm border border-border">
              <div className="font-headline text-3xl font-semibold text-primary mb-1">12,847</div>
              <div className="font-body text-sm text-muted-foreground">Active Members</div>
            </div>
            <div className="bg-card rounded-xl px-6 py-4 shadow-sm border border-border">
              <div className="font-headline text-3xl font-semibold text-primary mb-1">3,492</div>
              <div className="font-body text-sm text-muted-foreground">Discussions</div>
            </div>
            <div className="bg-card rounded-xl px-6 py-4 shadow-sm border border-border">
              <div className="font-headline text-3xl font-semibold text-primary mb-1">24/7</div>
              <div className="font-body text-sm text-muted-foreground">Moderation</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunityHero;