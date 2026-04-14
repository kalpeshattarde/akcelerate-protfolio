'use client';

import { useState, useEffect } from 'react';
import AwardCard from './AwardCard';
import PressCard from './PressCard';
import SpeakingCard from './SpeakingCard';
import TestimonialCard from './TestimonialCard';
import StatsDisplay from './StatsDisplay';
import FilterBar from './FilterBar';
import Icon from '@/components/ui/AppIcon';

interface Award {
  id: number;
  title: string;
  organization: string;
  year: number;
  category: string;
  description: string;
  icon: string;
}

interface PressItem {
  id: number;
  publication: string;
  logo: string;
  logoAlt: string;
  title: string;
  date: string;
  excerpt: string;
  url: string;
}

interface SpeakingEvent {
  id: number;
  title: string;
  event: string;
  date: string;
  location: string;
  image: string;
  imageAlt: string;
  description: string;
}

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  image: string;
  imageAlt: string;
  quote: string;
}

interface Stat {
  id: number;
  value: string;
  label: string;
  description: string;
}

const RecognitionInteractive = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'awards' | 'press' | 'speaking'>('awards');

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const awards: Award[] = [
  {
    id: 1,
    title: "Best Digital Experience Design",
    organization: "Awwwards",
    year: 2024,
    category: "Digital Design",
    description: "Recognized for creating an immersive digital experience that seamlessly blends storytelling with cutting-edge technology, setting new standards for web design excellence.",
    icon: "TrophyIcon"
  },
  {
    id: 2,
    title: "Innovation in Web Development",
    organization: "CSS Design Awards",
    year: 2024,
    category: "Development",
    description: "Honored for pushing the boundaries of web development through innovative use of modern frameworks and performance optimization techniques.",
    icon: "SparklesIcon"
  },
  {
    id: 3,
    title: "Agency of the Year",
    organization: "The Webby Awards",
    year: 2023,
    category: "Agency Recognition",
    description: "Celebrated for consistent delivery of exceptional digital experiences across diverse industries and maintaining the highest standards of creative excellence.",
    icon: "StarIcon"
  },
  {
    id: 4,
    title: "Excellence in Brand Strategy",
    organization: "Communication Arts",
    year: 2023,
    category: "Strategy",
    description: "Acknowledged for strategic thinking that transforms brand challenges into compelling digital narratives that resonate with audiences.",
    icon: "LightBulbIcon"
  },
  {
    id: 5,
    title: "Best User Experience",
    organization: "FWA",
    year: 2023,
    category: "UX Design",
    description: "Awarded for creating intuitive and delightful user experiences that prioritize accessibility while maintaining visual sophistication.",
    icon: "UserGroupIcon"
  },
  {
    id: 6,
    title: "Creative Excellence Award",
    organization: "D&AD",
    year: 2022,
    category: "Creative",
    description: "Recognized for exceptional creative vision and execution that elevates digital design to an art form.",
    icon: "PaintBrushIcon"
  }];


  const pressItems: PressItem[] = [
  {
    id: 1,
    publication: "Design Week",
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_181ca3805-1764929472767.png",
    logoAlt: "Design Week magazine logo with modern typography",
    title: "How Atelier Studio is Redefining Digital Craft",
    date: "December 2024",
    excerpt: "An in-depth look at how this award-winning studio combines artistic vision with technical mastery to create digital experiences that transcend conventional web design.",
    url: "#"
  },
  {
    id: 2,
    publication: "Creative Review",
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_19dc85f1d-1765183337771.png",
    logoAlt: "Creative Review publication logo in bold letters",
    title: "The Philosophy Behind Atelier's Cinematic Approach",
    date: "November 2024",
    excerpt: "Exploring the studio's unique methodology that treats every digital project as a narrative experience, blending storytelling with cutting-edge technology.",
    url: "#"
  },
  {
    id: 3,
    publication: "The Drum",
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_1403684b1-1765955328163.png",
    logoAlt: "The Drum media brand logo with circular design",
    title: "Award-Winning Agency Shares Secrets to Success",
    date: "October 2024",
    excerpt: "Atelier Studio's founders discuss their journey from boutique agency to industry leader, emphasizing the importance of craft over speed.",
    url: "#"
  },
  {
    id: 4,
    publication: "It's Nice That",
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_12d6547d6-1765955328606.png",
    logoAlt: "It's Nice That creative platform logo with artistic flair",
    title: "Spotlight: Studios Pushing Creative Boundaries",
    date: "September 2024",
    excerpt: "Featured among the top creative studios that are challenging industry norms and setting new standards for digital excellence.",
    url: "#"
  }];


  const speakingEvents: SpeakingEvent[] = [
  {
    id: 1,
    title: "The Future of Digital Craft",
    event: "OFFF Barcelona",
    date: "June 2024",
    location: "Barcelona, Spain",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1c5b98df7-1764882794727.png",
    imageAlt: "Modern conference stage with dramatic lighting and large screens displaying digital art",
    description: "Keynote presentation exploring how traditional craftsmanship principles apply to modern digital design and development."
  },
  {
    id: 2,
    title: "Building Cinematic Web Experiences",
    event: "Awwwards Conference",
    date: "May 2024",
    location: "Amsterdam, Netherlands",
    image: "https://images.unsplash.com/photo-1614054418066-f777e9d5b535",
    imageAlt: "Packed auditorium with speaker on stage presenting to engaged audience",
    description: "Workshop on creating immersive digital experiences that tell compelling stories through motion and interaction."
  },
  {
    id: 3,
    title: "The Art of Digital Storytelling",
    event: "99U Conference",
    date: "April 2024",
    location: "New York, USA",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_12681ab67-1764666699439.png",
    imageAlt: "Creative conference venue with attendees networking in modern space with natural lighting",
    description: "Panel discussion on integrating narrative techniques into digital design to create memorable brand experiences."
  }];


  const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Mitchell",
    role: "Creative Director",
    company: "Vogue Digital",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_18e2c0e8a-1763300011744.png",
    imageAlt: "Professional woman with short blonde hair in black blazer smiling confidently",
    quote: "Working with Atelier Studio elevated our digital presence beyond what we imagined possible. Their attention to craft and detail is unmatched in the industry."
  },
  {
    id: 2,
    name: "Marcus Chen",
    role: "Founder & CEO",
    company: "Lumina Brands",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1bef32e3c-1763294452425.png",
    imageAlt: "Asian businessman in navy suit with warm smile in modern office setting",
    quote: "Atelier doesn't just build websites—they create experiences that resonate with our audience on an emotional level. True creative partners."
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    role: "Head of Digital",
    company: "Museum of Contemporary Art",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_19dc372df-1763294269106.png",
    imageAlt: "Hispanic woman with long dark hair in professional attire with artistic background",
    quote: "Their understanding of both artistic vision and technical excellence made them the perfect partner for our digital transformation."
  }];


  const stats: Stat[] = [
  {
    id: 1,
    value: "47+",
    label: "Industry Awards",
    description: "International recognition"
  },
  {
    id: 2,
    value: "120+",
    label: "Projects Delivered",
    description: "Across 15 countries"
  },
  {
    id: 3,
    value: "98%",
    label: "Client Satisfaction",
    description: "Long-term partnerships"
  },
  {
    id: 4,
    value: "12",
    label: "Speaking Events",
    description: "Global conferences"
  }];


  const categories = ['All', 'Digital Design', 'Development', 'Strategy', 'UX Design', 'Creative', 'Agency Recognition'];
  const years = [2024, 2023, 2022];

  const filteredAwards = awards.filter((award) => {
    const categoryMatch = selectedCategory === 'All' || award.category === selectedCategory;
    const yearMatch = !selectedYear || award.year === selectedYear;
    return categoryMatch && yearMatch;
  });

  const handleFilterChange = (category: string, year: number | null) => {
    setSelectedCategory(category);
    setSelectedYear(year);
  };

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-24">
          <div className="animate-pulse">
            <div className="h-12 bg-surface/50 rounded w-1/3 mb-4"></div>
            <div className="h-6 bg-surface/50 rounded w-2/3 mb-12"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((i) =>
              <div key={i} className="h-64 bg-surface/50 rounded-lg"></div>
              )}
            </div>
          </div>
        </div>
      </div>);

  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 lg:px-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative">
          <div className="max-w-3xl">
            <h1 className="font-headline text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
              Recognition &<br />Industry Awards
            </h1>
            <p className="font-body text-lg md:text-xl text-text-secondary leading-relaxed">
              Our commitment to exceptional craft and innovative thinking has earned recognition from the world's most prestigious design and technology organizations.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 lg:px-12 bg-surface/30">
        <div className="max-w-7xl mx-auto">
          <StatsDisplay stats={stats} />
        </div>
      </section>

      {/* Tabs Navigation */}
      <section className="py-12 px-6 lg:px-12 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setActiveTab('awards')}
              className={`px-6 py-3 rounded-full font-cta text-sm font-semibold transition-all duration-300 ${
              activeTab === 'awards' ? 'bg-primary text-background' : 'bg-muted/50 text-text-secondary hover:bg-muted hover:text-foreground'}`
              }>

              <Icon name="TrophyIcon" size={16} className="inline mr-2" />
              Awards & Honors
            </button>
            <button
              onClick={() => setActiveTab('press')}
              className={`px-6 py-3 rounded-full font-cta text-sm font-semibold transition-all duration-300 ${
              activeTab === 'press' ? 'bg-primary text-background' : 'bg-muted/50 text-text-secondary hover:bg-muted hover:text-foreground'}`
              }>

              <Icon name="NewspaperIcon" size={16} className="inline mr-2" />
              Press & Media
            </button>
            <button
              onClick={() => setActiveTab('speaking')}
              className={`px-6 py-3 rounded-full font-cta text-sm font-semibold transition-all duration-300 ${
              activeTab === 'speaking' ? 'bg-primary text-background' : 'bg-muted/50 text-text-secondary hover:bg-muted hover:text-foreground'}`
              }>

              <Icon name="MicrophoneIcon" size={16} className="inline mr-2" />
              Speaking Events
            </button>
          </div>
        </div>
      </section>

      {/* Awards Section */}
      {activeTab === 'awards' &&
      <section className="py-16 px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <FilterBar
            categories={categories}
            years={years}
            onFilterChange={handleFilterChange} />

            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredAwards.map((award) =>
            <AwardCard key={award.id} award={award} />
            )}
            </div>
          </div>
        </section>
      }

      {/* Press Section */}
      {activeTab === 'press' &&
      <section className="py-16 px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pressItems.map((press) =>
            <PressCard key={press.id} press={press} />
            )}
            </div>
          </div>
        </section>
      }

      {/* Speaking Section */}
      {activeTab === 'speaking' &&
      <section className="py-16 px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {speakingEvents.map((event) =>
            <SpeakingCard key={event.id} event={event} />
            )}
            </div>
          </div>
        </section>
      }

      {/* Testimonials Section */}
      <section className="py-20 px-6 lg:px-12 bg-surface/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-headline text-3xl md:text-4xl font-bold text-foreground mb-4">
              Peer Endorsements
            </h2>
            <p className="font-body text-lg text-text-secondary max-w-2xl mx-auto">
              Recognition from creative leaders and industry professionals we've had the privilege to work with.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial) =>
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-foreground mb-6">
            Ready to Create Award-Winning Work Together?
          </h2>
          <p className="font-body text-lg text-text-secondary mb-8">
            Let's discuss how we can bring the same level of craft and innovation to your next project.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="px-8 py-4 bg-accent text-accent-foreground font-cta font-semibold text-base rounded-md hover:bg-accent/90 hover:-translate-y-0.5 hover:shadow-dramatic transition-all duration-300">

              Start a Conversation
            </a>
            <a
              href="/work-portfolio"
              className="px-8 py-4 bg-muted/50 text-foreground font-cta font-semibold text-base rounded-md hover:bg-muted hover:-translate-y-0.5 hover:shadow-dramatic transition-all duration-300">

              View Our Work
            </a>
          </div>
        </div>
      </section>
    </div>);

};

export default RecognitionInteractive;