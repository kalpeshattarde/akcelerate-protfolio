'use client';

import React, { useState, useEffect } from 'react';
import ProgramCard from './ProgramCard';
import ProgramComparison from './ProgramComparison';
import ProgressVisualization from './ProgressVisualization';
import PrerequisiteAssessment from './PrerequisiteAssessment';
import ProgramPreview from './ProgramPreview';
import Icon from '@/components/ui/AppIcon';

interface Program {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  alt: string;
  level: string;
  duration: string;
  sessions: number;
  equipment: string[];
  highlights: string[];
  color: string;
  category: 'strength' | 'cardio' | 'hybrid';
}

interface ComparisonFeature {
  name: string;
  strength: boolean | string;
  cardio: boolean | string;
  hybrid: boolean | string;
}

interface ProgressData {
  week: number;
  strength: number;
  endurance: number;
  technique: number;
}

interface MilestoneData {
  title: string;
  week: number;
  description: string;
  completed: boolean;
}

interface AssessmentQuestion {
  id: string;
  question: string;
  type: 'multiple' | 'scale' | 'boolean';
  options?: string[];
  category: 'fitness' | 'experience' | 'goals' | 'availability';
}

interface VideoChapter {
  id: string;
  title: string;
  duration: string;
  thumbnail: string;
  alt: string;
}

interface ProgramPreviewData {
  id: string;
  title: string;
  previewVideo: string;
  chapters: VideoChapter[];
  totalDuration: string;
}

