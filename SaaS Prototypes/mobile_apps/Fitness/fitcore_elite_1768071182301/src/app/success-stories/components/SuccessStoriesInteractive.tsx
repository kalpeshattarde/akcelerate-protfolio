'use client';

import React, { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';
import FilterBar from './FilterBar';
import StoryCard from './StoryCard';
import StatsOverview from './StatsOverview';
import SubmissionPortal from './SubmissionPortal';

interface FilterState {
  transformationType: string;
  timeline: string;
  demographics: string;
  searchTerm: string;
}

interface Story {
  id: number;
  name: string;
  age: number;
  transformationType: string;
  timeline: string;
  beforeImage: string;
  afterImage: string;
  beforeAlt: string;
  afterAlt: string;
  profileImage: string;
  profileAlt: string;
  quote: string;
  achievements: string[];
  metrics: {
    label: string;
    before: string;
    after: string;
    improvement: string;
  }[];
  trainer: string;
  program: string;
  demographics: string;
}

const SuccessStoriesInteractive = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    transformationType: 'all',
    timeline: 'all',
    demographics: 'all',
    searchTerm: ''
  });
  const [isSubmissionPortalOpen, setIsSubmissionPortalOpen] = useState(false);
  const [filteredStories, setFilteredStories] = useState<Story[]>([]);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const mockStories: Story[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    age: 32,
    transformationType: "Weight Loss",
    timeline: "8 months",
    beforeImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1ddd89c9a-1763295459288.png",
    afterImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1ddd89c9a-1763295459288.png",
    beforeAlt: "Woman in casual clothes before fitness transformation",
    afterAlt: "Fit woman in athletic wear showing transformation results",
    profileImage: "https://img.rocket.new/generatedImages/rocket_gen_img_188c0b71a-1763300419859.png",
    profileAlt: "Professional headshot of Sarah Johnson smiling at camera",
    quote: "FitCore Elite didn't just change my body, it transformed my entire mindset. I never thought I could be this strong and confident.",
    achievements: ["Lost 45 lbs", "Completed first marathon", "Gained muscle definition", "Improved energy levels"],
    metrics: [
    { label: "Weight", before: "185 lbs", after: "140 lbs", improvement: "-45 lbs" },
    { label: "Body Fat", before: "32%", after: "18%", improvement: "-14%" },
    { label: "Squat PR", before: "95 lbs", after: "185 lbs", improvement: "+90 lbs" },
    { label: "5K Time", before: "35:20", after: "24:15", improvement: "-11:05" }],

    trainer: "Marcus Rodriguez",
    program: "Elite Weight Loss",
    demographics: "30s"
  },
  {
    id: 2,
    name: "David Chen",
    age: 28,
    transformationType: "Muscle Gain",
    timeline: "12 months",
    beforeImage: "https://images.unsplash.com/photo-1682530676368-9d4be54a9246",
    afterImage: "https://images.unsplash.com/photo-1682530676368-9d4be54a9246",
    beforeAlt: "Lean man before muscle building transformation",
    afterAlt: "Muscular man showing significant muscle gain results",
    profileImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1af382eee-1763299454114.png",
    profileAlt: "Professional headshot of David Chen with confident expression",
    quote: "The science-based approach at FitCore Elite helped me build muscle efficiently. Every workout had a purpose.",
    achievements: ["Gained 25 lbs muscle", "Doubled bench press", "Improved posture", "Enhanced confidence"],
    metrics: [
    { label: "Weight", before: "155 lbs", after: "180 lbs", improvement: "+25 lbs" },
    { label: "Bench Press", before: "135 lbs", after: "275 lbs", improvement: "+140 lbs" },
    { label: "Body Fat", before: "15%", after: "12%", improvement: "-3%" },
    { label: "Deadlift", before: "185 lbs", after: "365 lbs", improvement: "+180 lbs" }],

    trainer: "Alex Thompson",
    program: "Muscle Elite",
    demographics: "20s"
  },
  {
    id: 3,
    name: "Maria Rodriguez",
    age: 45,
    transformationType: "Strength Building",
    timeline: "6 months",
    beforeImage: "https://images.unsplash.com/photo-1530805175117-ee7116357aab",
    afterImage: "https://images.unsplash.com/photo-1530805175117-ee7116357aab",
    beforeAlt: "Middle-aged woman before strength training program",
    afterAlt: "Strong woman demonstrating impressive strength gains",
    profileImage: "https://img.rocket.new/generatedImages/rocket_gen_img_19756622e-1763296890569.png",
    profileAlt: "Professional headshot of Maria Rodriguez with warm smile",
    quote: "At 45, I'm stronger than I was in my 20s. FitCore Elite proved that age is just a number when you train smart.",
    achievements: ["Increased overall strength", "Improved bone density", "Better functional movement", "Pain-free living"],
    metrics: [
    { label: "Squat", before: "65 lbs", after: "155 lbs", improvement: "+90 lbs" },
    { label: "Deadlift", before: "85 lbs", after: "205 lbs", improvement: "+120 lbs" },
    { label: "Pull-ups", before: "0", after: "8", improvement: "+8" },
    { label: "Plank", before: "30 sec", after: "3 min", improvement: "+2:30" }],

    trainer: "Jennifer Kim",
    program: "Strength Elite",
    demographics: "40s"
  },
  {
    id: 4,
    name: "Robert Williams",
    age: 38,
    transformationType: "Athletic Performance",
    timeline: "10 months",
    beforeImage: "https://img.rocket.new/generatedImages/rocket_gen_img_132b7c14d-1763537988732.png",
    afterImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1bafba9cb-1763537990273.png",
    beforeAlt: "Athletic man before performance enhancement training",
    afterAlt: "Elite athlete showing peak performance conditioning",
    profileImage: "https://img.rocket.new/generatedImages/rocket_gen_img_15ebdb31b-1763300068284.png",
    profileAlt: "Professional headshot of Robert Williams with determined expression",
    quote: "FitCore Elite took my athletic performance to levels I never imagined. The precision training made all the difference.",
    achievements: ["Qualified for Boston Marathon", "Improved vertical jump", "Enhanced agility", "Reduced injury risk"],
    metrics: [
    { label: "Marathon Time", before: "4:15:30", after: "3:05:45", improvement: "-1:09:45" },
    { label: "Vertical Jump", before: "24 in", after: "32 in", improvement: "+8 in" },
    { label: "40-yard Dash", before: "5.8 sec", after: "4.9 sec", improvement: "-0.9 sec" },
    { label: "VO2 Max", before: "45", after: "62", improvement: "+17" }],

    trainer: "Carlos Martinez",
    program: "Athletic Elite",
    demographics: "30s"
  },
  {
    id: 5,
    name: "Lisa Thompson",
    age: 29,
    transformationType: "Endurance",
    timeline: "7 months",
    beforeImage: "https://images.unsplash.com/photo-1628257088048-ec028e4c5db7",
    afterImage: "https://images.unsplash.com/photo-1640058905165-de6d580a0919",
    beforeAlt: "Young woman before endurance training program",
    afterAlt: "Endurance athlete showing improved cardiovascular fitness",
    profileImage: "https://img.rocket.new/generatedImages/rocket_gen_img_103b528db-1763293982935.png",
    profileAlt: "Professional headshot of Lisa Thompson with bright smile",
    quote: "The endurance program at FitCore Elite helped me discover my true potential. I can now run distances I never dreamed possible.",
    achievements: ["Completed first triathlon", "Improved cardiovascular health", "Increased stamina", "Better sleep quality"],
    metrics: [
    { label: "5K Time", before: "28:45", after: "21:30", improvement: "-7:15" },
    { label: "Resting HR", before: "78 bpm", after: "58 bpm", improvement: "-20 bpm" },
    { label: "Max Distance", before: "3 miles", after: "26.2 miles", improvement: "+23.2 mi" },
    { label: "Recovery Time", before: "48 hrs", after: "24 hrs", improvement: "-24 hrs" }],

    trainer: "Sarah Davis",
    program: "Endurance Elite",
    demographics: "20s"
  },
  {
    id: 6,
    name: "Michael Brown",
    age: 52,
    transformationType: "Rehabilitation",
    timeline: "9 months",
    beforeImage: "https://img.rocket.new/generatedImages/rocket_gen_img_123667d4b-1763537990743.png",
    afterImage: "https://img.rocket.new/generatedImages/rocket_gen_img_12f40d767-1763537990751.png",
    beforeAlt: "Older man before rehabilitation and recovery program",
    afterAlt: "Healthy man showing successful rehabilitation results",
    profileImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1eccfb086-1763301672802.png",
    profileAlt: "Professional headshot of Michael Brown with confident smile",
    quote: "After my injury, I thought my active days were over. FitCore Elite's rehabilitation program brought me back stronger than ever.",
    achievements: ["Recovered from back injury", "Eliminated chronic pain", "Restored mobility", "Returned to sports"],
    metrics: [
    { label: "Pain Level", before: "8/10", after: "1/10", improvement: "-7 points" },
    { label: "Flexibility", before: "Limited", after: "Full ROM", improvement: "100%" },
    { label: "Strength", before: "40% loss", after: "110% baseline", improvement: "+150%" },
    { label: "Daily Function", before: "Restricted", after: "Unlimited", improvement: "Full recovery" }],

    trainer: "Dr. Amanda Foster",
    program: "Recovery Elite",
    demographics: "50plus"
  }];


  const statsData = [
  {
    label: "Success Stories",
    value: "500+",
    icon: "TrophyIcon",
    trend: "Growing daily"
  },
  {
    label: "Average Weight Loss",
    value: "35 lbs",
    icon: "ScaleIcon",
    trend: "In 6 months"
  },
  {
    label: "Muscle Gain Average",
    value: "18 lbs",
    icon: "BoltIcon",
    trend: "In 8 months"
  },
  {
    label: "Member Satisfaction",
    value: "98%",
    icon: "HeartIcon",
    trend: "5-star rated"
  }];


  useEffect(() => {
    let filtered = mockStories;

    // Filter by transformation type
    if (filters.transformationType !== 'all') {
      filtered = filtered.filter((story) =>
      story.transformationType.toLowerCase().includes(filters.transformationType.toLowerCase())
      );
    }

    // Filter by timeline
    if (filters.timeline !== 'all') {
      filtered = filtered.filter((story) => {
        const storyMonths = parseInt(story.timeline);
        switch (filters.timeline) {
          case '3-months':
            return storyMonths <= 3;
          case '6-months':
            return storyMonths <= 6;
          case '1-year':
            return storyMonths <= 12;
          case '2-years':
            return storyMonths <= 24;
          default:
            return true;
        }
      });
    }

    // Filter by demographics
    if (filters.demographics !== 'all') {
      filtered = filtered.filter((story) => story.demographics === filters.demographics);
    }

    // Filter by search term
    if (filters.searchTerm) {
      filtered = filtered.filter((story) =>
      story.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      story.quote.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      story.achievements.some((achievement) =>
      achievement.toLowerCase().includes(filters.searchTerm.toLowerCase())
      )
      );
    }

    setFilteredStories(filtered);
  }, [filters]);

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  const handleShare = (storyId: number) => {
    if (!isHydrated) return;

    const story = mockStories.find((s) => s.id === storyId);
    if (story && navigator.share) {
      navigator.share({
        title: `${story.name}'s Success Story - FitCore Elite`,
        text: story.quote,
        url: window.location.href
      });
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const handleViewDetails = (storyId: number) => {
    // In a real app, this would navigate to a detailed story page
    console.log('View details for story:', storyId);
  };

  const handleSubmissionPortalOpen = () => {
    setIsSubmissionPortalOpen(true);
  };

  const handleSubmissionPortalClose = () => {
    setIsSubmissionPortalOpen(false);
  };

  const handleStorySubmission = (data: any) => {
    console.log('Story submitted:', data);
    // In a real app, this would send data to the server
  };

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background">
        <div className="animate-pulse">
          <div className="h-64 bg-muted rounded-lg mb-8"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) =>
            <div key={i} className="h-96 bg-muted rounded-lg"></div>
            )}
          </div>
        </div>
      </div>);

  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-background via-card to-background py-12 sm:py-16 lg:py-32">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%2300ff88%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 bg-primary/10 text-primary rounded-full text-xs sm:text-sm font-semibold mb-4 sm:mb-6">
            <Icon name="TrophyIcon" size={14} className="mr-1.5 sm:mr-2" />
            <span className="break-words">Real Transformations, Real Results</span>
          </div>
          
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-foreground mb-4 sm:mb-6 break-words">
            Success <span className="text-primary">Stories</span>
          </h1>
          
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto mb-6 sm:mb-8 break-words px-4">
            Discover inspiring transformation journeys from our elite members. 
            See how dedication, expert guidance, and the right program can unlock your true potential.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4">
            <button
              onClick={handleSubmissionPortalOpen}
              className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 sm:px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 hover:scale-105 transition-all duration-300 shadow-lg text-sm sm:text-base"
            >
              <Icon name="PlusIcon" size={18} />
              <span className="break-words">Share Your Story</span>
            </button>
            
            <a
              href="#stories"
              className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 sm:px-8 py-3 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-colors duration-200 text-sm sm:text-base"
            >
              <Icon name="ArrowDownIcon" size={18} />
              <span className="break-words">View Stories</span>
            </a>
          </div>
        </div>
      </section>

      {/* Stats Overview */}
      <section className="py-12 sm:py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StatsOverview stats={statsData} />
        </div>
      </section>

      {/* Stories Section */}
      <section id="stories" className="py-12 sm:py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3 sm:mb-4 break-words">
              Transformation Gallery
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto break-words px-4">
              Filter through hundreds of success stories to find inspiration that matches your goals and journey.
            </p>
          </div>

          {/* Filter Bar */}
          <FilterBar onFilterChange={handleFilterChange} />

          {/* Results Count */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-6 sm:mb-8">
            <p className="text-muted-foreground text-sm sm:text-base break-words">
              Showing <span className="font-semibold text-foreground">{filteredStories.length}</span> success stories
            </p>
            
            <div className="flex items-center space-x-2 text-xs sm:text-sm text-muted-foreground">
              <Icon name="FunnelIcon" size={14} />
              <span className="break-words">Filtered results</span>
            </div>
          </div>

          {/* Stories Grid */}
          {filteredStories.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {filteredStories.map((story) => (
                <StoryCard
                  key={story.id}
                  story={story}
                  onShare={handleShare}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 sm:py-16 px-4">
              <Icon name="MagnifyingGlassIcon" size={48} className="mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2 break-words">
                No stories found
              </h3>
              <p className="text-muted-foreground mb-6 break-words max-w-md mx-auto">
                Try adjusting your filters to see more success stories.
              </p>
              <button
                onClick={() => handleFilterChange({
                  transformationType: 'all',
                  timeline: 'all',
                  demographics: 'all',
                  searchTerm: ''
                })}
                className="px-4 sm:px-6 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors duration-200 text-sm sm:text-base"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-24 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4 sm:mb-6 break-words">
            Ready to Write Your Success Story?
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground mb-6 sm:mb-8 break-words max-w-2xl mx-auto">
            Join hundreds of members who have transformed their lives at FitCore Elite. 
            Your journey to elite fitness starts with a single step.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4">
            <button
              onClick={handleSubmissionPortalOpen}
              className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 sm:px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 hover:scale-105 transition-all duration-300 shadow-lg text-sm sm:text-base"
            >
              <Icon name="DocumentTextIcon" size={18} />
              <span className="break-words">Share Your Story</span>
            </button>
            
            <a
              href="/membership"
              className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 sm:px-8 py-3 bg-accent text-accent-foreground rounded-lg font-semibold hover:bg-accent/90 transition-colors duration-200 text-sm sm:text-base"
            >
              <Icon name="RocketLaunchIcon" size={18} />
              <span className="break-words">Start Your Journey</span>
            </a>
          </div>
        </div>
      </section>

      {/* Submission Portal */}
      <SubmissionPortal
        isOpen={isSubmissionPortalOpen}
        onClose={handleSubmissionPortalClose}
        onSubmit={handleStorySubmission}
      />
    </div>
  );
};

export default SuccessStoriesInteractive;