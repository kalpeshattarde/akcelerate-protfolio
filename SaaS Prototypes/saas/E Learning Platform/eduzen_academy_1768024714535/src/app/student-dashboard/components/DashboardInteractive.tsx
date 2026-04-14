'use client';

import React, { useState, useEffect } from 'react';
import WelcomeSection from './WelcomeSection';
import LearningPathCard from './LearningPathCard';
import CourseCard from './CourseCard';
import AchievementBadge from './AchievementBadge';
import UpcomingSessionCard from './UpcomingSessionCard';
import ReflectionPrompt from './ReflectionPrompt';
import QuickActionCard from './QuickActionCard';
import Icon from '@/components/ui/AppIcon';

interface Milestone {
  id: number;
  title: string;
  completed: boolean;
  current: boolean;
}

interface Course {
  id: number;
  title: string;
  instructor: string;
  progress: number;
  thumbnail: string;
  thumbnailAlt: string;
  lastAccessed: string;
  duration: string;
}

interface Achievement {
  id: number;
  title: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedDate?: string;
}

interface UpcomingSession {
  id: number;
  title: string;
  date: string;
  time: string;
  type: string;
  instructor: string;
}

interface QuickAction {
  title: string;
  description: string;
  icon: string;
  href: string;
  color: string;
}

