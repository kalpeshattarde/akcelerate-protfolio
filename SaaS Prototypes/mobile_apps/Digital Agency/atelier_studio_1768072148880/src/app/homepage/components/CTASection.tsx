import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

const CTASection = () => {
  return (
    <section className="relative py-24 lg:py-32 bg-gradient-to-br from-background via-muted to-background overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-primary/40 via-secondary/30 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-12 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-8">
          <Icon name="SparklesIcon" size={16} className="text-primary" />
          <span className="font-mono text-xs text-primary tracking-wider">START YOUR PROJECT</span>
        </div>

        {/* Heading */}
        <h2 className="font-headline text-4xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
          Let's Create Something
          <br />
          Exceptional Together
        </h2>

        {/* Description */}
        <p className="font-body text-lg lg:text-xl text-text-secondary max-w-3xl mx-auto mb-12 leading-relaxed">
          Whether you're launching a new brand or transforming an existing one, we're here to craft digital experiences that transcend expectations and resonate with your audience.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/contact"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-accent text-accent-foreground font-cta font-semibold rounded-md hover:bg-accent/90 hover:-translate-y-1 hover:shadow-dramatic transition-all duration-300"
          >
            Start Conversation
            <Icon 
              name="ArrowRightIcon" 
              size={20} 
              className="transition-transform duration-300 group-hover:translate-x-1" 
            />
          </Link>

          <Link
            href="/work-portfolio"
            className="inline-flex items-center gap-2 px-8 py-4 border border-border text-foreground font-cta font-medium rounded-md hover:bg-muted/50 hover:-translate-y-1 transition-all duration-300"
          >
            View Our Work
          </Link>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 pt-12 border-t border-border">
          <div className="grid sm:grid-cols-3 gap-8">
            <div className="space-y-2">
              <div className="font-headline text-3xl font-bold text-primary">12+</div>
              <div className="font-body text-sm text-text-secondary">Awwwards Recognitions</div>
            </div>
            <div className="space-y-2">
              <div className="font-headline text-3xl font-bold text-primary">50+</div>
              <div className="font-body text-sm text-text-secondary">Premium Brands Served</div>
            </div>
            <div className="space-y-2">
              <div className="font-headline text-3xl font-bold text-primary">98%</div>
              <div className="font-body text-sm text-text-secondary">Client Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;