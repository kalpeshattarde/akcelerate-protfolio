'use client';

import React from 'react';
import CourseHero from './CourseHero';
import CourseStats from './CourseStats';
import CourseCurriculum from './CourseCurriculum';
import InstructorProfile from './InstructorProfile';
import StudentReviews from './StudentReviews';
import CourseRequirements from './CourseRequirements';
import RelatedCourses from './RelatedCourses';
import EnrollmentCard from './EnrollmentCard';

interface Module {
  id: number;
  title: string;
  lessonCount: number;
  duration: string;
  lessons: {
    id: number;
    title: string;
    duration: string;
    type: 'video' | 'reading' | 'quiz';
    isPreview: boolean;
  }[];
}

interface Review {
  id: number;
  student: {
    name: string;
    image: string;
    alt: string;
    title: string;
  };
  rating: number;
  date: string;
  review: string;
  helpful: number;
}

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

const CourseDetailInteractive = () => {
  const courseData = {
    title: "Mindful Leadership: Leading with Presence and Purpose",
    subtitle: "Transform your leadership approach through mindfulness practices, emotional intelligence, and conscious decision-making for sustainable organizational success.",
    instructor: {
      name: "Dr. Sarah Chen",
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_1ae2da07d-1763296397353.png",
      alt: "Professional Asian woman with long black hair in white blazer smiling warmly at camera",
      title: "Leadership Coach & Mindfulness Expert",
      bio: "Dr. Sarah Chen is a renowned leadership consultant with over 15 years of experience helping executives and organizations integrate mindfulness into their leadership practices. She holds a Ph.D. in Organizational Psychology and has trained over 50,000 leaders worldwide.",
      philosophy: "True leadership begins with self-awareness. When we lead from a place of presence and authenticity, we create environments where people thrive, innovation flourishes, and sustainable success becomes inevitable.",
      credentials: [
      "Ph.D. in Organizational Psychology from Stanford University",
      "Certified Mindfulness-Based Stress Reduction (MBSR) Instructor",
      "Former VP of Leadership Development at Fortune 500 company",
      "Author of 'The Conscious Leader' (bestselling leadership book)",
      "Featured speaker at TEDx and World Business Forum"],

      stats: {
        courses: 12,
        students: 48500,
        rating: 4.9
      }
    },
    rating: 4.9,
    reviewCount: 3847,
    studentCount: 12450,
    duration: "8 weeks",
    level: "Intermediate",
    lastUpdated: "December 2024",
    heroImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1478bcc45-1764651525877.png",
    heroAlt: "Diverse business team collaborating around conference table in modern bright office space"
  };

  const stats = [
  { icon: "ClockIcon", label: "Course Duration", value: "8 Weeks" },
  { icon: "VideoCameraIcon", label: "Video Lessons", value: "42 Hours" },
  { icon: "DocumentTextIcon", label: "Resources", value: "85 Files" },
  { icon: "AcademicCapIcon", label: "Certificate", value: "Included" }];


  const modules: Module[] = [
  {
    id: 1,
    title: "Foundations of Mindful Leadership",
    lessonCount: 6,
    duration: "4.5 hours",
    lessons: [
    { id: 1, title: "Introduction to Mindful Leadership", duration: "12:30", type: "video", isPreview: true },
    { id: 2, title: "The Science of Mindfulness in Leadership", duration: "18:45", type: "video", isPreview: true },
    { id: 3, title: "Self-Awareness Assessment", duration: "25:00", type: "reading", isPreview: false },
    { id: 4, title: "Building Your Mindfulness Practice", duration: "22:15", type: "video", isPreview: false },
    { id: 5, title: "Leadership Presence Exercise", duration: "15:30", type: "reading", isPreview: false },
    { id: 6, title: "Module 1 Knowledge Check", duration: "10:00", type: "quiz", isPreview: false }]

  },
  {
    id: 2,
    title: "Emotional Intelligence for Leaders",
    lessonCount: 7,
    duration: "5.2 hours",
    lessons: [
    { id: 7, title: "Understanding Emotional Intelligence", duration: "16:20", type: "video", isPreview: false },
    { id: 8, title: "Self-Regulation Techniques", duration: "20:45", type: "video", isPreview: false },
    { id: 9, title: "Empathy in Leadership", duration: "18:30", type: "video", isPreview: false },
    { id: 10, title: "Managing Difficult Conversations", duration: "24:15", type: "video", isPreview: false },
    { id: 11, title: "EQ Assessment Tool", duration: "30:00", type: "reading", isPreview: false },
    { id: 12, title: "Case Study: Emotional Intelligence in Action", duration: "22:00", type: "reading", isPreview: false },
    { id: 13, title: "Module 2 Assessment", duration: "12:00", type: "quiz", isPreview: false }]

  },
  {
    id: 3,
    title: "Conscious Decision Making",
    lessonCount: 6,
    duration: "4.8 hours",
    lessons: [
    { id: 14, title: "The Art of Mindful Decision Making", duration: "19:30", type: "video", isPreview: false },
    { id: 15, title: "Overcoming Cognitive Biases", duration: "21:45", type: "video", isPreview: false },
    { id: 16, title: "Strategic Thinking Framework", duration: "25:20", type: "video", isPreview: false },
    { id: 17, title: "Decision Making Under Pressure", duration: "17:30", type: "video", isPreview: false },
    { id: 18, title: "Real-World Decision Scenarios", duration: "28:00", type: "reading", isPreview: false },
    { id: 19, title: "Module 3 Challenge", duration: "15:00", type: "quiz", isPreview: false }]

  },
  {
    id: 4,
    title: "Building Resilient Teams",
    lessonCount: 8,
    duration: "6.0 hours",
    lessons: [
    { id: 20, title: "Creating Psychological Safety", duration: "20:15", type: "video", isPreview: false },
    { id: 21, title: "Team Mindfulness Practices", duration: "18:45", type: "video", isPreview: false },
    { id: 22, title: "Conflict Resolution Strategies", duration: "23:30", type: "video", isPreview: false },
    { id: 23, title: "Building Trust and Collaboration", duration: "19:20", type: "video", isPreview: false },
    { id: 24, title: "Team Resilience Workshop", duration: "32:00", type: "reading", isPreview: false },
    { id: 25, title: "Leading Through Change", duration: "21:45", type: "video", isPreview: false },
    { id: 26, title: "Team Assessment Tools", duration: "26:00", type: "reading", isPreview: false },
    { id: 27, title: "Module 4 Evaluation", duration: "14:00", type: "quiz", isPreview: false }]

  },
  {
    id: 5,
    title: "Sustainable Leadership Practices",
    lessonCount: 7,
    duration: "5.5 hours",
    lessons: [
    { id: 28, title: "Work-Life Integration", duration: "18:30", type: "video", isPreview: false },
    { id: 29, title: "Preventing Burnout", duration: "20:45", type: "video", isPreview: false },
    { id: 30, title: "Energy Management for Leaders", duration: "22:15", type: "video", isPreview: false },
    { id: 31, title: "Creating Sustainable Routines", duration: "17:30", type: "video", isPreview: false },
    { id: 32, title: "Self-Care Strategies", duration: "24:00", type: "reading", isPreview: false },
    { id: 33, title: "Long-term Leadership Development Plan", duration: "28:00", type: "reading", isPreview: false },
    { id: 34, title: "Final Course Assessment", duration: "20:00", type: "quiz", isPreview: false }]

  }];


  const reviews: Review[] = [
  {
    id: 1,
    student: {
      name: "Michael Rodriguez",
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_154db72b0-1763298646228.png",
      alt: "Hispanic man with short dark hair in navy suit smiling confidently",
      title: "Senior Director, Tech Startup"
    },
    rating: 5,
    date: "2 weeks ago",
    review: "This course fundamentally changed how I approach leadership. The mindfulness practices have helped me become more present with my team, and I've noticed a significant improvement in our collaboration and innovation. Dr. Chen's teaching style is both profound and practical.",
    helpful: 127
  },
  {
    id: 2,
    student: {
      name: "Jennifer Thompson",
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_150c1be65-1763294957785.png",
      alt: "Professional woman with blonde hair in gray blazer in modern office",
      title: "VP of Operations, Healthcare"
    },
    rating: 5,
    date: "1 month ago",
    review: "As someone who's been in leadership for 15 years, I was skeptical about what new insights I could gain. This course exceeded all expectations. The emotional intelligence modules alone were worth the investment. My team has noticed a positive shift in my leadership approach.",
    helpful: 94
  },
  {
    id: 3,
    student: {
      name: "David Kim",
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_131989312-1763294987274.png",
      alt: "Asian man with glasses in white shirt smiling warmly",
      title: "CEO, Marketing Agency"
    },
    rating: 5,
    date: "1 month ago",
    review: "The practical tools and frameworks provided in this course are immediately applicable. I've implemented the conscious decision-making process with my executive team, and we're seeing better outcomes with less stress. Highly recommend for any leader serious about growth.",
    helpful: 82
  },
  {
    id: 4,
    student: {
      name: "Amanda Foster",
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_121a12256-1763294822850.png",
      alt: "Professional woman with curly brown hair in burgundy blazer",
      title: "Director of HR, Fortune 500"
    },
    rating: 5,
    date: "2 months ago",
    review: "This course should be mandatory for all leaders. The combination of mindfulness practices and leadership strategies creates a powerful framework for sustainable success. The community discussions added tremendous value to my learning experience.",
    helpful: 76
  },
  {
    id: 5,
    student: {
      name: "Robert Chen",
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_1b328279d-1763293698555.png",
      alt: "Asian man in dark suit with confident expression",
      title: "Managing Partner, Consulting Firm"
    },
    rating: 4,
    date: "2 months ago",
    review: "Excellent content and well-structured curriculum. The only reason I'm giving 4 stars instead of 5 is that I wish there were more live sessions with Dr. Chen. That said, the recorded content is top-notch and the resources are comprehensive.",
    helpful: 63
  },
  {
    id: 6,
    student: {
      name: "Lisa Martinez",
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_15b464a88-1763295144595.png",
      alt: "Hispanic woman with long dark hair in professional attire smiling",
      title: "Team Lead, Financial Services"
    },
    rating: 5,
    date: "3 months ago",
    review: "As a new leader, this course gave me the confidence and tools I needed to lead effectively. The modules on emotional intelligence and team building were particularly valuable. I feel much more equipped to handle the challenges of leadership.",
    helpful: 58
  }];


  const requirements = [
  "At least 2 years of professional experience in any field",
  "Current or aspiring leadership role (team lead, manager, director, or executive)",
  "Willingness to engage in self-reflection and mindfulness practices",
  "Commitment to complete weekly assignments and participate in discussions",
  "No prior mindfulness or meditation experience required"];


  const outcomes = [
  "Develop a consistent mindfulness practice tailored to your leadership style",
  "Master emotional intelligence skills for better team relationships",
  "Make conscious, strategic decisions under pressure",
  "Build psychologically safe and resilient teams",
  "Create sustainable leadership practices that prevent burnout",
  "Lead with authenticity, presence, and purpose",
  "Navigate organizational change with confidence and clarity",
  "Implement practical frameworks for daily leadership challenges"];


  const targetAudience = [
  "Mid-level to senior managers seeking to enhance their leadership effectiveness",
  "Executives looking to integrate mindfulness into their leadership approach",
  "Team leads wanting to build stronger, more resilient teams",
  "Professionals transitioning into leadership roles",
  "Entrepreneurs and business owners leading growing organizations",
  "HR professionals developing leadership programs"];


  const relatedCourses: Course[] = [
  {
    id: 1,
    title: "Emotional Intelligence Mastery for Professionals",
    instructor: "Dr. James Wilson",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1557e9288-1764661787238.png",
    alt: "Diverse team having engaged discussion in bright modern office space",
    rating: 4.8,
    students: 8920,
    price: 89,
    duration: "6 weeks"
  },
  {
    id: 2,
    title: "Strategic Decision Making in Complex Environments",
    instructor: "Prof. Maria Garcia",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1539ad1ba-1764663798155.png",
    alt: "Business professionals analyzing data on large screen in conference room",
    rating: 4.7,
    students: 6540,
    price: 79,
    duration: "5 weeks"
  },
  {
    id: 3,
    title: "Building High-Performance Teams",
    instructor: "Michael Anderson",
    image: "https://images.unsplash.com/photo-1637979911089-bf0d73f0b9c5",
    alt: "Team members collaborating around table with laptops and notebooks",
    rating: 4.9,
    students: 11230,
    price: 99,
    duration: "7 weeks"
  }];


  const enrollmentFeatures = [
  "42 hours of on-demand video content",
  "85 downloadable resources and templates",
  "Weekly live Q&A sessions with Dr. Chen",
  "Access to exclusive leadership community",
  "Personalized feedback on assignments",
  "Certificate of completion",
  "Lifetime access to course materials",
  "Mobile and desktop access"];


  return (
    <div className="min-h-screen bg-background">
      <CourseHero course={courseData} />
      <CourseStats stats={stats} />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-16">
            <section>
              <h2 className="text-3xl font-headline font-semibold text-foreground mb-6">
                What You'll Learn
              </h2>
              <div className="bg-card rounded-xl p-8 border border-border">
                <p className="text-muted-foreground font-body leading-relaxed mb-6">
                  This comprehensive 8-week program is designed to transform your leadership approach through the integration of mindfulness practices, emotional intelligence, and conscious decision-making. You'll learn to lead with greater presence, authenticity, and effectiveness while building sustainable practices that prevent burnout and promote long-term success.
                </p>
                <p className="text-muted-foreground font-body leading-relaxed">
                  Through a combination of video lessons, interactive exercises, real-world case studies, and community discussions, you'll develop practical skills that can be immediately applied in your leadership role. Each module builds upon the previous one, creating a cohesive learning journey that addresses the full spectrum of mindful leadership.
                </p>
              </div>
            </section>

            <CourseCurriculum modules={modules} />
            <CourseRequirements
              requirements={requirements}
              outcomes={outcomes}
              targetAudience={targetAudience} />

          </div>

          <div className="lg:col-span-1">
            <EnrollmentCard
              price={149}
              originalPrice={299}
              discount={50}
              features={enrollmentFeatures} />

          </div>
        </div>
      </div>

      <InstructorProfile instructor={courseData.instructor} />
      <StudentReviews
        reviews={reviews}
        overallRating={4.9}
        totalReviews={3847}
        ratingDistribution={[
        { stars: 5, percentage: 78 },
        { stars: 4, percentage: 16 },
        { stars: 3, percentage: 4 },
        { stars: 2, percentage: 1 },
        { stars: 1, percentage: 1 }]
        } />

      <RelatedCourses courses={relatedCourses} />
    </div>);

};

export default CourseDetailInteractive;