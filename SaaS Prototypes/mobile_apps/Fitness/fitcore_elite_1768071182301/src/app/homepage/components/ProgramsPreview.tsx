import React from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface Program {
  id: number;
  name: string;
  description: string;
  image: string;
  alt: string;
  duration: string;
  intensity: string;
  icon: string;
  features: string[];
}

const ProgramsPreview = () => {
  const programs: Program[] = [
    {
      id: 1,
      name: "Strength Elite",
      description: "Advanced powerlifting and strength training protocols designed for maximum muscle development and raw power output.",
      image: "https://images.unsplash.com/photo-1674748596342-8fd299450a71",
      alt: "Muscular athlete performing deadlift with heavy barbell in modern gym",
      duration: "12 weeks",
      intensity: "High",
      icon: "BoltIcon",
      features: ["Progressive Overload", "1-on-1 Coaching", "Performance Tracking"]
    },
    {
      id: 2,
      name: "Cardio Warrior",
      description: "High-intensity cardiovascular training combining HIIT, metabolic conditioning, and endurance protocols.",
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_12b52eade-1763537990277.png",
      alt: "Athletic woman running on treadmill with intense focus in high-tech fitness facility",
      duration: "8 weeks",
      intensity: "Extreme",
      icon: "FireIcon",
      features: ["HIIT Training", "Heart Rate Zones", "Endurance Building"]
    },
    {
      id: 3,
      name: "Hybrid Athlete",
      description: "Complete performance system combining strength, conditioning, mobility, and sport-specific training elements.",
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_170669242-1763537990120.png",
      alt: "Fit athlete performing functional movement with kettlebell in crosstraining workout",
      duration: "16 weeks",
      intensity: "Variable",
      icon: "CogIcon",
      features: ["Functional Movement", "Sport Specific", "Recovery Protocols"]
    }
  ];

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-b from-background to-deep-charcoal">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center space-x-2 px-3 sm:px-4 py-2 bg-accent/10 border border-accent/20 rounded-full text-accent text-xs sm:text-sm font-medium mb-4 sm:mb-6">
            <Icon name="AcademicCapIcon" size={16} />
            <span className="whitespace-nowrap">Elite Training Programs</span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 sm:mb-6">
            <span className="block">Science Meets</span>
            <span className="block text-transparent bg-gradient-to-r from-accent to-primary bg-clip-text">
              Strength
            </span>
          </h2>
          
          <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto px-4">
            Choose from our scientifically-designed training protocols, each crafted to deliver measurable results through progressive overload and performance optimization.
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
          {programs.map((program) => (
            <div
              key={program.id}
              className="group relative bg-card/50 backdrop-blur-10 border border-border rounded-2xl overflow-hidden hover:border-primary/30 transition-all duration-300 hover:scale-105 flex flex-col"
            >
              {/* Program Image */}
              <div className="relative h-48 overflow-hidden flex-shrink-0">
                <AppImage
                  src={program.image}
                  alt={program.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent"></div>
                
                {/* Intensity Badge */}
                <div className="absolute top-4 right-4 px-2 sm:px-3 py-1 bg-primary/90 text-primary-foreground text-xs font-bold rounded-full">
                  {program.intensity}
                </div>
                
                {/* Program Icon */}
                <div className="absolute bottom-4 left-4 w-10 sm:w-12 h-10 sm:h-12 bg-primary/20 backdrop-blur-10 rounded-lg flex items-center justify-center border border-primary/30">
                  <Icon name={program.icon as any} size={20} className="text-primary" />
                </div>
              </div>
              
              {/* Program Content */}
              <div className="p-4 sm:p-6 flex flex-col flex-grow">
                <div className="flex items-start justify-between mb-3 gap-2">
                  <h3 className="text-lg sm:text-xl font-bold text-foreground break-words flex-1">{program.name}</h3>
                  <span className="text-xs sm:text-sm text-accent font-medium whitespace-nowrap">{program.duration}</span>
                </div>
                
                <p className="text-muted-foreground text-sm mb-4 line-clamp-3 break-words overflow-hidden">
                  {program.description}
                </p>
                
                {/* Features */}
                <div className="space-y-2 mb-6 flex-grow">
                  {program.features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <Icon name="CheckIcon" size={16} className="text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground break-words">{feature}</span>
                    </div>
                  ))}
                </div>
                
                {/* CTA Button */}
                <Link
                  href="/programs"
                  className="group/btn relative block w-full py-3 bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground border border-primary rounded-lg font-semibold text-center transition-all duration-300 text-sm sm:text-base overflow-hidden focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background active:scale-95 touch-manipulation"
                  aria-label={`Learn more about ${program.name} program`}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Learn More
                    <Icon name="ArrowRightIcon" size={14} className="group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* View All Programs CTA */}
        <div className="text-center">
          <Link
            href="/programs"
            className="group relative inline-flex items-center space-x-2 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-lg font-semibold overflow-hidden transition-all duration-300 shadow-cta hover:shadow-neon text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background active:scale-95 touch-manipulation"
            aria-label="Explore all available training programs"
          >
            <span className="relative z-10 flex items-center gap-2">
              Explore All Programs
              <Icon name="ArrowRightIcon" size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProgramsPreview;