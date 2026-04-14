'use client';

import React, { useState, useEffect } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface Testimonial {
  id: number;
  clientName: string;
  clientImage: string;
  clientAlt: string;
  trainerName: string;
  rating: number;
  testimonial: string;
  program: string;
  duration: string;
  results: string;
}

const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const testimonials: Testimonial[] = [
  {
    id: 1,
    clientName: "Sarah Johnson",
    clientImage: "https://img.rocket.new/generatedImages/rocket_gen_img_186600153-1763296403185.png",
    clientAlt: "Professional woman with blonde hair in fitness attire smiling confidently",
    trainerName: "Marcus Rodriguez",
    rating: 5,
    testimonial: "Marcus transformed not just my body but my entire mindset. His scientific approach to training and nutrition helped me achieve results I never thought possible. The personalized program was challenging yet sustainable.",
    program: "Elite Transformation",
    duration: "6 months",
    results: "Lost 35 lbs, gained muscle definition"
  },
  {
    id: 2,
    clientName: "David Chen",
    clientImage: "https://img.rocket.new/generatedImages/rocket_gen_img_187b350ba-1763294180584.png",
    clientAlt: "Athletic Asian man in gym wear showing confident pose after workout",
    trainerName: "Elena Vasquez",
    rating: 5,
    testimonial: "Elena's expertise in sports performance training took my athletic abilities to the next level. Her attention to detail and progressive programming helped me break through plateaus I'd been stuck at for years.",
    program: "Athletic Performance",
    duration: "4 months",
    results: "Increased strength by 40%, improved agility"
  },
  {
    id: 3,
    clientName: "Michelle Torres",
    clientImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1593685fa-1763294320594.png",
    clientAlt: "Hispanic woman in workout clothes showing strong and determined expression",
    trainerName: "James Mitchell",
    rating: 5,
    testimonial: "James made fitness enjoyable for the first time in my life. His patient approach and ability to modify exercises for my needs built my confidence. I now look forward to every training session.",
    program: "Strength Foundation",
    duration: "8 months",
    results: "Built lean muscle, improved posture"
  }];


  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  if (!isHydrated) {
    return (
      <div className="bg-card border border-border rounded-xl p-8">
        <div className="animate-pulse">
          <div className="h-6 bg-muted rounded w-1/3 mb-6"></div>
          <div className="space-y-4">
            <div className="h-4 bg-muted rounded w-full"></div>
            <div className="h-4 bg-muted rounded w-3/4"></div>
            <div className="h-4 bg-muted rounded w-1/2"></div>
          </div>
        </div>
      </div>);

  }

  const currentTestimonial = testimonials[currentIndex];

  return (
    <div className="bg-card border border-border rounded-xl p-8 mb-12">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-2xl font-bold text-foreground">Client Success Stories</h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={prevTestimonial}
            className="p-2 rounded-lg bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-colors duration-200">

            <Icon name="ChevronLeftIcon" size={20} />
          </button>
          <button
            onClick={nextTestimonial}
            className="p-2 rounded-lg bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-colors duration-200">

            <Icon name="ChevronRightIcon" size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Client Info */}
        <div className="flex flex-col items-center text-center">
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-primary/20 mb-4">
            <AppImage
              src={currentTestimonial.clientImage}
              alt={currentTestimonial.clientAlt}
              className="w-full h-full object-cover" />

          </div>
          <h4 className="text-lg font-semibold text-foreground mb-2">{currentTestimonial.clientName}</h4>
          <p className="text-muted-foreground text-sm mb-3">Trained by {currentTestimonial.trainerName}</p>
          
          <div className="flex items-center space-x-1 mb-4">
            {[...Array(5)].map((_, i) =>
            <Icon
              key={i}
              name="StarIcon"
              size={16}
              className={i < currentTestimonial.rating ? "text-warning" : "text-muted"} />

            )}
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Program:</span>
              <span className="text-foreground font-medium">{currentTestimonial.program}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Duration:</span>
              <span className="text-foreground font-medium">{currentTestimonial.duration}</span>
            </div>
          </div>
        </div>

        {/* Testimonial */}
        <div className="lg:col-span-2">
          <blockquote className="text-lg text-foreground leading-relaxed mb-6">
            "{currentTestimonial.testimonial}"
          </blockquote>
          
          <div className="bg-muted/30 rounded-lg p-4">
            <h5 className="text-sm font-semibold text-foreground mb-2">Results Achieved:</h5>
            <p className="text-muted-foreground text-sm">{currentTestimonial.results}</p>
          </div>
        </div>
      </div>

      {/* Indicators */}
      <div className="flex justify-center space-x-2 mt-8">
        {testimonials.map((_, index) =>
        <button
          key={index}
          onClick={() => setCurrentIndex(index)}
          className={`w-2 h-2 rounded-full transition-colors duration-200 ${
          index === currentIndex ? 'bg-primary' : 'bg-muted'}`
          } />

        )}
      </div>
    </div>);

};

export default TestimonialCarousel;