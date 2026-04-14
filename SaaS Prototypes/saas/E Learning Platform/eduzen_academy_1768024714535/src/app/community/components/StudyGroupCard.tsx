import React from 'react';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

interface StudyGroupCardProps {
  group: {
    id: string;
    name: string;
    description: string;
    category: string;
    members: Array<{
      avatar: string;
      avatarAlt: string;
    }>;
    totalMembers: number;
    meetingSchedule: string;
    nextMeeting: string;
    isOpen: boolean;
  };
  onJoin: () => void;
}

const StudyGroupCard = ({ group, onJoin }: StudyGroupCardProps) => {
  return (
    <div className="bg-card rounded-xl p-6 border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="font-headline text-xl font-semibold text-foreground mb-2">
            {group.name}
          </h3>
          <p className="font-body text-sm text-muted-foreground mb-3 line-clamp-2">
            {group.description}
          </p>
          <div className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
            <Icon name="TagIcon" size={14} />
            <span>{group.category}</span>
          </div>
        </div>
        {group.isOpen && (
          <div className="flex-shrink-0 px-3 py-1 bg-success/10 text-success text-xs font-medium rounded-full">
            Open
          </div>
        )}
      </div>
      
      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Icon name="CalendarIcon" size={16} className="flex-shrink-0" />
          <span>{group.meetingSchedule}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Icon name="ClockIcon" size={16} className="flex-shrink-0" />
          <span>Next: {group.nextMeeting}</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center gap-2">
          <div className="flex -space-x-2">
            {group.members.slice(0, 3).map((member, index) => (
              <div
                key={index}
                className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-card"
              >
                <AppImage
                  src={member.avatar}
                  alt={member.avatarAlt}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
          <span className="text-sm text-muted-foreground">
            {group.totalMembers} members
          </span>
        </div>
        <button
          onClick={onJoin}
          className="px-4 py-2 font-cta font-medium text-sm text-primary-foreground bg-primary rounded-lg hover:shadow-cta transition-all duration-300 hover:-translate-y-0.5"
        >
          Join Group
        </button>
      </div>
    </div>
  );
};

export default StudyGroupCard;