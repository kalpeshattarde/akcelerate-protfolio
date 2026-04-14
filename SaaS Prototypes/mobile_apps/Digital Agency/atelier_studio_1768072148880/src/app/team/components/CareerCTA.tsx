'use client';

import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

export default function CareerCTA() {
  return (
    <section className="py-20 lg:py-32 px-6 lg:px-12">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <div className="space-y-4">
          <p className="font-body text-sm text-primary uppercase tracking-wider">Join Our Collective</p>
          <h2 className="font-headline text-4xl lg:text-6xl text-foreground leading-tight">
            Create with us
          </h2>
          <p className="font-body text-lg text-text-secondary leading-relaxed max-w-2xl mx-auto">
            We're always looking for talented individuals who share our passion for craft and innovation. Explore opportunities to join our studio and contribute to work that matters.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/contact"
            className="px-8 py-4 bg-accent text-accent-foreground font-cta font-semibold text-base rounded-md hover:bg-accent/90 hover:-translate-y-0.5 hover:shadow-dramatic transition-all duration-300 flex items-center gap-2"
          >
            View Open Positions
            <Icon name="ArrowRightIcon" size={20} />
          </Link>
          <Link
            href="/contact"
            className="px-8 py-4 bg-transparent border border-border text-foreground font-cta font-semibold text-base rounded-md hover:bg-muted/50 hover:-translate-y-0.5 transition-all duration-300"
          >
            Submit Portfolio
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 pt-12 border-t border-border">
          <div className="space-y-2">
            <p className="font-headline text-4xl text-primary">25+</p>
            <p className="font-body text-sm text-text-secondary">Team Members</p>
          </div>
          <div className="space-y-2">
            <p className="font-headline text-4xl text-primary">12</p>
            <p className="font-body text-sm text-text-secondary">Countries</p>
          </div>
          <div className="space-y-2">
            <p className="font-headline text-4xl text-primary">100%</p>
            <p className="font-body text-sm text-text-secondary">Remote Friendly</p>
          </div>
        </div>
      </div>
    </section>
  );
}