const DashboardInteractive = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [activeTab, setActiveTab] = useState<'inProgress' | 'bookmarked'>('inProgress');

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const userData = {
    name: 'Sarah',
    currentStreak: 12,
    totalHours: 47,
    completedCourses: 8
  };

  const learningPath = {
    title: 'Mindful Leadership Journey',
    progress: 65,
    milestones: [
    { id: 1, title: 'Foundations of Mindful Leadership', completed: true, current: false },
    { id: 2, title: 'Emotional Intelligence Mastery', completed: true, current: false },
    { id: 3, title: 'Communication & Presence', completed: false, current: true },
    { id: 4, title: 'Leading with Compassion', completed: false, current: false },
    { id: 5, title: 'Organizational Transformation', completed: false, current: false }] as
    Milestone[]
  };

  const inProgressCourses: Course[] = [
  {
    id: 1,
    title: 'Mindful Communication in the Workplace',
    instructor: 'Dr. Maya Chen',
    progress: 68,
    thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_1b6a3a777-1766573588659.png",
    thumbnailAlt: 'Diverse business team having mindful discussion in modern bright office space',
    lastAccessed: '2 hours ago',
    duration: '6h 30m'
  },
  {
    id: 2,
    title: 'Emotional Intelligence for Leaders',
    instructor: 'James Rodriguez',
    progress: 45,
    thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_13b652544-1766290885513.png",
    thumbnailAlt: 'Professional woman in blue blazer presenting to engaged team in conference room',
    lastAccessed: 'Yesterday',
    duration: '8h 15m'
  },
  {
    id: 3,
    title: 'Stress Management & Resilience',
    instructor: 'Dr. Priya Sharma',
    progress: 82,
    thumbnail: "https://images.unsplash.com/photo-1730474116345-36439a8928a1",
    thumbnailAlt: 'Person practicing yoga meditation pose on mat in peaceful natural outdoor setting',
    lastAccessed: '3 days ago',
    duration: '5h 45m'
  }];


  const bookmarkedCourses: Course[] = [
  {
    id: 4,
    title: 'Advanced Meditation Techniques',
    instructor: 'Lama Tenzin',
    progress: 0,
    thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_155a316f2-1765132774555.png",
    thumbnailAlt: 'Serene meditation space with cushions candles and natural light streaming through windows',
    lastAccessed: 'Not started',
    duration: '4h 20m'
  },
  {
    id: 5,
    title: 'Conscious Decision Making',
    instructor: 'Dr. Michael Foster',
    progress: 0,
    thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_106bae3e7-1764692735970.png",
    thumbnailAlt: 'Business professional analyzing data charts on laptop in modern minimalist office',
    lastAccessed: 'Not started',
    duration: '7h 10m'
  }];


  const achievements: Achievement[] = [
  {
    id: 1,
    title: 'First Steps',
    description: 'Complete your first course',
    icon: 'AcademicCapIcon',
    earned: true,
    earnedDate: 'Nov 15, 2024'
  },
  {
    id: 2,
    title: 'Consistent Learner',
    description: '7-day learning streak',
    icon: 'FireIcon',
    earned: true,
    earnedDate: 'Dec 10, 2024'
  },
  {
    id: 3,
    title: 'Community Builder',
    description: 'Help 10 fellow learners',
    icon: 'UserGroupIcon',
    earned: true,
    earnedDate: 'Dec 18, 2024'
  },
  {
    id: 4,
    title: 'Reflection Master',
    description: '30 days of journaling',
    icon: 'BookOpenIcon',
    earned: false
  },
  {
    id: 5,
    title: 'Course Champion',
    description: 'Complete 10 courses',
    icon: 'TrophyIcon',
    earned: false
  },
  {
    id: 6,
    title: 'Mindful Maven',
    description: '100 hours of learning',
    icon: 'SparklesIcon',
    earned: false
  }];


  const upcomingSessions: UpcomingSession[] = [
  {
    id: 1,
    title: 'Live Q&A: Mindful Leadership',
    date: 'Dec 26, 2024',
    time: '2:00 PM EST',
    type: 'Live Session',
    instructor: 'Dr. Maya Chen'
  },
  {
    id: 2,
    title: 'Group Meditation Practice',
    date: 'Dec 27, 2024',
    time: '8:00 AM EST',
    type: 'Workshop',
    instructor: 'Lama Tenzin'
  },
  {
    id: 3,
    title: 'Peer Discussion: Emotional Intelligence',
    date: 'Dec 28, 2024',
    time: '6:00 PM EST',
    type: 'Community',
    instructor: 'James Rodriguez'
  }];


  const quickActions: QuickAction[] = [
  {
    title: 'Explore New Courses',
    description: 'Discover your next learning adventure',
    icon: 'MagnifyingGlassIcon',
    href: '/course-catalog',
    color: 'primary'
  },
  {
    title: 'Join Community',
    description: 'Connect with fellow mindful learners',
    icon: 'UserGroupIcon',
    href: '/community',
    color: 'accent'
  },
  {
    title: 'View Certificates',
    description: 'Access your earned certifications',
    icon: 'DocumentCheckIcon',
    href: '/student-dashboard',
    color: 'success'
  },
  {
    title: 'Learning Resources',
    description: 'Browse guides and materials',
    icon: 'BookOpenIcon',
    href: '/course-catalog',
    color: 'secondary'
  }];


  const reflectionPrompt = 'What insight from today\'s learning will you carry into tomorrow?';

  const handleSaveReflection = (text: string) => {
    console.log('Reflection saved:', text);
  };

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
          <div className="animate-pulse space-y-8">
            <div className="h-48 bg-muted rounded-2xl" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="h-64 bg-muted rounded-2xl" />
                <div className="h-96 bg-muted rounded-2xl" />
              </div>
              <div className="space-y-6">
                <div className="h-64 bg-muted rounded-2xl" />
                <div className="h-64 bg-muted rounded-2xl" />
              </div>
            </div>
          </div>
        </div>
      </div>);

  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        <WelcomeSection
          userName={userData.name}
          currentStreak={userData.currentStreak}
          totalHours={userData.totalHours}
          completedCourses={userData.completedCourses} />


        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2 space-y-8">
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-headline font-semibold text-foreground">
                  Your Courses
                </h2>
                <div className="flex items-center gap-2 bg-muted rounded-lg p-1">
                  <button
                    onClick={() => setActiveTab('inProgress')}
                    className={`px-4 py-2 rounded-md text-sm font-body font-medium transition-all duration-300 ${
                    activeTab === 'inProgress' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`
                    }>

                    In Progress
                  </button>
                  <button
                    onClick={() => setActiveTab('bookmarked')}
                    className={`px-4 py-2 rounded-md text-sm font-body font-medium transition-all duration-300 ${
                    activeTab === 'bookmarked' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`
                    }>

                    Bookmarked
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {(activeTab === 'inProgress' ? inProgressCourses : bookmarkedCourses).map((course) =>
                <CourseCard key={course.id} {...course} />
                )}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-headline font-semibold text-foreground mb-6">
                Achievements & Milestones
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {achievements.map((achievement) =>
                <AchievementBadge key={achievement.id} {...achievement} />
                )}
              </div>
            </section>

            <section>
              <ReflectionPrompt
                prompt={reflectionPrompt}
                onSaveReflection={handleSaveReflection} />

            </section>
          </div>

          <div className="space-y-8">
            <section>
              <LearningPathCard
                pathTitle={learningPath.title}
                progress={learningPath.progress}
                milestones={learningPath.milestones} />

            </section>

            <section>
              <h3 className="text-xl font-headline font-semibold text-foreground mb-4">
                Upcoming Sessions
              </h3>
              <div className="space-y-3">
                {upcomingSessions.map((session) =>
                <UpcomingSessionCard key={session.id} {...session} />
                )}
              </div>
            </section>

            <section>
              <h3 className="text-xl font-headline font-semibold text-foreground mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                {quickActions.map((action, index) =>
                <QuickActionCard key={index} {...action} />
                )}
              </div>
            </section>
          </div>
        </div>

        <section className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-8 border border-primary/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Icon name="LightBulbIcon" variant="solid" size={24} className="text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-headline font-semibold text-foreground mb-2">
                  Continue Your Growth Journey
                </h3>
                <p className="text-muted-foreground font-body">
                  You&apos;re making excellent progress. Explore new courses to expand your mindful learning path.
                </p>
              </div>
            </div>
            <a
              href="/course-catalog"
              className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-cta font-semibold text-sm hover:shadow-cta transition-all duration-300 hover:-translate-y-0.5 whitespace-nowrap">

              Explore Courses
            </a>
          </div>
        </section>
      </div>
    </div>);

};

export default DashboardInteractive;