'use client';

import React, { useState, useEffect } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  image: string;
  imageAlt: string;
  quote: string;
  rating: number;
  transformation: string;
}

const mockTestimonials: Testimonial[] = [
{
  id: 1,
  name: "Michael Thompson",
  role: "Senior Product Manager",
  company: "Tech Innovations Inc.",
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_14a5ca983-1763300171126.png",
  imageAlt: "Professional man with short brown hair in navy suit smiling confidently",
  quote: "EduZen Academy transformed not just my career, but my entire approach to learning and personal growth. The mindful leadership course gave me tools I use every single day.",
  rating: 5,
  transformation: "Promoted to Director within 6 months"
},
{
  id: 2,
  name: "Priya Sharma",
  role: "UX Design Lead",
  company: "Creative Solutions",
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1f953953d-1763294126115.png",
  imageAlt: "Indian woman with long dark hair in professional attire smiling warmly in bright office",
  quote: "The quality of instruction and the supportive community made all the difference. I finally found a learning platform that respects my time and mental well-being.",
  rating: 5,
  transformation: "Launched successful freelance practice"
},
{
  id: 3,
  name: "David Chen",
  role: "Marketing Director",
  company: "Global Brands Co.",
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1fafcb5e1-1763294038476.png",
  imageAlt: "Asian man with glasses in casual shirt smiling in modern workspace",
  quote: "What sets EduZen apart is the integration of mindfulness with practical skills. I'm more productive, less stressed, and genuinely excited about continuous learning.",
  rating: 5,
  transformation: "Increased team productivity by 40%"
}];


const TestimonialSection = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % mockTestimonials.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isHydrated]);

  const handlePrevious = () => {
    setActiveIndex((prev) => (prev - 1 + mockTestimonials.length) % mockTestimonials.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % mockTestimonials.length);
  };

  if (!isHydrated) {
    return (
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="h-8 bg-muted rounded-lg animate-pulse w-64 mx-auto mb-4"></div>
            <div className="h-12 bg-muted rounded-lg animate-pulse w-96 mx-auto"></div>
          </div>
          <div className="bg-card rounded-2xl p-12 border border-border">
            <div className="h-64 bg-muted rounded-lg animate-pulse"></div>
          </div>
        </div>
      </section>);

  }

  const activeTestimonial = mockTestimonials[activeIndex];

  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium">
            <Icon name="ChatBubbleLeftRightIcon" size={16} variant="solid" />
            <span>Student Success Stories</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-headline font-semibold text-foreground">
            Real <span className="text-primary italic">Transformations</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-body">
            Hear from learners who have experienced both skill gains and life improvements
          </p>
        </div>

        <div className="relative bg-card rounded-2xl p-8 md:p-12 border border-border overflow-hidden">
          <div className="absolute top-8 left-8 text-primary/10">
            <Icon name="ChatBubbleLeftRightIcon" size={80} variant="solid" />
          </div>

          <div className="relative z-10">
            <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
              <div className="relative w-24 h-24 rounded-full overflow-hidden flex-shrink-0 ring-4 ring-primary/20">
                <AppImage
                  src={activeTestimonial.image}
                  alt={activeTestimonial.imageAlt}
                  className="w-full h-full object-cover" />

              </div>
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-headline font-semibold text-foreground mb-1">
                  {activeTestimonial.name}
                </h3>
                <p className="text-muted-foreground font-body">
                  {activeTestimonial.role} at {activeTestimonial.company}
                </p>
                <div className="flex items-center gap-1 mt-2 justify-center md:justify-start">
                  {[...Array(activeTestimonial.rating)].map((_, i) =>
                  <Icon key={i} name="StarIcon" size={18} variant="solid" className="text-accent" />
                  )}
                </div>
              </div>
            </div>

            <blockquote className="text-xl md:text-2xl font-body text-foreground leading-relaxed mb-6 italic">
              &ldquo;{activeTestimonial.quote}&rdquo;
            </blockquote>

            <div className="inline-flex items-center gap-2 px-4 py-2 bg-success/10 text-success rounded-full text-sm font-medium">
              <Icon name="CheckCircleIcon" size={16} variant="solid" />
              <span>{activeTestimonial.transformation}</span>
            </div>
          </div>

          <div className="flex items-center justify-between mt-8">
            <button
              onClick={handlePrevious}
              className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              aria-label="Previous testimonial">

              <Icon name="ChevronLeftIcon" size={24} />
            </button>

            <div className="flex items-center gap-2">
              {mockTestimonials.map((_, index) =>
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === activeIndex ? 'w-8 bg-primary' : 'bg-border hover:bg-primary/50'}`
                }
                aria-label={`Go to testimonial ${index + 1}`} />

              )}
            </div>

            <button
              onClick={handleNext}
              className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              aria-label="Next testimonial">

              <Icon name="ChevronRightIcon" size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>);

};

export default TestimonialSection;