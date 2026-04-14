'use client';

import { useState, useEffect } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface TestimonialsSectionProps {
  isHydrated: boolean;
}

const TestimonialsSection = ({ isHydrated }: TestimonialsSectionProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
  {
    quote: "Atelier Studio transformed our digital presence into an experience that truly reflects our brand\'s sophistication. Their attention to detail and strategic thinking exceeded every expectation.",
    author: "Sarah Chen",
    role: "Chief Marketing Officer",
    company: "Lumière Fashion House",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1218a3e13-1763293612679.png",
    alt: "Professional Asian woman with long dark hair in elegant black blazer smiling confidently"
  },
  {
    quote: "Working with Atelier was a masterclass in collaborative creativity. They didn\'t just deliver a product—they became true partners in our brand evolution.",
    author: "Marcus Rodriguez",
    role: "Founder & CEO",
    company: "Nexus Technology",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_16679c0dc-1763293361742.png",
    alt: "Hispanic businessman in navy suit with short beard looking professional and approachable"
  },
  {
    quote: "The team\'s ability to translate our artistic vision into a digital experience was nothing short of remarkable. They understand that craft matters.",
    author: "Elena Volkov",
    role: "Creative Director",
    company: "Artisan Collective",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_170deb1ce-1763300485528.png",
    alt: "European woman with blonde hair in creative workspace with artistic materials and natural lighting"
  }];


  useEffect(() => {
    if (!isHydrated) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [isHydrated, testimonials.length]);

  const handleDotClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <section className="relative py-24 lg:py-32 bg-gradient-to-b from-surface via-muted to-surface overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 border border-secondary/20 rounded-full mb-6">
            <Icon name="ChatBubbleLeftRightIcon" size={16} className="text-secondary" />
            <span className="font-mono text-xs text-secondary tracking-wider">CLIENT TESTIMONIALS</span>
          </div>

          <h2 className="font-headline text-4xl lg:text-5xl font-bold text-foreground">
            Trusted by Visionaries
          </h2>
        </div>

        {/* Testimonial Carousel */}
        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}>

              {testimonials.map((testimonial, index) =>
              <div
                key={index}
                className="w-full flex-shrink-0 px-4">

                  <div className="bg-surface/50 backdrop-blur-sm border border-border rounded-2xl p-8 lg:p-12">
                    {/* Quote Icon */}
                    <Icon
                    name="ChatBubbleBottomCenterTextIcon"
                    size={48}
                    className="text-primary/20 mb-6" />


                    {/* Quote */}
                    <blockquote className="font-body text-xl lg:text-2xl text-foreground leading-relaxed mb-8">
                      "{testimonial.quote}"
                    </blockquote>

                    {/* Author Info */}
                    <div className="flex items-center gap-4">
                      <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-primary/30">
                        <AppImage
                        src={testimonial.image}
                        alt={testimonial.alt}
                        className="w-full h-full object-cover" />

                      </div>

                      <div>
                        <div className="font-cta font-semibold text-foreground">
                          {testimonial.author}
                        </div>
                        <div className="font-body text-sm text-text-secondary">
                          {testimonial.role}
                        </div>
                        <div className="font-mono text-xs text-primary">
                          {testimonial.company}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, index) =>
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`h-2 rounded-full transition-all duration-500 ${
              activeIndex === index ?
              'w-12 bg-primary' : 'w-8 bg-border hover:bg-primary/50'}`
              }
              aria-label={`Go to testimonial ${index + 1}`} />

            )}
          </div>
        </div>
      </div>
    </section>);

};

export default TestimonialsSection;