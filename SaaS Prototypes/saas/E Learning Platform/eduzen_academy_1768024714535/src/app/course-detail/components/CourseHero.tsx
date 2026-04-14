'use client';

import React, { useState, useEffect } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface CourseHeroProps {
  course: {
    title: string;
    subtitle: string;
    instructor: {
      name: string;
      image: string;
      alt: string;
      title: string;
    };
    rating: number;
    reviewCount: number;
    studentCount: number;
    duration: string;
    level: string;
    lastUpdated: string;
    heroImage: string;
    heroAlt: string;
  };
}

const CourseHero = ({ course }: CourseHeroProps) => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="StarIcon"
        variant={index < Math.floor(rating) ? 'solid' : 'outline'}
        size={20}
        className={index < Math.floor(rating) ? 'text-accent' : 'text-muted'}
      />
    ));
  };

  return (
    <section className="relative bg-gradient-to-br from-primary/5 via-background to-accent/5 pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-primary/10 rounded-full">
              <Icon name="AcademicCapIcon" size={20} className="text-primary" />
              <span className="text-sm font-medium text-primary">{course.level}</span>
            </div>

            <h1 className="text-4xl lg:text-5xl font-headline font-semibold text-foreground leading-tight">
              {course.title}
            </h1>

            <p className="text-lg text-muted-foreground font-body leading-relaxed">
              {course.subtitle}
            </p>

            <div className="flex items-center space-x-6 pt-4">
              <div className="flex items-center space-x-2">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-primary/20">
                  <AppImage
                    src={course.instructor.image}
                    alt={course.instructor.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{course.instructor.name}</p>
                  <p className="text-xs text-muted-foreground">{course.instructor.title}</p>
                </div>
              </div>

              <div className="h-8 w-px bg-border" />

              <div className="flex items-center space-x-1">
                {isHydrated && renderStars(course.rating)}
                <span className="ml-2 text-sm font-medium text-foreground">{course.rating}</span>
                <span className="text-sm text-muted-foreground">({course.reviewCount.toLocaleString()} reviews)</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-6 pt-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Icon name="UserGroupIcon" size={20} className="text-primary" />
                <span>{course.studentCount.toLocaleString()} students enrolled</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="ClockIcon" size={20} className="text-primary" />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="CalendarIcon" size={20} className="text-primary" />
                <span>Updated {course.lastUpdated}</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <AppImage
                src={course.heroImage}
                alt={course.heroAlt}
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
              <button
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-primary rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform duration-300"
                aria-label="Play course preview"
              >
                <Icon name="PlayIcon" variant="solid" size={32} className="text-primary-foreground ml-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseHero;