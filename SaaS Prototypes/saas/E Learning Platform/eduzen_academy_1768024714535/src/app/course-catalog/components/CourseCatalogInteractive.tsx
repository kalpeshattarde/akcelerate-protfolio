'use client';

import React, { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';
import CourseCard from './CourseCard';
import FilterSidebar from './FilterSidebar';
import SearchBar from './SearchBar';
import SortDropdown from './SortDropdown';

interface Course {
  id: string;
  title: string;
  instructor: string;
  instructorImage: string;
  instructorImageAlt: string;
  category: string;
  level: string;
  duration: string;
  rating: number;
  studentsEnrolled: number;
  price: number;
  image: string;
  imageAlt: string;
  description: string;
  learningOutcomes: string[];
}

interface FilterOption {
  id: string;
  label: string;
  count?: number;
}

interface SearchSuggestion {
  id: string;
  text: string;
  type: 'course' | 'instructor' | 'topic';
}

const CourseCatalogInteractive = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popularity');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [wishlistedCourses, setWishlistedCourses] = useState<string[]>([]);
  const [selectedFilters, setSelectedFilters] = useState({
    categories: [] as string[],
    levels: [] as string[],
    durations: [] as string[],
    formats: [] as string[],
    priceRanges: [] as string[]
  });

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Mindful Leadership: Leading with Presence and Purpose',
    instructor: 'Dr. Sarah Chen',
    instructorImage: "https://img.rocket.new/generatedImages/rocket_gen_img_11b65d5e5-1763295594033.png",
    instructorImageAlt: 'Professional Asian woman with short black hair in navy blazer smiling warmly',
    category: 'Leadership',
    level: 'Intermediate',
    duration: '8 weeks',
    rating: 4.9,
    studentsEnrolled: 2847,
    price: 149,
    image: "https://images.unsplash.com/photo-1568992688065-536aad8a12f6",
    imageAlt: 'Business team in modern office having collaborative meeting around wooden table',
    description: 'Transform your leadership approach by integrating mindfulness practices with strategic decision-making. Learn to lead with clarity, compassion, and authentic presence.',
    learningOutcomes: ['Develop mindful leadership presence', 'Make conscious decisions under pressure', 'Build emotionally intelligent teams']
  },
  {
    id: '2',
    title: 'The Art of Focused Learning: Mastering Deep Work',
    instructor: 'Michael Rodriguez',
    instructorImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1dad5cfc5-1763294631166.png",
    instructorImageAlt: 'Hispanic man with beard in casual blue shirt smiling confidently',
    category: 'Productivity',
    level: 'Beginner',
    duration: '4 weeks',
    rating: 4.8,
    studentsEnrolled: 4521,
    price: 89,
    image: "https://images.unsplash.com/photo-1621606676821-6b256974f32e",
    imageAlt: 'Person writing in journal at wooden desk with laptop and coffee in natural light',
    description: 'Discover proven techniques to eliminate distractions, enhance concentration, and achieve flow states. Build sustainable habits for lifelong focused learning.',
    learningOutcomes: ['Master deep work techniques', 'Create distraction-free environments', 'Develop sustainable focus habits']
  },
  {
    id: '3',
    title: 'Emotional Intelligence for Professional Growth',
    instructor: 'Dr. Amara Williams',
    instructorImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1f770538e-1763295660832.png",
    instructorImageAlt: 'African American woman with natural hair in professional attire with warm smile',
    category: 'Personal Development',
    level: 'All Levels',
    duration: '6 weeks',
    rating: 4.9,
    studentsEnrolled: 3654,
    price: 129,
    image: "https://images.unsplash.com/photo-1677594333094-bc1baffab0ad",
    imageAlt: 'Diverse group of professionals engaged in empathetic conversation in bright office space',
    description: 'Enhance your emotional intelligence to build stronger relationships, navigate workplace dynamics, and accelerate your career with authentic connections.',
    learningOutcomes: ['Understand emotional patterns', 'Improve interpersonal communication', 'Navigate difficult conversations']
  },
  {
    id: '4',
    title: 'Digital Minimalism: Reclaiming Your Attention',
    instructor: 'James Park',
    instructorImage: "https://img.rocket.new/generatedImages/rocket_gen_img_14a41f60e-1763294900500.png",
    instructorImageAlt: 'Asian man with glasses in casual sweater looking thoughtful and focused',
    category: 'Wellness',
    level: 'Beginner',
    duration: '3 weeks',
    rating: 4.7,
    studentsEnrolled: 5234,
    price: 69,
    image: "https://images.unsplash.com/photo-1588341721966-6b674b8c5dc7",
    imageAlt: 'Minimalist workspace with single plant and closed laptop on clean white desk',
    description: 'Learn to cultivate a healthier relationship with technology. Reduce digital overwhelm and create space for meaningful work and genuine connections.',
    learningOutcomes: ['Audit digital habits', 'Implement technology boundaries', 'Design intentional digital life']
  },
  {
    id: '5',
    title: 'Strategic Thinking for Complex Problem Solving',
    instructor: 'Prof. Elena Kowalski',
    instructorImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1471b1e9e-1763295574160.png",
    instructorImageAlt: 'European woman with blonde hair in professional blazer with confident expression',
    category: 'Business Strategy',
    level: 'Advanced',
    duration: '10 weeks',
    rating: 4.9,
    studentsEnrolled: 1876,
    price: 199,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_15ca6c29f-1765744696225.png",
    imageAlt: 'Strategic planning session with charts and diagrams on whiteboard in modern boardroom',
    description: 'Develop advanced strategic thinking frameworks to tackle complex business challenges. Learn to see patterns, anticipate outcomes, and make high-impact decisions.',
    learningOutcomes: ['Apply strategic frameworks', 'Analyze complex systems', 'Make data-informed decisions']
  },
  {
    id: '6',
    title: 'Mindful Communication: Speaking with Intention',
    instructor: 'Dr. Raj Patel',
    instructorImage: "https://img.rocket.new/generatedImages/rocket_gen_img_14d6a39f2-1763295161609.png",
    instructorImageAlt: 'Indian man with warm smile in business casual attire looking approachable',
    category: 'Communication',
    level: 'Intermediate',
    duration: '5 weeks',
    rating: 4.8,
    studentsEnrolled: 3142,
    price: 109,
    image: "https://images.unsplash.com/photo-1677594333094-bc1baffab0ad",
    imageAlt: 'Two professionals having meaningful conversation in bright office with natural light',
    description: 'Transform your communication style through mindfulness practices. Learn to listen deeply, speak authentically, and create meaningful dialogue in all contexts.',
    learningOutcomes: ['Practice active listening', 'Communicate with clarity', 'Navigate difficult conversations']
  }];


  const filterOptions = {
    categories: [
    { id: 'leadership', label: 'Leadership', count: 12 },
    { id: 'productivity', label: 'Productivity', count: 18 },
    { id: 'personal-dev', label: 'Personal Development', count: 24 },
    { id: 'wellness', label: 'Wellness', count: 15 },
    { id: 'business', label: 'Business Strategy', count: 9 },
    { id: 'communication', label: 'Communication', count: 14 }],

    levels: [
    { id: 'beginner', label: 'Beginner', count: 32 },
    { id: 'intermediate', label: 'Intermediate', count: 28 },
    { id: 'advanced', label: 'Advanced', count: 16 },
    { id: 'all-levels', label: 'All Levels', count: 20 }],

    durations: [
    { id: '1-3', label: '1-3 weeks', count: 18 },
    { id: '4-6', label: '4-6 weeks', count: 34 },
    { id: '7-10', label: '7-10 weeks', count: 22 },
    { id: '10plus', label: '10+ weeks', count: 12 }],

    formats: [
    { id: 'video', label: 'Video Lectures', count: 68 },
    { id: 'interactive', label: 'Interactive Exercises', count: 45 },
    { id: 'reading', label: 'Reading Materials', count: 52 },
    { id: 'live', label: 'Live Sessions', count: 28 }],

    priceRanges: [
    { id: 'free', label: 'Free', count: 8 },
    { id: '0-50', label: '$0 - $50', count: 12 },
    { id: '51-100', label: '$51 - $100', count: 24 },
    { id: '101-150', label: '$101 - $150', count: 18 },
    { id: '151plus', label: '$151+', count: 14 }]

  };

  const sortOptions = [
  { id: 'popularity', label: 'Most Popular' },
  { id: 'newest', label: 'Newest First' },
  { id: 'rating', label: 'Highest Rated' },
  { id: 'price-low', label: 'Price: Low to High' },
  { id: 'price-high', label: 'Price: High to Low' },
  { id: 'duration', label: 'Shortest Duration' }];


  const searchSuggestions: SearchSuggestion[] = [
  { id: '1', text: 'Mindful Leadership', type: 'course' },
  { id: '2', text: 'Dr. Sarah Chen', type: 'instructor' },
  { id: '3', text: 'Emotional Intelligence', type: 'topic' },
  { id: '4', text: 'Digital Minimalism', type: 'course' },
  { id: '5', text: 'Strategic Thinking', type: 'topic' }];


  const handleFilterChange = (filterType: string, value: string) => {
    setSelectedFilters((prev) => {
      const currentFilters = prev[filterType as keyof typeof prev];
      const isSelected = currentFilters.includes(value);

      return {
        ...prev,
        [filterType]: isSelected ?
        currentFilters.filter((item) => item !== value) :
        [...currentFilters, value]
      };
    });
  };

  const handleClearAllFilters = () => {
    setSelectedFilters({
      categories: [],
      levels: [],
      durations: [],
      formats: [],
      priceRanges: []
    });
  };

  const handleWishlistToggle = (courseId: string) => {
    setWishlistedCourses((prev) =>
    prev.includes(courseId) ? prev.filter((id) => id !== courseId) : [...prev, courseId]
    );
  };

  const filteredCourses = mockCourses.filter((course) => {
    const matchesSearch =
    searchQuery === '' ||
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesSearch;
  });

  const sortedCourses = [...filteredCourses].sort((a, b) => {
    switch (sortBy) {
      case 'popularity':
        return b.studentsEnrolled - a.studentsEnrolled;
      case 'rating':
        return b.rating - a.rating;
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      default:
        return 0;
    }
  });

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="animate-pulse space-y-8">
            <div className="h-12 bg-muted rounded-lg w-1/3"></div>
            <div className="h-16 bg-muted rounded-2xl"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) =>
              <div key={i} className="h-96 bg-muted rounded-2xl"></div>
              )}
            </div>
          </div>
        </div>
      </div>);

  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl lg:text-5xl font-headline font-semibold text-foreground mb-4">
            Discover Your Learning Path
          </h1>
          <p className="text-lg font-body text-muted-foreground max-w-3xl">
            Explore our curated collection of transformative courses designed for mindful growth and
            professional excellence. Each course is crafted to honor your time and nurture your
            potential.
          </p>
        </div>

        <div className="mb-8">
          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            suggestions={searchSuggestions} />

        </div>

        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-card border border-border rounded-lg hover:border-primary transition-all duration-300 font-body text-sm text-foreground">

              <Icon name="FunnelIcon" size={18} />
              <span>Filters</span>
            </button>
            <p className="font-body text-sm text-muted-foreground">
              {sortedCourses.length} courses found
            </p>
          </div>
          <SortDropdown sortBy={sortBy} onSortChange={setSortBy} options={sortOptions} />
        </div>

        <div className="flex gap-8">
          <FilterSidebar
            filters={filterOptions}
            selectedFilters={selectedFilters}
            onFilterChange={handleFilterChange}
            onClearAll={handleClearAllFilters}
            isMobileOpen={isMobileFilterOpen}
            onMobileClose={() => setIsMobileFilterOpen(false)} />


          <div className="flex-1">
            {sortedCourses.length > 0 ?
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {sortedCourses.map((course) =>
              <CourseCard
                key={course.id}
                course={course}
                onWishlistToggle={handleWishlistToggle}
                isWishlisted={wishlistedCourses.includes(course.id)} />

              )}
              </div> :

            <div className="text-center py-16">
                <Icon name="MagnifyingGlassIcon" size={64} className="mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-headline font-semibold text-foreground mb-2">
                  No courses found
                </h3>
                <p className="font-body text-muted-foreground mb-6">
                  Try adjusting your search or filters to discover more courses
                </p>
                <button
                onClick={() => {
                  setSearchQuery('');
                  handleClearAllFilters();
                }}
                className="px-6 py-3 font-cta font-semibold text-sm text-primary-foreground bg-primary rounded-lg hover:shadow-cta transition-all duration-300">

                  Clear All Filters
                </button>
              </div>
            }
          </div>
        </div>
      </div>
    </div>);

};

export default CourseCatalogInteractive;