import React from 'react';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

interface Testimonial {
  id: string;
  name: string;
  age: number;
  membershipTier: 'Foundation' | 'Elite' | 'Champion';
  memberSince: string;
  image: string;
  alt: string;
  quote: string;
  results: string[];
  beforeAfter?: {
    before: string;
    after: string;
  };
}

const MemberTestimonials = () => {
  const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Mitchell',
    age: 32,
    membershipTier: 'Elite',
    memberSince: 'January 2023',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_141b6fda2-1763295319855.png",
    alt: 'Professional woman with shoulder-length brown hair smiling confidently in athletic wear',
    quote: 'The Elite membership transformed not just my body, but my entire relationship with fitness. The personal training sessions and nutrition guidance gave me the structure I needed to finally see real results.',
    results: [
    'Lost 25 pounds of fat',
    'Gained 8 pounds of muscle',
    'Improved deadlift from 135lbs to 225lbs',
    'Completed first half marathon']

  },
  {
    id: '2',
    name: 'Marcus Thompson',
    age: 28,
    membershipTier: 'Champion',
    memberSince: 'March 2022',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_187b350ba-1763294180584.png",
    alt: 'Athletic African American man with short hair and confident smile in gym setting',
    quote: 'Champion membership is worth every penny. The dedicated nutrition coach and unlimited personal training helped me reach elite athlete status. The recovery suite is a game-changer for my training.',
    results: [
    'Increased bench press by 85lbs',
    'Body fat dropped from 18% to 8%',
    'Qualified for regional powerlifting competition',
    'Improved sleep quality by 40%']

  },
  {
    id: '3',
    name: 'Jennifer Chen',
    age: 45,
    membershipTier: 'Foundation',
    memberSince: 'September 2023',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_123acba8c-1763294173733.png",
    alt: 'Asian woman with long black hair smiling warmly in professional fitness attire',
    quote: 'Starting with Foundation was perfect for me. The supportive environment and expert guidance helped me build confidence. I\'ve never felt stronger or more energetic at 45!',
    results: [
    'Increased daily energy levels',
    'Lost 15 pounds safely',
    'Can now do 10 push-ups',
    'Improved posture and back pain']

  },
  {
    id: '4',
    name: 'David Rodriguez',
    age: 35,
    membershipTier: 'Elite',
    memberSince: 'June 2022',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_187b350ba-1763294180584.png",
    alt: 'Hispanic man with beard and athletic build smiling confidently in workout gear',
    quote: 'The Elite membership gave me everything I needed to balance my busy executive schedule with serious fitness goals. The 24/7 access and performance analytics keep me on track.',
    results: [
    'Reduced stress levels significantly',
    'Improved work productivity',
    'Lost 30 pounds in 6 months',
    'Completed first triathlon']

  }];


  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'Foundation':return 'text-accent bg-accent/10';
      case 'Elite':return 'text-primary bg-primary/10';
      case 'Champion':return 'text-warning bg-warning/10';
      default:return 'text-muted-foreground bg-muted/10';
    }
  };

  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Member <span className="text-primary">Success Stories</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Real results from real members across all membership tiers. See how FitCore Elite transforms lives.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {testimonials.map((testimonial) =>
          <div
            key={testimonial.id}
            className="bg-card border border-border rounded-2xl p-8 hover:scale-105 transition-all duration-300 hover:shadow-neon">

              {/* Member Info */}
              <div className="flex items-start space-x-4 mb-6">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full overflow-hidden">
                    <AppImage
                    src={testimonial.image}
                    alt={testimonial.alt}
                    className="w-full h-full object-cover" />

                  </div>
                  <div className="absolute -bottom-2 -right-2">
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${getTierColor(testimonial.membershipTier)}`}>
                      {testimonial.membershipTier}
                    </div>
                  </div>
                </div>
                
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground">{testimonial.name}</h3>
                  <p className="text-sm text-muted-foreground">Age {testimonial.age} • Member since {testimonial.memberSince}</p>
                  
                  {/* Rating */}
                  <div className="flex items-center space-x-1 mt-2">
                    {[...Array(5)].map((_, i) =>
                  <Icon key={i} name="StarIcon" size={16} className="text-warning" variant="solid" />
                  )}
                  </div>
                </div>
              </div>

              {/* Quote */}
              <div className="mb-6">
                <Icon name="ChatBubbleLeftRightIcon" size={24} className="text-primary mb-4" />
                <blockquote className="text-foreground leading-relaxed italic">
                  "{testimonial.quote}"
                </blockquote>
              </div>

              {/* Results */}
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center space-x-2">
                  <Icon name="TrophyIcon" size={16} className="text-primary" />
                  <span>Key Results Achieved</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {testimonial.results.map((result, index) =>
                <div key={index} className="flex items-center space-x-2">
                      <Icon name="CheckCircleIcon" size={16} className="text-primary flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{result}</span>
                    </div>
                )}
                </div>
              </div>

              {/* Verification Badge */}
              <div className="mt-6 pt-4 border-t border-border">
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <Icon name="ShieldCheckIcon" size={16} className="text-primary" />
                  <span>Verified FitCore Elite Member</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Stats Section */}
        <div className="mt-16 bg-card border border-border rounded-2xl p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-foreground mb-4">Member Success Statistics</h3>
            <p className="text-muted-foreground">Based on 500+ member surveys conducted in 2024</p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary font-mono mb-2">98%</div>
              <div className="text-sm text-muted-foreground">Achieve Their Goals</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-accent font-mono mb-2">87%</div>
              <div className="text-sm text-muted-foreground">Exceed Expectations</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary font-mono mb-2">6.2</div>
              <div className="text-sm text-muted-foreground">Months Average to Goal</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-accent font-mono mb-2">95%</div>
              <div className="text-sm text-muted-foreground">Renew Membership</div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold text-foreground mb-4">Ready to Write Your Success Story?</h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join hundreds of members who have transformed their lives with FitCore Elite. Your journey starts today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold text-lg hover:bg-primary/90 hover:scale-105 transition-all duration-300 shadow-cta hover:shadow-neon">
              Start Your Transformation
            </button>
            <button className="px-8 py-4 border border-border text-foreground rounded-lg font-semibold text-lg hover:bg-muted/50 hover:scale-105 transition-all duration-300">
              View More Stories
            </button>
          </div>
        </div>
      </div>
    </section>);

};

export default MemberTestimonials;