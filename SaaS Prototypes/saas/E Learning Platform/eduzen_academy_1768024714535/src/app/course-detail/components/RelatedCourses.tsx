import React from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface Course {
  id: number;
  title: string;
  instructor: string;
  image: string;
  alt: string;
  rating: number;
  students: number;
  price: number;
  duration: string;
}

interface RelatedCoursesProps {
  courses: Course[];
}

const RelatedCourses = ({ courses }: RelatedCoursesProps) => {
  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-headline font-semibold text-foreground mb-4">
            Continue Your Learning Journey
          </h2>
          <p className="text-muted-foreground font-body">
            Explore related courses to deepen your knowledge
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <Link
              key={course.id}
              href="/course-detail"
              className="group bg-card rounded-xl overflow-hidden border border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative h-48 overflow-hidden">
                <AppImage
                  src={course.image}
                  alt={course.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 px-3 py-1 bg-primary text-primary-foreground text-sm font-medium rounded-full">
                  ${course.price}
                </div>
              </div>

              <div className="p-6 space-y-4">
                <h3 className="font-headline font-semibold text-foreground group-hover:text-primary transition-colors duration-200 line-clamp-2">
                  {course.title}
                </h3>

                <p className="text-sm text-muted-foreground">{course.instructor}</p>

                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <div className="flex items-center space-x-1">
                    <Icon name="StarIcon" variant="solid" size={16} className="text-accent" />
                    <span className="text-sm font-medium text-foreground">{course.rating}</span>
                    <span className="text-sm text-muted-foreground">({course.students.toLocaleString()})</span>
                  </div>
                  <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                    <Icon name="ClockIcon" size={16} className="text-primary" />
                    <span>{course.duration}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedCourses;