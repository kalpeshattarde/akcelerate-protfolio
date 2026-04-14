import React from 'react';

import AppImage from '@/components/ui/AppImage';

interface MemberCardProps {
  member: {
    id: string;
    name: string;
    avatar: string;
    avatarAlt: string;
    role: string;
    expertise: string[];
    contributions: number;
    helpfulAnswers: number;
    joinedDate: string;
    isOnline: boolean;
  };
  onClick: () => void;
}

const MemberCard = ({ member, onClick }: MemberCardProps) => {
  return (
    <button
      onClick={onClick}
      className="w-full bg-card rounded-xl p-6 border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300 text-left group"
    >
      <div className="flex flex-col items-center text-center">
        <div className="relative mb-4">
          <div className="w-20 h-20 rounded-full overflow-hidden ring-2 ring-border group-hover:ring-primary/30 transition-all duration-300">
            <AppImage
              src={member.avatar}
              alt={member.avatarAlt}
              className="w-full h-full object-cover"
            />
          </div>
          {member.isOnline && (
            <div className="absolute bottom-0 right-0 w-5 h-5 bg-success rounded-full border-2 border-card" />
          )}
        </div>
        <h3 className="font-headline text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors duration-300">
          {member.name}
        </h3>
        <div className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full mb-3">
          {member.role}
        </div>
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {member.expertise.map((skill, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
        <div className="w-full pt-4 border-t border-border">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="font-headline text-xl font-semibold text-foreground mb-1">
                {member.contributions}
              </div>
              <div className="font-body text-xs text-muted-foreground">Posts</div>
            </div>
            <div>
              <div className="font-headline text-xl font-semibold text-foreground mb-1">
                {member.helpfulAnswers}
              </div>
              <div className="font-body text-xs text-muted-foreground">Helpful</div>
            </div>
          </div>
        </div>
      </div>
    </button>
  );
};

export default MemberCard;