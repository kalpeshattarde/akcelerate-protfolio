import AppImage from '@/components/ui/AppImage';

export default function HeroSection() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-20">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <AppImage
          src="https://images.unsplash.com/photo-1603292251051-895cf1026ed5"
          alt="Abstract architectural forms with dramatic lighting showcasing precision and craftsmanship in modern design"
          className="w-full h-full object-cover" />

        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 text-center">
        <div className="mb-6">
          <span className="inline-block px-4 py-2 bg-primary/10 border border-primary/20 rounded-full font-cta text-sm font-medium text-primary">
            Craft & Capabilities
          </span>
        </div>

        <h1 className="font-headline text-5xl lg:text-7xl xl:text-8xl font-bold text-foreground mb-8 leading-tight">
          Artistic Disciplines<br />
          <span className="text-primary">Refined Through Mastery</span>
        </h1>

        <p className="font-body text-lg lg:text-xl text-text-secondary max-w-3xl mx-auto mb-12 leading-relaxed">
          We don't offer commoditized services. Each capability represents a discipline honed through years of practice, where strategic thinking meets artistic execution to create transformative digital experiences.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="#inquiry"
            className="px-8 py-4 bg-accent text-accent-foreground font-cta font-semibold text-base rounded-md hover:bg-accent/90 hover:-translate-y-0.5 hover:shadow-dramatic transition-all duration-300">

            Start a Conversation
          </a>
          <a
            href="#capabilities"
            className="px-8 py-4 bg-surface border border-border text-foreground font-cta font-semibold text-base rounded-md hover:bg-muted hover:-translate-y-0.5 transition-all duration-300">

            Explore Disciplines
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10">
        <div className="flex flex-col items-center gap-2 animate-bounce">
          <span className="font-cta text-xs text-text-secondary uppercase tracking-wider">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-primary to-transparent" />
        </div>
      </div>
    </section>);

}