'use client';

import React from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface CourseCardProps {
  course: {
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
  };
  onWishlistToggle: (id: string) => void;
  isWishlisted: boolean;
}

const CourseCard = ({ course, onWishlistToggle, isWishlisted }: CourseCardProps) => {
  return (
    <div className="group bg-card rounded-2xl overflow-hidden border border-border hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
      <div className="relative h-48 overflow-hidden">
        <AppImage
          src={course.image}
          alt={course.imageAlt}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute top-4 right-4 flex items-center gap-2">
          <button
            onClick={() => onWishlistToggle(course.id)}
            className="p-2 bg-card/90 backdrop-blur-sm rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Icon
              name="HeartIcon"
              variant={isWishlisted ? 'solid' : 'outline'}
              size={20}
              className={isWishlisted ? 'text-destructive' : ''}
            />
          </button>
        </div>
        <div className="absolute bottom-4 left-4">
          <span className="px-3 py-1 bg-primary/90 backdrop-blur-sm text-primary-foreground text-xs font-cta font-medium rounded-full">
            {course.category}
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-border">
            <AppImage
              src={course.instructorImage}
              alt={course.instructorImageAlt}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-sm font-body text-muted-foreground">{course.instructor}</span>
        </div>

        <Link href="/course-detail" className="block group/title">
          <h3 className="text-xl font-headline font-semibold text-foreground mb-2 line-clamp-2 group-hover/title:text-primary transition-colors duration-300">
            {course.title}
          </h3>
        </Link>

        <p className="text-sm font-body text-muted-foreground mb-4 line-clamp-2">
          {course.description}
        </p>

        <div className="flex items-center gap-4 mb-4 text-sm font-body text-muted-foreground">
          <div className="flex items-center gap-1">
            <Icon name="SignalIcon" size={16} />
            <span>{course.level}</span>
          </div>
          <div className="flex items-center gap-1">
            <Icon name="ClockIcon" size={16} />
            <span>{course.duration}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Icon name="StarIcon" variant="solid" size={16} className="text-accent" />
              <span className="text-sm font-body font-medium text-foreground">{course.rating}</span>
            </div>
            <span className="text-xs font-body text-muted-foreground">
              ({course.studentsEnrolled.toLocaleString()} students)
            </span>
          </div>
          <div className="text-right">
            <span className="text-2xl font-headline font-semibold text-primary">
              ${course.price}
            </span>
          </div>
        </div>

        <Link
          href="/course-detail"
          className="mt-4 w-full block text-center px-6 py-3 font-cta font-semibold text-sm text-primary-foreground bg-primary rounded-lg hover:shadow-cta transition-all duration-300 hover:-translate-y-0.5"
        >
          View Course
        </Link>
      </div>
    </div>
  );
};

export default CourseCard;