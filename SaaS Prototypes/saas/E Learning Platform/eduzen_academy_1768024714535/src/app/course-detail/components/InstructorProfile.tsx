import React from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface InstructorProfileProps {
  instructor: {
    name: string;
    title: string;
    image: string;
    alt: string;
    bio: string;
    philosophy: string;
    credentials: string[];
    stats: {
      courses: number;
      students: number;
      rating: number;
    };
  };
}

const InstructorProfile = ({ instructor }: InstructorProfileProps) => {
  return (
    <section className="py-16 bg-card">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <h2 className="text-3xl font-headline font-semibold text-foreground mb-12 text-center">
          Meet Your Instructor
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1 space-y-6">
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden">
              <AppImage
                src={instructor.image}
                alt={instructor.alt}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Icon name="AcademicCapIcon" size={24} className="text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Courses</p>
                  <p className="font-semibold text-foreground">{instructor.stats.courses}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Icon name="UserGroupIcon" size={24} className="text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Students</p>
                  <p className="font-semibold text-foreground">{instructor.stats.students.toLocaleString()}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Icon name="StarIcon" variant="solid" size={24} className="text-accent" />
                <div>
                  <p className="text-sm text-muted-foreground">Rating</p>
                  <p className="font-semibold text-foreground">{instructor.stats.rating}/5.0</p>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-2 space-y-6">
            <div>
              <h3 className="text-2xl font-headline font-semibold text-foreground mb-2">
                {instructor.name}
              </h3>
              <p className="text-primary font-medium mb-4">{instructor.title}</p>
              <p className="text-muted-foreground font-body leading-relaxed">
                {instructor.bio}
              </p>
            </div>

            <div className="bg-primary/5 rounded-xl p-6">
              <h4 className="font-headline font-medium text-foreground mb-3 flex items-center space-x-2">
                <Icon name="LightBulbIcon" size={20} className="text-primary" />
                <span>Teaching Philosophy</span>
              </h4>
              <p className="text-muted-foreground font-body leading-relaxed italic">
                "{instructor.philosophy}"
              </p>
            </div>

            <div>
              <h4 className="font-headline font-medium text-foreground mb-4">Credentials & Expertise</h4>
              <ul className="space-y-3">
                {instructor.credentials.map((credential, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <Icon name="CheckCircleIcon" variant="solid" size={20} className="text-success mt-0.5" />
                    <span className="text-muted-foreground font-body">{credential}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InstructorProfile;