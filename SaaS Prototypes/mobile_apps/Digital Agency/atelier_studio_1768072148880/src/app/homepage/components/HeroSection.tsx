'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

interface HeroSectionProps {
  isHydrated: boolean;
}

const HeroSection = ({ isHydrated }: HeroSectionProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      title: "Craft Meets\nInnovation",
      subtitle: "Where timeless design principles intersect with cutting-edge digital experiences",
      cta: "Explore Our Work",
      link: "/work-portfolio"
    },
    {
      title: "Strategic\nStorytelling",
      subtitle: "Transforming brand narratives into immersive digital experiences that resonate",
      cta: "View Case Studies",
      link: "/work-portfolio"
    },
    {
      title: "Exceptional\nBy Design",
      subtitle: "Every pixel intentional. Every interaction purposeful. Every experience unforgettable.",
      cta: "Discover Our Process",
      link: "/about"
    }
  ];

  useEffect(() => {
    if (!isHydrated) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isHydrated, heroSlides.length]);

  const handleSlideChange = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-muted to-background">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/30 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <span className="font-mono text-xs text-primary tracking-wider">AWARD-WINNING STUDIO</span>
              </div>

              <h1 className="font-headline text-5xl lg:text-7xl font-bold text-foreground leading-tight">
                {heroSlides[currentSlide].title.split('\n').map((line, index, array) => (
                  <span key={index}>
                    {line}
                    {index < array.length - 1 && <br />}
                  </span>
                ))}
              </h1>

              <p className="font-body text-lg lg:text-xl text-text-secondary max-w-xl leading-relaxed">
                {heroSlides[currentSlide].subtitle}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href={heroSlides[currentSlide].link}
                className="group inline-flex items-center gap-3 px-8 py-4 bg-accent text-accent-foreground font-cta font-semibold rounded-md hover:bg-accent/90 hover:-translate-y-1 hover:shadow-dramatic transition-all duration-300"
              >
                {heroSlides[currentSlide].cta}
                <Icon 
                  name="ArrowRightIcon" 
                  size={20} 
                  className="transition-transform duration-300 group-hover:translate-x-1" 
                />
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 border border-border text-foreground font-cta font-medium rounded-md hover:bg-muted/50 hover:-translate-y-1 transition-all duration-300"
              >
                Start Conversation
              </Link>
            </div>

            {/* Slide Indicators */}
            <div className="flex items-center gap-3 pt-4">
              {heroSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleSlideChange(index)}
                  className={`h-1 rounded-full transition-all duration-500 ${
                    currentSlide === index 
                      ? 'w-12 bg-primary' :'w-8 bg-border hover:bg-primary/50'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Visual Element */}
          <div className="relative h-[500px] lg:h-[600px]">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 rounded-2xl backdrop-blur-sm border border-border/50 overflow-hidden">
              {/* Hero Background Image */}
              <div className="absolute inset-0">
                <AppImage 
                  src="/assets/images/hero_abstract_geometric.png"
                  alt="Abstract 3D geometric shapes with glowing edges representing innovative design and technology"
                  className="w-full h-full object-cover opacity-90"
                />
              </div>
              
              {/* Abstract 3D Visual Overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-background/30 via-transparent to-background/30">
                <div className="relative w-full h-full">
                  {/* Geometric Shapes */}
                  <div className="absolute top-1/4 left-1/4 w-32 h-32 border-2 border-primary/60 rounded-lg rotate-12 animate-pulse shadow-[0_0_15px_rgba(var(--primary-rgb),0.3)]" />
                  <div className="absolute bottom-1/3 right-1/4 w-40 h-40 border-2 border-secondary/60 rounded-full animate-pulse shadow-[0_0_20px_rgba(var(--secondary-rgb),0.3)]" style={{ animationDelay: '1s' }} />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border-2 border-accent/60 rotate-45 animate-pulse shadow-[0_0_25px_rgba(var(--accent-rgb),0.3)]" style={{ animationDelay: '2s' }} />
                  
                  {/* Center Glow */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-radial from-primary/30 via-secondary/20 to-transparent rounded-full blur-2xl" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="font-mono text-xs text-text-secondary tracking-wider">SCROLL</span>
        <Icon name="ChevronDownIcon" size={20} className="text-text-secondary" />
      </div>
    </section>
  );
};

export default HeroSection;