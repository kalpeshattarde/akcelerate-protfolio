import React from 'react';
import Icon from '@/components/ui/AppIcon';

interface PhilosophyPillar {
  icon: string;
  title: string;
  description: string;
}

const philosophyPillars: PhilosophyPillar[] = [
  {
    icon: "HeartIcon",
    title: "Mindful Learning",
    description: "Education that respects your mental well-being and cognitive capacity, creating space for deep understanding rather than information overload."
  },
  {
    icon: "LightBulbIcon",
    title: "Wisdom Over Knowledge",
    description: "We focus on transformative insights and practical wisdom that you can apply immediately, not just theoretical concepts to memorize."
  },
  {
    icon: "UserGroupIcon",
    title: "Community Connection",
    description: "Learn alongside like-minded individuals in a supportive environment where collaboration enhances rather than competes with growth."
  },
  {
    icon: "SparklesIcon",
    title: "Quality Curation",
    description: "Every course is carefully selected and designed by experts who understand both subject mastery and effective teaching methodologies."
  }
];

const PhilosophySection = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium">
            <Icon name="SparklesIcon" size={16} variant="solid" />
            <span>Our Philosophy</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-headline font-semibold text-foreground">
            Where Knowledge Meets <span className="text-primary italic">Wisdom</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto font-body leading-relaxed">
            We believe true learning happens when the mind is calm, focused, and open. Our approach transcends traditional online education by creating a sanctuary for mindful growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {philosophyPillars.map((pillar, index) => (
            <div
              key={index}
              className="group bg-card rounded-2xl p-8 border border-border hover:border-primary transition-all duration-300 hover:shadow-lg hover:-translate-y-2"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                <Icon
                  name={pillar.icon as any}
                  size={28}
                  variant="solid"
                  className="text-primary group-hover:text-primary-foreground transition-colors duration-300"
                />
              </div>
              <h3 className="text-xl font-headline font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                {pillar.title}
              </h3>
              <p className="text-muted-foreground font-body leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-card rounded-2xl p-8 md:p-12 border border-border">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h3 className="text-3xl font-headline font-semibold text-foreground">
                Education Designed for <span className="text-primary italic">Human Flourishing</span>
              </h3>
              <p className="text-muted-foreground font-body leading-relaxed">
                In a world of overwhelming information and constant distraction, we offer something different: a premium, boutique-style educational experience that honors both intellectual growth and mental well-being.
              </p>
              <p className="text-muted-foreground font-body leading-relaxed">
                Our courses are designed as transformative journeys, not information dumps. Every lesson includes reflection prompts, progress celebrations, and community connections that build engagement through meaning rather than gamification.
              </p>
            </div>
            <div className="space-y-4">
              {[
                { label: "Course Completion Rate", value: "94%" },
                { label: "Student Satisfaction", value: "4.9/5" },
                { label: "Career Advancement", value: "87%" },
                { label: "Community Engagement", value: "92%" }
              ].map((stat, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-primary/5 rounded-xl">
                  <span className="text-foreground font-medium">{stat.label}</span>
                  <span className="text-2xl font-headline font-semibold text-primary">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhilosophySection;