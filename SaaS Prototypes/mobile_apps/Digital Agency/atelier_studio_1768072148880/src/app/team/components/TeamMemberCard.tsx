'use client';

import { useState } from 'react';
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
}

interface TeamMemberCardProps {
  member: TeamMember;
  onViewProfile: (member: TeamMember) => void;
}

export default function TeamMemberCard({ member, onViewProfile }: TeamMemberCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onViewProfile(member)}
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-md bg-surface">
        <AppImage
          src={member.image}
          alt={member.alt}
          className={`w-full h-full object-cover transition-all duration-700 ease-confident ${
            isHovered ? 'scale-110 brightness-75' : 'scale-100 brightness-100'
          }`}
        />
        
        {/* Gradient Overlay */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent transition-opacity duration-500 ${
            isHovered ? 'opacity-90' : 'opacity-0'
          }`}
        />

        {/* Content Overlay */}
        <div
          className={`absolute inset-0 p-6 flex flex-col justify-end transition-all duration-500 ${
            isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
        >
          <div className="space-y-2">
            <p className="font-body text-sm text-primary">{member.discipline}</p>
            <p className="font-body text-sm text-text-secondary line-clamp-3">
              {member.bio}
            </p>
          </div>

          {/* Social Links */}
          {(member.social.linkedin || member.social.twitter || member.social.behance) && (
            <div className="flex items-center gap-3 mt-4">
              {member.social.linkedin && (
                <a
                  href={member.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-text-secondary hover:text-primary transition-colors duration-300"
                  aria-label={`${member.name}'s LinkedIn profile`}
                >
                  <Icon name="LinkIcon" size={18} />
                </a>
              )}
              {member.social.twitter && (
                <a
                  href={member.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-text-secondary hover:text-primary transition-colors duration-300"
                  aria-label={`${member.name}'s Twitter profile`}
                >
                  <Icon name="LinkIcon" size={18} />
                </a>
              )}
              {member.social.behance && (
                <a
                  href={member.social.behance}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-text-secondary hover:text-primary transition-colors duration-300"
                  aria-label={`${member.name}'s Behance profile`}
                >
                  <Icon name="LinkIcon" size={18} />
                </a>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Member Info */}
      <div className="mt-4 space-y-1">
        <h3 className="font-headline text-xl text-foreground group-hover:text-primary transition-colors duration-300">
          {member.name}
        </h3>
        <p className="font-cta text-sm text-text-secondary">{member.role}</p>
      </div>

      {/* Expertise Tags */}
      <div className="flex flex-wrap gap-2 mt-3">
        {member.expertise.slice(0, 3).map((skill, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-muted/50 text-text-secondary font-body text-xs rounded-full"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}