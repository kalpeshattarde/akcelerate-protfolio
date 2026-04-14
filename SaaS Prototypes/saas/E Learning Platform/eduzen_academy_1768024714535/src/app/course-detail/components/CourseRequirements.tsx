import React from 'react';
import Icon from '@/components/ui/AppIcon';

interface CourseRequirementsProps {
  requirements: string[];
  outcomes: string[];
  targetAudience: string[];
}

const CourseRequirements = ({ requirements, outcomes, targetAudience }: CourseRequirementsProps) => {
  return (
    <section className="py-16 bg-card">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-headline font-semibold text-foreground mb-6 flex items-center space-x-2">
              <Icon name="ClipboardDocumentListIcon" size={28} className="text-primary" />
              <span>Requirements</span>
            </h3>
            <ul className="space-y-4">
              {requirements.map((req, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <Icon name="CheckCircleIcon" size={20} className="text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground font-body">{req}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-2xl font-headline font-semibold text-foreground mb-6 flex items-center space-x-2">
              <Icon name="TrophyIcon" size={28} className="text-accent" />
              <span>Learning Outcomes</span>
            </h3>
            <ul className="space-y-4">
              {outcomes.map((outcome, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <Icon name="SparklesIcon" size={20} className="text-accent mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground font-body">{outcome}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 bg-primary/5 rounded-xl p-8">
          <h3 className="text-2xl font-headline font-semibold text-foreground mb-6 flex items-center space-x-2">
            <Icon name="UserGroupIcon" size={28} className="text-primary" />
            <span>Who This Course Is For</span>
          </h3>
          <ul className="grid md:grid-cols-2 gap-4">
            {targetAudience.map((audience, index) => (
              <li key={index} className="flex items-start space-x-3">
                <Icon name="ArrowRightIcon" size={20} className="text-primary mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground font-body">{audience}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default CourseRequirements;