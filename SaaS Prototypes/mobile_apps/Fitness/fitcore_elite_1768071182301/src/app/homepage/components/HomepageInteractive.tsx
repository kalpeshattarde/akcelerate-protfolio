'use client';

import React, { useState, useEffect } from 'react';
import HeroSection from './HeroSection';
import ProgramsPreview from './ProgramsPreview';
import LiveActivityFeed from './LiveActivityFeed';
import TestimonialSlider from './TestimonialSlider';
import TrainersPreview from './TrainersPreview';
import MembershipCTA from './MembershipCTA';

interface AthleteSpotlight {
  id: number;
  name: string;
  achievement: string;
  image: string;
  alt: string;
  stats: {
    label: string;
    value: string;
  }[];
}

const HomepageInteractive = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [currentSpotlightIndex, setCurrentSpotlightIndex] = useState(0);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const athleteSpotlights: AthleteSpotlight[] = [
  {
    id: 1,
    name: 'Maria Santos',
    achievement: 'Elite Performance Champion',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_18fd07841-1763294704174.png",
    alt: 'Latina female athlete with determined expression in professional fitness attire',
    stats: [
    { label: 'Deadlift PR', value: '315 lbs' },
    { label: 'Body Fat', value: '12%' },
    { label: 'Training Days', value: '180' },
    { label: 'Strength Gain', value: '+65%' }]

  },
  {
    id: 2,
    name: 'James Mitchell',
    achievement: 'Transformation Specialist',
    image: "https://images.unsplash.com/photo-1583500178753-464599364366",
    alt: 'Caucasian male athlete with beard showing muscular definition in gym setting',
    stats: [
    { label: 'Weight Lost', value: '45 lbs' },
    { label: 'Muscle Gain', value: '18 lbs' },
    { label: 'Marathon Time', value: '3:15' },
    { label: 'VO2 Max', value: '58' }]

  },
  {
    id: 3,
    name: 'Dr. Kevin Park',
    achievement: 'Elite Endurance Athlete',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_105806a3a-1763537989833.png",
    alt: 'Asian male professional in athletic wear displaying peak physical conditioning',
    stats: [
    { label: 'Ironman PR', value: '9:45' },
    { label: 'Cycling FTP', value: '385W' },
    { label: 'Run Pace', value: '6:20/mi' },
    { label: 'Training Hours', value: '520' }]

  }];


  useEffect(() => {
    if (!isHydrated) return;

    const interval = setInterval(() => {
      setCurrentSpotlightIndex((prev) => (prev + 1) % athleteSpotlights.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [isHydrated, athleteSpotlights.length]);

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background">
        <div className="animate-pulse">
          <div className="h-screen bg-gradient-to-br from-background via-deep-charcoal to-background"></div>
        </div>
      </div>);

  }

  const currentSpotlight = athleteSpotlights[currentSpotlightIndex];

  return (
    <div className="min-h-screen bg-background">
      <HeroSection currentSpotlight={currentSpotlight} />
      <ProgramsPreview />
      <LiveActivityFeed />
      <TrainersPreview />
      <TestimonialSlider />
      <MembershipCTA />
    </div>);

};

export default HomepageInteractive;