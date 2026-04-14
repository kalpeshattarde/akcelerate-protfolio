'use client';

import { useEffect } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  discipline: string;
  image: string;
  alt: string;
  bio: string;
  expertise: string[];
  social: {
    linkedin?: string;
    twitter?: string;
    behance?: string;
  };
  fullBio: string;
  achievements: string[];
  projects: string[];
}

interface ProfileModalProps {
  member: TeamMember | null;
  onClose: () => void;
}

export default function ProfileModal({ member, onClose }: ProfileModalProps) {
  useEffect(() => {
    if (member) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [member]);

  if (!member) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/95 backdrop-blur-[20px]"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-surface rounded-lg shadow-dramatic"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 p-2 bg-background/80 backdrop-blur-sm rounded-full text-foreground hover:text-primary transition-colors duration-300"
          aria-label="Close profile modal"
        >
          <Icon name="XMarkIcon" size={24} />
        </button>

        {/* Header Section */}
        <div className="relative h-80 overflow-hidden">
          <AppImage
            src={member.image}
            alt={member.alt}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/50 to-transparent" />
        </div>

        {/* Content Section */}
        <div className="p-8 lg:p-12 -mt-20 relative z-10">
          <div className="space-y-6">
            {/* Name & Role */}
            <div>
              <p className="font-body text-sm text-primary mb-2">{member.discipline}</p>
              <h2 className="font-headline text-4xl lg:text-5xl text-foreground mb-2">
                {member.name}
              </h2>
              <p className="font-cta text-lg text-text-secondary">{member.role}</p>
            </div>

            {/* Social Links */}
            {(member.social.linkedin || member.social.twitter || member.social.behance) && (
              <div className="flex items-center gap-4">
                {member.social.linkedin && (
                  <a
                    href={member.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-muted/50 rounded-full text-text-secondary hover:text-primary hover:bg-muted transition-all duration-300"
                    aria-label={`${member.name}'s LinkedIn profile`}
                  >
                    <Icon name="LinkIcon" size={20} />
                  </a>
                )}
                {member.social.twitter && (
                  <a
                    href={member.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-muted/50 rounded-full text-text-secondary hover:text-primary hover:bg-muted transition-all duration-300"
                    aria-label={`${member.name}'s Twitter profile`}
                  >
                    <Icon name="LinkIcon" size={20} />
                  </a>
                )}
                {member.social.behance && (
                  <a
                    href={member.social.behance}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-muted/50 rounded-full text-text-secondary hover:text-primary hover:bg-muted transition-all duration-300"
                    aria-label={`${member.name}'s Behance profile`}
                  >
                    <Icon name="LinkIcon" size={20} />
                  </a>
                )}
              </div>
            )}

            {/* Full Bio */}
            <div className="space-y-4">
              <h3 className="font-headline text-2xl text-foreground">About</h3>
              <p className="font-body text-base text-text-secondary leading-relaxed">
                {member.fullBio}
              </p>
            </div>

            {/* Expertise */}
            <div className="space-y-4">
              <h3 className="font-headline text-2xl text-foreground">Expertise</h3>
              <div className="flex flex-wrap gap-2">
                {member.expertise.map((skill, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-muted/50 text-foreground font-body text-sm rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Achievements */}
            {member.achievements.length > 0 && (
              <div className="space-y-4">
                <h3 className="font-headline text-2xl text-foreground">Achievements</h3>
                <ul className="space-y-2">
                  {member.achievements.map((achievement, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 font-body text-base text-text-secondary"
                    >
                      <Icon name="CheckCircleIcon" size={20} className="text-primary mt-0.5 flex-shrink-0" />
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Notable Projects */}
            {member.projects.length > 0 && (
              <div className="space-y-4">
                <h3 className="font-headline text-2xl text-foreground">Notable Projects</h3>
                <ul className="space-y-2">
                  {member.projects.map((project, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 font-body text-base text-text-secondary"
                    >
                      <Icon name="StarIcon" size={20} className="text-primary mt-0.5 flex-shrink-0" />
                      <span>{project}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}