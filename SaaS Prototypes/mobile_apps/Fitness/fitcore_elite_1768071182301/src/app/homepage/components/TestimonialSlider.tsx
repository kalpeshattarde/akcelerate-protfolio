'use client';

import React, { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  image: string;
  alt: string;
  content: string;
  rating: number;
  achievement: string;
}

const TestimonialSlider = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Jennifer Walsh',
    role: 'Corporate Executive',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_186600153-1763296403185.png",
    alt: 'Professional businesswoman with blonde hair in corporate attire smiling confidently',
    content: 'FitCore Elite transformed not just my body, but my entire approach to performance. The scientific methodology and elite coaching helped me achieve strength levels I never thought possible.',
    rating: 5,
    achievement: 'Lost 35 lbs, gained 40% strength'
  },
  {
    id: 2,
    name: 'Michael Torres',
    role: 'Former NFL Player',
    image: "https://images.unsplash.com/photo-1583500178753-464599364366",
    alt: 'Athletic African American man with beard showing muscular physique in gym environment',
    content: 'Even after professional sports, FitCore Elite pushed my limits beyond what I achieved in the NFL. The hybrid training approach is revolutionary for elite performance.',
    rating: 5,
    achievement: 'Improved vertical jump by 8 inches'
  },
  {
    id: 3,
    name: 'Dr. Amanda Foster',
    role: 'Surgeon & Triathlete',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_18bce4417-1763300755909.png",
    alt: 'Professional woman with dark hair in athletic wear displaying strength and determination',
    content: 'The precision and attention to detail at FitCore Elite matches the standards I demand in surgery. Every workout is calculated for maximum efficiency and results.',
    rating: 5,
    achievement: 'Completed Ironman in top 5%'
  }];


  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (!isHydrated) return;

    const interval = setInterval(nextTestimonial, 5000);
    return () => clearInterval(interval);
  }, [isHydrated]);

  if (!isHydrated) {
    return (
      <section className="py-20 bg-gradient-to-b from-background to-deep-charcoal">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-muted/30 rounded w-1/3 mx-auto mb-8"></div>
            <div className="bg-card/50 rounded-2xl p-8">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-muted/30 rounded-full"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-muted/30 rounded w-32"></div>
                  <div className="h-3 bg-muted/30 rounded w-24"></div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="h-4 bg-muted/30 rounded"></div>
                <div className="h-4 bg-muted/30 rounded w-5/6"></div>
                <div className="h-4 bg-muted/30 rounded w-4/6"></div>
              </div>
            </div>
          </div>
        </div>
      </section>);

  }

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-20 bg-gradient-to-b from-background to-deep-charcoal">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-success/10 border border-success/20 rounded-full text-success text-sm font-medium mb-6">
            <Icon name="ChatBubbleLeftRightIcon" size={16} />
            <span>Elite Results</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Success
            <span className="block text-transparent bg-gradient-to-r from-success to-primary bg-clip-text">
              Stories
            </span>
          </h2>
        </div>

        {/* Testimonial Card */}
        <div className="relative">
          <div className="bg-card/50 backdrop-blur-10 border border-border rounded-2xl p-8 lg:p-12 glass-morphism">
            {/* Quote Icon */}
            <div className="absolute -top-4 left-8 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <Icon name="ChatBubbleLeftIcon" size={16} className="text-primary-foreground" />
            </div>
            
            {/* Rating */}
            <div className="flex items-center space-x-1 mb-6">
              {[...Array(currentTestimonial.rating)].map((_, i) =>
              <Icon key={i} name="StarIcon" size={20} className="text-warning" variant="solid" />
              )}
            </div>
            
            {/* Content */}
            <blockquote className="text-lg lg:text-xl text-foreground mb-8 leading-relaxed">
              "{currentTestimonial.content}"
            </blockquote>
            
            {/* Author Info */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <AppImage
                    src={currentTestimonial.image}
                    alt={currentTestimonial.alt}
                    className="w-16 h-16 object-cover rounded-full border-2 border-primary/30" />

                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success rounded-full flex items-center justify-center border-2 border-background">
                    <Icon name="CheckIcon" size={12} className="text-background" />
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-bold text-foreground">{currentTestimonial.name}</h4>
                  <p className="text-muted-foreground text-sm">{currentTestimonial.role}</p>
                  <p className="text-primary text-sm font-medium">{currentTestimonial.achievement}</p>
                </div>
              </div>
              
              {/* Navigation */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={prevTestimonial}
                  className="group w-10 h-10 bg-muted/30 hover:bg-primary/20 border border-border hover:border-primary/30 rounded-full flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background active:scale-95 touch-manipulation"
                  aria-label="Previous testimonial">

                  <Icon name="ChevronLeftIcon" size={16} className="text-muted-foreground group-hover:text-primary transition-colors duration-300 group-hover:-translate-x-0.5" />
                </button>
                <button
                  onClick={nextTestimonial}
                  className="group w-10 h-10 bg-muted/30 hover:bg-primary/20 border border-border hover:border-primary/30 rounded-full flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background active:scale-95 touch-manipulation"
                  aria-label="Next testimonial">

                  <Icon name="ChevronRightIcon" size={16} className="text-muted-foreground group-hover:text-primary transition-colors duration-300 group-hover:translate-x-0.5" />
                </button>
              </div>
            </div>
          </div>
          
          {/* Indicators */}
          <div className="flex justify-center space-x-2 mt-6">
            {testimonials.map((_, index) =>
            <button
              key={index}
              onClick={() => goToTestimonial(index)}
              className={`rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background active:scale-95 touch-manipulation ${
              index === currentIndex ? 'bg-primary w-8 h-2' : 'bg-muted-foreground/30 w-2 h-2 hover:bg-muted-foreground/50'}`
              }
              aria-label={`Go to testimonial ${index + 1}`}
              aria-pressed={index === currentIndex} />

            )}
          </div>
        </div>
      </div>
    </section>);

};

export default TestimonialSlider;