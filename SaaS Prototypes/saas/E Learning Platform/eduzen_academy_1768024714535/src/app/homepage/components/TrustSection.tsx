import React from 'react';
import Icon from '@/components/ui/AppIcon';

interface TrustIndicator {
  icon: string;
  label: string;
  value: string;
}

const trustIndicators: TrustIndicator[] = [
  {
    icon: "ShieldCheckIcon",
    label: "Certified Instructors",
    value: "100%"
  },
  {
    icon: "AcademicCapIcon",
    label: "Accredited Courses",
    value: "500+"
  },
  {
    icon: "UserGroupIcon",
    label: "Active Learners",
    value: "50K+"
  },
  {
    icon: "GlobeAltIcon",
    label: "Countries Reached",
    value: "120+"
  }
];

const certifications = [
  "ISO 9001:2015 Certified",
  "WCAG 2.1 AA Compliant",
  "GDPR Compliant",
  "SOC 2 Type II Certified"
];

const TrustSection = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium">
            <Icon name="ShieldCheckIcon" size={16} variant="solid" />
            <span>Trusted Excellence</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-headline font-semibold text-foreground">
            Built on <span className="text-primary italic">Trust & Quality</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {trustIndicators.map((indicator, index) => (
            <div
              key={index}
              className="bg-card rounded-2xl p-6 border border-border text-center hover:border-primary transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Icon name={indicator.icon as any} size={24} variant="solid" className="text-primary" />
              </div>
              <div className="text-3xl font-headline font-semibold text-primary mb-2">
                {indicator.value}
              </div>
              <div className="text-sm text-muted-foreground font-body">
                {indicator.label}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-card rounded-2xl p-8 md:p-12 border border-border">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h3 className="text-3xl font-headline font-semibold text-foreground">
                Your Learning, <span className="text-primary italic">Our Commitment</span>
              </h3>
              <p className="text-muted-foreground font-body leading-relaxed">
                We maintain the highest standards of educational quality, data security, and accessibility. Every course is vetted by subject matter experts, and our platform is designed to be inclusive and secure.
              </p>
              <div className="flex flex-wrap gap-3">
                {certifications.map((cert, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium"
                  >
                    <Icon name="CheckBadgeIcon" size={16} variant="solid" />
                    <span>{cert}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              {[
                {
                  icon: "LockClosedIcon",
                  title: "Data Privacy",
                  description: "Your personal information is encrypted and never shared with third parties"
                },
                {
                  icon: "EyeIcon",
                  title: "Accessibility",
                  description: "Platform designed for all learners with screen reader support and keyboard navigation"
                },
                {
                  icon: "ClipboardDocumentCheckIcon",
                  title: "Quality Assurance",
                  description: "Every course undergoes rigorous review by educational experts and peer instructors"
                }
              ].map((item, index) => (
                <div key={index} className="flex gap-4 p-4 bg-primary/5 rounded-xl">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name={item.icon as any} size={20} variant="solid" className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-headline font-semibold text-foreground mb-1">{item.title}</h4>
                    <p className="text-sm text-muted-foreground font-body">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;