const ProgramsInteractive = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeSection, setActiveSection] = useState('programs');

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const programs: Program[] = [
  {
    id: 'strength-elite',
    title: 'Strength Elite',
    subtitle: 'Maximum Power Development',
    description: 'Advanced strength training program focusing on compound movements, progressive overload, and elite-level powerlifting techniques for serious athletes.',
    image: "https://images.unsplash.com/photo-1674748596342-8fd299450a71",
    alt: 'Muscular athlete performing deadlift with heavy barbell in modern gym with dramatic lighting',
    level: 'Advanced',
    duration: '16 Weeks',
    sessions: 64,
    equipment: ['Barbell', 'Plates', 'Squat Rack', 'Bench', 'Dumbbells'],
    highlights: [
    'Progressive overload methodology',
    'Competition-style powerlifting techniques',
    'Advanced periodization protocols',
    'Elite strength benchmarks'],

    color: 'red-400',
    category: 'strength'
  },
  {
    id: 'cardio-warrior',
    title: 'Cardio Warrior',
    subtitle: 'Elite Endurance Conditioning',
    description: 'High-intensity cardiovascular training combining HIIT, metabolic circuits, and endurance protocols for peak aerobic and anaerobic performance.',
    image: "https://images.unsplash.com/photo-1570621810296-d7caf9839060",
    alt: 'Athletic woman in sports attire running on treadmill with intense focus and sweat',
    level: 'Intermediate',
    duration: '12 Weeks',
    sessions: 48,
    equipment: ['Treadmill', 'Rowing Machine', 'Battle Ropes', 'Kettlebells', 'Bike'],
    highlights: [
    'HIIT and metabolic conditioning',
    'VO2 max optimization protocols',
    'Endurance performance tracking',
    'Recovery and adaptation strategies'],

    color: 'blue-400',
    category: 'cardio'
  },
  {
    id: 'hybrid-athlete',
    title: 'Hybrid Athlete',
    subtitle: 'Complete Performance System',
    description: 'Comprehensive training program combining strength, cardio, mobility, and sport-specific skills for well-rounded athletic development.',
    image: "https://images.unsplash.com/photo-1675392685030-e2eeff74a866",
    alt: 'Fit athlete performing functional training movements with kettlebell in crossfit gym',
    level: 'Intermediate',
    duration: '20 Weeks',
    sessions: 80,
    equipment: ['Full Gym Access', 'Functional Tools', 'Cardio Equipment', 'Recovery Tools'],
    highlights: [
    'Multi-modal training approach',
    'Functional movement patterns',
    'Sport-specific skill development',
    'Comprehensive performance metrics'],

    color: 'primary',
    category: 'hybrid'
  }];


  const comparisonFeatures: ComparisonFeature[] = [
  { name: 'Program Duration', strength: '16 Weeks', cardio: '12 Weeks', hybrid: '20 Weeks' },
  { name: 'Sessions per Week', strength: '4-5', cardio: '4', hybrid: '4-6' },
  { name: 'Strength Focus', strength: true, cardio: false, hybrid: true },
  { name: 'Cardio Training', strength: false, cardio: true, hybrid: true },
  { name: 'Mobility Work', strength: false, cardio: true, hybrid: true },
  { name: 'Nutrition Coaching', strength: true, cardio: true, hybrid: true },
  { name: 'Recovery Protocols', strength: true, cardio: true, hybrid: true },
  { name: 'Competition Prep', strength: true, cardio: false, hybrid: true },
  { name: 'Beginner Friendly', strength: false, cardio: true, hybrid: true },
  { name: 'Equipment Required', strength: 'Heavy', cardio: 'Moderate', hybrid: 'Full Access' }];


  const progressData: ProgressData[] = [
  { week: 1, strength: 20, endurance: 15, technique: 25 },
  { week: 4, strength: 35, endurance: 30, technique: 40 },
  { week: 8, strength: 55, endurance: 50, technique: 60 },
  { week: 12, strength: 75, endurance: 70, technique: 80 },
  { week: 16, strength: 90, endurance: 85, technique: 95 }];


  const milestones: MilestoneData[] = [
  {
    title: 'Foundation Assessment',
    week: 1,
    description: 'Complete initial fitness evaluation and establish baseline metrics',
    completed: true
  },
  {
    title: 'Technique Mastery',
    week: 4,
    description: 'Master fundamental movement patterns with proper form',
    completed: true
  },
  {
    title: 'Strength Breakthrough',
    week: 8,
    description: 'Achieve first major strength milestone and PR',
    completed: false
  },
  {
    title: 'Endurance Peak',
    week: 12,
    description: 'Reach target cardiovascular fitness benchmarks',
    completed: false
  },
  {
    title: 'Elite Performance',
    week: 16,
    description: 'Complete program with elite-level performance metrics',
    completed: false
  }];


  const assessmentQuestions: AssessmentQuestion[] = [
  {
    id: 'fitness-level',
    question: 'How would you rate your current fitness level?',
    type: 'scale',
    category: 'fitness'
  },
  {
    id: 'experience',
    question: 'How many years of consistent training experience do you have?',
    type: 'multiple',
    options: ['Less than 1 year', '1-2 years', '3-5 years', '5+ years', '10+ years'],
    category: 'experience'
  },
  {
    id: 'goals',
    question: 'What are your primary fitness goals?',
    type: 'multiple',
    options: ['Build Strength', 'Improve Endurance', 'Lose Weight', 'Gain Muscle', 'Athletic Performance'],
    category: 'goals'
  },
  {
    id: 'availability',
    question: 'How many days per week can you commit to training?',
    type: 'multiple',
    options: ['2-3 days', '4-5 days', '6-7 days', 'Every day'],
    category: 'availability'
  },
  {
    id: 'injuries',
    question: 'Do you have any current injuries or physical limitations?',
    type: 'boolean',
    category: 'fitness'
  }];


  const programPreview: ProgramPreviewData = {
    id: 'strength-elite-preview',
    title: 'Strength Elite',
    previewVideo: 'preview-video-url',
    totalDuration: '2h 45m',
    chapters: [
    {
      id: 'intro',
      title: 'Program Introduction',
      duration: '8:30',
      thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_1f4300468-1763537989312.png",
      alt: 'Trainer explaining program overview in modern gym setting'
    },
    {
      id: 'squat-technique',
      title: 'Squat Technique Mastery',
      duration: '15:45',
      thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_101e3f420-1763537990852.png",
      alt: 'Detailed squat form demonstration with proper positioning'
    },
    {
      id: 'deadlift-progression',
      title: 'Deadlift Progression',
      duration: '18:20',
      thumbnail: "https://images.unsplash.com/photo-1487161874013-35eede6cca03",
      alt: 'Progressive deadlift training techniques and safety protocols'
    },
    {
      id: 'bench-mastery',
      title: 'Bench Press Mastery',
      duration: '12:15',
      thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_1a7d0ce8e-1763537991203.png",
      alt: 'Bench press technique and spotting safety demonstration'
    }]

  };

  const filteredPrograms = activeFilter === 'all' ?
  programs :
  programs.filter((program) => program.category === activeFilter);

  const filters = [
  { id: 'all', label: 'All Programs', icon: 'Squares2X2Icon' },
  { id: 'strength', label: 'Strength', icon: 'FireIcon' },
  { id: 'cardio', label: 'Cardio', icon: 'BoltIcon' },
  { id: 'hybrid', label: 'Hybrid', icon: 'StarIcon' }];


  const sections = [
  { id: 'programs', label: 'Programs', icon: 'AcademicCapIcon' },
  { id: 'comparison', label: 'Compare', icon: 'ChartBarIcon' },
  { id: 'assessment', label: 'Assessment', icon: 'ClipboardDocumentCheckIcon' },
  { id: 'progress', label: 'Progress', icon: 'TrendingUpIcon' },
  { id: 'preview', label: 'Preview', icon: 'PlayCircleIcon' }];


  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background">
        <div className="animate-pulse space-y-8 p-8">
          <div className="h-8 bg-muted rounded w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) =>
            <div key={i} className="h-96 bg-muted rounded-xl"></div>
            )}
          </div>
        </div>
      </div>);

  }

  return (
    <div className="space-y-16">
      {/* Enhanced Section Navigation */}
      <div className="relative">
        {/* Background with image integration */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 rounded-2xl blur-3xl transform scale-110"></div>
        
        <div className="relative bg-card/60 backdrop-blur-sm border border-border/50 rounded-2xl p-6 shadow-2xl shadow-primary/10">
          <div className="flex flex-col items-center space-y-6">
            {/* Title */}
            <div className="text-center">
              <h3 className="text-xl font-bold text-foreground mb-2">Explore Training Programs</h3>
              <p className="text-sm text-muted-foreground">Choose your path to elite performance</p>
            </div>

            {/* Enhanced Section Buttons */}
            <div className="flex flex-wrap gap-3 justify-center max-w-4xl">
              {sections.map((section, index) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`group relative flex items-center space-x-3 px-6 py-4 rounded-xl font-semibold transition-all duration-500 transform hover:scale-105 ${
                    activeSection === section.id
                      ? 'bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-xl shadow-primary/30 border border-primary/20'
                      : 'bg-card/80 border border-border/60 text-muted-foreground hover:text-foreground hover:border-primary/40 hover:bg-card hover:shadow-lg'
                  }`}
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: isHydrated ? 'fadeInUp 0.6s ease-out forwards' : 'none'
                  }}
                >
                  {/* Active indicator */}
                  {activeSection === section.id && (
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-xl blur-sm"></div>
                  )}
                  
                  {/* Icon with enhanced styling */}
                  <div className={`relative z-10 p-2 rounded-lg transition-all duration-300 ${
                    activeSection === section.id 
                      ? 'bg-white/20' :'bg-primary/10 group-hover:bg-primary/15'
                  }`}>
                    <Icon 
                      name={section.icon as any} 
                      size={20} 
                      className={`transition-all duration-300 ${
                        activeSection === section.id 
                          ? 'text-white' :'text-primary group-hover:scale-110'
                      }`} 
                    />
                  </div>
                  
                  <span className="relative z-10 font-bold tracking-wide">{section.label}</span>
                  
                  {/* Hover glow effect */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              ))}
            </div>

            {/* Activity indicator */}
            <div className="flex space-x-2">
              {sections.map((section) => (
                <div
                  key={section.id}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    activeSection === section.id
                      ? 'bg-primary w-8' :'bg-muted'
                  }`}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Programs Section with Enhanced Filters */}
      {activeSection === 'programs' && (
        <div className="space-y-12">
          {/* Enhanced Filter Section */}
          <div className="relative">
            {/* Filter Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-400/5 via-blue-400/5 to-primary/5 rounded-2xl transform rotate-1"></div>
            <div className="absolute inset-0 bg-gradient-to-tl from-primary/5 via-accent/5 to-red-400/5 rounded-2xl transform -rotate-1"></div>
            
            <div className="relative bg-card/70 backdrop-blur-md border border-border/40 rounded-2xl p-8 shadow-2xl">
              <div className="flex flex-col items-center space-y-8">
                {/* Filter Header */}
                <div className="text-center space-y-3">
                  <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2">
                    <Icon name="FunnelIcon" size={16} className="text-primary" />
                    <span className="text-sm font-bold text-primary tracking-wide">PROGRAM FILTERS</span>
                  </div>
                  <h4 className="text-2xl font-bold text-foreground">Find Your Perfect Program</h4>
                  <p className="text-muted-foreground max-w-md">Filter by training focus to discover programs tailored to your goals</p>
                </div>

                {/* Enhanced Filter Buttons */}
                <div className="flex flex-wrap gap-4 justify-center">
                  {filters.map((filter, index) => {
                    const isActive = activeFilter === filter.id;
                    const colorMap = {
                      'all': 'primary',
                      'strength': 'red-400',
                      'cardio': 'blue-400',
                      'hybrid': 'primary'
                    };
                    const color = colorMap[filter.id as keyof typeof colorMap];
                    
                    return (
                      <button
                        key={filter.id}
                        onClick={() => setActiveFilter(filter.id)}
                        className={`group relative flex items-center space-x-4 px-8 py-5 rounded-2xl font-bold transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 ${
                          isActive
                            ? `bg-gradient-to-r from-${color} to-${color}/80 text-white shadow-2xl shadow-${color}/30 border border-${color}/30`
                            : 'bg-card/90 border-2 border-border/60 text-muted-foreground hover:text-foreground hover:border-primary/50 hover:bg-card hover:shadow-xl'
                        }`}
                        style={{
                          animationDelay: `${index * 150}ms`,
                          animation: isHydrated ? 'slideInUp 0.7s ease-out forwards' : 'none'
                        }}
                      >
                        {/* Animated background */}
                        {isActive && (
                          <>
                            <div className={`absolute inset-0 bg-gradient-to-r from-${color}/30 to-transparent rounded-2xl blur-xl`}></div>
                            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl"></div>
                          </>
                        )}
                        
                        {/* Icon container with enhanced styling */}
                        <div className={`relative z-10 p-3 rounded-xl transition-all duration-300 ${
                          isActive 
                            ? 'bg-white/20 shadow-lg' 
                            : `bg-${color}/10 group-hover:bg-${color}/15 group-hover:scale-110`
                        }`}>
                          <Icon 
                            name={filter.icon as any} 
                            size={24} 
                            className={`transition-all duration-300 ${
                              isActive 
                                ? 'text-white drop-shadow-sm' 
                                : `text-${color} group-hover:scale-110`
                            }`} 
                          />
                        </div>
                        
                        {/* Label with enhanced typography */}
                        <div className="relative z-10 flex flex-col">
                          <span className="text-lg font-bold tracking-wide">{filter.label}</span>
                          {filter.id !== 'all' && (
                            <span className={`text-xs font-medium ${
                              isActive ? 'text-white/80' : 'text-muted-foreground'
                            }`}>
                              {filter.id === 'strength' && 'Power & Mass'}
                              {filter.id === 'cardio' && 'Endurance & Conditioning'} 
                              {filter.id === 'hybrid' && 'Complete Training'}
                            </span>
                          )}
                        </div>

                        {/* Active pulse effect */}
                        {isActive && (
                          <div className={`absolute inset-0 rounded-2xl bg-${color}/20 animate-pulse`}></div>
                        )}
                        
                        {/* Hover shimmer effect */}
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-1000"></div>
                      </button>
                    );
                  })}
                </div>

                {/* Filter Stats */}
                <div className="flex items-center space-x-8 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                    <span className="font-medium">{filteredPrograms.length} Programs Available</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="ClockIcon" size={14} className="text-primary" />
                    <span className="font-medium">12-20 Week Programs</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="UserGroupIcon" size={14} className="text-primary" />
                    <span className="font-medium">All Fitness Levels</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Programs Grid with enhanced transition */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-500">
            {filteredPrograms.map((program, index) => (
              <div
                key={program.id}
                style={{
                  animationDelay: `${index * 200}ms`,
                  animation: 'fadeInUp 0.8s ease-out forwards'
                }}
              >
                <ProgramCard program={program} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Comparison Section */}
      {activeSection === 'comparison' && (
        <ProgramComparison features={comparisonFeatures} />
      )}

      {/* Assessment Section */}
      {activeSection === 'assessment' && (
        <PrerequisiteAssessment questions={assessmentQuestions} />
      )}

      {/* Progress Section */}
      {activeSection === 'progress' && (
        <ProgressVisualization
          progressData={progressData}
          milestones={milestones}
        />
      )}

      {/* Preview Section */}
      {activeSection === 'preview' && (
        <ProgramPreview program={programPreview} />
      )}

      {/* Custom animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(40px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default ProgramsInteractive;