import React from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface Course {
  id: number;
  title: string;
  description: string;
  instructor: string;
  instructorImage: string;
  instructorImageAlt: string;
  category: string;
  duration: string;
  students: number;
  rating: number;
  image: string;
  imageAlt: string;
  price: string;
}

const mockCourses: Course[] = [
{
  id: 1,
  title: "Mindful Leadership in Modern Organizations",
  description: "Transform your leadership approach by integrating mindfulness practices with proven management strategies. Learn to lead with clarity, compassion, and confidence.",
  instructor: "Dr. Sarah Chen",
  instructorImage: "https://img.rocket.new/generatedImages/rocket_gen_img_100e57a87-1763295422135.png",
  instructorImageAlt: "Professional Asian woman with long black hair in navy blazer smiling warmly at camera",
  category: "Leadership",
  duration: "8 weeks",
  students: 2847,
  rating: 4.9,
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1478bcc45-1764651525877.png",
  imageAlt: "Diverse business team collaborating around modern conference table with natural lighting",
  price: "Free Preview"
},
{
  id: 2,
  title: "The Art of Focused Deep Work",
  description: "Master the skills of concentration and productivity in a distracted world. Build sustainable habits that honor your cognitive capacity and creative potential.",
  instructor: "Marcus Williams",
  instructorImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1d62f4df3-1763295834182.png",
  instructorImageAlt: "Confident African American man with beard wearing gray sweater in bright office setting",
  category: "Productivity",
  duration: "6 weeks",
  students: 3921,
  rating: 4.8,
  image: "https://images.unsplash.com/photo-1633304690105-8ccaa01dfa06",
  imageAlt: "Person writing in journal at wooden desk with laptop and coffee cup in minimalist workspace",
  price: "Free Preview"
},
{
  id: 3,
  title: "Emotional Intelligence for Career Growth",
  description: "Develop the self-awareness and interpersonal skills that distinguish exceptional professionals. Navigate workplace relationships with wisdom and authenticity.",
  instructor: "Elena Rodriguez",
  instructorImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1d8ddfd9b-1763295097738.png",
  instructorImageAlt: "Hispanic woman with curly brown hair in white blouse smiling confidently in modern office",
  category: "Personal Development",
  duration: "10 weeks",
  students: 4156,
  rating: 5.0,
  image: "https://images.unsplash.com/photo-1632923946732-d9b1a29d598d",
  imageAlt: "Two professionals having meaningful conversation in bright modern office with plants",
  price: "Free Preview"
},
{
  id: 4,
  title: "Sustainable Innovation & Design Thinking",
  description: "Learn to create solutions that serve both business goals and planetary well-being. Integrate systems thinking with creative problem-solving methodologies.",
  instructor: "Dr. James Park",
  instructorImage: "https://img.rocket.new/generatedImages/rocket_gen_img_13c6f474a-1763294899920.png",
  instructorImageAlt: "Asian man with glasses in casual blue shirt smiling in creative studio environment",
  category: "Innovation",
  duration: "7 weeks",
  students: 2634,
  rating: 4.9,
  image: "https://images.unsplash.com/photo-1590402494628-9b9acf0b90ae",
  imageAlt: "Creative team brainstorming with sticky notes on glass wall in bright collaborative space",
  price: "Free Preview"
}];


const FeaturedCourses = () => {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium">
            <Icon name="AcademicCapIcon" size={16} variant="solid" />
            <span>Featured Learning Paths</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-headline font-semibold text-foreground">
            Begin Your <span className="text-primary italic">Transformation</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-body">
            Carefully curated courses designed to nurture both professional excellence and personal well-being
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {mockCourses.map((course) =>
          <Link
            key={course.id}
            href="/course-detail"
            className="group bg-card rounded-2xl overflow-hidden border border-border hover:border-primary transition-all duration-300 hover:shadow-xl hover:-translate-y-1">

              <div className="relative h-64 overflow-hidden">
                <AppImage
                src={course.image}
                alt={course.imageAlt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />

                <div className="absolute top-4 left-4 px-3 py-1 bg-primary text-primary-foreground rounded-full text-sm font-medium">
                  {course.price}
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full font-medium">
                    {course.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Icon name="ClockIcon" size={16} />
                    {course.duration}
                  </span>
                </div>

                <h3 className="text-2xl font-headline font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                  {course.title}
                </h3>

                <p className="text-muted-foreground font-body leading-relaxed line-clamp-2">
                  {course.description}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden">
                      <AppImage
                      src={course.instructorImage}
                      alt={course.instructorImageAlt}
                      className="w-full h-full object-cover" />

                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{course.instructor}</p>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Icon name="UserGroupIcon" size={14} />
                        <span>{course.students.toLocaleString()} students</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-accent">
                    <Icon name="StarIcon" size={18} variant="solid" />
                    <span className="font-semibold">{course.rating}</span>
                  </div>
                </div>
              </div>
            </Link>
          )}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/course-catalog"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-lg font-cta font-semibold hover:shadow-cta transition-all duration-300 hover:-translate-y-1">

            Explore All Courses
            <Icon name="ArrowRightIcon" size={20} />
          </Link>
        </div>
      </div>
    </section>);

};

export default FeaturedCourses;