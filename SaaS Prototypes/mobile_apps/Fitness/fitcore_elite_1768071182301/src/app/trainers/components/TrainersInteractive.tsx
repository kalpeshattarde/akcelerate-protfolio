'use client';

import React, { useState, useEffect } from 'react';
import TrainerCard from './TrainerCard';
import TrainerFilters from './TrainerFilters';
import TestimonialCarousel from './TestimonialCarousel';
import Icon from '@/components/ui/AppIcon';

interface Certification {
  name: string;
  organization: string;
  year: number;
}

interface Specialization {
  name: string;
  level: 'Expert' | 'Advanced' | 'Specialist';
}

interface Trainer {
  id: number;
  name: string;
  title: string;
  image: string;
  alt: string;
  experience: number;
  specializations: Specialization[];
  certifications: Certification[];
  rating: number;
  clientCount: number;
  bio: string;
  availability: 'Available' | 'Busy' | 'Booked';
  hourlyRate: number;
  videoIntro?: string;
}

const TrainersInteractive = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [filteredTrainers, setFilteredTrainers] = useState<Trainer[]>([]);
  const [sortBy, setSortBy] = useState('name');

  useEffect(() => {
    setIsHydrated(true);
    setFilteredTrainers(mockTrainers);
  }, []);

  const mockTrainers: Trainer[] = [
  {
    id: 1,
    name: "Marcus Rodriguez",
    title: "Elite Performance Specialist",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_16b15b570-1763299846623.png",
    alt: "Professional Hispanic male trainer in athletic wear demonstrating exercise form",
    experience: 12,
    specializations: [
    { name: "Strength Training", level: "Expert" },
    { name: "Sports Performance", level: "Expert" },
    { name: "Nutrition", level: "Advanced" }],

    certifications: [
    { name: "CSCS", organization: "NSCA", year: 2018 },
    { name: "ACSM-CPT", organization: "ACSM", year: 2016 },
    { name: "Precision Nutrition L1", organization: "PN", year: 2019 }],

    rating: 4.9,
    clientCount: 87,
    bio: "Marcus combines cutting-edge sports science with practical training methodologies to deliver exceptional results. His expertise in biomechanics and performance optimization has helped elite athletes and fitness enthusiasts achieve their peak potential.",
    availability: "Available",
    hourlyRate: 150,
    videoIntro: "intro-marcus.mp4"
  },
  {
    id: 2,
    name: "Elena Vasquez",
    title: "Transformation Architect",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1290f2055-1763299401840.png",
    alt: "Confident female trainer with dark hair in professional fitness attire",
    experience: 8,
    specializations: [
    { name: "Weight Loss", level: "Expert" },
    { name: "Muscle Building", level: "Advanced" },
    { name: "Flexibility", level: "Specialist" }],

    certifications: [
    { name: "NASM-CPT", organization: "NASM", year: 2020 },
    { name: "Corrective Exercise", organization: "NASM", year: 2021 },
    { name: "Yoga Alliance RYT-200", organization: "YA", year: 2019 }],

    rating: 4.8,
    clientCount: 124,
    bio: "Elena specializes in comprehensive body transformations through personalized training programs and lifestyle coaching. Her holistic approach addresses both physical and mental aspects of fitness for sustainable long-term results.",
    availability: "Busy",
    hourlyRate: 125,
    videoIntro: "intro-elena.mp4"
  },
  {
    id: 3,
    name: "James Mitchell",
    title: "Strength & Conditioning Coach",
    image: "https://images.unsplash.com/photo-1606889464198-fcb18894cf50",
    alt: "Muscular African American trainer in gym setting showing proper lifting technique",
    experience: 15,
    specializations: [
    { name: "Powerlifting", level: "Expert" },
    { name: "Rehabilitation", level: "Advanced" },
    { name: "Cardio", level: "Specialist" }],

    certifications: [
    { name: "CSCS", organization: "NSCA", year: 2015 },
    { name: "FMS Level 2", organization: "FMS", year: 2017 },
    { name: "USAW Level 1", organization: "USAW", year: 2016 }],

    rating: 4.9,
    clientCount: 156,
    bio: "With over 15 years of experience, James has worked with professional athletes and everyday fitness enthusiasts. His expertise in movement mechanics and injury prevention ensures safe, effective training for all fitness levels.",
    availability: "Available",
    hourlyRate: 175,
    videoIntro: "intro-james.mp4"
  },
  {
    id: 4,
    name: "Sarah Kim",
    title: "Functional Movement Expert",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_117585847-1763537988851.png",
    alt: "Asian female trainer in modern gym demonstrating functional movement patterns",
    experience: 6,
    specializations: [
    { name: "Functional Training", level: "Expert" },
    { name: "Mobility", level: "Advanced" },
    { name: "Group Training", level: "Specialist" }],

    certifications: [
    { name: "ACSM-CPT", organization: "ACSM", year: 2021 },
    { name: "TRX Suspension Training", organization: "TRX", year: 2020 },
    { name: "Kettlebell Certification", organization: "RKC", year: 2022 }],

    rating: 4.7,
    clientCount: 93,
    bio: "Sarah focuses on functional movement patterns that translate to real-world activities. Her innovative training methods improve daily performance while building strength, stability, and mobility for optimal health.",
    availability: "Available",
    hourlyRate: 110,
    videoIntro: "intro-sarah.mp4"
  },
  {
    id: 5,
    name: "David Thompson",
    title: "Endurance Performance Coach",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_18551cb1c-1763537988542.png",
    alt: "Fit male trainer in running gear demonstrating cardiovascular training techniques",
    experience: 10,
    specializations: [
    { name: "Endurance Training", level: "Expert" },
    { name: "Marathon Prep", level: "Advanced" },
    { name: "Recovery", level: "Specialist" }],

    certifications: [
    { name: "USATF Level 2", organization: "USATF", year: 2019 },
    { name: "NASM-CPT", organization: "NASM", year: 2018 },
    { name: "Recovery Specialist", organization: "NASM", year: 2020 }],

    rating: 4.8,
    clientCount: 78,
    bio: "David specializes in endurance training and has coached numerous athletes to personal bests in marathons and triathlons. His scientific approach to training periodization maximizes performance while minimizing injury risk.",
    availability: "Booked",
    hourlyRate: 140,
    videoIntro: "intro-david.mp4"
  },
  {
    id: 6,
    name: "Lisa Chen",
    title: "Wellness & Nutrition Coach",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_112c72d39-1763537988556.png",
    alt: "Professional Asian female trainer in wellness center explaining nutrition concepts",
    experience: 7,
    specializations: [
    { name: "Nutrition Coaching", level: "Expert" },
    { name: "Wellness", level: "Advanced" },
    { name: "Stress Management", level: "Specialist" }],

    certifications: [
    { name: "Registered Dietitian", organization: "CDR", year: 2020 },
    { name: "NASM-CPT", organization: "NASM", year: 2019 },
    { name: "Mindfulness Coach", organization: "MC", year: 2021 }],

    rating: 4.9,
    clientCount: 112,
    bio: "Lisa takes a holistic approach to health and fitness, combining exercise science with nutritional expertise and wellness coaching. Her programs focus on sustainable lifestyle changes for long-term health and vitality.",
    availability: "Available",
    hourlyRate: 130,
    videoIntro: "intro-lisa.mp4"
  }];


  const handleFiltersChange = (filters: any) => {
    let filtered = [...mockTrainers];

    // Search filter
    if (filters.search) {
      filtered = filtered.filter((trainer) =>
      trainer.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      trainer.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      trainer.specializations.some((spec) =>
      spec.name.toLowerCase().includes(filters.search.toLowerCase())
      )
      );
    }

    // Specialization filter
    if (filters.specialization) {
      filtered = filtered.filter((trainer) =>
      trainer.specializations.some((spec) => spec.name === filters.specialization)
      );
    }

    // Availability filter
    if (filters.availability && filters.availability !== 'All') {
      filtered = filtered.filter((trainer) => trainer.availability === filters.availability);
    }

    // Experience filter
    if (filters.experience) {
      const experienceRanges = {
        '1-3 years': [1, 3],
        '4-7 years': [4, 7],
        '8-12 years': [8, 12],
        '13+ years': [13, 100]
      };
      const range = experienceRanges[filters.experience as keyof typeof experienceRanges];
      if (range) {
        filtered = filtered.filter((trainer) =>
        trainer.experience >= range[0] && trainer.experience <= range[1]
        );
      }
    }

    // Rating filter
    if (filters.rating && filters.rating !== 'All') {
      const minRating = parseFloat(filters.rating.replace('+', ''));
      filtered = filtered.filter((trainer) => trainer.rating >= minRating);
    }

    setFilteredTrainers(filtered);
  };

  const handleSortChange = (newSortBy: string) => {
    setSortBy(newSortBy);
    const sorted = [...filteredTrainers].sort((a, b) => {
      switch (newSortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'experience':
          return b.experience - a.experience;
        case 'rating':
          return b.rating - a.rating;
        case 'price':
          return a.hourlyRate - b.hourlyRate;
        default:
          return 0;
      }
    });
    setFilteredTrainers(sorted);
  };

  if (!isHydrated) {
    return (
      <div className="space-y-8">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-1/3 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) =>
            <div key={i} className="bg-card border border-border rounded-xl p-6">
                <div className="h-20 bg-muted rounded mb-4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                  <div className="h-4 bg-muted rounded w-1/2"></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>);

  }

  return (
    <div className="space-y-8">
      {/* Filters */}
      <TrainerFilters onFiltersChange={handleFiltersChange} />

      {/* Results Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            {filteredTrainers.length} Elite Trainers Available
          </h2>
          <p className="text-muted-foreground">
            Find the perfect trainer to guide your fitness journey
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <span className="text-sm text-muted-foreground">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => handleSortChange(e.target.value)}
            className="px-3 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors duration-200">

            <option value="name">Name</option>
            <option value="experience">Experience</option>
            <option value="rating">Rating</option>
            <option value="price">Price</option>
          </select>
        </div>
      </div>

      {/* Trainers Grid */}
      {filteredTrainers.length > 0 ?
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTrainers.map((trainer) =>
        <TrainerCard key={trainer.id} trainer={trainer} />
        )}
        </div> :

      <div className="text-center py-16">
          <Icon name="UserGroupIcon" size={64} className="text-muted mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-foreground mb-2">No trainers found</h3>
          <p className="text-muted-foreground">
            Try adjusting your filters to see more results
          </p>
        </div>
      }

      {/* Testimonials */}
      <TestimonialCarousel />

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-xl p-8 text-center">
        <h3 className="text-2xl font-bold text-foreground mb-4">
          Ready to Start Your Elite Journey?
        </h3>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Book a consultation with one of our elite trainers and discover how personalized coaching can transform your fitness goals into reality.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors duration-200">
            Book Free Consultation
          </button>
          <button className="px-8 py-3 border border-border text-foreground rounded-lg font-semibold hover:bg-muted/50 transition-colors duration-200">
            View Membership Plans
          </button>
        </div>
      </div>
    </div>);

};

export default TrainersInteractive;